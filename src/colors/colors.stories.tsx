import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { map } from 'lodash'

import colors from './index'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 64px;
`

const Color = styled.div`
  width: 250px;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Circle = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 50%;
  border: 1px solid ${colors.paynesGrey};
  background-color: ${({ color }) => color};
`

const Label = styled.div`
  padding-top: 8px;
`

storiesOf('Theme', module)
  .add('colors', () => (
    <Container>
      {map(colors, (color, name) => (
        <Color>
          <Circle color={color} />
          <Label>{ name }</Label>
        </Color>
      ))}
    </Container>
  ))
