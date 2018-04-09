import { PageEvent, MatTableDataSource } from '@angular/material';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-profissoes-lista',
  templateUrl: './profissoes-lista.component.html',
  styleUrls: ['./profissoes-lista.component.scss']
})
export class ProfissoesListaComponent implements OnInit {

  @Output('alterar')
  alterar = new EventEmitter();

  public columns = [{ field: 'nome', titulo: 'Profissão' }
    , { field: 'dataCriacao', titulo: "Data Criação" }];
  columnsFields;
  collection: AngularFirestoreCollection<any>;
  campoOrdenacao = 'dataCriacao';

  //pagination
  length: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageEvent: PageEvent;
  lastElement: any;
  firstElement: any;
  paramsPesquisa: Array<any>;

  profissoes: Array<any>;

  matDataSource;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.columnsFields = this.columns.map((a) => {
      return a.field
    });

    this.db.collection('condominios').doc('03FMss0QFzOcekQDZUsO')
      .collection('profissoes', ref => {
        return ref.orderBy(this.campoOrdenacao);
      }).snapshotChanges().map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }).subscribe((results) => {
        console.log(results);
        this.profissoes = results;
        this.length = results.length;
        this.lastElement = results[this.pageSize - 1];
        this.matDataSource = new MatTableDataSource(results.slice(0, this.pageSize));
      });



  }

  pesquisar(params: Array<any>) {
    this.paramsPesquisa = params;

    let query = this.collection.ref.orderBy('nome');


    this.db.collection('condominios').doc('03FMss0QFzOcekQDZUsO')
      .collection('profissoes', ref => {
        return ref.orderBy(this.campoOrdenacao).limit(this.pageSize);
      }).valueChanges().subscribe(results => {
        this.length = results.length;
        this.lastElement = results[this.pageSize - 1];
        this.matDataSource = new MatTableDataSource(results.splice(0, this.pageSize));
      });

  }

  isDate(date) {

    if (date instanceof Date) {
      return true;
    }
    return false;
  }

  pageChanged(e: PageEvent) {

    let startAt = e.pageIndex * e.pageSize;

    console.log(startAt);
    console.log(this.profissoes);

    this.matDataSource = new MatTableDataSource(this.profissoes.slice(startAt, startAt + this.pageSize));

  }

  clickedRow(row) {
    this.alterar.emit(row);
  }

}
