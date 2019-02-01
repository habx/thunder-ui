import { RenderParams } from './ImageUploader/ImageUploader.interface'
import { CloudinaryImage, ImageFile } from './Image/Image.interface'

export default interface CloudinaryInputProps {
  value: string
  disabled?: boolean
  defaultDirectory?: string
  renderImages: (params: RenderParams) => JSX.Element
  onChange: (src: string) => void
  imageFormat: string
  fetchImageConfig: (path: string) => Promise<CloudinaryImage>
  uploadImage: (image: ImageFile, params: { directory: string }) => Promise<CloudinaryImage>
}
