import { CondominiosService } from './../../services/condominios.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-condominios',
  templateUrl: './condominios.component.html',
  styleUrls: ['./condominios.component.scss']
})
export class CondominiosComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private db: AngularFirestore,
    private condominioService: CondominiosService) { }

  ngOnInit() {
    this.condominioService.get().subscribe((result) => {
      console.log(result);
    }, err => {
      console.error(err);
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
        dataCriacao: new Date()
      }

      this.db.collection('condominios').add(condominio).then((res) => {
        console.log(res);
      }).catch((err) => console.error(err));
      /*this.condominioService.incluir(condominio).subscribe(res => {
        console.log('success incluiu');
      }, err => {
        console.error(err);
      });*/
    }
  }

  pesquisar() {
    alert('pesquisou');
  }

}
