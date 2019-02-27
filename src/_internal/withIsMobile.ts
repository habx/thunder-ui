import withSizes from './withSizes'

const mapSizesToProps = ({ width }) => ({
  isMobile: width <= 600
})

const withIsMobile = Component => withSizes(mapSizesToProps)(Component)

export default withIsMobile
