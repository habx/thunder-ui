import * as React from 'react'
import { render, within, fireEvent } from 'react-testing-library'
import sinon from 'sinon'

import * as validityCheck from '../_internal/validityCheck'
import ExpansionPanelItem from '../ExpansionPanelItem'

import ExpansionPanel from './index'
import 'jest-dom/extend-expect'

jest.useFakeTimers()

describe('ExpansionPanel component', () => {
  it('should render each ExpansionPanelItem as closed', async () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem />
        <ExpansionPanelItem />
      </ExpansionPanel>
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

  it("should open the ExpansionPanelItem when click on it's title bar and leave the other closed", () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[1]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(
      within(items[0]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'false')

    expect(
      within(items[1]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'true')
  })

  it("should close the ExpansionPanelItem when open and click on it's title bar", () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[1]).getByTestId('expansion-panel-item-title-bar')
    )

    fireEvent.click(
      within(items[1]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(
      within(items[1]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'false')
  })

  it('should close the ExpansionPanelItem when click on another one and no multiOpen given', () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[1]).getByTestId('expansion-panel-item-title-bar')
    )

    fireEvent.click(
      within(items[0]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(
      within(items[1]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'false')
  })

  it('should not close the ExpansionPanelItem when click on another one and multiOpen = true', () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel multiOpen>
        <ExpansionPanelItem />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[1]).getByTestId('expansion-panel-item-title-bar')
    )

    fireEvent.click(
      within(items[0]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(
      within(items[1]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'true')
  })

  it("should close the ExpansionPanelItem but not the others when open and click on it's title bar (multiOpen: true)", () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel multiOpen>
        <ExpansionPanelItem />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[0]).getByTestId('expansion-panel-item-title-bar')
    )

    fireEvent.click(
      within(items[1]).getByTestId('expansion-panel-item-title-bar')
    )

    fireEvent.click(
      within(items[0]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(
      within(items[0]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'false')

    expect(
      within(items[1]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'true')
  })

  it('should call the ExpansionPanelItem children render props with open: false by default', () => {
    const spyChildren = sinon.spy()

    render(
      <ExpansionPanel>
        <ExpansionPanelItem>{spyChildren}</ExpansionPanelItem>
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    expect(spyChildren.calledOnce).toBe(true)
    expect(spyChildren.lastCall.args[0].open).toEqual(false)
  })

  it("should call the ExpansionPanelItem children render props with open: true after click on it's title bar", () => {
    const spyChildren = sinon.spy()

    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem>{spyChildren}</ExpansionPanelItem>
        <ExpansionPanelItem />
      </ExpansionPanel>
    )
    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[0]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(spyChildren.calledTwice).toBe(true)
    expect(spyChildren.lastCall.args[0].open).toEqual(true)
  })

  it('should open the ExpansionPanelItem if it has open: true', () => {
    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem open />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )

    const items = queryAllByTestId('expansion-panel-item')

    expect(
      within(items[0]).getByTestId('expansion-panel-item-content')
    ).toHaveAttribute('data-open', 'true')
  })

  it("should call the ExpansionPanelItem onToggle props after click on it's title bar", () => {
    const spyOnToggle = sinon.spy()

    const { queryAllByTestId } = render(
      <ExpansionPanel>
        <ExpansionPanelItem onToggle={spyOnToggle} />
        <ExpansionPanelItem />
      </ExpansionPanel>
    )
    const items = queryAllByTestId('expansion-panel-item')

    fireEvent.click(
      within(items[0]).getByTestId('expansion-panel-item-title-bar')
    )

    expect(spyOnToggle.calledOnce).toBe(true)
  })

  it('should log a warning if ExpansionPanelItem is called without an ExpansionPanel parent', () => {
    const logWarnStub = sinon.stub(validityCheck, 'logWarn')
    render(<ExpansionPanelItem />)

    expect(logWarnStub.calledOnce).toBe(true)
  })
})
