import * as React from 'react'
import styled from 'styled-components'

import { colors, fontSizes } from '../theme'

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

const withLabel = (config: { padding?: number } = {}) => WrappedComponent => {
  const Field: React.StatelessComponent<any> = ({ label, ...props }) => {
    if (label) {
      const { padding = 4 } = config
      return (
        <FieldWithLabelContainer>
          <LabelContainer padding={padding}>
            {label}
          </LabelContainer>
          <WrappedComponent {...props} />
        </FieldWithLabelContainer>
      )
    }

    return <WrappedComponent {...props} />
  }

  Field.defaultProps = {
    label: ''
  }

  return Field
}

export default withLabel
