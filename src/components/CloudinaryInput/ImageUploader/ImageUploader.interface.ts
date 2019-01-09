import ModalProps from '../../Modal/Modal.interface'

export interface RenderParams {
  directory: string
  renderImage: (image: CloudinaryImage) => JSX.Element
}

export interface CloudinaryImage {
  secure_url: string
  public_id: string
  version: number
}

export interface ImageUploaderState {
  selectedImage?: CloudinaryImage
}

export default interface ImageUploaderProps extends ModalProps {
  directory: string
  renderImages: (RenderParams) => JSX.Element
}
