import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const WrappedComponent = (props) => (
  <Typography component="a" {...props}>
    {props.children}
  </Typography>
);

const StyledLink = styled(WrappedComponent)(
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
