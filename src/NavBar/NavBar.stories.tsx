import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import colors from '../../colors'

import NavBar from '.'
import NavBarItem from '../NavBarItem'

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

const Icon = styled.i`
  display: inline-block;
  font: normal normal normal 16px/1 'Habx';
  font-size: inherit;
  text-rendering: auto;
  text-transform: none;
  line-height: inherit;
  vertical-align: bottom;
`

const HomeIcon = styled(Icon)`
  &:before {
    content: "\\2302";
  }
`

const UserIcon = styled(Icon)`
  &:before {
    content: "\\1f468";
  }
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
      <NavBarItem icon={<HomeIcon />} tooltip='Accueil' active />
      <NavBarItem icon={<UserIcon />} tooltip='Profil' />
    </NavBar>
  ))
  .add('with custom background color', () => (
    <NavBar backgroundColor={colors.maastrichtBlue}>
      <NavBarItem icon={<HomeIcon />} tooltip='Accueil' active />
      <NavBarItem icon={<UserIcon />} tooltip='Profil' />
    </NavBar>
  ))
  .add('with custom active color', () => (
    <NavBar activeBackgroundColor={colors.brightCerualean}>
      <NavBarItem icon={<HomeIcon />} tooltip='Accueil' active />
      <NavBarItem icon={<UserIcon />} tooltip='Profil' />
    </NavBar>
  ))
  .add('with custom active color on second item', () => (
    <NavBar>
      <NavBarItem icon={<HomeIcon />} tooltip='Accueil' active />
      <NavBarItem icon={<UserIcon />} tooltip='Profil' activeBackgroundColor={colors.brightCerualean} />
    </NavBar>
  ))
