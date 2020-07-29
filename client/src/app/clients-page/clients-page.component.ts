import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalInfoComponent} from "../shared/components/modal-info/modal-info.component";
import {Client, Filter} from "../shared/interfaces";
import {Observable, Subscription} from "rxjs";
import {ClientsService} from "../shared/services/clients.service";
import {ExportService} from "../shared/services/export.service";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

const STEP = 6;

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css']
})
export class ClientsPageComponent implements OnInit, OnDestroy {
  showFiller = false;

  clients: Client[] = [];
  isFilterVisible = false;
  SUB: Subscription;

  offset = 0;
  limit = STEP;

  loading = false;
  reloading = false;
  noMoreClients = false;

  filter: Filter = {};
  searchString = '';

  constructor(private clientsService: ClientsService,
              private exportService: ExportService) {
  }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }


  ngOnDestroy(): void {
    this.SUB.unsubscribe();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });
    this.SUB = this.clientsService.fetch(params).subscribe(clients => {
      this.clients = this.clients.concat(clients);
      this.noMoreClients = clients.length < STEP;
      this.loading = false;
      this.reloading = false;
      console.log(clients);
    });
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.clients = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

  export() {
    this.exportService.exportExcel(this.clients, 'Клиенты');
  }
}
