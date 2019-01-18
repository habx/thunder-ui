import { ACECloudinaryImage, CloudinaryImage } from '../Image/Image.interface'

export interface CropConfiguration {
  x: number
  y: number
  width: number
  height: number
}

export default interface ImageEditorProps {
  image: CloudinaryImage
  onChange: (image: ACECloudinaryImage) => void
  initialTransforms: object[]

}

export interface ImageEditorState {
  currentAction: 'crop' | null,
  crop?: CropConfiguration,
  transformations: {
    crop: object
    dimensions: object
  }
}
