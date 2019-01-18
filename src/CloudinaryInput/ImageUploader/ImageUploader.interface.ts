import ModalProps from '../../Modal/Modal.interface'
import { CloudinaryImage, ACECloudinaryImage, ImageFile } from '../Image/Image.interface'

export interface RenderParams {
  directory: string
  renderImage: (image: CloudinaryImage) => JSX.Element
}

export interface ImageUploaderState {
  selectedImage?: CloudinaryImage
  customizedImage?: ACECloudinaryImage
  directory: string
  page: string,
  fieldImage: ACECloudinaryImage
  fieldImageConfig?: CloudinaryImage
  fetchFieldImagePromise: Promise<CloudinaryImage>
  images: CloudinaryImage[]
}

export default interface ImageUploaderProps extends ModalProps {
  defaultDirectory?: string
  renderImages: (RenderParams) => JSX.Element
  onChange: (image: ACECloudinaryImage | string) => void
  format: 'ace' | 'src'
  image: ACECloudinaryImage
  fetchImageConfig: (path: string) => Promise<CloudinaryImage>
  uploadImage: (image: ImageFile, params: { directory: string }) => Promise<CloudinaryImage>
}

export interface ActionBarProps {
  page: string
  onSelect: () => void
  onCustomize: () => void
  onValidateCustomization: () => void
}
