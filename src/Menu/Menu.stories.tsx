import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import FontIcon from '../FontIcon'
import MenuItem from '../MenuItem'

import Menu from './index'

const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  position: relative;
`

const props = () => ({
  position: select(
    'Position',
    {
      Left: 'left',
      Right: 'right',
      'Top Right': 'top-right',
      'Top Left': 'top-left',
    },
    'left'
  ),
  persistent: boolean("Don't close after inside click"),
})

const withContainer = storyFn => <StoryContainer>{storyFn()}</StoryContainer>

storiesOf('Actions|Menu', module)
  .addDecorator(withKnobs)
  .addDecorator(withContainer)
  .add('full example', () => (
    <Menu {...props()} triggerElement={<Button>Menu</Button>}>
      <Container>
        <MenuItem>Gestion des contacts</MenuItem>
        <MenuItem>Gestion des projets</MenuItem>
        <MenuItem>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add('with icons', () => (
    <Menu triggerElement={<Button>Menu</Button>}>
      <Container>
        <MenuItem icon={<FontIcon icon="people" />}>
          Gestion des contacts
        </MenuItem>
        <MenuItem icon={<FontIcon icon="location_city" />}>
          Gestion des projets
        </MenuItem>
        <MenuItem icon={<FontIcon icon="create" />}>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add('in top position', () => (
    <Menu triggerElement={<Button>Menu</Button>} position="top-left">
      <Container>
        <MenuItem icon={<FontIcon icon="people" />}>
          Gestion des contacts
        </MenuItem>
        <MenuItem icon={<FontIcon icon="location_city" />}>
          Gestion des projets
        </MenuItem>
        <MenuItem icon={<FontIcon icon="create" />}>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
  .add("don't close after inside click", () => (
    <Menu triggerElement={<Button>Menu</Button>} persistent>
      <Container>
        <MenuItem>Gestion des contacts</MenuItem>
        <MenuItem>Gestion des projets</MenuItem>
        <MenuItem>Gestion des pages</MenuItem>
      </Container>
    </Menu>
  ))
