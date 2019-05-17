import * as React from 'react'
import { createPortal } from 'react-dom'

import { isClientSide, ssrDOMRect } from '../_internal/ssr'

import AutoCompleteBoxProps, {
  AutoCompleteBoxState,
} from './AutoCompleteBox.interface'
import {
  AutoCompleteBoxContainer,
  Overlay,
  Options,
  OptionsContent,
} from './AutoCompleteBox.style'
import Option from './Option'

const INITIAL_STATE = {
  isOpened: false,
  query: '',
  focusedItem: null,
  wrapperRect: typeof DOMRect === 'function' ? new DOMRect() : ssrDOMRect,
}

const AutoCompleteBox: React.FunctionComponent<AutoCompleteBoxProps> = ({
  options,
  input: Input,
  onPick,
  onChange,
  ...rest
}) => {
  const wrapperRef = React.useRef(null)
  const optionsRef = React.useRef(null)

  const reducer = (state, action) => {
    switch (action.type) {
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

      case 'OPEN': {
        return { ...state, isOpened: true }
      }

      case 'CLOSE': {
        return { ...state, isOpened: false }
      }

      default: {
        throw new Error(
          `Thunder AutoCompleteBox : Unknown action ${action.type}`
        )
      }
    }
  }

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE) as [
    AutoCompleteBoxState,
    any
  ]

  const handleFocus = React.useCallback(() => dispatch({ type: 'OPEN' }), [
    dispatch,
  ])

  const handleClose = React.useCallback(() => dispatch({ type: 'CLOSE' }), [
    dispatch,
  ])

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'RESIZE' })
    }

    const handleClick = e => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        (optionsRef.current && !optionsRef.current.contains(e.target))
      ) {
        handleClose()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleClick)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
    }
  }, [dispatch, handleClose])

  return (
    <React.Fragment>
      {state.isOpened &&
        isClientSide() &&
        createPortal(
          <React.Fragment>
            <Overlay />
            <Options
              id="options"
              wrapperRect={state.wrapperRect}
              data-open={state.isOpened}
              ref={optionsRef}
            >
              <OptionsContent>
                {options.map(option => (
                  <Option
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    focused={false}
                    label={option.label}
                  />
                ))}
              </OptionsContent>
            </Options>
          </React.Fragment>,
          document.body
        )}
      <AutoCompleteBoxContainer ref={wrapperRef}>
        <Input {...rest} onFocus={handleFocus} onChange={onChange} />
      </AutoCompleteBoxContainer>
    </React.Fragment>
  )
}

export default AutoCompleteBox
