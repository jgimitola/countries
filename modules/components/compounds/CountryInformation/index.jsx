import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

const CountryInformation = (props) => {
  const { name, officialName, flagURL, languages, ...rest } = props;

  return (
    <Box component="main">
      <Container>
        <Image src={flagURL} width={900} height={600} alt={`Flag of ${name}`} />
        <Typography variant="h1">{name}</Typography>
        <Typography>{officialName}</Typography>
        <Typography>{languages}</Typography>
      </Container>
    </Box>
  );
};

export default CountryInformation;
