import * as React from 'react'
import { get } from 'lodash'

import CloudinaryInputProps from './CloudinaryInput.interface'
import { CloudinaryInputContainer, PictureContainer } from './CloudinaryInput.style'
import { parseCloudinaryURL } from './CloudinaryInput.utils'

import Button from '../Button'
import ImageUploader from './ImageUploader'
import Image from './Image'

class CloudinaryInput extends React.PureComponent<CloudinaryInputProps> {
  static getDerivedStateFromProps (nextProps, prevState) {
    const { value, format } = nextProps

    if (value !== prevState.value) {
      return {
        value,
        image: format === 'ace' || !value
          ? value
          : parseCloudinaryURL(value)
      }
    }

    return null
  }

  static defaultProps = {
    format: 'ace'
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
    const { disabled, renderImages, defaultDirectory, format, fetchImageConfig } = this.props
    const { isUploaderOpen, image } = this.state

    return (
      <CloudinaryInputContainer>
        {
          image && (
            <PictureContainer>
              <Image
                size='full'
                id={get(image, 'id')}
                transforms={get(image, 'transforms')}
              />
            </PictureContainer>
          )
        }
        {
          !disabled && (
            <Button onClick={this.handleUploaderOpen}>Editer</Button>
          )
        }
        <ImageUploader
          open={isUploaderOpen}
          onClose={this.handleUploaderClose}
          onChange={this.handleChange}
          defaultDirectory={defaultDirectory}
          renderImages={renderImages}
          format={format}
          image={image}
          fetchImageConfig={fetchImageConfig}
        />
      </CloudinaryInputContainer>
    )
  }
}

export default CloudinaryInput
