import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'

import Menu from './index'
import MenuItem from '../MenuItem'
import Button from '../Button'
import FontIcon from '../FontIcon'

const Container = styled.div`
  position: relative;
`

const props = () => ({
  triggerElement: <Button>Menu</Button>,
  position: select('Position', { Left: 'left', Right: 'right', TopRight: 'top-right', TopLeft: 'top-left' }, 'left')
})

storiesOf('Actions/Menu', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Menu {...props()}>
      <Container>
        <MenuItem>Gestion des contacts</MenuItem>
        <MenuItem>Gestion des projets</MenuItem>
        <MenuItem>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add('with icons', () => (
    <Menu {...props()}>
      <Container>
        <MenuItem icon={<FontIcon icon='people' />}>Gestion des contacts</MenuItem>
        <MenuItem icon={<FontIcon icon='location_city' />}>Gestion des projets</MenuItem>
        <MenuItem icon={<FontIcon icon='create' />}>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add('in top position', () => (
    <Menu {...props()} position='top-left'>
      <Container>
        <MenuItem icon={<FontIcon icon='people' />}>Gestion des contacts</MenuItem>
        <MenuItem icon={<FontIcon icon='location_city' />}>Gestion des projets</MenuItem>
        <MenuItem icon={<FontIcon icon='create' />}>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
