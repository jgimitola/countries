import { ParsedUrlQuery } from 'querystring';

export interface CountryPageParams extends ParsedUrlQuery {
  cca3: string;
}

export interface CountryProps {
  countryInfo: CountryResponse;
}

export interface CountryResponse {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: string;
  unMember: boolean;
  currencies?: Currencies;
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: string;
  subregion?: string;
  languages?: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: CoatOfArms;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  borders?: string[];
  gini?: { [key: string]: number };
  postalCode?: PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currencies {
  [code: string]: { name: string; symbol?: string };
}

export interface Demonyms {
  eng: Gender;
  fra?: Gender;
}

export interface Gender {
  f: string;
  m: string;
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}
