import { act, render, within, fireEvent } from '@testing-library/react'
import * as React from 'react'
import sinon from 'sinon'

import Drawer from './index'

jest.useFakeTimers()

describe('Drawer component', () => {
  describe('with react node children', () => {
    it('should not render if not opened once', () => {
      const { queryByTestId } = render(
        <Drawer onClose={() => null}>
          <div data-testid="content">CONTENT</div>
        </Drawer>
      )

      const modalContainer = queryByTestId('drawer-container')

      expect(modalContainer).toBeNull()
    })
    it('should render if opened once', () => {
      const { queryByTestId, getByTestId } = render(
        <Drawer
          onClose={() => null}
          triggerElement={
            <button data-testid="drawer-trigger-element">show</button>
          }
        >
          <div data-testid="content">CONTENT</div>
        </Drawer>
      )

      fireEvent.click(getByTestId('drawer-trigger-element'))
      fireEvent.click(getByTestId('drawer-overlay'))

      const modalContainer = queryByTestId('drawer-container') as HTMLElement
      expect(modalContainer).toBeTruthy()
      expect(within(modalContainer).queryByTestId('content')).toBeTruthy()
    })
    it('should not render if not opened once', () => {
      const { queryByTestId } = render(
        <Drawer onClose={() => null}>
          <div data-testid="content">CONTENT</div>
        </Drawer>
      )

      const modalContainer = queryByTestId('drawer-container')

      expect(modalContainer).toBeNull()
    })
    it('should pass children if prop', () => {
      const { queryByTestId } = render(
        <Drawer onClose={() => null} alwaysRenderChildren>
          <div data-testid="content">CONTENT</div>
        </Drawer>
      )

      const modalContainer = queryByTestId('drawer-container') as HTMLElement

      expect(modalContainer).toBeTruthy()
      expect(within(modalContainer).queryByTestId('content')).toBeTruthy()
    })
  })

  describe('with render props children', () => {
    it('should have state="closed" if drawer is closed', () => {
      const spyChildren = sinon.spy()

      render(
        <Drawer onClose={() => null} open={false}>
          {spyChildren}
        </Drawer>
      )

      expect(spyChildren.lastCall.args[0].state).toEqual('closed')
    })

    it('should have state = "opening" if drawer is mounted with open=true"', () => {
      const spyChildren = sinon.spy()

      render(
        <Drawer onClose={() => null} open>
          {spyChildren}
        </Drawer>
      )

      expect(spyChildren.lastCall.args[0].state).toEqual('opening')
    })

    it('should have state="opened" if opened for more than 1 second"', () => {
      const spyChildren = sinon.spy()

      render(
        <Drawer onClose={() => null} open>
          {spyChildren}
        </Drawer>
      )

      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(spyChildren.lastCall.args[0].state).toEqual('opened')
    })

    it('should have state="closing" if open just switched to "false"', () => {
      const spyChildren = sinon.spy()

      const { rerender } = render(
        <Drawer onClose={() => null} open>
          {spyChildren}
        </Drawer>
      )

      act(() => {
        jest.advanceTimersByTime(1000)
      })

      rerender(
        <Drawer onClose={() => null} open={false}>
          {spyChildren}
        </Drawer>
      )

      expect(spyChildren.lastCall.args[0].state).toEqual('closing')
    })
  })
})
