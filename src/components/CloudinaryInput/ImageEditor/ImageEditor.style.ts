import styled from 'styled-components'

import { colors } from '../../../theme'
import BaseSlider from '../../Slider'

export const ImageEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`

export const ImageContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  position: relative;

  & > * {
    max-height: calc(100vh - 350px);
    max-width: calc(100% - 64px);
  }
`

export const OptionsContainer = styled.div`
  flex: 0 0 96px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > i {
    color: ${colors.maastrichtBlue};
    user-select: none;
    margin: 0 24px;
    font-size: 32px;
  }
`

export const OptionContainer = styled.div`
  flex: 0 0 96px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > i {
    color: ${colors.maastrichtBlue};
    user-select: none;
    margin: 0 24px;
    font-size: 32px;
  }
`

export const OptionContent = styled.div``

export const Slider = styled(BaseSlider)`
  width: 450px;
`
