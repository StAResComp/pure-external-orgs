class InvalidApiKeyError extends Error {
    constructor(m?: string) {
        super(m || "Error: invalid API Key !");

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidApiKeyError.prototype);
    }

}

export class ApiKey {

  protected apiKey;
  private apiKeyFormat = new RegExp('^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$');

  public constructor(apiKeyStr: string) {
    if (this.apiKeyFormat.test(apiKeyStr)) {
      this.apiKey = apiKeyStr;
    }
    else {
      throw new InvalidApiKeyError();
    }
  }

  public toString() {
    return this.apiKey;
  }

}

export class Pure {

  public url: URL;
  public apiPath = '/ws/api';
  public extOrgSearchEndpoint = '/external-organizations/search';

  public constructor(
    public apiKey: ApiKey,
    urlStr = ''
  ) {
    this.url = new URL(urlStr || 'https://riswebtest.st-andrews.ac.uk');
  }

  public get extOrgSearchUrl() {
    const url = this.url;
    url.pathname = '/api' + this.apiPath + this.extOrgSearchEndpoint;
    return url;
  }

}

interface PureItem {

  pureId: number;
  uuid: string;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
  externallyManaged: boolean;
  version: string

}

export type PureResponse = {

  count: number;
  pageInformation: {offset: number, size: number};
  navigationLinks?: { ref: string, href: string };
  items: Array<ExternalOrganization>;

}

export interface ExternalOrganization extends PureItem {

  portalUrl?: string;
  prettyUrlIdentifiers?: Array<string>;
  previousUuids?: Array<string>;
  name?: { en_GB?: string };
  type?: {
    uri?: string,
    link?: { ref?: string, href?: string },
    term?: { en_GB?: string }
  };
  natureTypes?: Array<{
    uri?: string,
    link?: { ref?: string, href?: string },
    term?: { en_GB?: string }
  }>;
  acronym?: string;
  alternativeNames?: Array<string>;
  identifiers?: Array<{ typeDiscriminator?: string }>;
  address?: {
    address1?: string,
    address2?: string,
    address3?: string,
    address4?: string,
    address5?: string,
    postalCode?: string,
    city?: string,
    country?: {
      uri?: string,
      link?: { ref?: string, href?: string },
      term?: { en_GB?: string }
    },
    subdivision?: {
      uri?: string,
      link?: { ref?: string, href?: string },
      term?: { en_GB?: string }
    },
    state?: string,
    geoLocation?: {
      point?: string,
      polygon?: string,
      calculatedPoint?: string,
    }
  };
  phoneNumber?: string,
  mobilePhoneNumber?: string,
  fax?: string,
  email?: string,
  bankAccountNumber?: string,
  vatNumber?: string,
  documents?: Array<{
    pureId?: number,
    fileId?: string,
    fileName?: string,
    mimeType?: string,
    size?: number,
    url?: string,
    title?: string,
    type?: {
      uri?: string,
      link?: { ref?: string, href?: string },
      term?: { en_GB?: string }
    },
    license?: {
      uri?: string,
      link?: { ref?: string, href?: string },
      term?: { en_GB?: string }
    },
    visibleOnPortalDate?: Date,
    visibility?: { key?: string, description?: { en_GB?: string } },
    creator?: string,
    created?: Date,
  }>;
  images?: Array<{
    pureId?: number,
    fileId?: string,
    fileName?: string,
    mimeType?: string,
    size?: number,
    url?: string,
    type?: {
      uri?: string,
      link?: { ref?: string, href?: string },
      term?: { en_GB?: string }
    }
  }>;
  links?: Array<{
    pureId?: number,
    url?: string,
    description?: { en_GB?: string },
    linkType?: {
      uri?: string,
      link?: { ref?: string, href?: string },
      term?: { en_GB?: string }
    }
  }>;
  keywordGroups?: Array<{
    pureId?: number,
    typeDiscriminator?: string,
    logicalName?: string,
    name?: { en_GB?: string }
  }>;
  note?: string;
  visibility?: { key?: string, description?: { en_GB?: string } };
  workflow?: { step?: string, description?: { en_GB?: string } };
  systemName?: string

}
