import { mount } from 'enzyme'
import * as React from 'react'
import sinon from 'sinon'

import Option from './Option'
import { BaseSelect as Select } from './Select'
import { longData } from './Select.data'
import { Placeholder, SelectContent, ResetIcon } from './Select.style'

describe('Select component', () => {
  let wrapper = null
  let spyOnChange = null

  beforeEach(() => {
    spyOnChange = sinon.spy()

    wrapper = mount(
      <Select options={longData} onChange={spyOnChange} value={null} />
    )
  })

  describe('UI: not filterable', () => {
    it('should not render an input', () => {
      expect(wrapper.find('input')).toHaveLength(0)
    })

    it('should render placeholder inside Placeholder if no value given', () => {
      wrapper.setProps({ placeholder: 'Placeholder test content' })
      expect(wrapper.find(Placeholder).prop('children')).toEqual(
        'Placeholder test content'
      )
    })

    it('should render value inside Placeholder if value is given', () => {
      wrapper.setProps({ value: longData[0] })
      expect(wrapper.find(Placeholder).prop('children')).toEqual(
        longData[0].label
      )
    })

    it('should open the dropdown when click on SelectContent and open = false', () => {
      expect(wrapper.state('open')).toBe(false)
      wrapper.find(SelectContent).simulate('click')
      expect(wrapper.state('open')).toBe(true)
    })

    it('should close the dropdown when click on SelectContent and open = true', () => {
      wrapper.setState({ open: true })
      wrapper.find(SelectContent).simulate('click')
      expect(wrapper.state('open')).toBe(false)
    })

    it('should display all the options', () => {
      wrapper.setState({ open: true })
      expect(wrapper.find(Option)).toHaveLength(longData.length)
    })

    it('should render a visible ResetIcon if no canReset props given', () => {
      wrapper.setProps({ value: longData[0].value })
      expect(wrapper.find(ResetIcon)).toHaveLength(1)
      expect(wrapper.find(ResetIcon).prop('data-visible')).toBe(true)
    })

    it('should not render a Reset icon if canReset = false', () => {
      wrapper.setProps({ value: longData[0].value, canReset: false })
      expect(wrapper.find(ResetIcon)).toHaveLength(0)
    })
  })

  describe('UI: filterable', () => {
    beforeEach(() => {
      wrapper.setProps({ filterable: true })
    })
    it('should render an input', () => {
      expect(wrapper.find('input')).toHaveLength(1)
    })

    it('should render placeholder inside input', () => {
      wrapper.setProps({ placeholder: 'Placeholder test content' })
      expect(wrapper.find('input').prop('placeholder')).toEqual(
        'Placeholder test content'
      )
    })

    it('should display all the options if search is empty', () => {
      wrapper.setState({ open: true })
      expect(wrapper.find(Option)).toHaveLength(longData.length)
    })

    it('should display filtered options if search is not empty', () => {
      wrapper.setState({ search: 'ann' })
      const options = wrapper.find(Option)
      expect(options).toHaveLength(2)
      expect(options.at(0).prop('value')).toEqual('annecy')
      expect(options.at(1).prop('value')).toEqual('villeurbanne')
    })
  })

  describe('Interaction: not multi', () => {
    beforeEach(() => {
      wrapper.setState({ open: true })
    })

    it('should close the dropdown when click on an option', () => {
      wrapper
        .find(Option)
        .at(0)
        .simulate('click')
      expect(wrapper.state('open')).toBe(false)
    })

    it('should return option in simple format if no value given and no valueFormat given', () => {
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(longData[3].value))
    })

    it('should return option in full format if valueFormat = "full"', () => {
      wrapper.setProps({ valueFormat: 'full' })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(longData[3])).toBe(true)
    })

    it('should return option in full format if value is in full format and no valueFormat given', () => {
      wrapper.setProps({ value: longData[0] })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(longData[3])).toBe(true)
    })

    it('should return option in simple format if value is in full format and valueFormat = "simple"', () => {
      wrapper.setProps({ value: longData[0], valueFormat: 'simple' })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith(longData[3].value)).toBe(true)
    })
  })

  describe('Interaction: multi', () => {
    beforeEach(() => {
      wrapper.setProps({ multi: true })
      wrapper.setState({ open: true })
    })

    it('should not close the dropdown when click on an option', () => {
      wrapper
        .find(Option)
        .at(0)
        .simulate('click')
      expect(wrapper.state('open')).toBe(true)
    })

    it('should return an array with only this option in simple format if no value given an no valueFormat given', () => {
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([longData[3].value])).toBe(true)
    })

    it('should return an array with only this option in full format if no value given and valueFormat = "full"', () => {
      wrapper.setProps({ valueFormat: 'full' })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([longData[3]])).toBe(true)
    })

    it('should return an array with the current values and this option in simple format if current values are in simple format and no valueFormat given', () => {
      wrapper.setProps({ value: [longData[2].value] })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(
        spyOnChange.calledWith([longData[2].value, longData[3].value])
      ).toBe(true)
    })

    it('should return an array with the current values and this option in simple format if current values are in full format and no valueFormat given', () => {
      wrapper.setProps({ value: [longData[2]] })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([longData[2], longData[3]])).toBe(true)
    })

    it('should return an array with the current values and this option in full format if current values are in simple format and valueFormat = "full"', () => {
      wrapper.setProps({ value: [longData[2].value], valueFormat: 'full' })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([longData[2].value, longData[3]])).toBe(
        true
      )
    })

    it('should return an empty array if click on an option already selected in simple format', () => {
      wrapper.setProps({ value: [longData[3].value] })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([])).toBe(true)
    })

    it('should return an empty array if click on an option already selected in full format', () => {
      wrapper.setProps({ value: [longData[3]] })
      wrapper
        .find(Option)
        .at(3)
        .simulate('click')
      expect(spyOnChange.calledOnce).toBe(true)
      expect(spyOnChange.calledWith([])).toBe(true)
    })
  })
})
