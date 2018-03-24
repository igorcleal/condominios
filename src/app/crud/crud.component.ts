import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EnumTela } from '../model/EnumTela';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  tela: EnumTela = EnumTela.PESQUISA;
  EnumTela: typeof EnumTela = EnumTela;

  @Output("salvar") _salvar = new EventEmitter();
  @Output("pesquisar") _pesquisar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  novo() {
    this.tela = EnumTela.CADASTRO;
  }

  salvar() {
    this.tela = EnumTela.PESQUISA;
    this._salvar.emit();
  }

  pesquisar() {
    this._pesquisar.emit();
  }

}
