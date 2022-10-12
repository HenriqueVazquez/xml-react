import { format } from "date-fns";
import { useState } from "react";

import ptBR from "date-fns/locale/pt-BR";
import XMLParser from "react-xml-parser";
import { IXmlItem } from "../../interfaces/IXmlItem";



export function HandleFileChange(event: any) {
  const [jsonXmlList, setJsonXmlList] = useState<IXmlItem[]>([]);
  const itensCopy = Array.from(event.target.files);

  itensCopy.forEach((itemXml: any) => {
    let reader = new FileReader();
    reader.readAsText(itemXml, "windows-1251");
    reader.onloadend = () => {
      const xmlToJson = new XMLParser().parseFromString(reader.result);

      let findTotal = xmlToJson.children[0].children[0].children;
      findTotal = findTotal.find((item: any) => item.name === "total");

      let item = {
        nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
        mod: parseInt(
          xmlToJson.children[0]?.children[0].children[0].children[3].value
        ),
        chave: xmlToJson.children[1]?.children[0].children[2].value,
        dateTime: format(
          new Date(
            xmlToJson.children[0]?.children[0].children[0].children[6].value
          ),
          "dd/MM/yyyy HH:mm:ss",
          { locale: ptBR }
        ),
        total: parseFloat(findTotal.children[0].children[21].value),
        status: "Default xml",

      };

      setJsonXmlList((prev: any) => [item, ...prev]);
    };
  });

  return (jsonXmlList);
};