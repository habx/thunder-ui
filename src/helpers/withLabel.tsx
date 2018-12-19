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

  padding-bottom: 4px;
`

const withLabel = WrappedComponent => {
  const Field = ({ label, ...props }) => {
    if (label) {
      return (
        <FieldWithLabelContainer>
          <LabelContainer>
            {label}
          </LabelContainer>
          <WrappedComponent {...props} />
        </FieldWithLabelContainer>
      )
    }

    return <WrappedComponent {...props} />
  }

  Field.defaultProps = {
    label: '',
  }

  return Field
}

export default withLabel
