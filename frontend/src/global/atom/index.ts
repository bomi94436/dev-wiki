import { atom } from 'recoil'

export const snackbarState = atom<{
  type: 'success' | 'info' | 'warning' | 'error' | null
  message: string | null
}>({
  key: 'snackbarState',
  default: {
    type: null,
    message: null,
  },
})
