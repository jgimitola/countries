import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

import fetchByCCA3Code from '@services/api/fetchByCCA3Code';
import fetchCCA3Codes from '@services/api/fetchCCA3Codes';

export async function getStaticPaths() {
  const countryCodes = await fetchCCA3Codes();

  return {
    paths: countryCodes.map((code) => ({ params: { cca3: code } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { cca3 },
  } = context;

  const countryInfo = await fetchByCCA3Code(cca3);

  return {
    props: { countryInfo: countryInfo[0] },
  };
}

const Country = (props) => {
  const { countryInfo, ...rest } = props;

  if (!countryInfo) return <>Couldn't load country information</>;

  const name = countryInfo.name.common;
  const official = countryInfo.name.official;
  const flagURL = countryInfo.flags.svg;
  const languages = countryInfo.languages
    ? Object.entries(countryInfo.languages)
        .map((entry) => entry[1])
        .join(', ')
    : '';

  return (
    <Box component="main">
      <Container>
        <Image src={flagURL} width={900} height={600} alt="" />
        <Typography variant="h1">{name}</Typography>
        <Typography>{official}</Typography>
        <Typography>{languages}</Typography>
      </Container>
    </Box>
  );
};

export default Country;
