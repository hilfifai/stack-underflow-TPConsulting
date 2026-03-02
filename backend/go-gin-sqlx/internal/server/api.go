package server

import (
	"context"
	"sync"

	config "api-stack-underflow/internal/config"
	"api-stack-underflow/internal/handler/auth"
	"api-stack-underflow/internal/handler/customer"
	"api-stack-underflow/internal/handler/delivery_order"
	"api-stack-underflow/internal/handler/goods_receipt"
	"api-stack-underflow/internal/handler/inventory"
	"api-stack-underflow/internal/handler/monitoring"
	"api-stack-underflow/internal/handler/product"
	"api-stack-underflow/internal/handler/product_category"
	"api-stack-underflow/internal/handler/product_stock"
	"api-stack-underflow/internal/handler/purchase_order"
	"api-stack-underflow/internal/handler/query_catalog"
	"api-stack-underflow/internal/handler/question"
	"api-stack-underflow/internal/handler/report"
	"api-stack-underflow/internal/handler/role"
	"api-stack-underflow/internal/handler/sales_order"
	"api-stack-underflow/internal/handler/supplier"
	"api-stack-underflow/internal/handler/warehouse"
	"api-stack-underflow/internal/handler/warehouse_location"
	database "api-stack-underflow/internal/pkg/db"
	"api-stack-underflow/internal/pkg/jwt"
	"api-stack-underflow/internal/pkg/middleware"
	"api-stack-underflow/internal/repository"
	service "api-stack-underflow/internal/service"

	"github.com/gin-gonic/gin"
)

func Setup(engine *gin.Engine, ctx context.Context, wg *sync.WaitGroup, db *database.Database) {
	e := engine.Group(BasePath())
	InitRoutes(e, ctx, wg, db)
}

func BasePath() string {
	return "/api/v1"
}

