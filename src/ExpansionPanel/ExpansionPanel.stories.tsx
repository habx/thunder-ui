import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import FontIcon from '../FontIcon'
import Button from '../Button'
import ExpansionPanel from './index'
import ExpansionPanelItem from '../ExpansionPanelItem'
import { regularData } from './ExpansionPanel.data'

const Container = styled.div`
  width: 500px;
`

const navDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

const ControlledExpansionPanel = () => {
  const [firstOpen, setFirstOpen] = React.useState(false)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [thirdOpen, setThirdOpen] = React.useState(false)

  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelItem
          title='First item'
          open={firstOpen}
          onToggle={() => (setFirstOpen(open => !open))}
        >
          { regularData }
        </ExpansionPanelItem>
        <ExpansionPanelItem
          title='Second item'
          open={secondOpen}
          onToggle={() => (setSecondOpen(open => !open))}
        >
          { regularData }
        </ExpansionPanelItem>
        <ExpansionPanelItem
          title='Third item'
          open={thirdOpen}
          onToggle={() => (setThirdOpen(open => !open))}
        >
          { regularData }
        </ExpansionPanelItem>
        <ExpansionPanelItem
          title='Fourth item'
        >
          { regularData }
        </ExpansionPanelItem>
      </ExpansionPanel>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <Button onClick={() => (setFirstOpen(open => !open))}>First</Button>
        <Button onClick={() => (setSecondOpen(open => !open))}>Second</Button>
        <Button onClick={() => (setThirdOpen(open => !open))}>Third</Button>
      </div>
    </React.Fragment>
    )
}

storiesOf('Layouts|ExpansionPanel', module)
  .addDecorator(navDecorator)
  .add('basic uncontrolled', () => (
    <ExpansionPanel>
      <ExpansionPanelItem title='First item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Second item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Third item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Fourth item'>
        { regularData }
      </ExpansionPanelItem>
    </ExpansionPanel>
  ))
  .add('flat', () => (
    <ExpansionPanel flat>
      <ExpansionPanelItem title='First item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Second item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Third item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Fourth item'>
        { regularData }
      </ExpansionPanelItem>
    </ExpansionPanel>
  ))
  .add('error', () => (
    <ExpansionPanel>
      <ExpansionPanelItem title='First item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Second item' error>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Third item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Fourth item'>
        { regularData }
      </ExpansionPanelItem>
    </ExpansionPanel>
  ))
  .add('multiple opened items', () => (
    <ExpansionPanel multiOpen>
      <ExpansionPanelItem title='First item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Second item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Third item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Fourth item'>
        { regularData }
      </ExpansionPanelItem>
    </ExpansionPanel>
  ))
  .add('with custom icons', () => (
    <ExpansionPanel>
      <ExpansionPanelItem
        title='First item'
        expandIcon={<FontIcon icon='add' />}
        collapseIcon={<FontIcon icon='remove' />}
      >
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Second item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Third item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Fourth item'>
        { regularData }
      </ExpansionPanelItem>
    </ExpansionPanel>
  ))
  .add('controlled', () => <ControlledExpansionPanel />)
