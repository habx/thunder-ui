import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'

import Button from '../Button'
import MenuItem from '../MenuItem'

import Menu from './Menu'
import 'jest-dom/extend-expect'

describe('Menu component', () => {
  it('should render the trigger element', () => {
    const { queryByTestId } = render(
      <Menu triggerElement={<Button data-testid="triggerElement" />} />
    )
    expect(queryByTestId('triggerElement')).toBeTruthy()
  })

  it('should be closed by default', () => {
    const { getByTestId } = render(
      <Menu triggerElement={<Button data-testid="triggerElement" />} />
    )

    expect(getByTestId('menu-container')).toHaveAttribute('data-open', 'false')
  })

  it('should be opened after click on trigger element', () => {
    const { queryByTestId, getByTestId } = render(
      <Menu triggerElement={<Button data-testid="triggerElement" />} />
    )

    fireEvent.click(queryByTestId('triggerElement'))
    expect(getByTestId('menu-container')).toHaveAttribute('data-open', 'true')
  })

  it("should render it's children", () => {
    const { queryAllByTestId } = render(
      <Menu triggerElement={<Button data-testid="triggerElement" />}>
        <MenuItem>Line 1</MenuItem>
        <MenuItem>Line 2</MenuItem>
      </Menu>
    )

    expect(queryAllByTestId('menu-item-container')).toHaveLength(2)
  })
})
