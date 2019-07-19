import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import StorybookGallery from '../_internal/StorybookGallery'
import FontIcon from '../FontIcon'

import RawButton from './index'

const Button = props => <RawButton onClick={action('onClick')} {...props} />

storiesOf('Actions|Button', module)
  .addDecorator(withKnobs)
  .add('gallery', () => (
    <StorybookGallery
      renderLine={lineProps => (
        <React.Fragment>
          <Button {...lineProps}>Submit</Button>
          <Button {...lineProps} error>
            Submit
          </Button>
          <Button {...lineProps} warning>
            Submit
          </Button>
          <Button {...lineProps} disabled>
            Submit
          </Button>
          <Button {...lineProps} loading>
            Submit
          </Button>
          <Button
            {...lineProps}
            iconRight={<FontIcon size={16} icon="delete" />}
          >
            Submit
          </Button>
          <Button
            {...lineProps}
            iconLeft={<FontIcon size={16} icon="delete" />}
          >
            Submit
          </Button>
        </React.Fragment>
      )}
      lines={[
        { title: 'Regular', props: {} },
        { title: 'Regular reverse', props: { reverse: true } },
        { title: 'Small', props: { small: true } },
        { title: 'Small reverse', props: { small: true, reverse: true } },
        { title: 'Large', props: { large: true } },
        { title: 'Large reverse', props: { large: true, reverse: true } },
      ]}
    />
  ))
  .add('dynamic', () => (
    <Button
      children={text('Content', 'Submit')}
      disabled={boolean('Disabled', false)}
      small={boolean('Small', false)}
      large={boolean('Large', false)}
      reverse={boolean('Reverse', false)}
      loading={boolean('Loading', false)}
      error={boolean('Error', false)}
      warning={boolean('Warning', false)}
    />
  ))
