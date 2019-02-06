import { CloudinaryImage, ACECloudinaryImage, ImageFile } from '../Image/Image.interface'

export type RenderParams = {
  directory: string
  renderImage: (image: CloudinaryImage) => JSX.Element
}

export interface ImageUploaderState {
  selectedImage?: CloudinaryImage
  customizedImage?: ACECloudinaryImage
  directory: string
  fieldImage: ACECloudinaryImage
  fieldImageConfig?: CloudinaryImage
  fetchFieldImagePromise: Promise<CloudinaryImage>
  images: CloudinaryImage[]
}

export default interface ImageUploaderProps {
  status: string
  defaultDirectory?: string
  renderImages: (RenderParams) => JSX.Element
  onChange: (image: ACECloudinaryImage | string) => void
  onStatusChange: (status: string) => void
  format: string
  image: ACECloudinaryImage
  fetchImageConfig: (path: string) => Promise<CloudinaryImage>
  uploadImage: (image: ImageFile, params: { directory: string }) => Promise<CloudinaryImage>
  onClose: () => void
}

export interface ActionBarProps {
  status: string
  onSelect: () => void
  onCustomize: () => void
  onValidateCustomization: () => void
  canCustomize: boolean
}
