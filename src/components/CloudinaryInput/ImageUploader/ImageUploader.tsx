import * as React from 'react'

import ImageUploaderProps, { ImageUploaderState, RenderParams, CloudinaryImage } from './ImageUploader.interface'

import { ImageUploaderContainer, ImageContainer, ImageList } from './ImageUploader.style'

import Header from './Header'

class ImageUploader extends React.PureComponent<ImageUploaderProps, ImageUploaderState> {
  state = {
    selectedImage: null as CloudinaryImage
  }

  handleImageSelect = selectedImage => () => this.setState(prevState => ({
    selectedImage: prevState.selectedImage === selectedImage ? null : selectedImage
  }))

  renderImage = (image: CloudinaryImage): JSX.Element => {
    const { selectedImage } = this.state

    return (
      <ImageContainer>
        <img
          onClick={this.handleImageSelect(image)}
          src={image.secure_url}
          data-fade={selectedImage && image !== selectedImage}
        />
      </ImageContainer>
    )
  }

  render () {
    const { open, onClose, renderImages, directory } = this.props

    return (
      <ImageUploaderContainer open={open} onClose={onClose}>
        {({ state }) => {
          if (state === 'closed') {
            return null
          }

          const params: RenderParams = {
            directory,
            renderImage: this.renderImage
          }

          return (
            <React.Fragment>
              <Header />
              <ImageList>
                { renderImages(params) }
              </ImageList>
            </React.Fragment>
          )
        }}
      </ImageUploaderContainer>
    )
  }
}

export default ImageUploader
