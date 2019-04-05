import get from 'lodash.get'

const theme = {
  get: path => ({ theme }) => get(theme, `thunderUI.${path}`)
}

export default theme
