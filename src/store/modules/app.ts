import Cookies from 'js-cookie'

import { defineStore } from 'pinia'
import { pinia } from '../index'

const sidebarStatus = Cookies.get('sidebarStatus')
const size = Cookies.get('size') || 'medium'

type Sidebar = {
  opened: boolean
  withoutAnimation: boolean
}
interface AppState {
  sidebar: Sidebar
  device: string
  size: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    sidebar: {
      opened: sidebarStatus ? !!+sidebarStatus : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: size
  }),
  getters: {
    getSidebar(): Sidebar {
      return this.sidebar
    },
    getDevice(): string {
      return this.device
    },
    getSize(): string {
      return this.size
    }
  },
  actions: {
    toggleSidebar(): void {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    closeSidebar(withoutAnimation: boolean): void {
      Cookies.set('sidebarStatus', '0')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string): void {
      this.device = device || 'desktop'
    },
    setSize(size: string): void {
      this.size = size
      Cookies.set('size', size)
    }
  }
})

export function useAppStoreExternal() {
  return useAppStore(pinia)
}
