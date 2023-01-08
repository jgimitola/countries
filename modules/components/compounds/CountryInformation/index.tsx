import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Container, Typography } from '@mui/material';

import { CountryInformation as CountryInformationProps } from '@hooks/useParseCountryInformation';

const CountryInformation = (props: CountryInformationProps) => {
  const { name, officialName, flagURL, languages, ...rest } = props;

  return (
    <Box component="main">
      <Container>
        {flagURL && (
          <Image
            src={flagURL}
            width={900}
            height={600}
            alt={`Flag of ${name}`}
          />
        )}

        <Typography variant="h1">{name}</Typography>
        <Typography>{officialName}</Typography>
        <Typography>{languages}</Typography>

        <Link href="/" passHref>
          <Button variant="outlined">Back</Button>
        </Link>
      </Container>
    </Box>
  );
};

export default CountryInformation;
