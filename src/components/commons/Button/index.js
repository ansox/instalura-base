import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../theme/utils/breakpointsMedia';
import propToStyle from '../../theme/utils/propToStyle';

const ButtonGhost = css`
  background-color: transparent;
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
`;

const ButtonDefault = css`
  background-color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.contrastText`)};
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;

  ${TextStyleVariantsMap.smallestException}
  
  ${(props) => {
    if (props.ghost) {
      return ButtonGhost;
    }

    return ButtonDefault;
  }}

  transition: ${({ theme }) => theme.transition};
  border-radius: ${({ theme }) => theme.borderRaidus};

  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

  &:hover,
  &:focus {
    opacity: 0.5;
  }
  ${propToStyle('margin')}
  ${propToStyle('display')}
`;

export default Button;
