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

  submit(input: string): void {
    let name = input.trim(); // TODO: what if there is more than one word?
    if (!name) { return; }
    this.tagService.setTag({ name } as Tag).subscribe((data: any) => {
      this.tags = this.tags.concat(data.ops as Tag[]);
    });
  }

  delete(tag: Tag): void {
    this.tagService.deleteTag(tag).subscribe((data: any) => {
      if (data.deletedCount != 0) {
        this.tags = this.tags.filter(t => t !== tag);
      }
    });
  }
}