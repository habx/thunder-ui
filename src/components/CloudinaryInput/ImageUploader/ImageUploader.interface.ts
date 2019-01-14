import ModalProps from '../../Modal/Modal.interface'
import { CloudinaryImage, ACECloudinaryImage } from '../Image/Image.interface'

export interface RenderParams {
  directory: string
  renderImage: (image: CloudinaryImage) => JSX.Element
}

export interface ImageUploaderState {
  selectedImage?: CloudinaryImage
  customizedImage?: ACECloudinaryImage
  directory: string
  page: string,
}

export default interface ImageUploaderProps extends ModalProps {
  defaultDirectory?: string
  renderImages: (RenderParams) => JSX.Element
  onChange: (image: ACECloudinaryImage | string) => void
  format: 'ace' | 'src'
}

export interface ActionBarProps {
  page: string
  onSelect: () => void
  onCustomize: () => void
  onValidateCustomization: () => void
}
