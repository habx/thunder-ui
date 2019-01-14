import * as React from 'react'
import { map, uniq } from 'lodash'

import ImageUploaderProps, { ImageUploaderState, RenderParams } from './ImageUploader.interface'
import { CloudinaryImage, ACECloudinaryImage } from '../Image/Image.interface'
import { createCloudinaryURL } from '../CloudinaryInput.utils'

import {
  ImageUploaderContainer,
  Content,
  ImageContainer,
  ImageList,
  Directories,
  Directory,
  DirectoryContent
} from './ImageUploader.style'

import ActionBar from './ActionBar'
import Image from '../Image'
import ImageEditor from '../ImageEditor'
import Header from '../Header'
import FontIcon from '../../FontIcon'
import Spinner from '../../Spinner'

class ImageUploader extends React.PureComponent<ImageUploaderProps, ImageUploaderState> {
  state = {
    selectedImage: null as CloudinaryImage,
    page: 'directory',
    directory: this.props.defaultDirectory || 'logos',
    customizedImage: null as ACECloudinaryImage
  }

  handleImageUpload (event) {
    console.log(Array.from(event.target.files))
  }

  handleImageSelect = selectedImage => () => this.setState(prevState => ({
    selectedImage: prevState.selectedImage === selectedImage ? null : selectedImage
  }))

  handleImageChange = (image: ACECloudinaryImage) => {
    const { onChange, format } = this.props

    this.setState(() => ({ selectedImage: null, page: 'directory' }))

    const formattedImage = format === 'ace' ? image : createCloudinaryURL(image)

    onChange(formattedImage)
  }

  handleImageValidationWithoutCustomization = () => {
    const { selectedImage } = this.state

    this.handleImageChange({ id: selectedImage.public_id, transforms: [] })
  }

  handleImageValidationWithCustomization = () => {
    const { customizedImage } = this.state

    this.handleImageChange(customizedImage)
  }

  handleImageCustomization = () => {
    this.goTo('customizer')
  }

  handleImageCustomizationChange = customizedImage => this.setState(() => ({ customizedImage }))

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
            <Directory
              key={directory}
              onClick={() => this.goTo('directory', { directory })}
            >
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

    return renderImages({
      directory,
      render: ({ loading, data }) => {
        const content = loading
         ? <Spinner />
         : map(data, this.renderImage)

        return (
          <ImageList data-loading={loading}>{ content }</ImageList>
        )
      }
    })
  }

  renderCustomizer () {
    const { selectedImage } = this.state

    return <ImageEditor image={selectedImage} onChange={this.handleImageCustomizationChange} />
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
              <Header
                goTo={this.goTo}
                title={this.getCurrentTitle()}
                onUploadImages={this.handleImageUpload}
              />
              <Content data-page={page}>
                { page === 'home' && this.renderHome() }
                { page === 'directory' && this.renderDirectory() }
                { page === 'customizer' && this.renderCustomizer() }
              </Content>
              { selectedImage && (
                <ActionBar
                  page={page}
                  onSelect={this.handleImageValidationWithoutCustomization}
                  onCustomize={this.handleImageCustomization}
                  onValidateCustomization={this.handleImageValidationWithCustomization}
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
