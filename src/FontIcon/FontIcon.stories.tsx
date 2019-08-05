import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import FontIcon from './index'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SimpleIconContainer = styled.div`
  margin: 8px;
  font-size: 22px;
`

const iconDecorator = (storyFn: Function) => <Container>{storyFn()}</Container>

const icons = ['person']

storiesOf('Miscellaneous|FontIcon', module)
  .addDecorator(iconDecorator)
  .add('simple icons', () =>
    icons.map(icon => (
      <SimpleIconContainer key={icon}>
        <FontIcon icon={icon} />
      </SimpleIconContainer>
    ))
  )
