import ModalProps from '../Modal/Modal.interface'

import {
  ItemRegistrationData,
  data,
} from './SpotlightContent/SpotlightContent.interface'

export default interface SpotlightProps extends ModalProps {
  data?: data
  open?: boolean
  onClose?: () => void
  onOpen?: () => void
  onFetchData?: ({ query }: { query: string }) => void
  placeholder?: string
}

export interface SpotlightContextProps {
  query: string
  data: data
  selectedItemKey: number
  registerItem: (sectionName: string, item: ItemRegistrationData) => void
  unRegisterItem: (sectionName: string, itemKey: number) => void
  close: () => void
}
