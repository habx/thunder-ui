import * as React from 'react'

import { dispatch, types } from '../HabxProvider/HabxProvider.events'
import { ConfirmModalOptions } from './ConfirmModals.interface'

const confirm = (message: string, options: ConfirmModalOptions = {}) => dispatch(types.CONFIRM_MODAL, message, options)

export default confirm
