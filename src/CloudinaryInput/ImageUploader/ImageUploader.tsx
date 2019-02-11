import * as React from 'react'
import { map, uniq, get, initial, has } from 'lodash'

import ImageUploaderProps, { ImageUploaderState } from './ImageUploader.interface'
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
  static getDerivedStateFromProps (nextProps, prevState) {
    const { image } = nextProps

    if (image && image.id && image !== prevState.fieldImage) {
      const directory = initial(image.id.split('/').filter(el => el !== '')).join('/')

      return {
        fieldImage: image,
        directory: directory || prevState.directory,
        fetchFieldImagePromise: null
      }
    }

    return null
  }

  state = {
    selectedImage: null as CloudinaryImage,
    fieldImage: null as ACECloudinaryImage,
    fieldImageConfig: null as CloudinaryImage,
    customizedImage: null as ACECloudinaryImage,
    directory: this.props.defaultDirectory || 'cities',
    fetchFieldImagePromise: null,
    images: []
  }

  async componentDidMount () {
    await this.fetchFieldImageConfig(this.state.fieldImage)
  }

  async componentDidUpdate (prevProps, prevState) {
    const { fieldImage } = this.state

    if (fieldImage && fieldImage !== prevState.fieldImage) {
      await this.fetchFieldImageConfig(fieldImage)
    }
  }

  handleImageUpload = async event => {
    const { directory } = this.state
    const { uploadImage } = this.props

    const file = Array.from(event.target.files)[0] as File

    const selectedImage = await uploadImage(file, { directory })

    this.setState({ selectedImage })

    this.props.onStatusChange('customizer')
  }

  handleImageSelect = selectedImage => () => this.setState(prevState => ({
    selectedImage: prevState.selectedImage === selectedImage ? null : selectedImage
  }))

  getImageInOutputFormat = (image: ACECloudinaryImage) => {
    const { format } = this.props

    if (format === 'ace') {
      return image
    }

    if (format === 'id') {
      return image.id
    }

    return createCloudinaryURL(image)
  }

  handleImageChange = (image: ACECloudinaryImage) => {
    const { onChange } = this.props

    this.setState(() => ({ selectedImage: null }))

    const formattedImage = this.getImageInOutputFormat(image)

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
    const { status } = this.props
    const { directory, selectedImage } = this.state

    if (status === 'home') {
      return 'Liste des dossiers'
    }

    if (status === 'directory') {
      return `Dossier : ${directory}`
    }

    if (status === 'uploader') {
      return `Dossier : ${directory} (ajout d'une image)`
    }

    if (status === 'customizer') {
      return `Personnalisation de ${get(selectedImage, 'public_id', 'image inconnue')}`
    }

    return ''
  }

  goTo = (status: string, params = {}) => {
    this.props.onStatusChange(status)
    this.setState(() => params)

    if (status === 'directory') {
      this.setState(() => ({ selectedImage: null }))
    }
  }

  saveImages = images => setTimeout(() => this.setState(() => ({ images })))

  fetchFieldImageConfig = async (image: ACECloudinaryImage) => {
    if (!has(image, 'id')) {
      return null
    }

    const config = await this.props.fetchImageConfig(image.id)

    this.setState(() => ({
      selectedImage: config,
      fieldImageConfig: config
    }))
  }

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

        if (!loading) {
          this.saveImages(data)
        }

        return (
          <ImageList data-loading={loading}>{ content }</ImageList>
        )
      }
    })
  }

  renderCustomizer () {
    const { image } = this.props
    const { selectedImage, fieldImageConfig } = this.state

    const initialTransforms = fieldImageConfig === selectedImage
      ? get(image, 'transforms')
      : null

    return (
      <ImageEditor
        image={selectedImage}
        onChange={this.handleImageCustomizationChange}
        initialTransforms={initialTransforms}
      />
    )
  }

  renderImage = (image: CloudinaryImage): JSX.Element => {
    const { selectedImage } = this.state

    return (
      <ImageContainer key={image.public_id}>
        <Image
          size='thumbnail'
          onClick={this.handleImageSelect(image)}
          id={image.public_id}
          data-fade={selectedImage && image.public_id !== selectedImage.public_id}
        />
      </ImageContainer>
    )
  }

  render () {
    const { status, onClose, format } = this.props
    const { selectedImage } = this.state

    return (
      <ImageUploaderContainer open={status !== 'closed'} onClose={onClose}>
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
                status={status}
              />
              <Content data-status={status}>
                { status === 'home' && this.renderHome() }
                { status === 'directory' && this.renderDirectory() }
                { status === 'customizer' && this.renderCustomizer() }
              </Content>
              { selectedImage && (
                <ActionBar
                  status={status}
                  onSelect={this.handleImageValidationWithoutCustomization}
                  onCustomize={this.handleImageCustomization}
                  onValidateCustomization={this.handleImageValidationWithCustomization}
                  canCustomize={format !== 'id'}
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
