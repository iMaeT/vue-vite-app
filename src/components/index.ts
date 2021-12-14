import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

export function setupCustomGlobalComp(app: App<Element>): void {
  app.component('SvgIcon', SvgIcon)
}
