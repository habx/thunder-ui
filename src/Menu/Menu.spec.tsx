import * as React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Menu from './index'
import MenuItem from '../MenuItem'
import Button from '../Button'

configure({ adapter: new Adapter() })

describe('Menu component', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(
      <Menu triggerElement={<Button id='triggerElement' />}>
      </Menu>
    )
  })

  it('should render the trigger element', () => {
    expect(wrapper.find('button#triggerElement')).toHaveLength(1)
  })

  it('should be closed by default', () => {
    expect(wrapper.state('open')).toEqual(false)
  })

  it('should be opened after click on trigger element', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.state('open')).toEqual(true)
  })

  it('should render it\'s children', () => {
    wrapper.setProps({
      children: (
        <React.Fragment>
          <MenuItem>Line 1</MenuItem>
          <MenuItem>Line 2</MenuItem>
        </React.Fragment>
      )
    })

    expect(wrapper.find(MenuItem)).toHaveLength(2)
  })
})
