import ModalProps from '../../Modal/Modal.interface'
import { CloudinaryImage } from '../Image/Image.interface'

export interface RenderParams {
  directory: string
  renderImage: (image: CloudinaryImage) => JSX.Element
}

export interface ImageUploaderState {
  selectedImage?: CloudinaryImage
  directory: string
  page: string
}

export default interface ImageUploaderProps extends ModalProps {
  defaultDirectory?: string
  renderImages: (RenderParams) => JSX.Element
}

export interface HeaderProps {
  goTo: (page: string) => void
}
