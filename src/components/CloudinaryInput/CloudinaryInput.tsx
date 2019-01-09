import * as React from 'react'
import { isString } from 'lodash'

import CloudinaryInputProps from './CloudinaryInput.interface'
import { CloudinaryInputContainer, Picture } from './CloudinaryInput.style'

import Button from '../Button'
import ImageUploader from './ImageUploader'

class CloudinaryInput extends React.PureComponent<CloudinaryInputProps> {
  static getDerivedStateFromProps (nextProps, prevState) {
    const { value, defaultDirectory } = nextProps
    return {
      ...(value !== prevState.value && isString(value) && { src: value }),
      ...(defaultDirectory !== prevState.defaultDirectory && isString(defaultDirectory) && {
        defaultDirectory,
        directory: defaultDirectory
      })
    }
  }

  state = {
    src: null,
    isUploaderOpen: false,
    directory: '',
    defaultDirectory: ''
  }

  handleUploaderOpen = () => this.setState(() => ({ isUploaderOpen: true }))

  handleUploaderClose = () => this.setState(() => ({ isUploaderOpen: false }))

  render () {
    const { disabled, renderImages } = this.props
    const { src, isUploaderOpen, directory } = this.state

    return (
      <CloudinaryInputContainer>
        {
          src && <Picture src={src} />
        }
        {
          !disabled && (
            <Button onClick={this.handleUploaderOpen}>Edit</Button>
          )
        }
        <ImageUploader
          open={isUploaderOpen}
          onClose={this.handleUploaderClose}
          directory={directory}
          renderImages={renderImages}
        />
      </CloudinaryInputContainer>
    )
  }
}

export default CloudinaryInput
