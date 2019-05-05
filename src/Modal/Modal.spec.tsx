import * as React from 'react'
import { render, within } from 'react-testing-library'
import sinon from 'sinon'

import Modal from './index'

jest.useFakeTimers()

describe('Modal component', () => {
  describe('with react node children', () => {
    const { queryByTestId } = render(
      <Modal onClick={() => null}>
        <div data-testid="content">CONTENT</div>
      </Modal>
    )

    const modalContainer = queryByTestId('modal-container')

    expect(modalContainer).toBeDefined()
    expect(within(modalContainer).queryByTestId('content')).toBeDefined()
  })

  describe('with render props children', () => {
    it('should have state="closed" if modal is closed', () => {
      const spyChildren = sinon.spy()

      render(
        <Modal onClose={() => null} open={false}>
          {spyChildren}
        </Modal>
      )

      expect(spyChildren.calledOnce).toBe(true)
      expect(spyChildren.lastCall.args[0].state).toEqual('closed')
    })

    it('should have state = "opening" if modal is mounted with open=true"', () => {
      const spyChildren = sinon.spy()

      render(
        <Modal onClose={() => null} open>
          {spyChildren}
        </Modal>
      )

      expect(spyChildren.calledOnce).toBe(true)
      expect(spyChildren.lastCall.args[0].state).toEqual('opening')
    })

    it('should have state="opened" if opened for more than 1 second"', done => {
      const spyChildren = sinon.spy()

      render(
        <Modal onClose={() => null} open>
          {spyChildren}
        </Modal>
      )

      setTimeout(() => {
        expect(spyChildren.lastCall.args[0].state).toEqual('opened')
        done()
      }, 1000)

      jest.runAllTimers()
    })

    it('should have state="closing" if open just switched to "false"', done => {
      const spyChildren = sinon.spy()

      const { rerender } = render(
        <Modal onClose={() => null} open>
          {spyChildren}
        </Modal>
      )

      setTimeout(() => {
        rerender(
          <Modal onClose={() => null} open={false}>
            {spyChildren}
          </Modal>
        )

        expect(spyChildren.lastCall.args[0].state).toEqual('closing')
        done()
      }, 1000)

      jest.runAllTimers()
    })
  })
})
