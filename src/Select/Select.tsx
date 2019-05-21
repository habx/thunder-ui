import get from 'lodash.get'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { withTheme } from 'styled-components'

import { isNil, has, isString } from '../_internal/data'
import { isClientSide, ssrDOMRect } from '../_internal/ssr'
import { searchInString } from '../_internal/strings'
import { formOption, styledTheme } from '../_internal/types'
import FontIcon from '../FontIcon'
import theme from '../theme'
import withLabel from '../withLabel'

import Options from './Options'
import SelectProps, { SelectInnerProps, SelectState } from './Select.interface'
import {
  SelectContainer,
  SelectContent,
  SearchInput,
  LabelIcons,
  CustomIconContainer,
  Placeholder,
  ResetIcon,
  Overlay,
} from './Select.style'

const FORMAT_VALUE_FULL = 'full'
const FORMAT_VALUE_SIMPLE = 'simple'

const INITIAL_STATE = {
  isOpened: false,
  query: '',
  focusedItem: null,
  wrapperRect: typeof DOMRect === 'function' ? new DOMRect() : ssrDOMRect,
}

const useOptions = ({ rawOptions }) =>
  React.useMemo(() => {
    if (!rawOptions) {
      return []
    }

    return rawOptions.map(option => ({
      value: get(option, 'value', option),
      label: get(option, 'label', option),
    }))
  }, [rawOptions])

const useValue = ({ rawValue, multi, options }) =>
  React.useMemo(() => {
    const cleanValue = value => {
      if (isNil(value)) {
        return { value, label: 'No value' }
      }

      if (has(value, 'value')) {
        return value
      }

      const matchingOption = options.find(el => el.value === value)
      return {
        value,
        label: matchingOption ? matchingOption.label : value,
      }
    }

    if (multi) {
      return rawValue ? rawValue.map(cleanValue) : []
    }

    return cleanValue(rawValue)
  }, [multi, rawValue, options])

