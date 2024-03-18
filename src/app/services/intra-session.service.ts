import { Injectable }   from '@angular/core';
import { IntraSession } from '../models/IntraSession';
import { HttpClient }   from '@angular/common/http';
import { URL_BASE }     from '../conf/constant';
import { CrudService }  from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class IntraSessionService extends CrudService<IntraSession>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intrasessions`);
  }
}
