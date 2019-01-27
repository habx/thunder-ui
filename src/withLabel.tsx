import * as React from 'react'
import styled from 'styled-components'

import colors from './colors'
import fontSizes from './fontSizes'

const FieldWithLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelContainer = styled.div`
  font-size: ${fontSizes.tiny};
  font-weight: 500;
  color: ${({ color }) => color || colors.paynesGrey};
  user-select: none;

  padding-bottom: ${({ padding }) => padding}px;
`

type LabelProps = {
  label?: string
  labelColor?: string
}

type Options = {
  padding?: number
}

const withLabel = ({ padding = 4 }: Options = {}) => <Props extends object> (WrappedComponent: React.ComponentType<Props>) => {
  const Field = (props: Props & LabelProps) => {
    const { label, labelColor, ...rest } = props as LabelProps

    if (label) {
      return (
        <FieldWithLabelContainer>
          <LabelContainer padding={padding} color={labelColor}>
            {label}
          </LabelContainer>
          <WrappedComponent {...rest as Props} />
        </FieldWithLabelContainer>
      )
    }

    return <WrappedComponent {...rest as Props} />
  }

  Field.displayName = WrappedComponent.displayName || WrappedComponent.name

  Field.defaultProps = WrappedComponent.defaultProps

  Field.propTypes = WrappedComponent.propTypes

  return Field
}

export default withLabel
