import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import ListItem from '../ListItem'

import List from './List'

const Container = styled.div`
  max-width: 500px;
`

storiesOf('Layouts|List', module)
  .add('full example', () => {
    return (
      <Container>
        <List clickable>
          <ListItem rightElement="yesterday">
            Phasellus eleifend malesuada nulla, efficitur aliquet mauris
            fermentum id.
          </ListItem>
          <ListItem selected={true} rightElement="today">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Morbi commodo lectus eu nunc posuere laoreet.
          </ListItem>
          <ListItem rightElement="last week">
            Aenean vitae sodales mi. Sed congue massa sit amet lectus
            consectetur venenatis.
          </ListItem>
        </List>
      </Container>
    )
  })
  .add('simple', () => {
    return (
      <Container>
        <List>
          <ListItem>
            Phasellus eleifend malesuada nulla, efficitur aliquet mauris
            fermentum id.
          </ListItem>
          <ListItem>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Morbi commodo lectus eu nunc posuere laoreet.
          </ListItem>
          <ListItem>
            Aenean vitae sodales mi. Sed congue massa sit amet lectus
            consectetur venenatis.
          </ListItem>
        </List>
      </Container>
    )
  })
  .add('custom hover color', () => {
    return (
      <Container>
        <List hoverColor="rgba(255, 0, 0, 0.5)" clickable>
          <ListItem>
            Phasellus eleifend malesuada nulla, efficitur aliquet mauris
            fermentum id.
          </ListItem>
          <ListItem>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Morbi commodo lectus eu nunc posuere laoreet.
          </ListItem>
          <ListItem>
            Aenean vitae sodales mi. Sed congue massa sit amet lectus
            consectetur venenatis.
          </ListItem>
        </List>
      </Container>
    )
  })
