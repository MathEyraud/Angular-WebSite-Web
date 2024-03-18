import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { Manager } from '../models/Manager';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends CrudService<Manager> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/managers`);
  }
}
