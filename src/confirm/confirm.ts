import { dispatch, types } from '../ThunderProvider/ThunderProvider.events'
import { ConfirmModalOptions } from './ConfirmModals.interface'

const confirm = (message: string, options: ConfirmModalOptions = {}) => dispatch(types.CONFIRM_MODAL, false, message, options)

export default confirm
