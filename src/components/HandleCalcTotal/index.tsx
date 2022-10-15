import { IXmlItem } from "../../interfaces/IXmlItem";


export function handleCalcTotal(items: IXmlItem[]) {
  let valor: number = 0;
  items.forEach((item) => {
    valor += item.total;
  });

  return valor;
}