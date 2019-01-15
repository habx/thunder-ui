import { RenderParams } from './ImageUploader/ImageUploader.interface'
import {CloudinaryImage} from './Image/Image.interface'

export default interface CloudinaryInputProps {
  value: string
  disabled?: boolean
  defaultDirectory?: string
  renderImages: (params: RenderParams) => JSX.Element
  onChange: (src: string) => void
  format: 'ace' | 'src'
  fetchImageConfig: (path: string) => Promise<CloudinaryImage>
}
