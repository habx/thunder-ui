import * as React from 'react'

import ImageProps, { CloudinaryImage } from './Image.interface'

const buildURL = ({ public_id, version }: CloudinaryImage, { size }) => {
  const transforms = size === 'thumbnail' ? 'c_limit,w_300' : ''
  return `//res.cloudinary.com/habx/image/upload/${transforms}/v${version}/${public_id}`
}

const Image: React.StatelessComponent<ImageProps> = ({ data, size, ...props }) => (
  <img
    src={buildURL(data, { size })}
    {...props}
  />
)

export default Image
