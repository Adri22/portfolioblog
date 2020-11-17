import { Component, OnInit } from '@angular/core';

import { TagService } from '../../../services/tag.service';
import { Tag } from '../../../models/tag'

@Component({
  selector: 'app-tags-management',
  templateUrl: './tags-management.component.html',
  styleUrls: ['./tags-management.component.css']
})
export class TagsManagementComponent implements OnInit {

  tags: Tag[];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags().subscribe(data => this.tags = data);
  }

  submit(name: string): void {
    name = name.trim(); // TODO: what if there is more than one word?
    if (!name) { return; }
    this.tagService.setTag({ name } as Tag).subscribe(tag => {
      this.tags.push(tag);
    });
  }
}