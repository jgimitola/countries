import Link from 'next/link';

import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(
  ({ theme }) => `
  display: flex;
  gap: ${theme.spacing(1)};
  align-items: center;

  color: rgb(0 0 0 / 87%);
  text-decoration: none;
  padding: ${theme.spacing(1)};  
`
);

export default StyledLink;
