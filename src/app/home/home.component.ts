import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { CategoriesService } from '../services/categories.service';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasketsService } from '../services/baskets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];

  selectedCategoryId!: number | null;

  filterForm: FormGroup;

  constructor(
    private categoryService: CategoriesService,
    private productsService: ProductsService,
    private basketService: BasketsService
  ) {
    this.filterForm = this.buildForm();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAllProducts();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((products: any) => {
      this.products = products;
    });
  }

  onCategorySelected(selectedCategoryId: number | null) {
    this.getProductsByCategory(selectedCategoryId);
  }

  onCategoryTabClick(selectedCategoryId: number | null) {
    this.selectedCategoryId = selectedCategoryId;
    this.getProductsByCategory(selectedCategoryId);
  }

  getProductsByCategory(categoryId: number | null) {
    this.filterForm.reset();

    if (categoryId == null) {
      this.getAllProducts();
      return;
    }

    this.categoryService.getCategory(categoryId).subscribe((response: any) => {
      this.products = response.products;
    });
  }

  onResetFilters() {
    this.filterForm.reset();
    this.getAllProducts();
    this.selectedCategoryId = null;
  }

  onApplyFilters() {
    this.productsService
      .getfiltered(
        this.filterForm.controls['vegetarian'].value,
        this.filterForm.controls['nuts'].value,
        this.filterForm.controls['speciness'].value,
        this.selectedCategoryId
      )
      .subscribe((products: any) => {
        this.products = products;
      });
  }

  onAddToCart(product: Product) {
    this.basketService
      .addToBasket(1, product.price, product.id)
      .subscribe((res) => {
        console.log('Added To Cart');
      });
  }

  buildForm(): FormGroup {
    return new FormGroup({
      vegetarian: new FormControl(),
      nuts: new FormControl(),
      speciness: new FormControl(),
    });
  }
}
