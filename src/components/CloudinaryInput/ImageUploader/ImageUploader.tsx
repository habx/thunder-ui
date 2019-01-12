import * as React from 'react'
import { map, uniq } from 'lodash'

import ImageUploaderProps, { ImageUploaderState, RenderParams } from './ImageUploader.interface'
import { CloudinaryImage } from '../Image/Image.interface'

import {
  ImageUploaderContainer,
  Content,
  ImageContainer,
  ImageList,
  Directories,
  Directory,
  DirectoryContent,
  CustomizerContainer
} from './ImageUploader.style'

import ActionBar from './ActionBar'
import Image from '../Image'
import Header from '../Header'
import FontIcon from '../../FontIcon'

class ImageUploader extends React.PureComponent<ImageUploaderProps, ImageUploaderState> {
  state = {
    selectedImage: null as CloudinaryImage,
    page: 'directory',
    directory: this.props.defaultDirectory || 'logos'
  }

  handleImageSelect = selectedImage => () => this.setState(prevState => ({
    selectedImage: prevState.selectedImage === selectedImage ? null : selectedImage
  }))

  handleImageValidation = () => {
    const { onChange } = this.props
    const { selectedImage } = this.state

    this.setState(() => ({ selectedImage: null }))

    onChange(selectedImage)
  }

  handleImageCustomization = () => {
    this.goTo('customizer')
  }

  getDirectories = () => uniq([
    this.props.defaultDirectory,
    'logos',
    'cities',
    'regions'
  ])

  getCurrentTitle () {
    const { page, directory, selectedImage } = this.state

    if (page === 'home') {
      return 'Liste des dossiers'
    }

    if (page === 'directory') {
      return `Dossier : ${directory}`
    }

    if (page === 'uploader') {
      return `Dossier : ${directory} (ajout d'une image)`
    }

    if (page === 'customizer') {
      return `Personnalisation de ${selectedImage.public_id}`
    }

    return ''
  }

  goTo = (page: string, params = {}) => this.setState(() => ({ page, ...params }))

  renderHome () {
    return (
      <Directories>
        {map(
          this.getDirectories(),
          directory => (
            <Directory key={directory} onClick={() => this.goTo('directory', { directory })}>
              <FontIcon icon='folder' />
              <DirectoryContent>
                { directory }
              </DirectoryContent>
            </Directory>
          )
        )}
      </Directories>
    )
  }

  renderDirectory () {
    const { renderImages } = this.props
    const { directory } = this.state

    const params: RenderParams = {
      directory,
      renderImage: this.renderImage
    }

    return (
      <ImageList>
        { renderImages(params) }
      </ImageList>
    )
  }

  renderCustomizer () {
    const { selectedImage } = this.state

    const sizeRatio = selectedImage.height / selectedImage.width

    return (
      <CustomizerContainer>
        <Image data={selectedImage} size='full' />
      </CustomizerContainer>
    )
  }

  renderImage = (image: CloudinaryImage): JSX.Element => {
    const { selectedImage } = this.state

    return (
      <ImageContainer key={image.public_id}>
        <Image
          size='thumbnail'
          onClick={this.handleImageSelect(image)}
          data={image}
          data-fade={selectedImage && image !== selectedImage}
        />
      </ImageContainer>
    )
  }

  render () {
    const { open, onClose } = this.props
    const { page, selectedImage } = this.state

    return (
      <ImageUploaderContainer open={open} onClose={onClose}>
        {({ state }) => {
          if (state === 'closed') {
            return null
          }

          return (
            <React.Fragment>
              <Header goTo={this.goTo} title={this.getCurrentTitle()} />
              <Content data-page={page}>
                { page === 'home' && this.renderHome() }
                { page === 'directory' && this.renderDirectory() }
                { page === 'customizer' && this.renderCustomizer() }
              </Content>
              { selectedImage && (
                <ActionBar
                  page={page}
                  onSelect={this.handleImageValidation}
                  onCustomize={this.handleImageCustomization}
                />
              )}
            </React.Fragment>
          )
        }}
      </ImageUploaderContainer>
    )
  }
}

export default ImageUploader
