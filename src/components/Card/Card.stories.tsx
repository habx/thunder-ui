import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Card from './index'

const ContentContainer = styled.div`
  max-width: 500px;
  padding: 12px 24px 24px 24px;
  line-height: 1.5;
`

const Content = () => (
  <ContentContainer>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  </ContentContainer>
)

storiesOf('Miscellaneous/Card', module)
  .add('basic', () => (
    <Card>
      <Content />
    </Card>
  ))
  .add('with onClick', () => (
    <Card interactive onClick={action('Card click')}>
      <Content />
    </Card>
  ))
  .add('with title', () => (
    <Card title='Tâches'>
      <Content />
    </Card>
  ))
  .add('with subtitle', () => (
    <Card title='Le Zelmis' subtitle='Levallois Peret'>
      <Content />
    </Card>
  ))
