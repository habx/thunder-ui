import { render, fireEvent } from '@testing-library/react'
import * as React from 'react'
import sinon from 'sinon'

import TextButton from './index'

describe('TextButton component', () => {
  it('should display the right label', () => {
    const { container } = render(<TextButton>Custom label</TextButton>)

    expect(container.firstChild.textContent).toEqual('Custom label')
  })

  it('should call the onClick property when clicked', () => {
    const spyOnChange = sinon.spy()
    const { container } = render(
      <TextButton onClick={spyOnChange}>Label</TextButton>
    )

    fireEvent.click(container.firstChild as Element)

    expect(spyOnChange.calledOnce).toBe(true)
  })
})
