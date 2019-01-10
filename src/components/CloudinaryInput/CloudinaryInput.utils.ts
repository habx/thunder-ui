import { map, join } from 'lodash'

const CLOUDINARY_IMAGE_ROOT = `//res.cloudinary.com/habx/image/upload`

const PARAM_TABLE = {
  crop: {
    key: 'c'
  },
  width: {
    key: 'w'
  },
  height: {
    key: 'h'
  },
  quality: {
    key: 'q'
  },
  fetch_format: {
    key: 'f'
  },
  flags: {
    key: 'fl'
  },
  effect: {
    key: 'e'
  },
  color: {
    key: 'co',
    process: value => `rgb:${value.substr(1)}`
  },
  opacity: {
    key: 'o'
  }
}

const transformToString = transforms => {
  const parsedTransforms = map(transforms, transform => {
    const params = map(transform, (paramValue, paramName) => {
      const config = PARAM_TABLE[paramName]

      if (!config) {
        console.warn(`Cloudinary : unknow param ${paramName}`)
        return ''
      }

      const { key } = config

      return `${key}_${
        config.process ? config.process(paramValue) : paramValue
        }`
    })

    return join(params, ',')
  })

  return join(parsedTransforms, '/')
}

export const createCloudinaryURL = (image, transforms = []) => {
  const transformsString = transformToString(transforms)

  return `${CLOUDINARY_IMAGE_ROOT}/${transformsString}/${image.public_id}`
}
