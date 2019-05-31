import { render, fireEvent } from '@testing-library/react'
import * as React from 'react'
import sinon from 'sinon'

import FontIcon from '../FontIcon'

import IconButton from './index'

describe('IconButton component', () => {
  it('should display the right icon', () => {
    const { getAllByTestId } = render(
      <IconButton>
        <FontIcon data-testid="face-icon" icon="face" />
      </IconButton>
    )

    expect(getAllByTestId('face-icon')).toHaveLength(1)
  })

  it('should call onClick function on click', () => {
    const spyOnChange = sinon.spy()
    const { container } = render(
      <IconButton onClick={spyOnChange}>
        <FontIcon data-testid="face-icon" icon="face" />
      </IconButton>
    )

    fireEvent.click(container.firstChild as Element)

    expect(spyOnChange.calledOnce).toBe(true)
  })
})
