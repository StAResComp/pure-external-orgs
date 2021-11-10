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
