import { environment } from '../environments/environment';

class InvalidApiKeyError extends Error {
    constructor(m?: string) {
        super(m || "Error: that doesn't look like an API key!");

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

type Proxy = {
  target: string,
  proxy: string
}

export class Pure {

  public url: URL;
  public apiKey: ApiKey;
  public apiPath = '/ws/api';
  public extOrgSearchEndpoint = '/external-organizations/search';
  public extOrgMergeEndpoint = '/external-organizations/merge';
  private proxies: Array<Proxy> = [
    {
      target: environment.pureTestUrl,
      proxy: environment.pureTestProxyUrl
    },
    {
      target: environment.pureLiveUrl,
      proxy: environment.pureLiveProxyUrl
    }
  ];

  public constructor(
    apiKey: string,
    urlStr: string
  ) {
    try {
      const proxy = this.proxies.find(p => p.target === urlStr.trim());
      if (proxy) {
        this.url = new URL(proxy.proxy);
      }
      else{
        this.url = new URL(urlStr);
      }
      this.apiKey = new ApiKey(apiKey);
    }
    catch (e) {
      throw(e);
    }
  }

  public get extOrgSearchUrl() {
    const url = this.url;
    url.pathname = url.pathname + this.apiPath + this.extOrgSearchEndpoint;
    return url;
  }

  public get extOrgMergeUrl() {
    const url = this.url;
    url.pathname = url.pathname + this.apiPath + this.extOrgMergeEndpoint;
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
