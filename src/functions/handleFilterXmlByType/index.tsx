import { IXmlItem } from "../../interfaces/IXmlItem";
import formatCurrency from "../../ultils/formatCurrency";

export function handleFilterXmlByType(items: IXmlItem[], modelo: number) {
  let valor: number = 0;
  const filterNotes = items.filter((item) => item.mod === modelo);

  filterNotes.forEach((item) => {
    valor += item.total;
  });

  return (
    <div className="m-5 flex flex-col items-center justify-center font-medium">
      <div className="mx-2">
        {modelo === 55 ? "Total NFE: " : "Total NFC-e/SAT: "}
        {formatCurrency(valor)}
      </div>
      <div className="mx-2">Arquivos: {filterNotes.length}</div>
    </div>
  );
}