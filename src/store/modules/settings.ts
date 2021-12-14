import { defineStore } from 'pinia'
import { pinia } from '../index'

import defaultSettings from '@/settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

import varialbles from '@/styles/element-variables.module.less'

interface ISettings {
  theme: string
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: (): ISettings => ({
    theme: varialbles.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  }),
  actions: {
    changeSetting(key: string, value: string | boolean): void {
      console.log('settings: ', key, value)
      this.$state[key] = value
    }
  }
})

export function useSettingsStoreExternal() {
  return useSettingsStore(pinia)
}
