import * as React from 'react'

import { isFunction } from './data'

export type ModalParams = {
  open?: boolean
  persistent?: boolean
  animated?: boolean
  animationDuration?: number
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
}

export type ModalState = {
  state: 'opened' | 'closed' | 'opening' | 'closing'
  close: (e?: Event) => void
  overlayClick: (e: React.MouseEvent<HTMLElement>) => void
  ref: React.RefObject<HTMLDivElement>
}

const ESCAPE_KEY = 27

const useModal = ({
  animated,
  animationDuration,
  ...restParams
}: ModalParams): ModalState => {
  const params = { animated, animationDuration, ...restParams } as ModalParams

  const timeout = React.useRef(null)
  const domRef = React.useRef(null)
  const paramsRef = React.useRef(params)

  const [isLocalOpened, setLocalOpened] = React.useState(false)

  React.useEffect(() => {
    paramsRef.current = params
  })

  const handleClose = React.useCallback((e = null) => {
    if (isFunction(paramsRef.current.onClose)) {
      paramsRef.current.onClose(e)
    }
  }, [])

  const handleOverlayClick = React.useCallback(
    e => {
      if (
        !paramsRef.current.persistent &&
        paramsRef.current.open &&
        !domRef.current.contains(e.target)
      ) {
        handleClose(e)
      }
    },
    [handleClose]
  )

  React.useEffect(() => {
    if (paramsRef.current.animated) {
      timeout.current = setTimeout(
        () => setLocalOpened(params.open),
        paramsRef.current.animationDuration
      )
    }
  }, [params.open])

  React.useEffect(() => {
    const handleKeyDown = e => {
      if (
        !paramsRef.current.persistent &&
        paramsRef.current.open &&
        e.keyCode === ESCAPE_KEY
      ) {
        handleClose(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timeout.current)
    }
  }, [handleClose])

  const state = React.useMemo(() => {
    if (!params.open && !isLocalOpened) {
      return 'closed'
    }

    if (!params.open && isLocalOpened) {
      return 'closing'
    }

    if (params.open && !isLocalOpened) {
      return 'opening'
    }

    return 'opened'
  }, [isLocalOpened, params.open])

  return {
    state,
    close: handleClose,
    overlayClick: handleOverlayClick,
    ref: domRef,
  }
}

export default useModal
