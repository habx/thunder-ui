import DomInterface from '../../_internal/domInterface'

export type CloudinaryImage = {
  secure_url: string
  public_id: string
  version: number,
  height: number,
  width: number
}

export type ACECloudinaryImage = {
  id: string
  transforms?: object[]
}

export type ImageFile = {
  type: string
  size: number
}

export default interface ImageProps extends DomInterface {
  id: string
  size: 'thumbnail' | 'full'
  transforms?: object[]
}
