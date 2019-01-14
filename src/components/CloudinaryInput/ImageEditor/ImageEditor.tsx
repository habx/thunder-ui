import * as React from 'react'
import ReactCrop from 'react-image-crop'
import { memoize } from 'lodash'

import 'react-image-crop/dist/ReactCrop.css'

import FontIcon from '../../FontIcon'
import Image from '../Image'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

import { ImageEditorContainer, ImageContainer, OptionsContainer } from './ImageEditor.style'
import ImageEditorProps, { ImageEditorState, CropConfiguration } from './ImageEditor.interface'

class ImageEditor extends React.PureComponent<ImageEditorProps, ImageEditorState> {
  state = {
    currentAction: null,
    crop: null,
    transformations: {}
  }

  setAction = memoize(action => () => this.setState(prevState => ({
    currentAction: prevState.currentAction === action ? null : action
  })))

  updateTransformations (transformationType, value) {
    this.setState(prevState => ({
      transformations: {
        ...prevState.transformations,
        [transformationType]: value
      }
    }), this.handleChange)
  }

  handleCropChange = (crop: CropConfiguration) => {
    this.setState(() => ({ crop }))

    const { width, height, x, y } = crop
    const transformation = {
      crop: 'crop',
      width: width / 100,
      height: height / 100,
      x: x / 100,
      y: y / 100
    }

    this.updateTransformations('crop', transformation)
  }

  handleChange = () => {
    const { image, onChange } = this.props
    const { transformations } = this.state

    onChange({
      id: image.public_id,
      transforms: Object.values(transformations)
    })
  }

  renderImage () {
    const { image } = this.props
    const { currentAction, crop } = this.state

    if (currentAction === 'crop') {
      return (
        <ReactCrop
          src={createCloudinaryURL({ id: image.public_id })}
          onChange={this.handleCropChange}
          crop={crop}
        />
      )
    }

    return <Image data={image} size='full' />
  }

  render () {
    const { currentAction } = this.state

    return (
      <ImageEditorContainer>
        <ImageContainer>
          { this.renderImage() }
        </ImageContainer>
        <OptionsContainer>
          <FontIcon
            icon='crop'
            onClick={this.setAction('crop')}
            data-active={currentAction === 'crop'}
          />
        </OptionsContainer>
      </ImageEditorContainer>
    )
  }
}

export default ImageEditor
