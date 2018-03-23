import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ResponsiveTableHelpers } from '../tables/responsive-table/helpers.data';
import { ExampleDataSource, ExampleDatabase } from '../tables/fixed-table/helpers.data';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

  items: Observable<any[]>;
  form: FormGroup;
  public columns = [{ field: 'nome', titulo: 'Nome' }
    , { field: 'data_criacao', titulo: "Data Criação" }];

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

  consultar() {

  }

  salvar() {
    console.log(this.form);
    if (this.form.valid) {
      console.log('form valid');

      let condominio = {
        nome: this.form.value.condominio,
        data_criacao: new Date()
      }

      this.db.collection('condominios').add(condominio).then((res) => {
        console.log(res);
      }).catch((err) => console.error(err));
    }
  }

}
