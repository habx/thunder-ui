import * as React from 'react'

import { HeaderContainer } from './ImageUploader.style'
import { HeaderProps } from './ImageUploader.interface'

import FontIcon from '../../FontIcon'

const Header: React.StatelessComponent<HeaderProps> = ({ goTo }) => (
  <HeaderContainer>
    <FontIcon icon='home' onClick={() => goTo('home')} />
  </HeaderContainer>
)

export default Header
