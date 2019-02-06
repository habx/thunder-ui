import * as React from 'react'
import { withTheme } from 'styled-components'
import { find, filter, findIndex, isEmpty, map, get, some, omit, has } from 'lodash'

import FontIcon from '../FontIcon'
import withLabel from '../withLabel'

import { searchInString } from '../_internal/strings'
import { formOption } from '../_internal/types'
import { getMainColor } from '../_internal/colors'

import Options from './Options'

import SelectProps, { SelectState } from './Select.interface'

import {
  SelectContainer,
  SelectContent,
  SearchInput,
  LabelIcons,
  CustomIconContainer,
  Placeholder,
  ResetIcon
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

export class BaseSelect extends React.Component<SelectProps, SelectState> {
  static defaultProps = {
    multi: false,
    canReset: true,
    filterable: false,
    compact: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { value: rawValue, options: rawOptions, multi } = nextProps

    return {
      ...(rawOptions !== prevState.rawOptions) && {
        rawOptions,
        options: BaseSelect.getStandardizedOptions(rawOptions)
      },
      ...(rawValue !== prevState.rawValue) && {
        rawValue,
        value: BaseSelect.getStandardizedValue(rawValue, multi)
      }
    }
  }

  static getStandardizedValue (value, multi) {
    return multi
      ? map(value, el => get(el, 'value', el))
      : get(value, 'value', value)
  }

  static getStandardizedOptions (options) {
    return map(options, option => ({
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
    value: null
  }

  componentDidMount () {
    window.addEventListener('click', this.handleClickOutside)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getVisibleOptions = (): formOption[] => {
    const { search, options } = this.state

    return filter(options, (option: formOption) => {
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
      return filter(options, el => value.includes(el.value))
    }

    return find(options, el => el.value === value)
  }

  getCurrentValueFormat () {
    const { value, valueFormat, multi } = this.props

    if ([FORMAT_VALUE_FULL, FORMAT_VALUE_SIMPLE].includes(valueFormat)) {
      return valueFormat
    }

    if (multi) {
      if (isEmpty(value)) {
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
      return some(value, el => el === option.value)
    }

    return option.value === value
  }

  areAllOptionsSelected = () => {
    const { options, multi } = this.props
    const { value } = this.state
    if (!multi || !value) return false
    return options.length === value.length
  }

  handleClickOutside = () => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.open) {
      this.handleToggle()
    }
  }

  handleKeyDown = event => {
    const { open, focusedItem } = this.state
    const { key } = event

    if (open) {
      const options = this.getVisibleOptions()
      const focusedIndex = findIndex(options, el => el === focusedItem)

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

    const isSelected = some(currentValue, el => (
      has(el, 'value') ? el.value === option.value : el === option.value
    ))

    if (isSelected) {
      const newValue = filter(currentValue, el => (
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
      search: ''
    }))
  }

  render () {
    const { open, search, focusedItem } = this.state
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
      selectAllLabel
    } = this.props

    const safeProps = omit(this.props, INTERNAL_PROPS)

    const options = this.getVisibleOptions()
    const value = this.getCurrentValue()

    const color = getMainColor(this.props, { themeKey: 'neutral' })
    const darkColor = getMainColor(this.props, { themeKey: 'neutralDark', customizable: false })

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
                  color={isEmpty(value) ? color : darkColor}
                  ref={this.inputRef}
                />
              ) : (
                <Placeholder color={isEmpty(value) ? color : darkColor}>
                  { this.getPlaceholder() }
                </Placeholder>
              )
          }
          <LabelIcons>
            {
              canReset &&
              <ResetIcon
                data-visible={!disabled && !isEmpty(value)}
                onClick={this.handleReset}
                icon='close'
                size={20}
              />
            }
            <FontIcon icon={open ? 'arrow_drop_up' : 'arrow_drop_down'} color={darkColor} />
          </LabelIcons>
        </SelectContent>
        <Options
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
        />
      </SelectContainer>
    )
  }
}

const Select = withLabel({ padding: 12 })(withTheme(BaseSelect))

export default Select
