import * as React from 'react'
import { memoize, filter, floor, get } from 'lodash'

import FontIcon from '../../FontIcon'
import Image from '../Image'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

import {
  ImageEditorContainer,
  ImageContainer,
  OptionsContainer,
  OptionContainer,
  OptionContent,
  Slider,
  ImageCroper
} from './ImageEditor.style'
import ImageEditorProps, { ImageEditorState, CropConfiguration } from './ImageEditor.interface'

const getDefaultTransformations = () => ({
  crop: null,
  dimensions: { width: 1000, crop: 'scale' }
})

class ImageEditor extends React.PureComponent<ImageEditorProps, ImageEditorState> {
  state = {
    currentAction: null,
    crop: null,
    transformations: getDefaultTransformations()
  }

  componentDidMount () {
    this.handleChange()
  }

  setAction = memoize(action => () => this.setState(() => ({
    currentAction: action
  })))

  validateAction = () => {
    this.setState(() => ({ currentAction: null }), this.handleChange)
  }

  updateTransformations (transformationType, value) {
    this.setState(prevState => ({
      transformations: {
        ...prevState.transformations,
        [transformationType]: value
      }
    }))
  }

  handleCropChange = (crop: CropConfiguration) => {
    this.setState(() => ({ crop }))

    const { width, height, x, y } = crop

    const isValidCrop = (width !== 100 || height !== 100) && (width !== 0 || height !== 0)

    if (!isValidCrop) {
      return this.updateTransformations('crop', null)
    }

    const transformation = {
      crop: 'crop',
      width: width / 100,
      height: height / 100,
      x: x / 100,
      y: y / 100
    }

    return this.updateTransformations('crop', transformation)
  }

  handleDimensionsChange = width => this.updateTransformations(
    'dimensions',
    { crop: 'scale', width }
    )

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
    const { currentAction, crop, transformations } = this.state

    const transformationsToApply = filter(transformations, (value, key) => key !== currentAction)

    if (currentAction === 'crop') {
      return (
        <ImageCroper
          src={createCloudinaryURL({ id: image.public_id, transforms: transformationsToApply })}
          onChange={this.handleCropChange}
          crop={crop}
        />
      )
    }

    return <Image id={image.public_id} size='full' transforms={transformationsToApply} />
  }

  renderDimensionSlider () {
    const { image } = this.props
    const { transformations } = this.state

    const maxWidth = floor(image.width * get(transformations, 'crop.width', 1))
    const value = get(transformations, 'dimensions.width', 1000)

    return (
      <Slider
        value={value}
        max={maxWidth}
        onChange={this.handleDimensionsChange}
      />
    )
  }

  render () {
    const { currentAction } = this.state

    return (
      <ImageEditorContainer>
        <ImageContainer>
          { this.renderImage() }
        </ImageContainer>
        {
          !currentAction && (
            <OptionsContainer>
              <FontIcon
                icon='crop'
                onClick={this.setAction('crop')}
                title='Croper'
              />
              <FontIcon
                icon='photo_size_select_large'
                onClick={this.setAction('dimensions')}
                title='Choisir les dimensions'
              />
            </OptionsContainer>
          )
        }
        {
          currentAction && (
            <OptionContainer>
              <OptionContent>
                { currentAction === 'crop' && 'Sélectionnez la zone à garder' }
                { currentAction === 'dimensions' && this.renderDimensionSlider()}
              </OptionContent>
              <FontIcon
                icon='done'
                onClick={this.validateAction}
              />
            </OptionContainer>
          )
        }
      </ImageEditorContainer>
    )

  }
}

export default ImageEditor
