import styled, {css} from "styled-components";
import get from "lodash/get";

const ButtonGhost = css`
  background-color: transparent;
  color: ${({theme, variant}) => get(theme , `colors.${variant}.color`)};
`

const ButtonDefault = css`
  background-color: ${({theme, variant}) => get(theme, `colors.${variant}.color`)};
  color: ${({theme, variant}) => get(theme , `colors.${variant}.contrastText`)};
`

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  
  ${props => {
    if (props.ghost) {
      return ButtonGhost;
    }

    return ButtonDefault;
  }}

  transition: ${({theme}) => theme.transition};
  border-radius: ${({theme}) => theme.borderRaidus};

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;
