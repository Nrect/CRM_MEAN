import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from "../../shared/interfaces";

@Component({
  selector: 'app-clients-filter',
  templateUrl: './clients-filter.component.html',
  styleUrls: ['./clients-filter.component.css']
})
export class ClientsFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @Input() reloading: boolean;
  dossierNumber: number;
  name: string;

  isValid = true;
  start: number;
  end: number;

  ngOnInit(): void {

  }
  submitFilter() {
    const filter: Filter = {};
    if (this.dossierNumber) {
      filter.dossierNumber = this.dossierNumber;
    }
    if (this.name) {
      filter.name = this.name;
    }
    this.onFilter.emit(filter);
  }

}
