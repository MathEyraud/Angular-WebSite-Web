import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { URL_BASE }     from '../conf/constant';
import { CrudService }  from './crud.service';
import { InterSession } from '../models/InterSession';

@Injectable({
  providedIn: 'root'
})
export class InterSessionService extends CrudService<InterSession>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intersessions`);
  }
}
