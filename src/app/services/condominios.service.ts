import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CondominiosService {

  constructor(private http: HttpService) { }

  incluir(condominio) {
    return this.http.post('http://192.168.25.165:8080/condominios/rest/condominios', condominio);
  }

  get() {
    return this.http.get('http://localhost:8080/condominios/rest/condominios');
  }

}
