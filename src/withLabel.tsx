import * as React from 'react'
import styled from 'styled-components'

import fontSizes from './fontSizes'
import theme from './theme'

const FieldWithLabelContainer = styled.div``
const LabelContainer = styled.div<{ padding: number }>`
  font-size: ${fontSizes.tiny};
  font-weight: 500;
  color: ${theme.get('neutral', { dynamic: true })};
  user-select: none;

  padding-bottom: ${({ padding }) => padding}px;
`

type LabelReceivedProps = {
  label?: string
  labelColor?: string
}

type Options = {
  padding?: number
}

const withLabel = ({ padding = 4 }: Options = {}) => <Props extends object>(
  WrappedComponent: React.ComponentType<Props>
) => {
  const Field: React.FunctionComponent<Props & LabelReceivedProps> = props => {
    const { label, labelColor, ...rest } = props as LabelReceivedProps

    if (label) {
      return (
        <FieldWithLabelContainer className="thunder-label-line">
          <LabelContainer
            padding={padding}
            color={labelColor ? labelColor : undefined}
          >
            {label}
          </LabelContainer>
          <WrappedComponent {...(rest as Props)} />
        </FieldWithLabelContainer>
      )
    }

    return <WrappedComponent {...(rest as Props)} />
  }

  Field.displayName = WrappedComponent.displayName || WrappedComponent.name

  Field.defaultProps = WrappedComponent.defaultProps

  Field.propTypes = WrappedComponent.propTypes

  return Field
}

export default withLabel
