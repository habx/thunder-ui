import * as React from 'react'

import ImageProps, { CloudinaryImage } from './Image.interface'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

const buildURL = (image: CloudinaryImage, { size }) => {
  const transforms = size === 'thumbnail' ? [{ crop: 'limit', width: 300 }] : []

  return createCloudinaryURL(image, transforms)
}

const Image: React.StatelessComponent<ImageProps> = ({ data, size, ...props }) => (
  <img
    src={buildURL(data, { size })}
    {...props}
  />
)

export default Image
