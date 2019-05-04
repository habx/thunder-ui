import { mount } from 'enzyme'
import * as React from 'react'
import sinon from 'sinon'

import { BaseRadioSelect as RadioSelect } from './RadioSelect'
import { cardinalPoints } from './RadioSelect.data'
import { Option } from './RadioSelect.style'

describe('RadioSelect component', () => {
  let wrapper = null
  let spyOnChange = null

  beforeEach(() => {
    spyOnChange = sinon.spy()

    wrapper = mount(
      <RadioSelect
        options={cardinalPoints}
        onChange={spyOnChange}
        value={null}
        theme={{ thunderUI: {} }}
      />
    )
  })

  describe('Not multi', () => {
    it('should return this option if no option selected before', () => {
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(cardinalPoints[3].value)).toBe(true)
    })

    it('should return this option if click on an unselected option', () => {
      wrapper.setProps({ value: cardinalPoints[2].value })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(cardinalPoints[3].value)).toBe(true)
    })

    it('should return null if click on the selected option', () => {
      wrapper.setProps({ value: cardinalPoints[3].value })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(null)).toBe(true)
    })

    it('should return the previous selected option if click on the selected option and canBeEmpty = false', () => {
      wrapper.setProps({ value: cardinalPoints[3].value, canBeEmpty: false })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(cardinalPoints[3].value)).toBe(true)
    })
  })

  describe('Multi', () => {
    beforeEach(() => {
      wrapper.setProps({ multi: true })
    })

    it('should return an array with only this option if no value given', () => {
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([cardinalPoints[3].value])).toBe(true)
    })

    it('should return an array with the current values and this option if value given and this option is not selected', () => {
      wrapper.setProps({ value: [cardinalPoints[2].value] })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(
        spyOnChange.calledWith([
          cardinalPoints[2].value,
          cardinalPoints[3].value,
        ])
      ).toBe(true)
    })

    it('should return an array with the current values minus this option if value given and this option is selected', () => {
      wrapper.setProps({
        value: [cardinalPoints[2].value, cardinalPoints[3].value],
      })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([cardinalPoints[2].value])).toBe(true)
    })

    it('should return the current values if there is only this option selected and canBeEmpty = false', () => {
      wrapper.setProps({ value: [cardinalPoints[3].value], canBeEmpty: false })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')

      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([cardinalPoints[3].value])).toBe(true)
    })
  })
})
