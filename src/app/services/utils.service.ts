import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  getSubString(text: string, size: number): string {
    if (text.length > size) {
      return text.substring(0, size) + "...";
    }
    return text;
  }
}
