import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CustomCurrencyPipe } from '../pipes/custom-currency.pipe'; // Importa el pipe

@NgModule({
  declarations: [
    ProductsComponent,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
