import * as React from 'react'

export type ModalFullConfig<
  ContainerElement extends HTMLElement = HTMLDivElement
> = {
  open: boolean
  persistent: boolean
  animated: boolean
  animationDuration: number
  onClose: () => void
  ref?: React.Ref<ContainerElement>
}

export type ModalConfig<
  ContainerElement extends HTMLElement = HTMLDivElement
> = Partial<ModalFullConfig<ContainerElement>>

export enum ModalState {
  opening = 'opening',
  opened = 'opened',
  closing = 'closing',
  closed = 'closed',
}

export type Modal<ContainerElement extends HTMLElement = HTMLDivElement> = {
  state: ModalState
  close: (...args: any[]) => void
  ref: React.Ref<ContainerElement>
  hasAlreadyBeenOpened: boolean
}

const ESCAPE_KEY = 'Escape'

const DEFAULT_CONFIG: Omit<ModalFullConfig<HTMLElement>, 'ref'> = {
  animationDuration: 300,
  animated: false,
  persistent: false,
  open: false,
  onClose: () => {},
}

const useSSRLayoutEffect =
  typeof window === 'object' ? React.useLayoutEffect : React.useEffect

const useMergedRef = <RefElement>(
  ref: React.Ref<RefElement> | null | undefined
): React.RefObject<RefElement> => {
  const innerRef = React.useRef<RefElement>(null)
  return (ref ? ref : innerRef) as React.RefObject<RefElement>
}

const useHasAlreadyBeenOpened = (open: boolean): boolean => {
  const hasAlreadyBeenOpened = React.useRef<boolean>(false)

  if (!hasAlreadyBeenOpened.current && open) {
    hasAlreadyBeenOpened.current = true
  }

  return hasAlreadyBeenOpened.current
}

const useDelayedOpen = (open: boolean, animated: boolean): boolean => {
  const hasAlreadyRendered = React.useRef<boolean>(false)

  const shouldDelayOpening = !hasAlreadyRendered.current && animated && open

  const [canBeOpened, setCanBeOpened] = React.useState<boolean>(
    !shouldDelayOpening
  )

  React.useEffect(() => {
    hasAlreadyRendered.current = true

    if (!canBeOpened) {
      setCanBeOpened(true)
    }
  }, [canBeOpened])

  return !!(canBeOpened && open)
}

const useModal = <ContainerElement extends HTMLElement = HTMLDivElement>(
  baseConfig: ModalConfig<ContainerElement>
): Modal<ContainerElement> => {
  const config: ModalFullConfig<ContainerElement> = {
    ...DEFAULT_CONFIG,
    ...baseConfig,
  }

  const open = useDelayedOpen(config.open, config.animated)
  const hasAlreadyBeenOpened = useHasAlreadyBeenOpened(open)

  const domRef = useMergedRef<ContainerElement>(config.ref)
  const configRef = React.useRef(config)

  const [isLocalOpened, setLocalOpened] = React.useState<boolean>(false)

  React.useEffect(() => {
    configRef.current = config
  })

  useSSRLayoutEffect(() => {
    if (!configRef.current.animated && open !== isLocalOpened) {
      setLocalOpened(open)
    }
  }, [isLocalOpened, open])

  const handleClose = React.useCallback(() => {
    configRef.current.onClose()
  }, [])

  React.useEffect(() => {
    if (configRef.current.animated) {
      const timeout = setTimeout(
        () => setLocalOpened(open),
        configRef.current.animationDuration
      )

      return () => clearTimeout(timeout)
    }
  }, [open])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !configRef.current.persistent &&
        configRef.current.open &&
        e.key === ESCAPE_KEY
      ) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [domRef, handleClose])

  const state = React.useMemo<ModalState>(() => {
    if (!open && !isLocalOpened) {
      return ModalState.closed
    }

    if (!open && isLocalOpened) {
      return ModalState.closing
    }

    if (open && !isLocalOpened) {
      return ModalState.opening
    }

    return ModalState.opened
  }, [open, isLocalOpened])

  return {
    state,
    close: handleClose,
    ref: domRef,
    hasAlreadyBeenOpened,
  }
}

export default useModal
