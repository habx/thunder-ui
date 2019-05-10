import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'
import sinon from 'sinon'

import RadioSelect from './RadioSelect'
import { cardinalPoints } from './RadioSelect.data'

describe('RadioSelect component', () => {
  describe('Not multi', () => {
    it('should return this option if no option selected before', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={null}
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(cardinalPoints[3].value)).toBe(true)
    })

    it('should return this option if click on an unselected option', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={cardinalPoints[2].value}
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(cardinalPoints[3].value)).toBe(true)
    })

    it('should return null if click on the selected option', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={cardinalPoints[3].value}
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(null)).toBe(true)
    })

    it('should return the previous selected option if click on the selected option and canBeEmpty = false', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={cardinalPoints[3].value}
          canBeEmpty={false}
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(cardinalPoints[3].value)).toBe(true)
    })
  })

  describe('Multi', () => {
    it('should return an array with only this option if no value given', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={null}
          multi
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([cardinalPoints[3].value])).toBe(true)
    })

    it('should return an array with the current values and this option if value given and this option is not selected', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={[cardinalPoints[2].value]}
          multi
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(
        spyOnChange.calledWith([
          cardinalPoints[2].value,
          cardinalPoints[3].value,
        ])
      ).toBe(true)
    })

    it('should return an array with the current values minus this option if value given and this option is selected', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={[cardinalPoints[2].value, cardinalPoints[3].value]}
          multi
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([cardinalPoints[2].value])).toBe(true)
    })

    it('should return the current values if there is only this option selected and canBeEmpty = false', () => {
      const spyOnChange = sinon.spy()

      const { queryAllByTestId } = render(
        <RadioSelect
          options={cardinalPoints}
          onChange={spyOnChange}
          value={[cardinalPoints[3].value]}
          canBeEmpty={false}
          multi
        />
      )

      fireEvent.click(queryAllByTestId('radio-select-option')[3])

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([cardinalPoints[3].value])).toBe(true)
    })
  })
})
