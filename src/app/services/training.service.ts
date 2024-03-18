// trainers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { CrudService } from './crud.service';
import { Training } from '../models/Training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService extends CrudService<Training>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/trainings`);
  }
}