import { ExcelItem } from "../../interfaces/ExcelItem";
import { IXmlItem } from "../../interfaces/IXmlItem";

export function LookForDivergences(jsonXmlList: any, systemList: any, setMissingNotes: any, missingNotes: any) {

  jsonXmlList.forEach((vendaXML: IXmlItem) => {


    const buscarTotalDiferente = systemList.find((vendaSistema: { total: Number, chave: string; }) => vendaXML.chave === vendaSistema.chave && vendaXML.total > 0 && vendaSistema.total === 0);
    const checkIfAlreadyAdded = missingNotes.find((missingNote: { chave: string; }) => vendaXML.chave === missingNote.chave);


    if (!checkIfAlreadyAdded) {
      const compararVendas = systemList.find((vendaSistema: { chave: string; }) => vendaXML.chave === vendaSistema.chave);
      console.log(buscarTotalDiferente);

      if (!compararVendas || buscarTotalDiferente) {
        if (vendaXML.chave || vendaXML.nnf) {
          if (buscarTotalDiferente) {
            console.log("Entrou")

            vendaXML.status = "Venda cancelada"

            setMissingNotes((prev: any) => [vendaXML, ...prev]);

          }
          else {
            vendaXML.status = "Faltou sistema"

            setMissingNotes((prev: any) => [vendaXML, ...prev]);

          }
        }

      }
    }
  });

  systemList.forEach((vendaSistema: ExcelItem) => {
    const checkIfAlreadyAdded = missingNotes.find((missingNote: { chave: string, nnf: string }) => vendaSistema.chave === missingNote.chave || vendaSistema.nnf === missingNote.nnf);


    if (!checkIfAlreadyAdded) {
      const compararVendas = jsonXmlList.find((vendaXML: { chave: string; }) => vendaSistema.chave === vendaXML.chave);
      if (!compararVendas) {
        if (vendaSistema.chave || vendaSistema.nnf) {

          if (!vendaSistema.chave && vendaSistema.total > 0) {


            vendaSistema.status = "Registro Manual"
            setMissingNotes((prev: any) => [vendaSistema, ...prev]);
          }
          else if (vendaSistema.chave && vendaSistema.total > 0) {


            vendaSistema.status = "Faltou XML"


            setMissingNotes((prev: any) => [vendaSistema, ...prev]);
          }
        }

      }
    }
  });
}