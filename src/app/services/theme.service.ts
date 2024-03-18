import { Injectable } from '@angular/core';
import { Theme } from '../models/Theme';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends CrudService<Theme> {

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/themes`);
  }
}