func InitRoutes(e *gin.RouterGroup, ctx context.Context, wg *sync.WaitGroup, db *database.Database) {
	sqlxDB, err := db.GetSqlxDB()
	if err != nil {
		panic("Failed to get sqlx DB: " + err.Error())
	}

	e.OPTIONS("/*path", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", c.Request.Header.Get("Origin"))
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, X-Requested-With")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Max-Age", "43200")
		c.Status(200)
	})

	jwtOpts := jwt.DefaultOptions(config.Config.JwtSecret)
	jwtOpts.SaveMethod = jwt.JWT
	jwtAuth := jwt.New(jwtOpts)

	authMiddleware := middleware.AuthMiddleware(jwtAuth)

	// Auth
	authRepo := repository.NewAuthRepository(db)
	roleRepo := repository.NewRoleRepository(db)
	permissionRepo := repository.NewPermissionRepository()
	authSvc := service.NewAuthService(authRepo, roleRepo, permissionRepo, jwtAuth)
	authHandler := auth.NewHandler(authSvc, jwtAuth)
	authHandler.NewRoutes(e)

	// Role
	roleSvc := service.NewRoleService(roleRepo)
	roleHandler := role.NewHandler(roleSvc)
	roleHandler.NewRoutes(e, authMiddleware)

	// Product
	productRepo := repository.NewProductRepository(sqlxDB)
	productCategoryRepo := repository.NewProductCategoryRepository(sqlxDB)
	inventoryRepo := repository.NewInventoryRepository(sqlxDB)
	productSvc := service.NewProductService(productRepo, productCategoryRepo, inventoryRepo)
	productHandler := product.NewHandler(productSvc)
	productHandler.NewRoutes(e, authMiddleware)

	// Product Category
	productCategorySvc := service.NewProductCategoryService(productCategoryRepo)
	productCategoryHandler := product_category.NewHandler(productCategorySvc)
	productCategoryHandler.NewRoutes(e, authMiddleware)

	// Product Stock
	warehouseRepo := repository.NewWarehouseRepository(sqlxDB)
	productStockRepo := repository.NewProductStockRepository(sqlxDB)
	productStockSvc := service.NewProductStockService(productStockRepo, productRepo, warehouseRepo, inventoryRepo)
	productStockHandler := product_stock.NewHandler(productStockSvc)
	productStockHandler.NewRoutes(e, authMiddleware)

	// Customer
	customerRepo := repository.NewCustomerRepository(sqlxDB)
	customerSvc := service.NewCustomerService(customerRepo)
	customerHandler := customer.NewHandler(customerSvc)
	customerHandler.NewRoutes(e, authMiddleware)

	// Sales Order
	salesOrderRepo := repository.NewSalesOrderRepository(sqlxDB)
	salesOrderSvc := service.NewSalesOrderService(salesOrderRepo, customerRepo, productRepo)
	salesOrderHandler := sales_order.NewHandler(salesOrderSvc)
	salesOrderHandler.NewRoutes(e, authMiddleware)

	// Delivery Order
	deliveryOrderRepo := repository.NewDeliveryOrderRepository(sqlxDB)
	locationRepo := repository.NewWarehouseLocationRepository(sqlxDB)
	inventorySvc := service.NewInventoryService(inventoryRepo, productRepo, warehouseRepo, locationRepo)
	deliveryOrderSvc := service.NewDeliveryOrderService(deliveryOrderRepo, salesOrderRepo, inventorySvc)
	deliveryOrderHandler := delivery_order.NewHandler(deliveryOrderSvc)
	deliveryOrderHandler.NewRoutes(e, authMiddleware)

	// Warehouse
	warehouseSvc := service.NewWarehouseService(warehouseRepo, inventoryRepo)
	warehouseHandler := warehouse.NewHandler(warehouseSvc)
	warehouseHandler.NewRoutes(e, authMiddleware)

	// Warehouse Location
	warehouseLocationSvc := service.NewWarehouseLocationService(warehouseRepo, locationRepo)
	warehouseLocationHandler := warehouse_location.NewHandler(warehouseLocationSvc)
	warehouseLocationHandler.NewRoutes(e, authMiddleware)

	// Supplier
	supplierRepo := repository.NewSupplierRepository(sqlxDB)
	supplierSvc := service.NewSupplierService(supplierRepo)
	supplierHandler := supplier.NewHandler(supplierSvc)
	supplierHandler.NewRoutes(e, authMiddleware)

	// Purchase Order
	purchaseOrderRepo := repository.NewPurchaseOrderRepository(sqlxDB)
	purchaseOrderSvc := service.NewPurchaseOrderService(purchaseOrderRepo, supplierRepo, productRepo)
	purchaseOrderHandler := purchase_order.NewHandler(purchaseOrderSvc)
	purchaseOrderHandler.NewRoutes(e, authMiddleware)

	// Goods Receipt
	goodsReceiptRepo := repository.NewGoodsReceiptRepository(sqlxDB)
	goodsReceiptSvc := service.NewGoodsReceiptService(goodsReceiptRepo, purchaseOrderRepo, inventorySvc)
	goodsReceiptHandler := goods_receipt.NewHandler(goodsReceiptSvc)
	goodsReceiptHandler.NewRoutes(e, authMiddleware)

	// Inventory
	inventoryHandler := inventory.NewHandler(inventorySvc)
	inventoryHandler.NewRoutes(e, authMiddleware)

	// Query Catalog
	queryCatalogRepo := repository.NewQueryRepository(db)
	queryCatalogSvc := service.NewQueryService(queryCatalogRepo)
	queryCatalogHandler := query_catalog.NewQueryHandler(jwtAuth, queryCatalogSvc)
	queryCatalogHandler.NewRoutes(e)

	// Monitoring
	monitoringSvc := service.NewMonitoringService()
	monitoring.RegisterMonitoringRoutes(e, monitoringSvc)

	// Report
	reportSvc := service.NewReportService(inventoryRepo, salesOrderRepo, purchaseOrderRepo, productRepo)
	reportHandler := report.NewHandler(reportSvc)
	reportHandler.NewRoutes(e, authMiddleware)

	// Stack Underflow - Question
	questionRepo := repository.NewQuestionRepository(sqlxDB)
	commentRepo := repository.NewCommentRepository(sqlxDB)
	questionSvc := service.NewQuestionService(questionRepo)
	commentSvc := service.NewCommentService(commentRepo)
	questionHandler := question.NewHandler(questionSvc, commentSvc, jwtAuth)
	questionHandler.NewRoutes(e, authMiddleware)

	e.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "healthy"})
	})
}
