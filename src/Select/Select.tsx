import * as React from 'react'
import { createPortal } from 'react-dom'
import { withTheme } from 'styled-components'
import get from 'lodash.get'
import has from 'lodash.has'

import FontIcon from '../FontIcon'
import withLabel from '../withLabel'

import { searchInString } from '../_internal/strings'
import { formOption } from '../_internal/types'
import { getMainColor } from '../_internal/colors'
import { omit } from '../_internal/data'
import { isClientSide, ssrDOMRect } from '../_internal/ssr'

import Options from './Options'

import SelectProps, { SelectState } from './Select.interface'

import {
  SelectContainer,
  SelectContent,
  SearchInput,
  LabelIcons,
  CustomIconContainer,
  Placeholder,
  ResetIcon,
  Overlay
} from './Select.style'

const INTERNAL_PROPS = [
  'multi',
  'description',
  'placeholderClassName',
  'icon',
  'annotation',
  'canReset',
  'value',
  'onChange',
  'placeholder',
  'filterable'
]

const FORMAT_VALUE_FULL = 'full'
const FORMAT_VALUE_SIMPLE = 'simple'

export class Select extends React.Component<SelectProps, SelectState> {
  static defaultProps = {
    multi: false,
    canReset: true,
    filterable: false,
    compact: false,
    optionDisabled: () => false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { value: rawValue, options: rawOptions, multi } = nextProps

    return {
      ...(rawOptions !== prevState.rawOptions) && {
        rawOptions,
        options: Select.getStandardizedOptions(rawOptions)
      },
      ...(rawValue !== prevState.rawValue) && {
        rawValue,
        value: Select.getStandardizedValue(rawValue, multi)
      }
    }
  }

  static getStandardizedValue (value, multi) {
    if (multi) {
      return value ? value.map(el => get(el, 'value', el)) : []
    }

    return get(value, 'value', value)
  }

  static getStandardizedOptions (options = []) {
    return options.map(option => ({
      value: get(option, 'value', option),
      label: get(option, 'label', option)
    }))
  }

  wrapperRef: React.RefObject<any>
  inputRef: React.RefObject<any>

  constructor (props) {
    super(props)
    this.wrapperRef = React.createRef()
    this.inputRef = React.createRef()
  }

  state = {
    open: false,
    search: '',
    isInputFocus: false,
    focusedItem: null,
    rawOptions: null,
    rawValue: null,
    options: null,
    value: this.props.multi ? [] : null,
    wrapperRect: typeof DOMRect === 'function' ? new DOMRect() : ssrDOMRect
  }

  componentDidMount () {
    this.setState({ wrapperRect: this.wrapperRef.current.getBoundingClientRect() })
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('resize', this.handleResize)
  }

  getVisibleOptions = (): formOption[] => {
    const { search, options } = this.state

    return options.filter((option: formOption) => {
      const matchValue = searchInString(`${option.value}`, search)
      const matchLabel = searchInString(option.label, search)
      return matchValue || matchLabel
    })
  }

  getCurrentValue () {
    const { multi } = this.props
    const { options, value } = this.state

    if (!value) {
      return null
    }

    if (multi) {
      return options.filter(el => value.includes(el.value))
    }

    return options.find(el => el.value === value)
  }

