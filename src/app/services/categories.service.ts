import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories() {
    return this.httpClient.get(`${environment.categoriesApi}/GetAll`);
  }

  getCategory(id: number) {
    return this.httpClient.get(
      `${environment.categoriesApi}/GetCategory/${id}`
    );
  }
}
