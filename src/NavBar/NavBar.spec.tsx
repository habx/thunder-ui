import * as React from 'react'
import { render, within, fireEvent } from 'react-testing-library'
import sinon from 'sinon'

import * as validityCheck from '../_internal/validityCheck'
import NavBarItem from '../NavBarItem'

import NavBar from './index'
import 'jest-dom/extend-expect'

jest.useFakeTimers()

describe('ExpansionPanel component', () => {
  it('should render each ExpansionPanelItem as closed', async () => {
    const { queryAllByTestId } = render(
      <NavBar>
        <NavBarItem />
        <NavBarItem />
      </NavBar>
    )

    const items = queryAllByTestId('expansion-panel-item')

    expect(items).toHaveLength(2)
    expect(
      within(items[0]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'false')
    expect(
      within(items[1]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'false')
  })

  it('should log a warning if NavBarItem is called without a NavBar parent', () => {
    const logWarnStub = sinon.stub(validityCheck, 'logWarn')
    render(<NavBarItem />)

    expect(logWarnStub.calledOnce).toBe(true)
  })
})
