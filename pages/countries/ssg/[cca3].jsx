import Head from 'next/head';

import CountryInformation from '@components/compounds/CountryInformation';
import ErrorOnLoad from '@components/compounds/ErrorOnLoad';

import useParseCountryInformation from '@hooks/useParseCountryInformation';

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

  if (!countryInfo) return <ErrorOnLoad />;

  const information = useParseCountryInformation(countryInfo);

  return (
    <>
      <Head>
        <title>{`SSG / ${information.name}`}</title>
      </Head>
      <CountryInformation {...information} />
    </>
  );
};

export default Country;
