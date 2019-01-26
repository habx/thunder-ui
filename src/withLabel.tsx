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
  color: ${colors.paynesGrey};
  user-select: none;

  padding-bottom: ${({ padding }) => padding}px;
`

type LabelProps = {
  label?: string
}

type Options = {
  padding?: number
}

const withLabel = ({ padding = 4 }: Options = {}) => <Props extends object> (WrappedComponent: React.ComponentType<Props>) => {
  const Field = (props: Props & LabelProps) => {
    const { label, ...rest } = props as LabelProps

    if (label) {
      return (
        <FieldWithLabelContainer>
          <LabelContainer padding={padding}>
            {label}
          </LabelContainer>
          <WrappedComponent {...rest as Props} />
        </FieldWithLabelContainer>
      )
    }

    return <WrappedComponent {...rest as Props} />
  }

  Field.displayName = WrappedComponent.displayName || WrappedComponent.name

  return Field
}

export default withLabel
