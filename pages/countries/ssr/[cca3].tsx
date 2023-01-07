import Head from 'next/head';

import CountryInformation from '@components/compounds/CountryInformation';
import ErrorOnLoad from '@components/compounds/ErrorOnLoad/index';

import useParseCountryInformation from '@hooks/useParseCountryInformation';

import fetchByCCA3Code from '@services/api/fetchByCCA3Code';

export async function getServerSideProps(context) {
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
        <title>{`SSR / ${information.name}`}</title>
      </Head>
      <CountryInformation {...information} />
    </>
  );
};

export default Country;
