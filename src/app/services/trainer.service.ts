// trainers.service.ts
import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Trainer }      from '../models/Trainer';
import { URL_BASE }     from '../conf/constant';
import { CrudService }  from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService extends CrudService<Trainer>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/trainers`);
  }
}
