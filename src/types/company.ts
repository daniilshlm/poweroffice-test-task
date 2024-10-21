export interface Company {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: {
    kode: string;
    beskrivelse: string;
    links: string[];
  };
  registreringsdatoEnhetsregisteret: string;
  registrertIMvaregisteret: boolean;
  naeringskode1: {
    kode: string;
    beskrivelse: string;
  };
  hjelpeenhetskode: {
    kode: string;
    beskrivelse: string;
  };
  harRegistrertAntallAnsatte: boolean;
  forretningsadresse: {
    land: string;
    landkode: string;
    postnummer: string;
    poststed: string;
    adresse: string[];
    kommune: string;
    kommunenummer: string;
  };
  stiftelsesdato: string;
  institusjonellSektorkode: {
    kode: string;
    beskrivelse: string;
  };
  registrertIForetaksregisteret: boolean;
  registrertIStiftelsesregisteret: boolean;
  registrertIFrivillighetsregisteret: boolean;
  sisteInnsendteAarsregnskap: string;
  konkurs: string;
  underAvvikling: boolean;
  underTvangsavviklingEllerTvangsopplosning: boolean;
  maalform: string;
  vedtektsdato: string;
  vedtektsfestetFormaal: string[];
  aktivitet: string[];
  registreringsdatoForetaksregisteret: string;
  registrertIPartiregisteret: boolean;
  links: string[];
}

export interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  totalItems: number;
}

export interface FetchCompaniesPayload {
  navn: string;
  organisasjonsnummer?: string;
  sort?: string;
  size?: string;
  page?: string;
}
