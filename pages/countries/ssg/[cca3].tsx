import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { CountryPageParams, CountryProps } from '@geonatives-types/index';

import CountryInformation from '@components/compounds/CountryInformation';
import ErrorOnLoad from '@components/compounds/ErrorOnLoad/index';

import useParseCountryInformation from '@hooks/useParseCountryInformation';

import fetchByCCA3Code from '@services/api/fetchByCCA3Code';
import fetchCCA3Codes from '@services/api/fetchCCA3Codes';

export const getStaticPaths: GetStaticPaths = async () => {
  const countryCodes: string[] = await fetchCCA3Codes();

  return {
    paths: countryCodes.map((code) => ({ params: { cca3: code } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
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
        <title>{`SSG / ${information.name}`}</title>
      </Head>
      <CountryInformation {...information} />
    </>
  );
};

export default Country;
