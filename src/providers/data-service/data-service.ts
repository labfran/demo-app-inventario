import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  //private apiUrl = 'assets/data/inventario.json';
  //private apiUrl = 'https://script.google.com/macros/s/AKfycbzy7v7g4d0yl2sHnEEQUbjp1C_5j4w5mV0jvZ-NcpfqbUaTgbIw/exec';
  private apiUrl = 'https://fir-inventario.firebaseio.com/inventario.json';

  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

getProducts(): Observable<string[]> {
  return this.http.get(this.apiUrl).pipe(
    map(this.extractData),
    catchError(this.handleError)
  );
}

private extractData(res: Response) {
  let body = res;
  return body || {};
}

private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

}
