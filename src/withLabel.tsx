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

const withLabel = <RefElement extends HTMLElement>({
  padding = 4,
}: Options = {}) => <Props extends object>(
  WrappedComponent: React.ComponentType<Props>
) => {
  const Field = React.forwardRef<RefElement, Props & LabelReceivedProps>(
    (props, ref) => {
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
            <WrappedComponent {...(rest as Props)} ref={ref} />
          </FieldWithLabelContainer>
        )
      }

      return <WrappedComponent {...(rest as Props)} ref={ref} />
    }
  )

  return Field
}

export default withLabel
