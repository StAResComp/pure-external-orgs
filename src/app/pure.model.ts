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
  public apiPath = 'ws/api';
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
    url.pathname = Pure.createPath(url.pathname, this.apiPath, this.extOrgSearchEndpoint);
    return url;
  }

  public get extOrgMergeUrl() {
    const url = this.url;
    url.pathname = Pure.createPath(url.pathname, this.apiPath, this.extOrgMergeEndpoint);
    return url;
  }

  private static createPath(...parts: string[]) {
    const strippedParts: string[] = [];
    for (const p of parts) {
      strippedParts.push(p.replace(/^\/|\/$/g, ''));
    }
    return '/' + strippedParts.join('/');
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
  name?: { en_GB?: string };
  [x: string]: unknown;
}
