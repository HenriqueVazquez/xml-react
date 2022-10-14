import { IXmlItem } from "../../interfaces/IXmlItem";
import formatCurrency from "../../ultils/formatCurrency";

export function handleFilterXmlByType(items: IXmlItem[], modelo: number) {
  let valorTotalNfe: number = 0;
  let valorTotalNfceSat: number = 0;
  const filterNotes = items.filter((item) => item.mod === 65 || item.mod === 59);
  const filterNotesNFE = items.filter((item) => item.mod === 55);

  filterNotes.forEach((item) => {
    valorTotalNfceSat += item.total;
  });

  filterNotesNFE.forEach((item) => {
    valorTotalNfe += item.total;
  });

  return (
    <div className="m-5 flex flex-col items-center justify-center font-medium">
      <div className="mx-2">
        {modelo === 55 ? `Total NFE:  ${formatCurrency(valorTotalNfe)} ` : `Total NFC-e/SAT:  ${formatCurrency(valorTotalNfceSat)}`}

      </div>
      <div className="mx-2">Arquivos:  {modelo === 55 ? filterNotesNFE.length : filterNotes.length}</div>
    </div>
  );
}