import styled from 'styled-components'

import { shadows, colors } from '../../../theme'

import Modal from '../../Modal'

export const ImageUploaderContainer = styled(Modal)`
  padding: 0;
  width: 800px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 48px;

  height: 48px;
  padding: 0 16px;

  background-color: ${colors.brightCerualean};
  color: ${colors.paynesGrey};
`

export const Content = styled.div`
  flex: 1 1 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${colors.platinium};
`

export const ImageList = styled.div`
  position: relative;
  margin: 32px 0;
`

export const ImageContainer = styled.div`
  width: 33%;
  display: inline-block;
  box-sizing: border-box;
  padding: 16px;

  img {
    width: 100%;
    transition: box-shadow, opacity 150ms ease-in-out;
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

export const Directories = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 32px 0;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const Directory = styled.li`
  display: flex;
  align-items: center;

  height: 48px;
  line-height: 48px;
  padding: 0 16px;
  transition: background-color 150ms ease-in-out;
  cursor: pointer;
  color: ${colors.paynesGrey};

  &:hover {
    background-color: ${colors.snow};
  }
`

export const DirectoryContent = styled.div`
  padding-left: 16px;
`

export const ActionBarContainer = styled.div`
  position: absolute;
  height: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`
