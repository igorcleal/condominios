import { DataTableComponent } from './../data-table/data-table/data-table.component';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ResponsiveTableHelpers } from '../tables/responsive-table/helpers.data';
import { ExampleDataSource, ExampleDatabase } from '../tables/fixed-table/helpers.data';
import { EnumTela } from '../model/EnumTela';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  @ViewChild(DataTableComponent)
  private dataTableComponent: DataTableComponent;

  items: Observable<any[]>;
  form: FormGroup;
  public columns = [{ field: 'nome', titulo: 'Nome' }
    , { field: 'data_criacao', titulo: "Data Criação" }];

  paramNome: string;

  tela: EnumTela = EnumTela.PESQUISA;
  EnumTela: typeof EnumTela = EnumTela;

  constructor(private db: AngularFirestore,
    private fb: FormBuilder) {


  }



  ngOnInit() {

    this.items = this.db.collection('condominios').valueChanges();
    this.items.subscribe((condominios) => {

    })

    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      condominio: ['', [Validators.required]
      ]
    });

  }

  salvar() {
    if (this.form.valid) {
      console.log('form valid');

      let condominio = {
        nome: this.form.value.condominio,
        data_criacao: new Date()
      }

      this.db.collection('condominios').add(condominio).then((res) => {
        console.log(res);
        this.tela = EnumTela.PESQUISA;
      }).catch((err) => console.error(err));
    }
  }

  pesquisar() {
    if (this.paramNome) {
      let param = {
        nome: 'nome', operador: '==', valor: this.paramNome
      }
      this.dataTableComponent.pesquisar([param]);
    }
    else {
      this.dataTableComponent.pesquisar(null);
    }
  }

  novo() {
    this.tela = EnumTela.CADASTRO;
  }

}
