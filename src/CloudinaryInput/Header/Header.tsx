import * as React from 'react'

import { HeaderContainer, Title, Uploader } from './Header.style'
import HeaderProps from './Header.interface'

import FontIcon from '../../FontIcon'

const Header: React.StatelessComponent<HeaderProps> = ({ goTo, onUploadImages, title, status }) => (
  <HeaderContainer>
    <FontIcon icon='home' onClick={() => goTo('home')} />
    <Title>{ title }</Title>
    {
      status !== 'home' && (
        <Uploader>
          <label htmlFor='cloudinary-uploader'>
            Nouvelle image
            <FontIcon icon='add' />
          </label>
          <input
            type='file'
            id='cloudinary-uploader'
            accept='image/*'
            onChange={onUploadImages}
          />
        </Uploader>
      )
    }
  </HeaderContainer>
)

export default Header
