import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { map } from 'lodash'

import FontIcon from './index'
import icons from './icons'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SimpleIconContainer = styled.div`
  margin: 8px;
  font-size: 22px;
`

const iconDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

storiesOf('Miscellaneous/FontIcon', module)
  .addDecorator(iconDecorator)
  .add('simple icons', () => map(icons, icon => (
    <SimpleIconContainer>
      <FontIcon icon={icon} />
    </SimpleIconContainer>
  )))
