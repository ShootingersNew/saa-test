import type { App } from 'vue';
import { createPinia, type Pinia } from 'pinia';
import persistedState from 'pinia-plugin-persistedstate'

let _pinia: Pinia | null = null;

export function createAppPinia(): Pinia {
  if (_pinia) return _pinia;
  const pinia = createPinia();
  pinia.use(persistedState);
  _pinia = pinia;
  return pinia;
}

export function installPinia(app: App): Pinia {
  const pinia = createAppPinia();
  app.use(pinia);
  return pinia;
}
