import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export default function ExportToCSV(csvData: any, fileName: string) {
  const { jsonXmlList, total, faltaSistemaTotalValor, faltaSistemaTotal, faltaXML } = csvData;

  const ws = XLSX.utils.json_to_sheet(jsonXmlList);


  XLSX.utils.sheet_add_aoa(ws, [["NNF", "Modelo", "Chave", "Data", "Valor"]], { origin: "A1" });
  XLSX.utils.sheet_add_aoa(ws, [[" ", " ", " ", " ", `=soma(E2:E${jsonXmlList.length + 1})`, `FALTA = ${faltaSistemaTotal}`]], { origin: -1 });
  XLSX.utils.sheet_add_aoa(ws, [["TOTAL:", " ", " ", " ", `${total}`, `${faltaSistemaTotalValor}`]], { origin: -1 });



  ws["!cols"] = [{ wch: 10 }, { wch: 8 }, { wch: 45 }, { wch: 20 }, { wch: 12.5 }, { wch: 13 }];

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}


