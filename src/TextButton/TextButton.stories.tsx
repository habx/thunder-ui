import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import StorybookGallery from '../_internal/StorybookGallery'

import RawButton from './TextButton'
import TextButtonProps from './TextButton.interface'

const IconButton: React.FunctionComponent<TextButtonProps> = props => (
  <RawButton onClick={action('onClick')} {...props}>
    Submit
  </RawButton>
)

storiesOf('Actions|TextButton', module)
  .addDecorator(withKnobs)
  .add('gallery', () => (
    <StorybookGallery
      renderLine={lineProps => (
        <React.Fragment>
          <IconButton {...lineProps}>Submit</IconButton>
          <IconButton {...lineProps} error>
            Submit
          </IconButton>
          <IconButton {...lineProps} warning>
            Submit
          </IconButton>
          <IconButton {...lineProps} disabled>
            Submit
          </IconButton>
        </React.Fragment>
      )}
      lines={[
        { title: 'Regular', props: {} },
        { title: 'Small', props: { small: true } },
        { title: 'Large', props: { large: true } },
      ]}
    />
  ))
  .add('dynamic', () => (
    <IconButton
      disabled={boolean('Disabled', false)}
      small={boolean('Small', false)}
      large={boolean('Large', false)}
      error={boolean('Error', false)}
      warning={boolean('Warning', false)}
    />
  ))
