# StackUnderflow Monorepo

Monorepo untuk project StackUnderflow dengan React (Web + Desktop) dan React Native (Mobile).

## Struktur

```
stackunderflow-monorepo/
├── apps/
│   ├── web/           # React untuk browser
│   ├── desktop/       # Electron + React
│   └── mobile/        # React Native
├── packages/
│   ├── shared-types/  # TypeScript types
│   ├── shared-api/   # API services
│   ├── shared-store/ # State management
│   └── shared-utils/ # Utilities
└── ...
```

## Cara Menjalankan

### Web
```bash
cd apps/web
npm install
npm run dev
```

### Desktop
```bash
cd apps/desktop
npm install
npm run electron:dev
```

### Mobile
```bash
cd apps/mobile
npm install
npm run ios    # atau npm run android
```
