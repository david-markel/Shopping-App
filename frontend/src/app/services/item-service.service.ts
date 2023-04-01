import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  readJSONFile(fileName: string): Observable<any> {
    return this.http.get(`/assets/items/${fileName}`);
  }

  // readAllJSONFiles(fileNames: string[]): Observable<any[]> {
  //   return forkJoin(
  //     fileNames.map(fileName => this.readJSONFile(fileName))
  //   );
  // }
}
