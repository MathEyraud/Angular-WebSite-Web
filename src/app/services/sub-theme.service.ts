import { Injectable } from '@angular/core';
import { SubTheme } from '../models/SubTheme';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class SubThemeService extends CrudService<SubTheme> {

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/subthemes`);
   }
}
