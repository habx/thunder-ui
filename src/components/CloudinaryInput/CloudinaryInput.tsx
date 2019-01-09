import * as React from 'react'
import { isString } from 'lodash'

import CloudinaryInputProps from './CloudinaryInput.interface'
import { CloudinaryInputContainer, Picture } from './CloudinaryInput.style'

import Button from '../Button'

class CloudinaryInput extends React.PureComponent<CloudinaryInputProps> {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.value !== prevState.value && isString(nextProps.value)) {
      return {
        src: nextProps.value
      }
    }
  }

  state = {
    src: null
  }

  render () {
    const { disabled, defaultDirectory } = this.props
    const { src } = this.state

    return (
      <CloudinaryInputContainer>
        {
          src && <Picture src={src} />
        }
        {
          !disabled && (
            <Button>Edit</Button>
          )
        }
        <ImageUploader />
      </CloudinaryInputContainer>
    )
  }
}

export default CloudinaryInput
