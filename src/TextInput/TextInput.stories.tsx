import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import StorybookGallery from '../_internal/StorybookGallery'
import FontIcon from '../FontIcon'

import RawTextInput from './TextInput'
import TextInputProps from './TextInput.interface'

const CONTENT = 'Hello world'

const Container = styled.div`
  width: 300px;
`

const TextInput = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <RawTextInput
      {...newProps}
      onChange={newValue => newProps.onChange(newValue as string)}
    />
  )) as React.ComponentType<TextInputProps>

  return (
    <Container>
      <Component placeholder="your@mail.com" {...props} />
    </Container>
  )
}

storiesOf('Inputs|TextInput', module)
  .addDecorator(withKnobs)
  .add('gallery', () => (
    <StorybookGallery
      renderLine={lineProps => (
        <React.Fragment>
          <TextInput {...lineProps} value={CONTENT} />
          <TextInput {...lineProps} error value={CONTENT} />
          <TextInput {...lineProps} disabled value={CONTENT} />
          <TextInput
            value={CONTENT}
            rightElement={<FontIcon icon="edit" size={18} />}
          />
          <TextInput
            value={CONTENT}
            rightHoverElement={<FontIcon icon="edit" size={18} />}
          />
        </React.Fragment>
      )}
      lines={[
        { title: 'Regular', props: {} },
        { title: 'Small', props: { small: true } },
      ]}
    />
  ))
  .add('dynamic', () => (
    <TextInput
      disabled={boolean('Disabled', false)}
      small={boolean('Small', false)}
      placeholder={text('Placeholder', 'your@mail.com')}
      error={boolean('Error', false)}
      loading={boolean('Loading', false)}
    />
  ))
