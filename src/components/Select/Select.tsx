import * as React from 'react'
import { find, filter, findIndex, isEmpty, get, some } from 'lodash'

import Annotation from '../Annotation'
import FontIcon from '../FontIcon'
import SelectProps from './Select.interface'
import { searchInString } from '../../internal/strings'
import { formOption, formValue } from '../../internal/types'

import {
  SelectContainer,
  Label,
  SearchInput,
  LabelIcons,
  Options,
  Description,
  OptionsActions,
  OptionAction,
  CustomIconContainer
} from './Select.style'

import Option from './Option'

class Select extends React.Component<SelectProps> {
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

  wrapperRef: React.RefObject<any>

  constructor (props) {
    super(props)

    this.wrapperRef = React.createRef()
  }

  state = {
    open: false,
    search: '',
    isInputFocus: false,
    focusedItem: null
  }

  componentDidMount () {
    window.addEventListener('click', this.handleClickOutside)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleClickOutside)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  getOptions = () => {
    const { options, value, isMulti } = this.props
    const { search } = this.state
    return filter(options,
      option => (searchInString(`${option.value}`, search) || searchInString(option.label, search)) &&
        !(!isMulti && value && option.value === (value as formOption).value)
    )
  }

  getPlaceholder (value) {
    const { isMulti, placeholder } = this.props

    if (isMulti) {
      return placeholder
    }

    return value ? (value as formOption).label : placeholder
  }

  handleClickOutside = () => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.open) {
      this.toggle()
    }
  }

  handleKeyDown = event => {
    const { open, focusedItem } = this.state
    const { key } = event

    const options = this.getOptions()
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

  handleSelectOne = option => this.props.onChange(option)

  handleSelectMulti = option => {
    let currentValue = (this.props.value as formValue[]) || []
    if (typeof get(currentValue, '[0]') === 'string' || typeof get(currentValue, '[0]') === 'number') {
      // @ts-ignore
      currentValue = currentValue.map(v => find(this.getOptions(), { value: v }) || { value: v })
    }
    const optionIndex = findIndex(currentValue, { value: option.value })
    const nextValue = currentValue
    if (optionIndex > -1) {
      nextValue.splice(optionIndex, 1)
    } else {
      nextValue.push(option)
    }
    this.props.onChange(nextValue)
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
      placeholder,
      isMulti,
      description,
      filledIndicator,
      placeholderClassName,
      icon,
      annotation,
      canReset,
      value: unusedValue,
      onChange: unusedOnChange,
      ...rest
    } = this.props

    const options = this.getOptions()
    let { value } = this.props

    if (Array.isArray(value) && (typeof get(value, '[0]') === 'string' || typeof get(value, '[0]') === 'number')) {
      // @ts-ignore
      value = value.map(v => find(options, { value: v }))
    }

    const showRemoveIcon = !isMulti && canReset && value

    return (
      <SelectContainer ref={this.wrapperRef} onClick={this.stopDefaultAndPropagation} {...rest}>
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
              <Annotation>{annotation}</Annotation>
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
                {options.map(option => {
                  // @ts-ignore
                  const selected = some((value as formOption), { value: option.value })
                  return (
                    <Option
                      key={option.value}
                      selected={selected}
                      onClick={() => this.handleSelect(option)}
                      focused={option === focusedItem}
                      isMulti={isMulti}
                      {...option}
                    />
                  )
                })}
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

export default Select
