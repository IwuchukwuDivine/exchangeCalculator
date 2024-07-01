// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify, ThemeDefinition } from "vuetify";


const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    color: {
        red: "#de061d",
        white: "#ffffff",
        gray: "#f0f0f0f0"
    }
}
export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        // ... your configuration
        components,
        directives,
        theme: {
            defaultTheme: "myCustomLightTheme",
            themes: {
                myCustomLightTheme
            }
        },
        icons: {
            sets: {
				mdi,
			},
        }
      });
    nuxtApp.vueApp.use(vuetify)
})
