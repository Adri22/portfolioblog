import { Component, OnInit } from '@angular/core';

import { SitedataService } from '../../services/sitedata.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  testdata: any;
  input: string;

  constructor(private sitedataService: SitedataService) { }

  ngOnInit(): void {
    this.getSitedata();
  }

  getSitedata(): void {
    this.sitedataService.getData().subscribe(data => this.testdata = data);
  }

  submit(): void {
    this.sitedataService.setData({ name: this.input }).subscribe(data => {
      this.testdata = this.testdata.concat(data.ops);
    });
  }
}