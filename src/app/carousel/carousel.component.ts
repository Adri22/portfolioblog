import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() carouselID;

  items = [
    { title: "test", text: "test test test" },
    { title: "testtest", text: "testtest test testtest" },
    { title: "testtesttest", text: "test test testtest test test" }
  ];

  activeIndex = 0; // test

  constructor() { }

  ngOnInit(): void {
  }

}