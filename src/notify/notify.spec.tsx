import * as React from 'react'
import { render, within, act } from 'react-testing-library'

import ThunderProvider from '../ThunderProvider'

import notify from './index'
import { ANIMATION_DURATION } from './NotificationList.style'

jest.useFakeTimers()

const MESSAGE_1 = 'test message 1'
const MESSAGE_2 = 'test message 2'

describe('notify function', () => {
  it('should display no notification if not called', () => {
    const { queryAllByTestId } = render(<ThunderProvider />)

    expect(queryAllByTestId('notification-container')).toHaveLength(0)
  })

  it('should display one notification with message if called once', () => {
    const { queryAllByTestId } = render(<ThunderProvider />)

    act(() => {
      notify(MESSAGE_1)
    })

    const notifications = queryAllByTestId('notification-container')
    expect(notifications).toHaveLength(1)
    expect(
      within(notifications[0]).getByTestId('notification-content').textContent
    ).toEqual(MESSAGE_1)
  })

  it('should display two notifications in chronological order if called twice', () => {
    const { getAllByTestId } = render(<ThunderProvider />)

    act(() => {
      notify(MESSAGE_1)
      notify(MESSAGE_2)
    })

    const notifications = getAllByTestId('notification-container')
    expect(notifications).toHaveLength(2)
    expect(
      within(notifications[0]).getByTestId('notification-content').textContent
    ).toEqual(MESSAGE_1)
    expect(
      within(notifications[1]).getByTestId('notification-content').textContent
    ).toEqual(MESSAGE_2)
  })

  it('should remove notification after timeout', done => {
    const { queryAllByTestId, rerender } = render(<ThunderProvider />)

    const duration = 200

    act(() => {
      notify(MESSAGE_1, { duration })
    })

    setTimeout(async () => {
      rerender(<ThunderProvider />)
      await Promise.resolve()
      const notifications = queryAllByTestId('notification-container')
      expect(notifications).toHaveLength(0)
      done()
    }, ANIMATION_DURATION + duration + 5000)

    act(() => {
      jest.runAllTimers()
    })
  })
})
