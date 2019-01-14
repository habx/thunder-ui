import * as React from 'react'
import ReactCrop from 'react-image-crop'
import { memoize, filter, floor, get } from 'lodash'

import 'react-image-crop/dist/ReactCrop.css'

import FontIcon from '../../FontIcon'
import Image from '../Image'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

import { ImageEditorContainer, ImageContainer, OptionsContainer, OptionContainer, OptionContent, Slider } from './ImageEditor.style'
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

    if (width === 100 && height === 100) {
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
        <ReactCrop
          src={createCloudinaryURL({ id: image.public_id, transforms: transformationsToApply })}
          onChange={this.handleCropChange}
          crop={crop}
        />
      )
    }

    return <Image data={image} size='full' transforms={transformationsToApply} />
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
              <FontIcon
                icon='arrow_back'
                onClick={this.setAction(null)}
              />
              <OptionContent>
                { currentAction === 'crop' && 'Sélectionnez la zone à garder' }
                { currentAction === 'dimensions' && this.renderDimensionSlider()}
              </OptionContent>
            </OptionContainer>
          )
        }
      </ImageEditorContainer>
    )

  }
}

export default ImageEditor
