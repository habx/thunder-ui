import styled from 'styled-components'

export const ConfirmModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ConfirmModalContent = styled.div``

export const ConfirmModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;

  & > *:first-child {
    margin-right: 32px;
  }
`
