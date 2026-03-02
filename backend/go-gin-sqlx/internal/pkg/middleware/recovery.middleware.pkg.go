package middleware

import (
	"api-stack-underflow/internal/pkg/helper"
	"api-stack-underflow/internal/pkg/logger/v2"
	"runtime/debug"

	"github.com/gin-gonic/gin"
)

func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				log := logger.FromContext(c.Request.Context())

				log.Error().
					Interface("panic", r).
					Bytes("stacktrace", debug.Stack()).
					Str("path", c.Request.URL.Path).
					Str("method", c.Request.Method).
					Msg("panic recovered")

				helper.APIInternalServerError(c, "", nil)
			}
		}()
		c.Next()
	}
}
