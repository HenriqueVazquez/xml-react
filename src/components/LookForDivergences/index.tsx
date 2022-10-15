import { ExcelItem } from "../../interfaces/ExcelItem";
import { IXmlItem } from "../../interfaces/IXmlItem";

export function LookForDivergences(jsonXmlList: any, systemList: any, setNotaFaltando: any) {
  jsonXmlList.forEach((vendaXML: IXmlItem) => {
    const compararVendas = systemList.find((vendaSistema: { chave: string; }) => vendaXML.chave === vendaSistema.chave);
    if (!compararVendas && (vendaXML.chave || vendaXML.nnf)) {
      if (vendaXML.chave && vendaXML.total > 0) {

        vendaXML.status = "Faltou sistema"

        setNotaFaltando((prev: any) => [vendaXML, ...prev]);
      } else if (vendaXML.chave && vendaXML.total === 0) {

        vendaXML.status = "Venda cancelada"

        setNotaFaltando((prev: any) => [vendaXML, ...prev]);

      } else if (!vendaXML.chave && vendaXML.total > 0) {
        vendaXML.status = "Registro manual"

        setNotaFaltando((prev: any) => [vendaXML, ...prev]);
      }
    }

  });

  systemList.forEach((vendaSistema: ExcelItem) => {
    const compararVendas = jsonXmlList.find((vendaXML: { chave: string; }) => vendaSistema.chave === vendaXML.chave);
    if (!compararVendas && (vendaSistema.chave || vendaSistema.nnf)) {
      if (vendaSistema.chave && vendaSistema.total > 0) {


        vendaSistema.status = "Faltou XML"

        setNotaFaltando((prev: any) => [vendaSistema, ...prev]);
      } else if (vendaSistema.chave && vendaSistema.total == 0) {


        vendaSistema.status = "Venda cancelada"

        setNotaFaltando((prev: any) => [vendaSistema, ...prev]);
      } else if (!vendaSistema.chave && vendaSistema.total > 0) {


        vendaSistema.status = "Registro Manual"
        setNotaFaltando((prev: any) => [vendaSistema, ...prev]);
      }

    }

  });
}