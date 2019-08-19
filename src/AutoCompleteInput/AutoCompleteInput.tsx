import * as React from 'react'
import { createPortal } from 'react-dom'

import { isClientSide, ssrClientRect } from '../_internal/ssr'
import { searchInString } from '../_internal/strings'
import { formOption } from '../_internal/types'
import useMergedRef from '../_internal/useMergedRef'
import TextInput from '../TextInput'

import AutoCompleteInputProps, {
  AutoCompleteInputState,
} from './AutoCompleteInput.interface'
import {
  AutoCompleteInputContainer,
  Options,
  OptionsContent,
} from './AutoCompleteInput.style'
import Option from './Option'

const INITIAL_STATE = {
  isOpened: false,
  focusedItem: undefined,
  wrapperRect: typeof DOMRect === 'function' ? new DOMRect() : ssrClientRect,
}

const EMPTY_OPTIONS: formOption[] = []

const AutoCompleteInput = React.forwardRef<
  HTMLInputElement,
  AutoCompleteInputProps
>((props, ref) => {
  const {
    options = EMPTY_OPTIONS,
    inputComponent: Input = TextInput,
    onChange = () => {},
    value = '',
    ...rest
  } = props
  const wrapperRef = useMergedRef<HTMLDivElement>(ref)
  const optionsRef = React.useRef<HTMLDivElement>(null)

  const reducer = (
    state: {
      wrapperRect: ClientRect
      isOpened: boolean
      focusedItem?: HTMLInputElement
    },
    action: { type: string; value?: any }
  ): {
    wrapperRect: ClientRect
    isOpened: boolean
    focusedItem?: HTMLInputElement
  } => {
    switch (action.type) {
      case 'RESIZE': {
        const wrapperRect = wrapperRef.current
          ? wrapperRef.current.getBoundingClientRect()
          : ({} as ClientRect)

        const CLIENT_RECT_KEYS: (keyof ClientRect)[] = [
          'height',
          'width',
          'top',
          'left',
          'right',
          'bottom',
        ]

        if (
          CLIENT_RECT_KEYS.every(
            key => wrapperRect[key] === state.wrapperRect[key]
          )
        ) {
          return state
        }

        return {
          ...state,
          wrapperRect,
        }
      }

      case 'OPEN': {
        return { ...state, isOpened: true }
      }

      case 'CLOSE': {
        return { ...state, isOpened: false }
      }

      case 'REMOVE_FOCUS_ITEM': {
        return { ...state, focusedItem: undefined }
      }

      case 'ADD_FOCUS_ITEM': {
        return { ...state, focusedItem: action.value }
      }

      default: {
        throw new Error(
          `Thunder AutoCompleteInput : Unknown action ${action.type}`
        )
      }
    }
  }

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE) as [
    AutoCompleteInputState,
    any
  ]

  const visibleOptions = React.useMemo(
    () =>
      options.filter(option => {
        const matchValue = searchInString(`${option.value}`, value)
        const matchLabel = searchInString(option.label, value)
        return matchValue || matchLabel
      }),
    [options, value]
  )

  const handleFocus = React.useCallback(() => dispatch({ type: 'OPEN' }), [
    dispatch,
  ])

  const handleClose = React.useCallback(() => dispatch({ type: 'CLOSE' }), [
    dispatch,
  ])

  const handleChange = React.useCallback(
    value => {
      handleClose()
      onChange(value)
      dispatch({ type: 'REMOVE_FOCUS_ITEM' })
    },
    [dispatch, handleClose, onChange]
  )

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'RESIZE' })
    }

    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        (optionsRef.current && !optionsRef.current.contains(e.target as Node))
      ) {
        handleClose()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      if (state.isOpened) {
        const focusedIndex = visibleOptions.findIndex(
          el => el === state.focusedItem
        )

        if (key === 'ArrowDown' && focusedIndex < visibleOptions.length) {
          event.preventDefault()
          dispatch({
            type: 'ADD_FOCUS_ITEM',
            value: visibleOptions[focusedIndex + 1],
          })
        }

        if (key === 'ArrowUp' && focusedIndex > 0) {
          event.preventDefault()
          dispatch({
            type: 'ADD_FOCUS_ITEM',
            value: visibleOptions[focusedIndex - 1],
          })
        }

        if (key === 'Enter' && focusedIndex >= 0) {
          handleChange(state.focusedItem.value)
        }

        if (key === 'Escape') {
          handleClose()
        }
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleClick, true)
    window.addEventListener('keydown', handleKeyDown)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick, true)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    dispatch,
    handleChange,
    handleClose,
    onChange,
    state.focusedItem,
    state.isOpened,
    visibleOptions,
    wrapperRef,
  ])

  return (
    <React.Fragment>
      {state.isOpened &&
        isClientSide &&
        createPortal(
          <React.Fragment>
            <Options
              id="options"
              wrapperRect={state.wrapperRect}
              data-open={state.isOpened}
              ref={optionsRef}
            >
              <OptionsContent>
                {visibleOptions.map(option => (
                  <Option
                    key={option.value}
                    onClick={() => handleChange(option.value)}
                    focused={option === state.focusedItem}
                    label={option.label}
                  />
                ))}
              </OptionsContent>
            </Options>
          </React.Fragment>,
          document.body
        )}
      <AutoCompleteInputContainer ref={wrapperRef}>
        <Input
          {...rest}
          onFocus={handleFocus}
          onChange={onChange}
          value={value}
        />
      </AutoCompleteInputContainer>
    </React.Fragment>
  )
})

export default AutoCompleteInput
