import * as React from 'react'
import { mount } from 'enzyme'

import ThunderProvider from '../ThunderProvider'
import notify from './index'
import { ANIMATION_DURATION } from './NotificationList.style'

describe('notify function', () => {
  const message = 'test message'
  it('should not show the notification if not called', () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    expect(wrapper.contains(message)).toBe(false)

  })
  it('should show the confirm modal if called', () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    notify(message)
    wrapper.mount()
    expect(wrapper.contains(message)).toBe(true)
  })
  it('should disapear after timeout', () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    const duration = 200
    notify(message, { duration })
    wrapper.mount()
    expect(wrapper.contains(message)).toBe(true)
    return new Promise(resolve => {
      setTimeout(() => {
        wrapper.mount()
        expect(wrapper.contains(message)).toBe(false)
        resolve()
      }, ANIMATION_DURATION + duration + 50)
    })
  })
})
