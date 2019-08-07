import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import StorybookGallery from '../_internal/StorybookGallery'

import RawTextArea from './TextArea'
import TextAreaProps from './TextArea.interface'

const CONTENT = 'Hello world'

const Container = styled.div`
  width: 350px;
`

const TextArea = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <RawTextArea
      {...newProps}
      onChange={value => newProps.onChange(value as string)}
    />
  )) as React.ComponentType<TextAreaProps>

  return (
    <Container>
      <Component placeholder="Write something" {...props} />
    </Container>
  )
}

storiesOf('Inputs|TextArea', module)
  .addDecorator(withKnobs)
  .add('gallery', () => (
    <StorybookGallery
      renderLine={lineProps => (
        <React.Fragment>
          <TextArea {...lineProps} value={CONTENT} />
          <TextArea {...lineProps} error value={CONTENT} />
          <TextArea {...lineProps} disabled value={CONTENT} />
        </React.Fragment>
      )}
      lines={[
        { title: 'Regular', props: {} },
        { title: 'Small', props: { small: true } },
      ]}
    />
  ))
  .add('dynamic', () => (
    <TextArea
      disabled={boolean('Disabled', false)}
      small={boolean('Small', false)}
      placeholder={text('Placeholder', 'Write something')}
      error={boolean('Error', false)}
      loading={boolean('Loading', false)}
    />
  ))
