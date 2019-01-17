import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import Menu from './index'
import MenuItem from '../MenuItem'
import Button from '../Button'
import FontIcon from '../FontIcon'

const Container = styled.div`
  position: relative;
`

class MenuWrapper extends Component<any> {
  render () {
    return (
      <Container>
        <Menu {...this.props} triggerElement={<Button>Menu</Button>} />
      </Container>
    )
  }
}

const BasicItems = () => (
  <Fragment>
    <MenuItem>Gestion des contacts</MenuItem>
    <MenuItem>Gestion des projets</MenuItem>
    <MenuItem>Gestion des pages</MenuItem>
  </Fragment>
)

storiesOf('Miscellaneous/Menu', module)
  .add('basic', () => (
    <MenuWrapper>
      <BasicItems />
    </MenuWrapper>
  ))
  .add('with position aligned right', () => (
    <MenuWrapper position='right'>
      <BasicItems />
    </MenuWrapper>
  ))
  .add('with icons', () => (
    <MenuWrapper>
      <MenuItem icon={<FontIcon icon='people' />}>Gestion des contacts</MenuItem>
      <MenuItem icon={<FontIcon icon='location_city' />}>Gestion des projets</MenuItem>
      <MenuItem icon={<FontIcon icon='create' />}>Gestion des pages</MenuItem>
    </MenuWrapper>
  ))
