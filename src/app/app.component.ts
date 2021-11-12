import { Component, Injectable, TemplateRef } from '@angular/core';
import { Pure, ApiKey, ExternalOrganization } from './pure.model';
import { PureService } from './pure.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'pure-external-orgs';
  public pureUrl = 'http://localhost:4200';
  public apiKey = '';
  public searchString = '';
  public results?: Array<ExternalOrganization> = [];
  public targetOrg?: number = undefined;
  public orgsToMerge: Array<number> = [];
  public focusOrg?: ExternalOrganization;
  public busy = false;

  constructor(
    private pureService: PureService,
    private modalService: NgbModal
  ){}

  public search(): void {
    if (!this.busy) {
      this.busy = true;
      this.pureService.pure = new Pure(new ApiKey(this.apiKey), this.pureUrl);
      this.pureService.extOrgSearch(this.searchString).subscribe(
        (response) => {
          this.results = response.items;
          this.focusOrg = this.results[0];
          this.busy = false;
        },
        (error) => {
          console.log(error);
          this.busy = false;
        }
      );
    }
  }

  public focusOn(pureId: number, content: TemplateRef<any>) {
    this.focusOrg = this.results?.filter(org => org.pureId === pureId)[0];
    this.modalService.open(
      content,
      {ariaLabelledBy: 'detailModalLabel', size: 'xl'}
    );
  }

  public isOrgToBeMerged(pureId: number) {
    return this.orgsToMerge.find(elem => elem === pureId);
  }

  public toggleToMerge(pureId: number, toMergeEvent: Event) {
    const currentlyToBeMerged = this.isOrgToBeMerged(pureId);
    const toMerge = (toMergeEvent.target as HTMLInputElement).checked;
    if (toMerge && !currentlyToBeMerged) {
      this.orgsToMerge.push(pureId);
    }
    else if (!toMerge && currentlyToBeMerged) {
      this.orgsToMerge.splice(this.orgsToMerge.indexOf(pureId, 0), 1);
    }
    console.log(this.targetOrg);
    console.log(this.orgsToMerge);
  }
}
