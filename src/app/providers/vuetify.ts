import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import type { App } from 'vue';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

let _vuetify: ReturnType<typeof createVuetify> | null = null;

export function createAppVuetify() {
  if (_vuetify) return _vuetify;
  _vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#1976D2',
            error: '#B00020',
          },
        },
      },
    },
  });
  return _vuetify;
}

export function installVuetify(app: App) {
  const vuetify = createAppVuetify();
  app.use(vuetify);
  return vuetify;
}
