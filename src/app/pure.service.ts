import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pure, PureResponse } from './pure.model';
import { EMPTY  } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PureService {

  public headers = new HttpHeaders({
    'accept': 'application/json',
    'ContentType': 'application/json'
  })
  public pure?: Pure;

  constructor(private http: HttpClient) {}

  private post(body: Object, endpoint: URL) {
    if (this.pure) {
      return this.http.post<PureResponse>(endpoint.href, body, {
        headers: this.headers.set('api-key', this.pure.apiKey.toString())
      });
    }
    else {
      return EMPTY;
    }
  }

  public extOrgSearch(searchString: string) {
    if (this.pure) {
      return this.post({searchString, size: 1000}, this.pure.extOrgSearchUrl);
    }
    else {
      return EMPTY;
    }
  }

  public extOrgMerge(target: string, toMerge: Array<string>) {
    const body = {items: [{uuid: target, systemName: 'ExternalOrganization'}]};
    for (let orgId of toMerge) {
      if (orgId !== target) {
        body.items.push({uuid: orgId, systemName: 'ExternalOrganization'});
      }
    }
    if (this.pure) {
      return this.post(body, this.pure.extOrgMergeUrl);
    }
    else {
      return EMPTY;
    }
  }
}
