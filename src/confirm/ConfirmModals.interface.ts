export type ConfirmModalOptions = {
  confirmText?: string
  cancelText?: string
}

export type StateModal = {
  message: string
  options?: ConfirmModalOptions
  open: boolean
  resolve: (success: boolean) => void
  id: number
}
