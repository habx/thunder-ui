import * as React from 'react'
import { mount } from 'enzyme'

import IconButton from './index'
import FontIcon from '../FontIcon'

describe('IconButton component', () => {
  it('should have the right icon', () => {
    const wrapper = mount(
      <IconButton >
        <FontIcon id='face-icon' icon='face'/>
      </IconButton>
    )
    expect(wrapper.find('#face-icon').exists()).toBe(true)
  })
  it('should be a button', () => {
    const wrapper = mount(
      <IconButton>
        click me
     </IconButton>
  )
    expect(wrapper.find('button').exists()).toBe(true)
  })
  it('should call onClick function on click', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <IconButton onClick={spy}>
        click me
    </IconButton>
  )
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })
})
