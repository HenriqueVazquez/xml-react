
import { toast } from "react-toastify";
import { IXmlItem } from "../../interfaces/IXmlItem";
import { GetTypeEmission } from "../../ultils";


export function LookForDivergences(jsonXmlList: any, systemList: any, setMissingNotes: any, missingNotes: any) {
  let countNot: number = 0;

  jsonXmlList.forEach((vendaXML: IXmlItem) => {


    const searchTotalDifference = systemList.find((vendaSistema: { total: Number, chave: string; }) => vendaXML.chave === vendaSistema.chave && vendaXML.total > 0 && vendaSistema.total === 0);
    const checkIfAlreadyAdded = missingNotes.find((missingNote: { chave: string; }) => vendaXML.chave === missingNote.chave);


    if (!checkIfAlreadyAdded) {
      const compareSales = systemList.find((vendaSistema: { chave: string; }) => vendaXML.chave === vendaSistema.chave);


      if (!compareSales || searchTotalDifference) {
        if (vendaXML.chave || vendaXML.nnf) {
          if (searchTotalDifference) {


            vendaXML.status = "Venda cancelada";
            countNot = countNot + 1;

            setMissingNotes((prev: any) => [vendaXML, ...prev]);

          }
          else {
            vendaXML.status = "Faltou sistema";
            countNot = countNot + 1;

            setMissingNotes((prev: any) => [vendaXML, ...prev]);

          }
        }

      }
    }
  });

  systemList.forEach((vendaSistema: IXmlItem) => {
    const checkIfAlreadyAdded = missingNotes.find((missingNote: { chave: string, nnf: string }) => vendaSistema.chave === missingNote.chave || vendaSistema.nnf === missingNote.nnf);


    if (!checkIfAlreadyAdded) {
      const compareSales = jsonXmlList.find((vendaXML: { chave: string; }) => vendaSistema.chave === vendaXML.chave);
      if (!compareSales) {
        if (vendaSistema.chave || vendaSistema.nnf) {

          if (!vendaSistema.chave && vendaSistema.total > 0) {


            vendaSistema.status = "Registro Manual";
            countNot = countNot + 1;
            setMissingNotes((prev: any) => [vendaSistema, ...prev]);
          }
          else if (vendaSistema.chave && vendaSistema.total > 0) {
            let typeOfEmission = GetTypeEmission(vendaSistema.chave);
            if (typeOfEmission === 9) {
              vendaSistema.status = "Contingência";
              countNot = countNot + 1;

            } else {
              countNot = countNot + 1;
              vendaSistema.status = "Faltou XML";
              ;
            }


            setMissingNotes((prev: any) => [vendaSistema, ...prev]);
          }
        }

      }
    }
  });
  if (countNot > 0) {
    if (countNot === 1) {
      toast.error('Foi localizado 1 divergência', {
        theme: "colored"
      });
    } else {
      toast.error(`Foram achadas ${countNot} divergências`, {
        theme: "colored"
      });
    }
  } else if (countNot === 0 && jsonXmlList.length > 0) {
    toast.success('Nenhuma divergência encontrada!', {
      theme: "colored"
    });
  }

}