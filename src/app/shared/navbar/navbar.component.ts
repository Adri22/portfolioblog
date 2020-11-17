import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu = {
    primary: [
      { link: "", name: "Home" },
      { link: "blog", name: "Blog" },
      { link: "portfolio", name: "Portfolio" }
    ],
    secondary: [
      { link: "login", name: "Login" },
      { link: "management", name: "Management" }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}