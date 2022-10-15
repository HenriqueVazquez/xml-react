import { format } from "date-fns";
import { useState } from "react";

import ptBR from "date-fns/locale/pt-BR";
import XMLParser from "react-xml-parser";



export function HandleFileChange(event: any, setJsonXmlList: any) {
  const itensCopy = Array.from(event.target.files);

  itensCopy.forEach((itemXml: any) => {
    let reader = new FileReader();
    reader.readAsText(itemXml, "windows-1251");
    reader.onloadend = () => {
      const xmlToJson = new XMLParser().parseFromString(reader.result);

      if (xmlToJson.children[1].children[0].children[2].value) {


        let total = 0


        for (let i = 0; i < xmlToJson.children[0].children[0].children.length; i++) {
          if (xmlToJson.children[0].children[0].children[i].name === "total") {
            for (let j = 0; j < xmlToJson.children[0].children[0].children[i].children[0].children.length; j++) {
              if (xmlToJson.children[0].children[0].children[i].children[0].children[j].name === "vNF") {
                total = parseFloat(xmlToJson.children[0].children[0].children[i].children[0].children[j].value);
              }
            }

          }
        }


        let item = {
          nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
          chave: xmlToJson.children[1]?.children[0].children[2].value,
          data: format(
            new Date(
              xmlToJson.children[0]?.children[0].children[0].children[6].value
            ),
            "dd/MM/yyyy HH:mm:ss",
            { locale: ptBR }
          ),
          mod: parseInt(
            xmlToJson.children[0]?.children[0].children[0].children[3].value
          ),
          status: "OK",
          total: total,
        };


        setJsonXmlList((prev: any) => [item, ...prev]);
      } else

        if (xmlToJson.children[0].attributes.Id?.match(/\d/g).join("")) {



          let ano = xmlToJson.children[0].children[0].children[5].value.substr(
            0,
            4
          );
          let mes = xmlToJson.children[0].children[0].children[5].value.substr(
            4,
            2
          );
          let dia = xmlToJson.children[0].children[0].children[5].value.substr(
            6,
            2
          );
          let hora = xmlToJson.children[0].children[0].children[6].value.substr(
            0,
            2
          );
          let minuto = xmlToJson.children[0].children[0].children[6].value.substr(
            2,
            2
          );
          let segundo =
            xmlToJson.children[0].children[0].children[6].value.substr(4, 2);

          let dataTratada = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}-03:00`;

          let vCFe = 0
          if (xmlToJson.children.length) {
            for (let i = 0; i < xmlToJson.children[0].children.length; i++) {
              if (xmlToJson.children[0].children[i]?.name === "total") {
                for (let j = 0; j < xmlToJson.children[0].children[i].children.length; j++) {
                  if (xmlToJson.children[0].children[i].children[j].name === "vCFe") {
                    vCFe = parseFloat(xmlToJson.children[0].children[i].children[j].value);
                  }
                }
              }

            }
          }



          let item = {
            nnf: xmlToJson.children[0].children[0].children[4].value,
            chave: xmlToJson.children[0].attributes.Id.match(/\d/g).join(""),
            data: format(new Date(dataTratada), "dd/MM/yyyy HH:mm:ss", {
              locale: ptBR,
            }),
            mod: parseInt(
              xmlToJson.children[0].children[0].children[2].value
            ),
            status: "OK",

            total: vCFe,
          };

          setJsonXmlList((prev: any) => [item, ...prev]);

        }

    };
  });
};