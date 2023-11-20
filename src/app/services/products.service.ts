import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get(`${environment.productsApi}/GetAll`);
  }

  getfiltered(
    vegetarian: boolean,
    nuts: boolean,
    spiciness: number,
    categoryId: any
  ) {
    let httpParams = new HttpParams();

    if (vegetarian) {
      httpParams = httpParams.append('vegetarian', vegetarian);
    }

    if (nuts) {
      httpParams = httpParams.append('nuts', nuts);
    }

    if (spiciness) {
      httpParams = httpParams.append('spiciness', spiciness);
    }

    if (categoryId) {
      httpParams = httpParams.append('categoryId', categoryId);
    }

    return this.httpClient.get(`${environment.productsApi}/GetFiltered`, {
      params: httpParams,
    });
  }
}
