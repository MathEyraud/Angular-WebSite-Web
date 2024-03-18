import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { Employee } from '../models/Employee';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<Employee> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/employees`);
  }
}
