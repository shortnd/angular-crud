import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators'
import { Product } from './product';

const httpOptions = {
  header: new HttpHeaders({'Content Type': 'application/json'})
}

const apiUrl = 'api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote loggin infrustucture
      console.error(error);

      // Let the app kep running by returning an empty result
      return of(result as T);
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(heros => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      )
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(hero => console.log('feched product')),
      catchError(this.handleError<Product>('getProduct'))
    )
  }

  addProduct(product): Observable<Product> {
    return this.http.post(apiUrl, product, httpOptions)
      .pipe(
        tap(_ => console.log(`add product w/ id=${product.id}`)),
        catchError(this.handleError<Product>('addProduct'))
      )
  }

  updateProduct(id, product): Observable<any> {
    const url = `${apiUrl}/${id}`
    return this.http.put(url, product, httpOptions)
      .pipe(
        tap(_ => console.log(`updated producft with ${id}`)),
        catchError(this.handleError<any>('updatedProduct'))
      )
  }

  deleteProduct(id): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions)
      .pipe(
        tap(_ => console.log(`deleted product id=${id}`)),
        catchError(this.handleError<Product>('deleteProduct')
        )
      )
  }
}
