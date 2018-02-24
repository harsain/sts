import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() headers: string[];
  @Input() data: any;

  constructor() { }

  ngOnInit() {}

  onSorted($event){
    this.data = this.getData($event);
  }

  getData(criteria: DataSearchCriteria): any {
    return this.data.sort(
      (a, b) => {
        if (criteria.sortDirection === 'desc') {
          return a[criteria.sortColumn] < b[criteria.sortColumn];
        } else {
          return a[criteria.sortColumn] > b[criteria.sortColumn];
        }
      }
    );
  }
}

export class DataSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}