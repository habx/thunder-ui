import DomInterface from '../../../internal/domInterface'

export interface CloudinaryImage {
  secure_url: string
  public_id: string
  version: number
}

export default interface ImageProps extends DomInterface {
  data: CloudinaryImage
  size: 'thumbnail' | 'full'
}
