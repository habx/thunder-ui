import * as React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import Modal from './index'

jest.useFakeTimers()

describe('Modal component', () => {
  describe('with react node children', () => {
    let wrapper = null

    beforeEach(() => {
      wrapper = mount(
        <Modal onClose={() => null}>
          <div id='modal-content'>
            CONTENT
          </div>
        </Modal>
      )
    })

    it('should pass children', () => {
      expect(wrapper.find('#modal-content')).toHaveLength(1)
    })
  })

  describe('with render props children', () => {
    it('should have state="closed" if modal is closed', () => {
      const spyChildren = sinon.spy()

      mount(
        <Modal onClose={() => null} open={false}>
          {spyChildren}
        </Modal>
      )

      expect(spyChildren.calledOnce).toBe(true)
      expect(spyChildren.calledWith({ state: 'closed' })).toBe(true)
    })

    it('should have state = "opening" if modal is mounted with open=true"', () => {
      const spyChildren = sinon.spy()

      mount(
        <Modal onClose={() => null} open>
          {spyChildren}
        </Modal>
      )

      expect(spyChildren.calledOnce).toBe(true)
      expect(spyChildren.calledWith({ state: 'opening' })).toBe(true)
    })

    it('should have state="opened" if opened for more than 1 second"', done => {
      const spyChildren = sinon.spy()

      mount(
        <Modal onClose={() => null} open>
          {spyChildren}
        </Modal>
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
        <Modal onClose={() => null} open>
          {spyChildren}
        </Modal>
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