const useValueFormat = ({ rawValueFormat, rawValue, multi }) =>
  React.useMemo(() => {
    if ([FORMAT_VALUE_FULL, FORMAT_VALUE_SIMPLE].includes(rawValueFormat)) {
      return rawValueFormat
    }

    if (multi) {
      if (!rawValue || rawValue.length === 0) {
        return FORMAT_VALUE_SIMPLE
      }

      return has(rawValue[0], 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
    }

    return has(rawValue, 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
  }, [rawValueFormat, multi, rawValue])

const useVisibleOptions = ({ query, options }) =>
  React.useMemo((): formOption[] => {
    return options.filter((option: formOption) => {
      const matchValue = searchInString(`${option.value}`, query)
      const matchLabel =
        isString(option.label) && searchInString(option.label, query)
      return matchValue || matchLabel
    })
  }, [options, query])

const useSelectedOptions = ({ options, value, multi }) =>
  React.useMemo(() => {
    if (!value) {
      return null
    }

    if (multi) {
      return options.filter(el => value.includes(el.value))
    }

    return options.find(el => el.value === value.value)
  }, [multi, options, value])

const usePlaceholder = ({ rawPlaceholder, selectedOptions, multi }) =>
  React.useMemo(() => {
    if (multi) {
      return rawPlaceholder
    }

    return selectedOptions
      ? (selectedOptions as formOption).label
      : rawPlaceholder
  }, [selectedOptions, rawPlaceholder, multi])

const BaseSelect: React.FunctionComponent<SelectInnerProps> = ({
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
  optionDisabled,
  onChange,
  value: rawValue,
  options: rawOptions,
  valueFormat: rawValueFormat,
  placeholder: rawPlaceholder,
  ...props
}) => {
  const inputRef = React.useRef(null)
  const wrapperRef = React.useRef(null)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_QUERY': {
        return { ...state, query: action.value, isOpened: true }
      }

      case 'TOGGLE_VISIBILITY': {
        if (!state.isOpened && inputRef.current) {
          inputRef.current.focus()
        }

        return {
          ...state,
          query: '',
          isOpened: !state.isOpened,
          wrapperRect: wrapperRef.current.getBoundingClientRect(),
        }
      }

      case 'REMOVE_FOCUS_ITEM': {
        return { ...state, focusedItem: null }
      }

      case 'ADD_FOCUS_ITEM': {
        return { ...state, focusedItem: action.value }
      }

      case 'RESIZE': {
        return {
          ...state,
          wrapperRect: wrapperRef.current.getBoundingClientRect(),
        }
      }

      default: {
        throw new Error(`Thunder Select : Unknown action ${action.type}`)
      }
    }
  }

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE) as [
    SelectState,
    any
  ]

  const options = useOptions({ rawOptions })
  const value = useValue({ rawValue, multi, options })
  const valueFormat = useValueFormat({ rawValueFormat, rawValue, multi })
  const visibleOptions = useVisibleOptions({ query: state.query, options })
  const selectedOptions = useSelectedOptions({ options, value, multi })
  const placeholder = usePlaceholder({ rawPlaceholder, selectedOptions, multi })

  const getCleanValue = React.useCallback(
    newValue =>
      valueFormat === FORMAT_VALUE_FULL ? newValue : get(newValue, 'value'),
    [valueFormat]
  )

  const handleSearch = React.useCallback(
    e => {
      dispatch({ type: 'UPDATE_QUERY', value: e.target.value })
    },
    [dispatch]
  )

  const handleToggle = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_VISIBILITY' })
  }, [dispatch])

  const handleSelectOne = React.useCallback(
    option => {
      const cleanOption = getCleanValue(option)
      onChange(cleanOption)
    },
    [getCleanValue, onChange]
  )

  const handleSelectMulti = React.useCallback(
    option => {
      const isSelected = value.some(el =>
        has(el, 'value') ? el.value === option.value : el === option.value
      )

      if (isSelected) {
        const newValue = value
          .filter(el =>
            has(el, 'value') ? el.value !== option.value : el !== option.value
          )
          .map(getCleanValue)
        onChange(newValue)
      } else {
        const newValue = [...value, option].map(getCleanValue)
        onChange(newValue)
      }
    },
    [getCleanValue, onChange, value]
  )

  const handleSelect = React.useCallback(
    option => {
      dispatch({ type: 'REMOVE_FOCUS_ITEM' })

      if (multi) {
        handleSelectMulti(option)
      } else {
        handleSelectOne(option)
        handleToggle()
      }
    },
    [dispatch, handleSelectMulti, handleSelectOne, handleToggle, multi]
  )

  const handleSelectAll = React.useCallback(
    (selectAll: boolean) => {
      if (selectAll) {
        onChange(options.map(getCleanValue))
      } else {
        onChange([])
      }
    },
    [getCleanValue, onChange, options]
  )

  const handleReset = React.useCallback(
    e => {
      e.stopPropagation()

      onChange(multi ? [] : null)
    },
    [multi, onChange]
  )

  React.useEffect(() => {
    const handleKeyDown = event => {
      const { key } = event

      if (state.isOpened) {
        const focusedIndex = visibleOptions.findIndex(
          el => el === state.focusedItem
        )

        if (key === 'ArrowDown' && focusedIndex < options.length) {
          event.preventDefault()
          dispatch({ type: 'ADD_FOCUS_ITEM', value: options[focusedIndex + 1] })
        }

        if (key === 'ArrowUp' && focusedIndex > 0) {
          event.preventDefault()
          dispatch({ type: 'ADD_FOCUS_ITEM', value: options[focusedIndex - 1] })
        }

        if (key === 'Enter' && focusedIndex >= 0) {
          handleSelect(state.focusedItem)
        }
      }
    }

    const handleResize = () => {
      dispatch({ type: 'RESIZE' })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [
    dispatch,
    handleSelect,
    options,
    state.focusedItem,
    state.isOpened,
    visibleOptions,
  ])

  const isOptionSelected = React.useCallback(
    option => {
      if (multi) {
        return value.some(el => el.value === option.value)
      }

      return value ? option.value === value.value : false
    },
    [multi, value]
  )

  const color = theme.get('neutral', { dynamic: true })(props)
  const darkColor = theme.get('neutralStronger')(props)
  const hasValue = multi
    ? Array.isArray(rawValue) && rawValue.length > 0
    : !isNil(rawValue)

  const areAllOptionsSelected = React.useMemo(() => {
    if (!multi || !value) return false
    return options.length === value.length
  }, [multi, options.length, value])

  return (
    <SelectContainer ref={wrapperRef} data-disabled={disabled} {...props}>
      <SelectContent
        data-testid="select-content"
        data-open={state.isOpened}
        className={placeholderClassName}
        onClick={handleToggle}
      >
        {icon && <CustomIconContainer>{icon}</CustomIconContainer>}
        {filterable ? (
          <SearchInput
            data-testid="select-input"
            value={state.query}
            placeholder={placeholder}
            onChange={handleSearch}
            color={hasValue ? darkColor : color}
            ref={inputRef}
          />
        ) : (
          <Placeholder
            data-testid="select-placeholder"
            color={hasValue ? darkColor : color}
          >
            {placeholder}
          </Placeholder>
        )}
        <LabelIcons>
          {canReset && (
            <ResetIcon
              data-testid="select-reset-icon"
              data-visible={!disabled && hasValue}
              onClick={handleReset}
              icon="close"
              size={20}
            />
          )}
          <FontIcon
            icon={state.isOpened ? 'arrow_drop_up' : 'arrow_drop_down'}
            color={theme.get('neutralStronger', { dynamic: true })(props)}
          />
        </LabelIcons>
      </SelectContent>
      {state.isOpened &&
        isClientSide() &&
        createPortal(<Overlay onClick={handleToggle} />, document.body)}
      <Options
        optionDisabled={optionDisabled}
        options={visibleOptions}
        open={state.isOpened}
        multi={multi}
        allSelected={areAllOptionsSelected}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        isOptionSelected={isOptionSelected}
        focusedItem={state.focusedItem}
        annotation={annotation}
        description={description}
        compact={compact}
        canSelectAll={!!canSelectAll}
        selectAllLabel={selectAllLabel}
        onClose={handleToggle}
        wrapperRect={state.wrapperRect}
      />
    </SelectContainer>
  )
}

BaseSelect.defaultProps = {
  multi: false,
  canReset: true,
  filterable: false,
  compact: false,
  optionDisabled: () => false,
  onChange: () => null,
  theme: {} as styledTheme,
}

export default withLabel({ padding: 12 })(withTheme(
  BaseSelect
) as React.ComponentType<SelectProps>)
