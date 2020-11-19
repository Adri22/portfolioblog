import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  menu = [
    { link: "general", name: "General" },
    { link: "blog", name: "Blog" },
    { link: "portfolio", name: "Portfolio" },
    { link: "shop", name: "Shop" },
    { link: "tags", name: "Tags" }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}