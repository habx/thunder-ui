import * as React from 'react'
import { get } from 'lodash'

import CloudinaryInputProps from './CloudinaryInput.interface'
import { CloudinaryInputContainer, PictureContainer, EmptyImage } from './CloudinaryInput.style'
import { parseCloudinaryURL } from './CloudinaryInput.utils'

import withLabel from '../withLabel'
import Button from '../Button'
import ImageUploader from './ImageUploader'
import Image from './Image'

class CloudinaryInput extends React.PureComponent<CloudinaryInputProps> {
  static getDerivedStateFromProps (nextProps, prevState) {
    const { value, imageFormat } = nextProps

    if (value !== prevState.value) {
      if (imageFormat === 'ace') {
        return {
          value,
          image: value
        }
      }

      if (imageFormat === 'id') {
        return {
          value,
          image: {
            id: value,
            transforms: []
          }
        }
      }
      return {
        value,
        image: parseCloudinaryURL(value)
      }
    }

    return null
  }

  static defaultProps = {
    imageFormat: 'ace'
  }

  state = {
    value: null,
    image: null,
    isUploaderOpen: false
  }

  handleUploaderOpen = () => this.setState(() => ({ isUploaderOpen: true }))

  handleUploaderClose = () => this.setState(() => ({ isUploaderOpen: false }))

  handleChange = image => {
    this.props.onChange(image)
    this.handleUploaderClose()
  }

  render () {
    const {
      disabled,
      renderImages,
      defaultDirectory,
      imageFormat,
      fetchImageConfig,
      uploadImage
    } = this.props

    const { isUploaderOpen, image } = this.state

    const hasImage = image && image.id

    return (
      <CloudinaryInputContainer>
        {
          hasImage
            ? (
              <PictureContainer>
                <Image
                  size='full'
                  id={get(image, 'id')}
                  transforms={get(image, 'transforms')}
                />
              </PictureContainer>
            ) : (
              <EmptyImage />
            )
        }
        <Button onClick={this.handleUploaderOpen} disabled={disabled}>
          { hasImage ? 'Éditer / Changer d\'image' : 'Choisir une image'}
        </Button>
        <ImageUploader
          open={isUploaderOpen}
          onClose={this.handleUploaderClose}
          onChange={this.handleChange}
          defaultDirectory={defaultDirectory}
          renderImages={renderImages}
          format={imageFormat}
          image={image}
          fetchImageConfig={fetchImageConfig}
          uploadImage={uploadImage}
        />
      </CloudinaryInputContainer>
    )
  }
}

export default withLabel({ padding: 12 })(CloudinaryInput)
