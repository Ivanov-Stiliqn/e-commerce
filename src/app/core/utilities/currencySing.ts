export function getCurrencySign(currency) {
  switch (currency){
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'BGN':
      return 'лв.'
    default:
      return '';
  }
}
