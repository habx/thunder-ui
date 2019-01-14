import * as React from 'react'

import ImageProps, { CloudinaryImage } from './Image.interface'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

export const buildURL = (image: CloudinaryImage, { size }) => {
  const transforms = size === 'thumbnail' ? [{ crop: 'limit', width: 300 }] : []

  return createCloudinaryURL({ id: image.public_id, transforms })
}

const Image: React.StatelessComponent<ImageProps> = ({ data, size, ...props }) => (
  <img
    src={buildURL(data, { size })}
    alt='Cloudinary image'
    {...props}
  />
)

export default Image
