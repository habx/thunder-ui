import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import StorybookGallery from '../_internal/StorybookGallery'
import FontIcon from '../FontIcon'

import RawButton from './IconButton'
import IconButtonProps from './IconButton.interface'

const IconButton: React.FunctionComponent<IconButtonProps> = props => (
  <RawButton onClick={action('onClick')} {...props}>
    <FontIcon
      icon="delete"
      color="white"
      size={props.small ? 16 : props.large ? 32 : 24}
    />
  </RawButton>
)

storiesOf('Actions|IconButton', module)
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
