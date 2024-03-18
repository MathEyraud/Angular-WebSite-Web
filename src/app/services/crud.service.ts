import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  protected constructor(protected httpClient: HttpClient, @Inject(String) protected actionUrl: string) { }

  save(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.actionUrl}`, item);
  }

  edit(id: number|string, item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.actionUrl}/${id}`, item);
  }

  getById(id: number|string): Observable<T> {
    return this.httpClient.get<T>(`${this.actionUrl}/${id}`);
  }

  delete(id: number|string): Observable<T> {
    return this.httpClient.delete<T>(`${this.actionUrl}/${id}`);
  }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.actionUrl}`);
  }

}
