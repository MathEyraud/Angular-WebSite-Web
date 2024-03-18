import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { CrudService } from './crud.service';
import { Particular } from '../models/Particular';

@Injectable({
  providedIn: 'root'
})
export class ParticularService extends CrudService<Particular>{

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/particulars`);
  }
}
