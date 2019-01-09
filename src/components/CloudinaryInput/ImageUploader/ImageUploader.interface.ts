import ModalProps from '../../Modal/Modal.interface'

export interface RenderParams {
  directory: string
  renderImage: (image: CloudinaryImage) => JSX.Element
}

export interface CloudinaryImage {
  secure_url: string
}

export default interface ImageUploaderProps extends ModalProps {
  directory: string
  renderImages: (RenderParams) => JSX.Element
}

export default interface ImageUploaderState {
  selectedImage?: CloudinaryImage
}
