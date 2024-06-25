import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addToCart(product: Product): void {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((cartItem: Product) => cartItem.name === product.name);

    if (existingProduct) {
      existingProduct.quantity! += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCart(product: Product): void {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex((cartItem: Product) => cartItem.name === product.name);

    if (productIndex > -1) {
      cart[productIndex].quantity! -= 1;
      if (cart[productIndex].quantity! <= 0) {
        cart.splice(productIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  getProductQuantity(product: Product): number {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((cartItem: Product) => cartItem.name === product.name);
    return existingProduct ? existingProduct.quantity! : 0;
  }

  checkout(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
      alert('Debes iniciar sesión para comprar.');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/cart']);
    }
  }
}
