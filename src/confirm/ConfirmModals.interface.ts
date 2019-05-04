export type ConfirmModalOptions = {
  confirmText?: string
  cancelText?: string
}

export type Modal = {
  message: string
  options?: ConfirmModalOptions
  open: boolean
  resolve: (success: boolean) => void
  id: number
}

export default interface ConfirmModalProps {}

export interface ConfirmModalsState {
  modals: Modal[]
}
