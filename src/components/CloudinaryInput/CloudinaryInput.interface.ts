import { RenderParams } from './ImageUploader/ImageUploader.interface'

export default interface CloudinaryInputProps {
  value: string
  disabled?: boolean
  defaultDirectory?: string
  renderImages: (RenderParams) => JSX.Element
  onChange: (src: string) => void
}
