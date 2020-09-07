import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Query } from 'app/shared/models/query';
import { fuseAnimations } from '../../../../../../../@fuse/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: fuseAnimations,
})
export class FiltersComponent implements OnInit {
  @Input() query: Query;
  @Output() queryChange = new EventEmitter<Query>();

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string): void {
    this.query.keyword = filterValue.trim().toLowerCase();
    const val = this.query.keyword;
    this.queryChange.emit({ keyword: val });
  }
}
