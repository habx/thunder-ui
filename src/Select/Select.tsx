import get from 'lodash.get'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { withTheme } from 'styled-components'

import { isNil, has, isString } from '../_internal/data'
import { isClientSide, ssrDOMRect } from '../_internal/ssr'
import { searchInString } from '../_internal/strings'
import { formOption, formValue, styledTheme } from '../_internal/types'
import FontIcon from '../FontIcon'
import theme from '../theme'
import withLabel from '../withLabel'

import Options from './Options'
import SelectProps, {
  SelectInnerProps,
  SelectReducerState,
  SelectState,
} from './Select.interface'
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

const useOptions = ({ rawOptions }: { rawOptions: formValue[] }) =>
  React.useMemo(() => {
    if (!rawOptions) {
      return []
    }

    return rawOptions.map(option => ({
      value: get(option, 'value', option),
      label: get(option, 'label', option),
    }))
  }, [rawOptions])

const useValue = ({
  rawValue,
  multi,
  options,
}: {
  rawValue: formValue | formValue[]
  multi: boolean
  options: formOption[]
}) =>
  React.useMemo(() => {
    const cleanValue = (value: formValue) => {
      if (isNil(value)) {
        return { value, label: 'No value' }
      }

      if (has(value as formOption, 'value')) {
        return value
      }

      const matchingOption = options.find(el => el.value === value)
      return {
        value,
        label: matchingOption ? matchingOption.label : value,
      } as formValue
    }

    if (multi) {
      return rawValue ? (rawValue as formValue[]).map(cleanValue) : []
    }

    return cleanValue(rawValue as formValue)
  }, [multi, rawValue, options])

const useValueFormat = ({
  rawValueFormat,
  rawValue,
  multi,
}: {
  rawValue: formOption | formOption[]
  multi: boolean
  rawValueFormat: 'full' | 'simple' | undefined
}) =>
  React.useMemo(() => {
    if (
      [FORMAT_VALUE_FULL, FORMAT_VALUE_SIMPLE].includes(rawValueFormat || '')
    ) {
      return rawValueFormat
    }

    if (multi) {
      if (!rawValue || (rawValue as formValue[]).length === 0) {
        return FORMAT_VALUE_SIMPLE
      }

      return (rawValue as formOption[]).length > 0 &&
        has((rawValue as formOption[])[0], 'value')
        ? FORMAT_VALUE_FULL
        : FORMAT_VALUE_SIMPLE
    }

    return has(rawValue, 'value') ? FORMAT_VALUE_FULL : FORMAT_VALUE_SIMPLE
  }, [rawValueFormat, multi, rawValue])

const useVisibleOptions = ({
  query,
  options,
}: {
  query: string
  options: formOption[]
}) =>
  React.useMemo((): formOption[] => {
    return options.filter(option => {
      const matchValue = searchInString(`${option.value}`, query)
      const matchLabel =
        isString(option.label) && searchInString(option.label, query)
      return matchValue || matchLabel
    })
  }, [options, query])

const useSelectedOptions = ({
  options,
  value,
  multi,
}: {
  options: formOption[]
  value: formValue | formValue[]
  multi: boolean
}) =>
  React.useMemo(() => {
    if (!value) {
      return null
    }

    if (multi) {
      return options.filter(el => (value as formOption[]).includes(el.value))
    }

    return options.find(el => el.value === (value as formOption).value)
  }, [multi, options, value])

const usePlaceholder = ({
  rawPlaceholder,
  selectedOptions,
  multi,
}: {
  rawPlaceholder?: string
  selectedOptions?: formOption | formOption[] | null
  multi: boolean
}) =>
  React.useMemo(() => {
    if (multi) {
      return rawPlaceholder
    }

    return selectedOptions
      ? (selectedOptions as formOption).label
      : rawPlaceholder
  }, [selectedOptions, rawPlaceholder, multi])

const BaseSelect: React.FunctionComponent<SelectInnerProps> = ({
  multi = false,
  description,
  placeholderClassName,
  icon,
  annotation,
  canReset = true,
  disabled,
  filterable = false,
  compact = false,
  canSelectAll,
  selectAllLabel,
  optionDisabled = () => false,
  value: rawValue,
  options: rawOptions,
  valueFormat: rawValueFormat,
  placeholder: rawPlaceholder,
  onChange = () => null,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const reducer = (
    state: SelectReducerState,
    action: { type: string; value: any }
  ) => {
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
          wrapperRect: wrapperRef.current
            ? wrapperRef.current.getBoundingClientRect()
            : ({} as DOMRect),
        }
      }

      case 'REMOVE_FOCUS_ITEM': {
        return { ...state, focusedItem: null }
      }

      case 'ADD_FOCUS_ITEM': {
        if (!action.value) {
          return state
        }
        return { ...state, focusedItem: action.value }
      }

      case 'RESIZE': {
        return {
          ...state,
          wrapperRect: wrapperRef.current
            ? wrapperRef.current.getBoundingClientRect()
            : ({} as DOMRect),
        }
      }

      default: {
        throw new Error(`Thunder Select : Unknown action ${action.type}`)
      }
    }
  }

  const [state, dispatch] = React.useReducer(reducer, {
    isOpened: false,
    query: '',
    wrapperRect: typeof DOMRect === 'function' ? new DOMRect() : ssrDOMRect,
    focusedItem:
      rawValueFormat === 'simple'
        ? get(rawValue, 'value') || rawValue
        : rawValue,
  }) as [SelectState, any]

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
      dispatch({ type: 'ADD_FOCUS_ITEM', value: cleanOption })
    },
    [dispatch, getCleanValue, onChange]
  )

  const handleSelectMulti = React.useCallback(
    option => {
      const isSelected = (value as formOption[]).some((el: formOption) =>
        has(el, 'value') ? el.value === option.value : el === option.value
      )

      if (isSelected) {
        const newValue = (value as formOption[])
          .filter((el: formOption) =>
            has(el, 'value') ? el.value !== option.value : el !== option.value
          )
          .map(getCleanValue)
        onChange(newValue)
      } else {
        const newValue = [...(value as formOption[]), option].map(getCleanValue)
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
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      if (state.isOpened) {
        const focusedIndex = visibleOptions.findIndex(
          el =>
            el === state.focusedItem ||
            get(state, 'focusedItem.value') === get(el, 'value') ||
            get(el, 'value') === state.focusedItem
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
    state,
    state.focusedItem,
    state.isOpened,
    visibleOptions,
  ])

  const isOptionSelected = React.useCallback(
    option => {
      if (multi) {
        return (value as formOption[]).some(
          (el: formOption) => el.value === option.value
        )
      }

      return value ? option.value === (value as formOption).value : false
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
    return options.length === (value as formOption[]).length
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
        isClientSide &&
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
  theme: {} as styledTheme,
}

export default withLabel({ padding: 12 })(withTheme(
  BaseSelect
) as React.ComponentType<SelectProps>)
