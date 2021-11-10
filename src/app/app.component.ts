import { Component, Injectable } from '@angular/core';
import { Pure, ApiKey, ExternalOrganization } from './pure.model';
import { PureService } from './pure.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'pure-external-orgs';
  public pureUrl = 'https://riswebtest.st-andrews.ac.uk';
  public apiKey = '';
  public searchString = '';
  public results?: Array<ExternalOrganization> = [];
  public busy = false;

  constructor(private pureService: PureService){}

  public search(): void {
    if (!this.busy) {
      this.busy = true;
      this.pureService.pure = new Pure(new ApiKey(this.apiKey), this.pureUrl);
      this.pureService.extOrgSearch(this.searchString).subscribe(
        (response) => {
          this.results = response.items;
          this.busy = false;
        },
        (error) => {
          console.log(error);
          this.busy = false;
        }
      );
    }
  }
}
