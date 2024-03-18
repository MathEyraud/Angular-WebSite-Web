import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Company } from '../models/Company';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends CrudService<Company> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/companies`);
  }
}
