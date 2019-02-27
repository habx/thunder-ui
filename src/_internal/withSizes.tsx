import * as React from 'react'

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
const getWindowHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
const getWindowSizes = () => ({ width: getWindowWidth(), height: getWindowHeight() })

const withSizes = (mapSizesToProps) => <P extends object>(Component: React.ComponentType<P>) =>
  class WithSizesHOC extends React.PureComponent<any, any> {
    static displayName = `WithSizes(${Component.displayName})`
    state = getWindowSizes()

    componentDidMount () {
      window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
      this.setState(getWindowSizes)
    }

    render () {
      const additionalProps = mapSizesToProps(this.state)
      return <Component {...this.props} {...additionalProps} />
    }
  }

export default withSizes
