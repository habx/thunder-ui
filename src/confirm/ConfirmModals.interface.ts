export type Modal = { message: string, options?: object }

export type ConfirmModalOptions = {
  confirmText?: string,
  cancelText?: string
}

export default interface ConfirmModalProps {}

export interface ConfirmModalsState {
  modals: Modal[]
}
