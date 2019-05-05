import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'
import sinon from 'sinon'

import TextButton from './index'

describe('TextButton component', () => {
  it('should display the right label', () => {
    const { container } = render(<TextButton>Custom label</TextButton>)

    expect(container.firstChild.textContent).toEqual('Custom label')
  })

  it('should call the onClick property when clicked', () => {
    const spyCallback = sinon.spy()
    const { container } = render(
      <TextButton onClick={spyCallback}>Label</TextButton>
    )

    fireEvent.click(container.firstChild as Element)

    expect(spyCallback.calledOnce).toBe(true)
  })
})
