import * as React from 'react'

import { HeaderContainer, Title, Uploader } from './Header.style'
import HeaderProps from './Header.interface'

import FontIcon from '../../FontIcon'

const Header: React.StatelessComponent<HeaderProps> = ({ goTo, title }) => (
  <HeaderContainer>
    <FontIcon icon='home' onClick={() => goTo('home')} />
    <Title>{ title }</Title>
    <Uploader>
      <FontIcon icon='add' onClick={() => goTo('uploader')} />
    </Uploader>
  </HeaderContainer>
)

export default Header
