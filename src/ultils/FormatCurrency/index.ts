export function FormatCurrency(value: string | number) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(Number(value));
}