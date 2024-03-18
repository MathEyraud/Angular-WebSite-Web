import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Compose } from '../models/Compose';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class ComposeService extends CrudService<Compose> {

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/composes`);
   }
}
