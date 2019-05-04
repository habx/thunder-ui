import { mount } from 'enzyme'
import * as React from 'react'

import FontIcon from '../FontIcon'

import Button from './index'

describe('Button component', () => {
  describe('with icons', () => {
    it('should show icon left', () => {
      const wrapper = mount(
        <Button iconLeft={<FontIcon id="face-icon" icon="face" />}>
          button
        </Button>
      )
      expect(wrapper.find('#face-icon').exists()).toBe(true)
    })

    it('should show icon right', () => {
      const wrapper = mount(
        <Button iconRight={<FontIcon id="face-icon" icon="face" />}>
          button
        </Button>
      )
      expect(wrapper.find('#face-icon').exists()).toBe(true)
    })
  })
  it('should have the right label', () => {
    const wrapper = mount(<Button>click me</Button>)
    expect(wrapper.contains('click me')).toBe(true)
  })
  it('should be a button', () => {
    const wrapper = mount(<Button>click me</Button>)
    expect(wrapper.find('button').exists()).toBe(true)
  })
  it('should call onClick function on click', () => {
    const spy = jest.fn()

    const wrapper = mount(<Button onClick={spy}>click me</Button>)
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })
})
