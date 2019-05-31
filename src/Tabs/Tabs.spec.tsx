import { render } from '@testing-library/react'
import * as React from 'react'
import sinon from 'sinon'

import * as validityCheck from '../_internal/validityCheck'
import TabsItem from '../TabsItem'

import Tabs from './index'
import 'jest-dom/extend-expect'

jest.useFakeTimers()
const sinonSandbox = sinon.createSandbox()

describe('Tabs component', () => {
  afterEach(() => {
    sinonSandbox.restore()
  })

  it('should render each TabsItem', async () => {
    const { queryAllByTestId } = render(
      <Tabs>
        <TabsItem />
        <TabsItem />
      </Tabs>
    )

    expect(queryAllByTestId('tabs-item')).toHaveLength(2)
  })

  it('should not log a warning if TabsItem is called with an Tabs parent', () => {
    const logWarnStub = sinonSandbox.stub(validityCheck, 'logWarn')
    render(
      <Tabs>
        <TabsItem />
      </Tabs>
    )

    expect(logWarnStub.notCalled).toBe(true)
  })

  it('should log a warning if TabsItem is called without a Tabs parent', () => {
    const logWarnStub = sinonSandbox.stub(validityCheck, 'logWarn')
    render(<TabsItem />)

    expect(logWarnStub.calledOnce).toBe(true)
  })
})
