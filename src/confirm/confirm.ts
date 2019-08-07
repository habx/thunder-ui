import { dispatch, types } from '../ThunderProvider/ThunderProvider.events'

import { ConfirmModalOptions } from './ConfirmModals.interface'

const confirm = (
  message: string,
  options: ConfirmModalOptions = {}
): Promise<boolean> =>
  dispatch(types.CONFIRM_MODAL, false, message, options) as Promise<boolean>

export default confirm
