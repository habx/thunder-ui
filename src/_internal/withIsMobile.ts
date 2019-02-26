
import withSizes from './withSizes'

const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 600
})

export default (Component) => withSizes(mapSizesToProps)(Component)
