import styled from 'styled-components'

import { colors } from '../../../theme'

export const ImageEditorContainer = styled.div`
  display: flex;
`

export const ImageContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;

  & > img {
    max-height: calc(100vh - 300px);
    max-width: calc(100% - 128px);
  }
`

export const OptionsContainer = styled.div`
  flex: 0 0 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > i {
    color: ${colors.maastrichtBlue};
    opacity: 0.5;
    transition: opacity 150ms ease-in-out;

    &[data-active="true"] {
      opacity: 1;
    }
  }
`
