import { Component, Injectable, TemplateRef } from '@angular/core';
import { Pure, ExternalOrganization } from './pure.model';
import { PureService } from './pure.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
  type: string;
  message: string;
}

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
  public targetOrg?: string = undefined;
  public orgsToMerge: Array<string> = [];
  public focusOrg?: ExternalOrganization;
  public loading = false;
  public merging = false;
  public success = '';
  public error = '';

  constructor(
    private pureService: PureService,
    private modalService: NgbModal
  ){}

  public search(): void {
    if (!this.loading && !this.merging) {
      this.loading = true;
      try {
        this.pureService.pure = new Pure(this.apiKey, this.pureUrl);
        this.pureService.extOrgSearch(this.searchString).subscribe(
          (response) => {
            this.results = response.items;
            this.success = `Retrieved ${response.count} External Organization records from Pure`;
            this.clearSelection();
            this.focusOrg = this.results[0];
            this.loading = false;
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
      }
      catch (e) {
        this.error = (e as Error).message;
        this.loading = false;
      }
    }
  }

  public focusOn(uuid: string, content: TemplateRef<any>) {
    this.focusOrg = this.results?.filter(org => org.uuid === uuid)[0];
    this.modalService.open(
      content,
      {ariaLabelledBy: 'detailModalLabel', size: 'xl'}
    );
  }

  public isOrgToBeMerged(uuid: string) {
    return this.orgsToMerge.find(elem => elem === uuid);
  }

  public toggleToMerge(uuid: string, toMergeEvent: Event) {
    const currentlyToBeMerged = this.isOrgToBeMerged(uuid);
    const toMerge = (toMergeEvent.target as HTMLInputElement).checked;
    if (toMerge && !currentlyToBeMerged) {
      this.orgsToMerge.push(uuid);
    }
    else if (!toMerge && currentlyToBeMerged) {
      this.orgsToMerge.splice(this.orgsToMerge.indexOf(uuid, 0), 1);
    }
  }

  public confirmMerge(content: TemplateRef<any>) {
    this.modalService.open(
      content,
      {ariaLabelledBy: 'mergeModalLabel'}
    );
  }

  public merge() {
    if (!this.loading && !this.merging && this.targetOrg && this.orgsToMerge.length) {
      this.merging = true;
      this.pureService.pure = new Pure(this.apiKey, this.pureUrl);
      this.pureService.extOrgMerge(this.targetOrg, this.orgsToMerge).subscribe(
        (response) => {
          this.success = `Merge apparently successful`;
          this.results = [];
          this.clearSelection();
          this.merging = false;
          this.modalService.dismissAll();
          this.search();
        },
        (error) => {
          this.error = error;
        }
      );
    }
  }

  public closeSuccessAlert() {
    this.success = '';
  }

  public closeErrorAlert() {
    this.error = '';
  }

  public clearSelection() {
    this.focusOrg = undefined;
    this.targetOrg = undefined;
    this.orgsToMerge = [];
  }

  public targetOrgDetails() {
    if (this.results) {
      return this.results.filter(res => res.uuid === this.targetOrg)[0];
    }
    return undefined;
  }

  public orgsToMergeDetails() {
    if (this.results) {
      return this.results.filter(res => this.orgsToMerge.indexOf(res.uuid) > -1);
    } return undefined; }
}
