import React, { Fragment} from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

import Menu from './index'
import MenuItem from '../MenuItem'
import Button from '../Button'
import FontIcon from '../FontIcon'

const Container = styled.div`
  position: relative;
`

const props = () => ({
  position: select(
    'Position',
    { Left: 'left', Right: 'right', 'Top Right': 'top-right', 'Top Left': 'top-left' },
    'left'
  ),
  persistent: boolean('Don\'t close after inside click')
})

storiesOf('Actions/Menu', module)
  .addDecorator(withKnobs)
  .add('full example', () => (
    <Fragment>
      <div data-ilyes="true"/>
    <Menu {...props()} triggerElement={<Button>Menu</Button>}>
      <Container>
        <MenuItem>Gestion des contacts</MenuItem>
        <MenuItem>Gestion des projets</MenuItem>
        <MenuItem>Gestion des pages</MenuItem>
      </Container>
    </Menu>
    </Fragment>
  ))
  .add('with icons', () => (
    <Menu triggerElement={<Button>Menu</Button>}>
      <Container>
        <MenuItem icon={<FontIcon icon='people' />}>Gestion des contacts</MenuItem>
        <MenuItem icon={<FontIcon icon='location_city' />}>Gestion des projets</MenuItem>
        <MenuItem icon={<FontIcon icon='create' />}>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add('in top position', () => (
    <Menu triggerElement={<Button>Menu</Button>} position='top-left'>
      <Container>
        <MenuItem icon={<FontIcon icon='people' />}>Gestion des contacts</MenuItem>
        <MenuItem icon={<FontIcon icon='location_city' />}>Gestion des projets</MenuItem>
        <MenuItem icon={<FontIcon icon='create' />}>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add('don\'t close after inside click', () => (
    <Menu triggerElement={<Button>Menu</Button>} persistent>
      <Container>
        <MenuItem>Gestion des contacts</MenuItem>
        <MenuItem>Gestion des projets</MenuItem>
        <MenuItem>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
