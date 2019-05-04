import { mount } from 'enzyme'
import * as React from 'react'

import TextButton from './index'

describe('Button component', () => {
  it('should have the right label', () => {
    const wrapper = mount(<TextButton>click me</TextButton>)
    expect(wrapper.contains('click me')).toBe(true)
  })
  it('should be a button', () => {
    const wrapper = mount(<TextButton>click me</TextButton>)
    expect(wrapper.find('button').exists()).toBe(true)
  })
  it('should call onClick function on click', () => {
    const spy = jest.fn()

    const wrapper = mount(<TextButton onClick={spy}>click me</TextButton>)
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })
})
