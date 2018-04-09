import { Profissao } from './../../model/profissao';
import { EnumTela } from './../../model/EnumTela';
import { CrudComponent } from './../../crud/crud.component';
import { DataTableComponent } from './../../data-table/data-table/data-table.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfissoesListaComponent } from './profissoes-lista/profissoes-lista.component';

@Component({
  selector: 'app-profissoes',
  templateUrl: './profissoes.component.html',
  styleUrls: ['./profissoes.component.scss']
})
export class ProfissoesComponent implements OnInit {

  @ViewChild(ProfissoesListaComponent)
  profissoesListaComponent: ProfissoesListaComponent;

  @ViewChild(CrudComponent)
  crudComponent: CrudComponent;

  form: FormGroup;
  public columns = [{ field: 'nome', titulo: 'Profissão' }
    , { field: 'dataCriacao', titulo: "Data Criação" }];

  collection;

  profissao = new Profissao();

  constructor(private fb: FormBuilder, private db: AngularFirestore) { }

  ngOnInit() {
    this.buildForm();
    this.collection = this.db.collection('condominios').doc('03FMss0QFzOcekQDZUsO')
      .collection('profissoes');

  }

  buildForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required]
      ]
    });
  }

  salvar() {
    if (this.form.valid) {
      console.log('form validaaaa');

      this.profissao.nome = this.form.value.nome;

      if (this.crudComponent.tela == EnumTela.INCLUIR) {
        this.profissao.dataCriacao = new Date();
        console.log('incluir');
        this.db.collection('condominios').doc('03FMss0QFzOcekQDZUsO')
          .collection('profissoes').add(this.profissao).then((res) => {
            console.log(res);
            console.log('succeed');
            this.crudComponent.tela = EnumTela.PESQUISAR;
          }).catch(err => {
            console.error(err);
          });
      } else if (this.crudComponent.tela == EnumTela.ALTERAR) {
        console.log('alterar');
        this.db.collection('condominios').doc('03FMss0QFzOcekQDZUsO')
          .collection('profissoes').doc(this.profissao.id).update({
            nome: this.profissao.nome
          }).then((res) => {
            console.log(res);
            console.log('succeed update');
            this.crudComponent.tela = EnumTela.PESQUISAR;
          }).catch(err => {
            console.error(err);
          });
      }
    }
  }

  pesquisar() {
    this.profissoesListaComponent.pesquisar(null);
  }

  alterar(ev) {
    console.log(ev);
    this.profissao = ev;
    this.crudComponent.tela = EnumTela.ALTERAR;
  }

}
