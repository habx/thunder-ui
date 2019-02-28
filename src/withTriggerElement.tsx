import * as React from 'react'

import { isFunction } from './_internal/data'

type TriggerElementProps = {
  triggerElement: ((state: TriggerElementState) => JSX.Element) | JSX.Element
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
}
type TriggerElementState = {
  open: boolean
}

const withTriggerElement = <Props extends TriggerElementState> (WrappedComponent: React.ComponentType<Props>) => {
  const Wrapper = (props: Props & TriggerElementProps) => {
    const { triggerElement, onClose, ...rest } = props as TriggerElementProps

    const [open, setOpen] = React.useState(false)

    const handleToggle = React.useMemo(
      () => () => setOpen(wasOpen => !wasOpen),
      []
    )

    const handleClose = React.useMemo(
      () => e => {
        if (isFunction(onClose)) {
          onClose(e)
        }

        setOpen(false)
      },
      [onClose]
    )

    return (
      <React.Fragment>
        {
          isFunction(triggerElement)
            ? triggerElement({ open })
            : React.cloneElement(triggerElement, { onClick: handleToggle })
        }
        <WrappedComponent {...rest as Props} open={open} onClose={handleClose} />
      </React.Fragment>
    )
  }

  Wrapper.displayName = WrappedComponent.displayName || WrappedComponent.name

  Wrapper.defaultProps = WrappedComponent.defaultProps

  Wrapper.propTypes = WrappedComponent.propTypes

  return Wrapper
}

export default withTriggerElement
