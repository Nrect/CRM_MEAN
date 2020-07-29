import {Component, OnInit} from '@angular/core';
import {Organization} from "../shared/interfaces";
import {ClientsService} from "../shared/services/clients.service";
import {ExportService} from "../shared/services/export.service";
import {OrganizationsService} from "../shared/services/organizations.service";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];

  constructor(private organizationService: OrganizationsService,
              private exportService: ExportService) {
  }

  ngOnInit(): void {
    this.organizationService.fetch();
    console.log(this.organizations)
  }
}


