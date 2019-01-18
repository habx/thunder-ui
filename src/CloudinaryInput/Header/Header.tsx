import * as React from 'react'

import { HeaderContainer, Title, Uploader } from './Header.style'
import HeaderProps from './Header.interface'

import FontIcon from '../../FontIcon'

const Header: React.StatelessComponent<HeaderProps> = ({ goTo, onUploadImages, title }) => (
  <HeaderContainer>
    <FontIcon icon='home' onClick={() => goTo('home')} />
    <Title>{ title }</Title>
    <Uploader>
      <label htmlFor='cloudinary-uploader'>
        <FontIcon icon='add' interactive />
      </label>
      <input
        type='file'
        multiple
        id='cloudinary-uploader'
        accept='image/*'
        onChange={onUploadImages}
      />
    </Uploader>
  </HeaderContainer>
)

export default Header
