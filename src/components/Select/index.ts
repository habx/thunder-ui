import * as React from 'react'
import withLabel from '../../helpers/withLabel'

import Select from './Select'
import SelectProps from './Select.interface'

const WrappedSelect: React.StatelessComponent<SelectProps> = withLabel({ padding: 16 })(Select)

export default WrappedSelect
