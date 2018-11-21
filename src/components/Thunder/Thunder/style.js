import styled from 'styled-components'

export const ThunderModalContainer = styled.div`
  background-color: rgba(0,0,0, 0.1);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-top: 10%;
  align-items:flex-start;
  align-content:flex-start;
  z-index: 999999;
`

export const ThunderModal = styled.div`
  background-color: white;
  width: 600px;
  border-radius: 8px;
  padding: 0 0 32px;
  max-height: 70%;
  box-shadow: 0 4px 12px 0 rgba(3, 54, 61, 0.16);
  display: flex;
  flex-direction: column;
`
