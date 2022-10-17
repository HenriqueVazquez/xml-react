import { IXmlItem } from "../../interfaces/IXmlItem";


export function handleCalcTotal(items: IXmlItem[]) {
  let value: number = 0;
  items.forEach((item) => {
    value += item.total;
  });

  return value;
}