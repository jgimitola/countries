import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { CountryPageParams, CountryProps } from '@geonatives-types/index';

import CountryInformation from '@components/compounds/CountryInformation';
import ErrorOnLoad from '@components/compounds/ErrorOnLoad/index';

import useParseCountryInformation from '@hooks/useParseCountryInformation';

import fetchByCCA3Code from '@services/api/fetchByCCA3Code';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cca3 } = context.params as CountryPageParams;

  const countryInfo = await fetchByCCA3Code(cca3);

  return {
    props: { countryInfo: countryInfo },
  };
};

const Country = (props: CountryProps) => {
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
