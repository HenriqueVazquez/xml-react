import { ExcelItem } from "../../interfaces/ExcelItem";
import { IXmlItem } from "../../interfaces/IXmlItem";
import { GetTypeEmission } from "../GetTypeEmission";

export function LookForDivergences(jsonXmlList: any, systemList: any, setMissingNotes: any, missingNotes: any) {

  jsonXmlList.forEach((vendaXML: IXmlItem) => {


    const searchTotalDifference = systemList.find((vendaSistema: { total: Number, chave: string; }) => vendaXML.chave === vendaSistema.chave && vendaXML.total > 0 && vendaSistema.total === 0);
    const checkIfAlreadyAdded = missingNotes.find((missingNote: { chave: string; }) => vendaXML.chave === missingNote.chave);


    if (!checkIfAlreadyAdded) {
      const compareSales = systemList.find((vendaSistema: { chave: string; }) => vendaXML.chave === vendaSistema.chave);


      if (!compareSales || searchTotalDifference) {
        if (vendaXML.chave || vendaXML.nnf) {
          if (searchTotalDifference) {


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
      const compareSales = jsonXmlList.find((vendaXML: { chave: string; }) => vendaSistema.chave === vendaXML.chave);
      if (!compareSales) {
        if (vendaSistema.chave || vendaSistema.nnf) {

          if (!vendaSistema.chave && vendaSistema.total > 0) {


            vendaSistema.status = "Registro Manual"
            setMissingNotes((prev: any) => [vendaSistema, ...prev]);
          }
          else if (vendaSistema.chave && vendaSistema.total > 0) {
            let typeOfEmission = GetTypeEmission(vendaSistema.chave);
            if (typeOfEmission === 9) {
              vendaSistema.status = "Contingência";

            } else {
              vendaSistema.status = "Faltou XML";
            }


            setMissingNotes((prev: any) => [vendaSistema, ...prev]);
          }
        }

      }
    }
  });
}