  getCurrentValueFormat () {
    const { value, valueFormat, multi } = this.props

    if ([FORMAT_VALUE_FULL, FORMAT_VALUE_SIMPLE].includes(valueFormat)) {
      return valueFormat
    }

    if (multi) {
      if (!value || value.length === 0) {
        return FORMAT_VALUE_SIMPLE
      }

      return has(value[0], 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
    }

    return has(value, 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
  }

  getCleanValue = newValue => {
    const format = this.getCurrentValueFormat()

    return format === FORMAT_VALUE_FULL ? newValue : get(newValue, 'value')
  }

  getPlaceholder () {
    const { multi, placeholder } = this.props

    if (multi) {
      return placeholder
    }

    const value = this.getCurrentValue()

    return value ? (value as formOption).label : placeholder
  }

  isOptionSelected = option => {
    const { multi } = this.props
    const { value } = this.state

    if (multi) {
      return (value || []).some(el => el === option.value)
    }

    return option.value === value
  }

  areAllOptionsSelected = () => {
    const { options, multi } = this.props
    const { value } = this.state
    if (!multi || !value) return false
    return options.length === value.length
  }

  handleKeyDown = event => {
    const { open, focusedItem } = this.state
    const { key } = event

    if (open) {
      const options = this.getVisibleOptions()
      const focusedIndex = options.findIndex(el => el === focusedItem)

      if (key === 'ArrowDown' && focusedIndex < options.length) {
        event.preventDefault()
        this.setState({ focusedItem: options[focusedIndex + 1] })
      }

      if (key === 'ArrowUp' && focusedIndex > 0) {
        event.preventDefault()

        this.setState({ focusedItem: options[focusedIndex - 1] })
      }

      if (key === 'Enter' && focusedIndex >= 0) {
        this.handleSelect(focusedItem)
      }
    }
  }

  handleSelect = option => {
    this.setState(() => ({ focusedItem: null }))

    if (this.props.multi) {
      this.handleSelectMulti(option)
    } else {
      this.handleSelectOne(option)
      this.handleToggle()
    }
  }

  handleSelectOne = option => {
    const cleanOption = this.getCleanValue(option)
    this.props.onChange(cleanOption)
  }

  handleSelectMulti = option => {
    const { value, onChange } = this.props
    const cleanOption = this.getCleanValue(option)
    const currentValue = (value || []) as any[]

    const isSelected = currentValue.some(el => (
      has(el, 'value') ? el.value === option.value : el === option.value
    ))

    if (isSelected) {
      const newValue = currentValue.filter(el => (
        has(el, 'value') ? el.value !== option.value : el !== option.value
      ))
      onChange(newValue)
    } else {
      const newValue = [...currentValue, cleanOption]
      onChange(newValue)
    }
  }

  handleSelectAll = (value: boolean) => {
    const { options, onChange } = this.props
    if (value) {
      onChange(options.map(this.getCleanValue))
    } else {
      onChange([])
    }
  }

  handleReset = e => {
    const { multi, onChange } = this.props

    e.stopPropagation()

    onChange(multi ? [] : null)
  }

  handleFocus = () => this.setState({ isInputFocus: true })

  handleBlur = () => this.setState({ isInputFocus: false })

  handleSearch = e => this.setState({
    search: e.target.value,
    open: true
  })

  handleToggle = () => {
    if (!this.state.open && this.inputRef.current) {
      this.inputRef.current.focus()
    }

    this.setState(prevState => ({
      open: !prevState.open,
      search: '',
      wrapperRect: this.wrapperRef.current.getBoundingClientRect()
    }))
  }

  handleResize = () => {
    this.setState({ wrapperRect: this.wrapperRef.current.getBoundingClientRect() })
  }

  render () {
    const { open, search, focusedItem, wrapperRect } = this.state
    const {
      multi,
      description,
      placeholderClassName,
      icon,
      annotation,
      canReset,
      disabled,
      filterable,
      compact,
      canSelectAll,
      selectAllLabel,
      optionDisabled
    } = this.props

    const safeProps = omit(this.props, INTERNAL_PROPS)

    const options = this.getVisibleOptions()
    const value = this.getCurrentValue()

    const color = getMainColor(this.props, { themeKey: 'neutral' })
    const darkColor = getMainColor(this.props, { themeKey: 'neutralStronger', customizable: false })
    const hasValue = !(!value || (Array.isArray(value) && value.length === 0))

    return (
      <SelectContainer ref={this.wrapperRef} {...safeProps}>
        <SelectContent
          className={placeholderClassName}
          data-open={open}
          onClick={this.handleToggle}
          color={color}
        >
          {
            icon &&
            <CustomIconContainer>{ icon }</CustomIconContainer>
          }
          {
            filterable
              ? (
                <SearchInput
                  value={search}
                  placeholder={this.getPlaceholder()}
                  onChange={this.handleSearch}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  color={hasValue ? darkColor : color}
                  ref={this.inputRef}
                />
              ) : (
                <Placeholder color={hasValue ? darkColor : color}>
                  { this.getPlaceholder() }
                </Placeholder>
              )
          }
          <LabelIcons>
            {
              canReset &&
              <ResetIcon
                data-visible={!disabled && hasValue}
                onClick={this.handleReset}
                icon='close'
                size={20}
              />
            }
            <FontIcon icon={open ? 'arrow_drop_up' : 'arrow_drop_down'} color={darkColor} />
          </LabelIcons>
        </SelectContent>
        {open && isClientSide() && createPortal(<Overlay onClick={this.handleToggle}/>, document.body)}
        <Options
          optionDisabled={optionDisabled}
          options={options}
          open={open}
          multi={multi}
          allSelected={this.areAllOptionsSelected()}
          onSelect={this.handleSelect}
          onSelectAll={this.handleSelectAll}
          isOptionSelected={this.isOptionSelected}
          focusedItem={focusedItem}
          annotation={annotation}
          description={description}
          compact={compact}
          canSelectAll={!!canSelectAll}
          selectAllLabel={selectAllLabel}
          onClose={this.handleToggle}
          wrapperRect={wrapperRect}
        />
      </SelectContainer>
    )
  }
}

export default withLabel({ padding: 12 })(withTheme(Select) as React.ComponentType<SelectProps>)
