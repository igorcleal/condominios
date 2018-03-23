import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input()
  collectionName;

  @Input()
  public columns;

  public columnsFields: Array<string>; //fields das colunas

  public dataSource;

  public showFilterTableCode;

  @ViewChild('filter') filter: ElementRef;
  matDataSource;

  //pagination
  length: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageEvent: PageEvent;



  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection(this.collectionName, ref => ref.orderBy('data_criacao')).valueChanges()
      .subscribe((results) => {
        this.length = results.length;
        this.matDataSource = new MatTableDataSource(results.splice(0, this.pageSize));
      });

    this.columnsFields = this.columns.map((a) => {
      return a.field
    });

  }

  isDate(date) {

    if (date instanceof Date) {
      return true;
    }
    return false;
  }
  //.endAt(e.pageIndex * e.pageSize + e.pageSize)
  pageChanged(e: PageEvent) {
    let startAt = e.pageIndex * e.pageSize
    console.log(startAt);
    this.db.collection(this.collectionName, ref => ref.orderBy('data_criacao').startAt(startAt))
      .valueChanges()
      .subscribe((results) => {
        this.matDataSource = new MatTableDataSource(results);
      })
  }

}
