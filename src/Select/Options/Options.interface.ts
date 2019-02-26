export type Option = {
  label: string
  value: any
}

export default interface Options {
  options: Option[]
  open: boolean
  compact: boolean
  description?: string
  annotation?: string
  focusedItem?: any
  multi: boolean
  isOptionSelected: (option: Option) => boolean
  onSelect: (option: Option) => void
  onSelectAll: (value: boolean) => void
  canSelectAll: boolean
  selectAllLabel?: string
  allSelected: boolean
  isMobile: boolean
  onClose: () => void
}
