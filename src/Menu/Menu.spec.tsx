import * as React from 'react'
import { mount } from 'enzyme'

import { BaseMenu as Menu } from './Menu'
import MenuItem from '../MenuItem'
import Button from '../Button'

describe('Menu component', () => {
  let wrapper = null

  beforeEach(() => {
    wrapper = mount(
      <Menu triggerElement={<Button id='triggerElement' />} isMobile={false}>
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
