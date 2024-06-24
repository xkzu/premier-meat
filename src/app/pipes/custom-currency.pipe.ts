import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$', decimalLength: number = 0): string {
    if (typeof value !== 'number') {
      return '';
    }

    // Formatea el número con separadores de miles
    const parts = value.toFixed(decimalLength).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Combina el símbolo de la moneda y el número formateado
    return `${currencySymbol}${parts.join(',')}`;
  }

}
