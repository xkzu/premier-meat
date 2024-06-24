import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [
    {
      name: 'Lomo Liso',
      description: 'Corte de carne de alta calidad.',
      price: 15000,
      image: 'assets/img/meat/lomo_Liso.png'
    },
    {
      name: 'Posta Negra',
      description: 'Ideal para asados y parrillas.',
      price: 12000,
      image: 'assets/img/meat/posta_negra.png'
    },
    {
      name: 'Lomo Vetado',
      description: 'Delicioso y jugoso, perfecto para cualquier ocasión.',
      price: 18000,
      image: 'assets/img/meat/lomo_vetado.png'
    },
    {
      name: 'Asiento',
      description: 'Ideal para sandwich y bistec.',
      price: 13000,
      image: 'assets/img/meat/asiento.png'
    },
    {
      name: 'Filete',
      description: 'Ideal para asados y lomo saltado.',
      price: 32000,
      image: 'assets/img/meat/filete.png'
    },
    {
      name: 'Posta Rosada',
      description: 'Ideal para empanadas y carne a la olla.',
      price: 11000,
      image: 'assets/img/meat/posta_rosada.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
