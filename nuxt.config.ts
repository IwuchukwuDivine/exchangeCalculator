import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      alphaKey: process.env.NUXT_APP_API_KEY
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
