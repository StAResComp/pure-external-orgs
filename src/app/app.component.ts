import { Component, Injectable } from '@angular/core';
import { Pure, ApiKey } from './pure.model';
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
  public results?: any = null;

  constructor(private pureService: PureService){}

  public search(): void {
    this.pureService.pure = new Pure(new ApiKey(this.apiKey), this.pureUrl);
    this.pureService.extOrgSearch(this.searchString).subscribe(
      (response) => { this.results = response; console.log(this.results); },
      (error) => { console.log(error); }
    );
  }

}
