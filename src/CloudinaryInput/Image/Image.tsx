import * as React from 'react'

import ImageProps from './Image.interface'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

export const buildURL = (id, { size, transforms = [] }) => createCloudinaryURL({
  id,
  transforms: [
    ...transforms,
    ...size === 'thumbnail' ? [{ crop: 'limit', width: 300 }] : []
  ]
})

const Image: React.StatelessComponent<ImageProps> = ({ id, size, transforms, ...props }) => (
  <img
    src={buildURL(id, { size, transforms })}
    alt='Cloudinary image'
    {...props}
  />
)

export default Image
