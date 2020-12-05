import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../../../services/portfolio.service';
import { Artwork } from '../../../models/artwork'

@Component({
  selector: 'app-portfolio-management',
  templateUrl: './portfolio-management.component.html',
  styleUrls: ['./portfolio-management.component.css']
})
export class PortfolioManagementComponent implements OnInit {

  file: File;
  artwork: Artwork;
  artworks: Artwork[];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.getArtworks();
  }

  getArtworks(): void {
  }

  handleFileInput(files: FileList): void {
    this.file = files.item(0);
  }

  submit(): void {
    this.portfolioService.uploadFile(this.file).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }


}