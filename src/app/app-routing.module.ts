import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent, data: { title: 'List of Products'} } ,
  { path: 'product-details/:id', component: ProductsDetailComponent, data: { title: 'Product Detail' } },
  { path: 'product-add', component: ProductAddComponent, data: { title: 'Add Product'} },
  { path: 'product-edit/:id', component: ProductEditComponent, data: { title: 'Edit Product'}},
  { path: '', redirectTo: '/products', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
