import * as React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import Drawer from './index'

jest.useFakeTimers()

describe('Drawer component', () => {
  describe('with react node children', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = mount(
        <Drawer onClose={() => null}>
          <div id='drawer-content'>
            CONTENT
          </div>
        </Drawer>
      )
    })

    it('should pass children', () => {
      expect(wrapper.find('#drawer-content')).toHaveLength(1)
    })
  })

  describe('with render props children', () => {
    it('should have state="closed" if drawer is closed', () => {
      const spyChildren = sinon.spy()

      mount(
        <Drawer onClose={() => null} open={false}>
          {spyChildren}
        </Drawer>
      )

      expect(spyChildren.calledOnce).toBe(true)
      expect(spyChildren.calledWith({ state: 'closed' })).toBe(true)
    })

    it('should have state = "opening" if drawer is mounted with open=true"', () => {
      const spyChildren = sinon.spy()

      mount(
        <Drawer onClose={() => null} open>
          {spyChildren}
        </Drawer>
      )

      expect(spyChildren.calledOnce).toBe(true)
      expect(spyChildren.calledWith({ state: 'opening' })).toBe(true)
    })

    it('should have state="opened" if opened for more than 1 second"', done => {
      const spyChildren = sinon.spy()

      mount(
        <Drawer onClose={() => null} open>
          {spyChildren}
        </Drawer>
      )

      setTimeout(() => {
        expect(spyChildren.lastCall.calledWith({ state: 'opened' })).toBe(true)
        done()
      }, 1000)

      jest.runAllTimers()
    })

    it('should have state="closing" if open just switched to "false"', done => {
      const spyChildren = sinon.spy()

      const wrapper = mount(
        <Drawer onClose={() => null} open>
          {spyChildren}
        </Drawer>
      )

      setTimeout(() => {
        wrapper.setProps({ open: false })

        expect(spyChildren.lastCall.calledWith({ state: 'closing' })).toBe(true)
        done()
      }, 1000)

      jest.runAllTimers()
    })
  })
})
