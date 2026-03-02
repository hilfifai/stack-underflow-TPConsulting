// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      apiLayer: process.env.NUXT_PUBLIC_API_LAYER || "mock",
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080/api"
    }
  },

  app: {
    head: {
      title: "StackUnderflow - Q&A for Developers",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    }
  },

  compatibilityDate: "2024-04-03"
})
