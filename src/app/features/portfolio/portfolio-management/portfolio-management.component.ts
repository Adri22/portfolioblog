import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../../../services/portfolio.service';
import { Artwork } from '../../../models/artwork'

@Component({
  selector: 'app-portfolio-management',
  templateUrl: './portfolio-management.component.html',
  styleUrls: ['./portfolio-management.component.css']
})
export class PortfolioManagementComponent implements OnInit {

  artwork: Artwork;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.artwork.file = files.item(0); // file -> FormData?
  }

  uploadFileToActivity() {
    this.portfolioService.uploadArtwork(this.artwork).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }


}