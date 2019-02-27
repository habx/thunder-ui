import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import colors from '../colors'

import NavBar from './index'
import NavBarItem from '../NavBarItem'
import FontIcon from '../FontIcon'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
`

const Content = styled.div`
  flex: 1 1 100%;
`

const navDecorator = storyFn => (
  <Container>
    {storyFn()}
    <Content />
  </Container>
)

storiesOf('Navigation/NavBar', module)
  .addDecorator(navDecorator)
  .add('basic', () => (
    <NavBar>
      <NavBarItem icon={<FontIcon icon='home' />} tooltip='Accueil' active />
      <NavBarItem icon={<FontIcon icon='person' />} tooltip='Profil' />
    </NavBar>
  ))
  .add('with custom background color', () => (
    <NavBar backgroundColor={colors.maastrichtBlue}>
      <NavBarItem icon={<FontIcon icon='home' />} tooltip='Accueil' active />
      <NavBarItem icon={<FontIcon icon='person' />} tooltip='Profil' />
    </NavBar>
  ))
  .add('with custom active color', () => (
    <NavBar activeBackgroundColor={colors.maastrichtBlue}>
      <NavBarItem icon={<FontIcon icon='home' />} tooltip='Accueil' active />
      <NavBarItem icon={<FontIcon icon='person' />} tooltip='Profil' />
    </NavBar>
  ))
  .add('with custom active color on second item', () => (
    <NavBar>
      <NavBarItem icon={<FontIcon icon='home' />} tooltip='Accueil' active />
      <NavBarItem icon={<FontIcon icon='person' />} tooltip='Profil' activeBackgroundColor={colors.maastrichtBlue} />
    </NavBar>
  ))
  .add('with title', () => (
    <NavBar
      title={<span>H</span>}
    >
      <NavBarItem icon={<FontIcon icon='home' />} tooltip='Accueil' active />
      <NavBarItem icon={<FontIcon icon='person' />} tooltip='Profil' />
    </NavBar>
  ))
