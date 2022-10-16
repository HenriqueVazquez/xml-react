import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export default function ExportToCSV(csvData: any, fileName: string) {
  const { jsonXmlList, total, missingSystemAmount, numberOfNotesMissing, missingNote } = csvData;

  const ws = XLSX.utils.json_to_sheet(jsonXmlList);
  const ws2 = XLSX.utils.json_to_sheet(missingNote);
  console.log(missingSystemAmount)


  XLSX.utils.sheet_add_aoa(ws, [["NNF", "Chave", "Data", "Modelo", "Status", "Total"]], { origin: "A1" });
  XLSX.utils.sheet_add_aoa(ws, [[" ", " ", " ", " ", `FALTA = ${numberOfNotesMissing}`, `=soma(F2:F${jsonXmlList.length + 1})`]], { origin: -1 });
  XLSX.utils.sheet_add_aoa(ws, [["TOTAL:", " ", " ", " ", `${missingSystemAmount}`, `${total}`]], { origin: -1 });


  XLSX.utils.sheet_add_aoa(ws2, [["Numero sistema", "Chave", "Data", "Modelo", "Status", "Total",]], { origin: "A1" });
  XLSX.utils.sheet_add_aoa(ws2, [[" ", " ", "", "", "", `=soma(F2:F${missingNote.length + 1})`]], { origin: -1 });
  XLSX.utils.sheet_add_aoa(ws2, [["TOTAL:", " ", "", "", `FALTA = ${numberOfNotesMissing}`, `${missingSystemAmount}`]], { origin: -1 });



  ws["!cols"] = [{ wch: 9 }, { wch: 45 }, { wch: 19 }, { wch: 10 }, { wch: 14 }, { wch: 11 }];
  ws2["!cols"] = [{ wch: 14.4 }, { wch: 45 }, { wch: 18 }, { wch: 9 }, { wch: 14 }, { wch: 13 }, { wch: 10 }];

  const wb = { Sheets: { ListagemXML: ws, Faltaram: ws2 }, SheetNames: ["ListagemXML", "Faltaram"] };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}