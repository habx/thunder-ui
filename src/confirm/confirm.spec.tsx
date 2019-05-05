import * as React from 'react'
import { render, within, act, fireEvent } from 'react-testing-library'

import ThunderProvider from '../ThunderProvider'

import confirm from './index'

const MESSAGE_1 = 'test message 1'
const MESSAGE_2 = 'test message 2'

describe('confirm function', () => {
  it('should display no confirm modal if not called', () => {
    const { queryAllByTestId } = render(<ThunderProvider />)

    expect(queryAllByTestId('confirm-modal-container')).toHaveLength(0)
  })

  it('should display one confirm modal with message if called once', () => {
    const { queryAllByTestId } = render(<ThunderProvider />)

    act(() => {
      confirm(MESSAGE_1)
    })

    const notifications = queryAllByTestId('confirm-modal-container')
    expect(notifications).toHaveLength(1)
    expect(
      within(notifications[0]).getByTestId('confirm-modal-content').textContent
    ).toEqual(MESSAGE_1)
  })

  it('should display two confirm modals in chronological order if called twice', () => {
    const { getAllByTestId } = render(<ThunderProvider />)

    act(() => {
      confirm(MESSAGE_1)
      confirm(MESSAGE_2)
    })

    const notifications = getAllByTestId('confirm-modal-container')
    expect(notifications).toHaveLength(2)
    expect(
      within(notifications[0]).getByTestId('confirm-modal-content').textContent
    ).toEqual(MESSAGE_1)
    expect(
      within(notifications[1]).getByTestId('confirm-modal-content').textContent
    ).toEqual(MESSAGE_2)
  })

  it('should return true on validate', async () => {
    const { getByTestId } = render(<ThunderProvider />)

    let confirmPromise = new Promise(() => {})
    act(() => {
      confirmPromise = confirm(MESSAGE_1)
    })

    fireEvent.click(getByTestId('confirm-modal-confirm'))
    expect(await confirmPromise).toBe(true)
  })

  it('should return false on cancel', async () => {
    const { getByTestId } = render(<ThunderProvider />)

    let confirmPromise = new Promise(() => {})
    act(() => {
      confirmPromise = confirm(MESSAGE_1)
    })

    fireEvent.click(getByTestId('confirm-modal-cancel'))
    expect(await confirmPromise).toBe(false)
  })
})
