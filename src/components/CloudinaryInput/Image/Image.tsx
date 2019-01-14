import * as React from 'react'

import ImageProps, { CloudinaryImage } from './Image.interface'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

export const buildURL = (image: CloudinaryImage, { size, transforms = [] }) => createCloudinaryURL({
  id: image.public_id,
  transforms: [
    ...transforms,
    ...size === 'thumbnail' ? [{ crop: 'limit', width: 300 }] : []
  ]
})

const Image: React.StatelessComponent<ImageProps> = ({ data, size, transforms, ...props }) => (
  <img
    src={buildURL(data, { size, transforms })}
    alt='Cloudinary image'
    {...props}
  />
)

export default Image
