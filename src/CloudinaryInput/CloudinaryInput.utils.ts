import { map, isEmpty, join, isString, filter, reduce, findLastIndex, entries } from 'lodash'

import { ACECloudinaryImage } from './Image/Image.interface'

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
  },
  aspect_ratio: {
    key: 'ar'
  },
  x: {
    key: 'x'
  },
  y: {
    key: 'y'
  }
}

const DEFAULT_IMAGE = {
  id: '',
  transforms: []
}

const transformToString = transforms => {
  const parsedTransforms = map(transforms, transform => {
    const params = map(transform, (paramValue, paramName) => {
      const config = PARAM_TABLE[paramName]

      if (!config) {
        // console.warn(`Cloudinary : unknow param ${paramName}`)
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

export const createCloudinaryURL = (image: ACECloudinaryImage) => {
  const transformsString = transformToString(image.transforms)
  const chunks = [CLOUDINARY_IMAGE_ROOT, transformsString, image.id]

  return reduce(chunks, (acc, el) => {
    const needSlash = !acc.endsWith('/') && !el.startsWith('/')

    return `${acc}${needSlash ? '/' : ''}${el}`
  }, '')
}

const getTransformFromChunk = (chunk: string) => reduce(
  chunk.split(','),
  (acc, rawTransform) => {
    if (isEmpty(rawTransform) || !rawTransform.includes('_')) {
      return acc
    }

    const [key, value] = rawTransform.split('_')

    const transform = entries(PARAM_TABLE).find(el => el[1].key === key)

    if (!transform) {
      return acc
    }

    return {
      ...acc,
      [transform[0]]: value
    }
  },
  {}
)

const getTransformsFromChunks = (chunks: string[]) => {
  const transforms = map(chunks, getTransformFromChunk)

  return filter(transforms, el => !isEmpty(el))
}

const getIdFromChunks = (chunks: string[]) => {
  const index = findLastIndex(chunks, el => {
    const isVersion = !!el.match(/^v([0-9]+)$/)
    const isTransform = !isEmpty(getTransformFromChunk(el))
    const isUpload = el === 'upload'

    return isVersion || isTransform || isUpload
  })

  return chunks.slice(index + 1).join('/').split('.')[0]
}

export const parseCloudinaryURL = (src: string = '') => {
  if (!isString(src) || src.includes('via.placeholder.com')) {
    return DEFAULT_IMAGE
  }

  const chunks = src.split('/')

  if (isEmpty(chunks)) {
    return DEFAULT_IMAGE
  }

  return {
    id: getIdFromChunks(chunks),
    transforms: getTransformsFromChunks(chunks)
  }
}
