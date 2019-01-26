import * as React from 'react'
import { find, filter, findIndex, isEmpty, map, get, some, omit, has } from 'lodash'

import FontIcon from '../FontIcon'
import withLabel from '../withLabel'

import { searchInString } from '../_internal/strings'
import { formOption } from '../_internal/types'

import Option from './Option'

import SelectProps, { SelectState } from './Select.interface'

import {
  SelectContainer,
  Label,
  SearchInput,
  LabelIcons,
  Options,
  Description,
  DescriptionAnnotation,
  OptionsActions,
  OptionAction,
  CustomIconContainer
} from './Select.style'

const INTERNAL_PROPS = [
  'isMulti',
  'description',
  'filledIndicator',
  'placeholderClassName',
  'icon',
  'annotation',
  'canReset',
  'value',
  'onChange',
  'placeholder'
]

const FORMAT_VALUE_FULL = 'FORMAT_VALUE_FULL'
const FORMAT_VALUE_SIMPLE = 'FORMAT_VALUE_SIMPLE'

class Select extends React.Component<SelectProps, SelectState> {
  static defaultProps = {
    isMulti: false,
    value: null,
    description: null,
    filledIndicator: true,
    placeholderClassName: '',
    icon: null,
    annotation: null,
    canReset: true
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { value: rawValue, options: rawOptions, isMulti } = nextProps

    return {
      ...(rawOptions !== prevState.rawOptions) && {
        rawOptions,
        options: Select.getStandardizedOptions(rawOptions)
      },
      ...(rawValue !== prevState.rawValue) && {
        rawValue,
        value: Select.getStandardizedValue(rawValue, isMulti)
      }
    }
  }

  static getStandardizedValue (value, isMulti) {
    return isMulti
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

  constructor (props) {
    super(props)

    this.wrapperRef = React.createRef()
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
    const { isMulti } = this.props
    const { options, value } = this.state

    if (!value) {
      return null
    }

    const filterMethod = isMulti ? filter : find

    return filterMethod(options, el => el.value === value)
  }

  getPlaceholder (value) {
    const { isMulti, placeholder } = this.props

    if (isMulti) {
      return placeholder
    }

    return value ? (value as formOption).label : placeholder
  }

  getCurrentValueFormat () {
    const { value, isMulti } = this.props

    if (isMulti) {
      if (isEmpty(value)) {
        return FORMAT_VALUE_FULL
      }

      return has(value[0], 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
    }

    return has(value, 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
  }

  getCleanValue (newValue) {
    const format = this.getCurrentValueFormat()

    return format === FORMAT_VALUE_FULL ? newValue : get(newValue, 'value')
  }

  isOptionSelected (option) {
    const { isMulti } = this.props
    const { value } = this.state

    if (isMulti) {
      return some(value, el => el === option.value)
    }

    return option.value === value
  }

  handleClickOutside = () => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.open) {
      this.toggle()
    }
  }

  handleKeyDown = event => {
    const { open, focusedItem } = this.state
    const { key } = event

    const options = this.getVisibleOptions()
    const focusedIndex = findIndex(options, el => el === focusedItem)

    if (open && key === 'ArrowDown' && focusedIndex < options.length) {
      event.preventDefault()
      this.setState({ focusedItem: options[focusedIndex + 1] })
    }

    if (open && key === 'ArrowUp' && focusedIndex > 0) {
      event.preventDefault()

      this.setState({ focusedItem: options[focusedIndex - 1] })
    }

    if (key === 'Enter' && focusedIndex >= 0) {
      this.handleSelect(focusedItem)
    }
  }

  handleSelect = option => {
    if (this.props.isMulti) {
      this.handleSelectMulti(option)
    } else {
      this.handleSelectOne(option)
      this.toggle()
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

  handleSelectAll = () => this.props.onChange(this.props.options)
  handleUnselectAll = () => this.props.onChange([])

  handleRemove = e => {
    e.stopPropagation()
    this.props.onChange(null)
  }

  handleFocus = () => this.setState({ isInputFocus: true })

  handleBlur = () => this.setState({ isInputFocus: false })

  handleSearch = e => this.setState({ search: e.target.value })

  toggle = () => this.setState({ open: this.state.isInputFocus ? true : !this.state.open, search: '' })

  stopDefaultAndPropagation = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  render () {
    const { open, search, focusedItem } = this.state
    const {
      isMulti,
      description,
      filledIndicator,
      placeholderClassName,
      icon,
      annotation,
      canReset
    } = this.props

    const safeProps = omit(this.props, INTERNAL_PROPS)

    const options = this.getVisibleOptions()
    const value = this.getCurrentValue()

    const showRemoveIcon = !isMulti && canReset && value

    return (
      <SelectContainer ref={this.wrapperRef} onClick={this.stopDefaultAndPropagation} {...safeProps}>
        <Label
          className={placeholderClassName}
          data-empty={!filledIndicator || isEmpty(value)}
          data-open={open}
          onClick={this.toggle}
        >
          {
            icon &&
            <CustomIconContainer>{ icon }</CustomIconContainer>
          }
          <SearchInput
            value={search}
            placeholder={this.getPlaceholder(value)}
            onChange={this.handleSearch}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <LabelIcons>
            {
              showRemoveIcon &&
              <FontIcon onClick={this.handleRemove} icon='close' />
            }
            <FontIcon icon={open ? 'arrow_drop_up' : 'arrow_drop_down'} />
          </LabelIcons>
        </Label>
        <Options data-open={open}>
          {description && (
            <Description>
              <div>{description}</div>
              <DescriptionAnnotation>{annotation}</DescriptionAnnotation>
            </Description>
          )}
          {options.length > 0
            ? (
              <React.Fragment>
                {isMulti &&
                <OptionsActions>
                  <OptionAction small onClick={this.handleSelectAll}>
                    Tout selectionner
                  </OptionAction>
                  <OptionAction small onClick={this.handleUnselectAll}>
                    Tout déselectionner
                  </OptionAction>
                </OptionsActions>
                }
                {options.map(option => (
                  <Option
                    key={option.value}
                    selected={this.isOptionSelected(option)}
                    onClick={() => this.handleSelect(option)}
                    focused={option === focusedItem}
                    isMulti={isMulti}
                    {...option}
                  />
                ))}
              </React.Fragment>
            ) : (
              <div>Aucune option</div>
            )
          }
        </Options>
      </SelectContainer>
    )
  }
}

export default withLabel({ padding: 16 })(Select)
