import styled from 'styled-components'

import { shadows } from '../../../theme'

import Modal from '../../Modal'

export const ImageUploaderContainer = styled(Modal)``

export const HeaderContainer = styled.div``

export const ImageList = styled.div`
  position: relative;
  margin: 0 -32px;
  width: 800px;
  min-height: 400px;
`

export const ImageContainer = styled.div`
  width: 33%;
  display: inline-block;
  box-sizing: border-box;
  padding: 16px;

  img {
    width: 100%;
    transition: box-shadow, opacity 150ms ease-in-out;
    box-shadow: ${shadows.light};
    cursor: pointer;

    &:hover {
      box-shadow: ${shadows.strong};
    }

    &[data-fade="true"] {
      opacity: 0.5;
      filter: grayscale();
    }
  }
`
