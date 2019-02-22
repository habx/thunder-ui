import * as React from 'react'
import { mount } from 'enzyme'

import ThunderProvider from '../ThunderProvider'
import confirm from './index'

describe('confirm function', () => {
  const message = 'test message'
  it('should not show the confirm modal if not called', () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    expect(wrapper.contains(message)).toBe(false)

  })
  it('should show the confirm modal if called', () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    confirm(message)
    wrapper.mount()
    expect(wrapper.contains(message)).toBe(true)
  })
  it('should return true on validate', async () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    const confirmResponse = confirm(message)
    wrapper.mount()
    wrapper.find('button').findWhere(e => e.text() === 'Valider').first().simulate('click')
    expect(await confirmResponse).toBe(true)
  })
  it('should return false on cancel', async () => {
    const wrapper = mount(
      <ThunderProvider />
    )
    const confirmResponse = confirm(message)
    wrapper.mount()
    wrapper.find('button').findWhere(e => e.text() === 'Annuler').first().simulate('click')
    expect(await confirmResponse).toBe(false)
  })
})
