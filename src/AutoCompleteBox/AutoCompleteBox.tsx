import * as React from 'react'
import { createPortal } from 'react-dom'

import { isClientSide, ssrDOMRect } from '../_internal/ssr'

import AutoCompleteBoxProps, {
  AutoCompleteBoxState,
} from './AutoCompleteBox.interface'
import { Overlay } from './AutoCompleteBox.style'
import Option from './Option'

const INITIAL_STATE = {
  isOpened: false,
  query: '',
  focusedItem: null,
  wrapperRect: typeof DOMRect === 'function' ? new DOMRect() : ssrDOMRect,
}

const AutoCompleteBox: React.FunctionComponent<AutoCompleteBoxProps> = ({
  options,
  onPick,
  onClose,
}) => {
  const wrapperRef = React.useRef(null)

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

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'RESIZE' })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch, state.focusedItem, state.isOpened])

  return (
    <React.Fragment>
      {state.isOpened &&
        isClientSide() &&
        createPortal(<Overlay onClick={onClose} />, document.body)}
      {options.map(option => (
        <Option
          key={option.value}
          onClick={() => null}
          focused={false}
          label={option.label}
        />
      ))}
    </React.Fragment>
  )
}

export default AutoCompleteBox
