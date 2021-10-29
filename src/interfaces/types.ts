export interface Countries {
  name: string,
  alpha3Code: string,
  capital: string,
  subregion: string,
  region: string,
  population: number,
  borders: string[],
  nativeName: string,
  flags: {
    svg: string,
    png: string
  },
  currencies: currencies,
  languages: languages
}

export interface currencies {
  code : string,
  name: string,
  symbol: string
}

export interface languages {
  iso639_1: string,
  iso639_2: string,
  name: string,
  nativeName: string
}