import styled from 'styled-components'

import borderRadius from '../borderRadius'
import fontSizes from '../fontSizes'
import theme from '../theme'

export const StyledTextArea = styled.textarea<{ small?: boolean }>`
  flex: 1 1 100%;
  height: 100%;
  width: 100%;
  display: block;
  padding: 8px 8px 8px 0;

  border: 0;
  color: ${theme.get('neutralStrong', { dynamic: true })};

  resize: vertical;
  border-radius: ${borderRadius.narrow};
  min-height: 50px;
  font-size: ${({ small }) => (small ? fontSizes.small : fontSizes.regular)};

  &:focus {
    background-size: 100% 2px, 100% 1px;
    outline: none;
  }

  &::placeholder,
  &:disabled {
    opacity: 0.5;
    color: ${theme.get('neutralStrong', { dynamic: true })};
  }

  background: transparent no-repeat;
  background-image: linear-gradient(
      to bottom,
      ${theme.get('primary', { dynamic: true })},
      ${theme.get('primary', { dynamic: true })}
    ),
    linear-gradient(
      to bottom,
      ${theme.get('neutralLight', { dynamic: true })},
      ${theme.get('neutralLight', { dynamic: true })}
    );
  background-size: 0 2px, 100% 1px;
  background-position: 50% 100%, 50% 100%;
  transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
`
