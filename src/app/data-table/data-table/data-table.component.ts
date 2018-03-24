import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CollectionReference } from '@firebase/firestore-types';
import { Query } from '@firebase/database';

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

  @Input()
  campoOrdenacao;

  public columnsFields: Array<string>; //fields das colunas

  public dataSource;

  public showFilterTableCode;

  matDataSource;

  //pagination
  length: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageEvent: PageEvent;
  lastElement: any;
  firstElement: any;
  paramsPesquisa: Array<ParametroConsulta>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection(this.collectionName, ref => ref.orderBy(this.campoOrdenacao)).valueChanges()
      .subscribe((results) => {
        this.length = results.length;
        this.lastElement = results[this.pageSize - 1];
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

    this.db.collection(this.collectionName,
      ref => {
        let query;
        if (e.pageIndex > this.pageIndex) {
          query = ref.orderBy(this.campoOrdenacao)
            .startAfter(this.lastElement[this.campoOrdenacao])
            .limit(this.pageSize);
        } else {
          query = ref.orderBy(this.campoOrdenacao)
            .endBefore(this.lastElement[this.campoOrdenacao])
            .limit(this.pageSize)
        }

        if (this.paramsPesquisa && this.paramsPesquisa.length > 0) {
          this.paramsPesquisa.forEach(param => {
            query = ref.where(param.nome, param.operador, param.valor);
          });
        }
        return query;
      })
      .valueChanges()
      .subscribe((results) => {
        this.firstElement = results[0];
        this.lastElement = results[results.length - 1];
        this.matDataSource = new MatTableDataSource(results);
        this.pageIndex = e.pageIndex;
      });

  }

  pesquisar(params: Array<ParametroConsulta>) {
    this.paramsPesquisa = params;
    this.db.collection(this.collectionName, ref => {
      let query;
      query = ref.orderBy(this.campoOrdenacao)
      if (params && params.length > 0) {
        params.forEach(param => {
          query = ref.where(param.nome, param.operador, param.valor);
        });
      }
      return query;
    }).valueChanges().subscribe(results => {
      console.log(results);
      this.length = results.length;
      this.lastElement = results[this.pageSize - 1];
      this.matDataSource = new MatTableDataSource(results.splice(0, this.pageSize));
    })
  }

}

export class ParametroConsulta {
  nome;
  valor;
  operador;
}
