import * as React from 'react'
import { isString } from 'lodash'

import CloudinaryInputProps from './CloudinaryInput.interface'
import { CloudinaryInputContainer, Picture } from './CloudinaryInput.style'

import Button from '../Button'
import ImageUploader from './ImageUploader'

class CloudinaryInput extends React.PureComponent<CloudinaryInputProps> {
  static getDerivedStateFromProps (nextProps, prevState) {
    const { value } = nextProps

    if (value !== prevState.value && isString(value)) {
      return { src: value }
    }

    return null
  }

  state = {
    src: null,
    isUploaderOpen: false
  }

  handleUploaderOpen = () => this.setState(() => ({ isUploaderOpen: true }))

  handleUploaderClose = () => this.setState(() => ({ isUploaderOpen: false }))

  render () {
    const { disabled, renderImages, defaultDirectory, onChange } = this.props
    const { src, isUploaderOpen } = this.state

    return (
      <CloudinaryInputContainer>
        {
          src && <Picture src={src} />
        }
        {
          !disabled && (
            <Button onClick={this.handleUploaderOpen}>Editer</Button>
          )
        }
        <ImageUploader
          open={isUploaderOpen}
          onClose={this.handleUploaderClose}
          defaultDirectory={defaultDirectory}
          renderImages={renderImages}
          onChange={onChange}
        />
      </CloudinaryInputContainer>
    )
  }
}

export default CloudinaryInput
