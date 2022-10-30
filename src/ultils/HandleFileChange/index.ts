import { format } from "date-fns";

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
        let adjustTypePay = 0;
        let typePay = "";

        for (let i = 0; i < xmlToJson.children[0].children[0].children.length; i++) {
          if (xmlToJson.children[0].children[0].children[i].name === "total") {
            for (let j = 0; j < xmlToJson.children[0].children[0].children[i].children[0].children.length; j++) {
              if (xmlToJson.children[0].children[0].children[i].children[0].children[j].name === "vNF") {
                total = parseFloat(xmlToJson.children[0].children[0].children[i].children[0].children[j].value);
              }
            }

          }
        }

        for (let i = 0; i < xmlToJson.children[0].children[0].children.length; i++) {
          if (xmlToJson.children[0].children[0].children[i].name === "pag") {
            adjustTypePay = parseInt(xmlToJson.children[0].children[0].children[i].children[0].children[0].value, 10);


            switch (adjustTypePay) {
              case 1:
                typePay = "Dinheiro";
                break;
              case 2:
                typePay = "Cheque";
                break;
              case 3:
                typePay = "Cartão de Crédito";
                break;
              case 4:
                typePay = "Cartão de Débito";
                break;
              case 5:
                typePay = "Crédito Loja";
                break;
              case 10:
                typePay = "Vale Alimentação";
                break;
              case 11:
                typePay = "Vale Refeição";
                break;
              case 12:
                typePay = "Vale Presente";
                break;
              case 13:
                typePay = "Vale Combustível";
                break;
              case 17:
                typePay = "PIX";
                break;
              default:
                typePay = "OUTROS"
                break;
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
          typePay: typePay,
          total: total,
        };


        setJsonXmlList((prev: any) => [item, ...prev]);


      } else



        if (xmlToJson.children[0].attributes.Id?.match(/\d/g).join("")) {



          let year = xmlToJson.children[0].children[0].children[5].value.substr(
            0,
            4
          );
          let month = xmlToJson.children[0].children[0].children[5].value.substr(
            4,
            2
          );
          let day = xmlToJson.children[0].children[0].children[5].value.substr(
            6,
            2
          );
          let hour = xmlToJson.children[0].children[0].children[6].value.substr(
            0,
            2
          );
          let minutes = xmlToJson.children[0].children[0].children[6].value.substr(
            2,
            2
          );
          let seconds =
            xmlToJson.children[0].children[0].children[6].value.substr(4, 2);

          let dataTratada = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}-03:00`;

          let vCFe = 0
          let typePay = "";

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

            for (let i = 0; i < xmlToJson.children[0].children.length; i++) {
              if (xmlToJson.children[0].children[i]?.name === "pgto") {
                for (let j = 0; j < xmlToJson.children[0].children[i].children.length; j++) {
                  if (xmlToJson.children[0].children[i].children[j].name === "MP") {
                    let adjustTypePay = parseInt(xmlToJson.children[0].children[i].children[j].children[0].value);


                    switch (adjustTypePay) {
                      case 1:
                        typePay = "Dinheiro";
                        break;
                      case 2:
                        typePay = "Cheque";
                        break;
                      case 3:
                        typePay = "Cartão de Crédito";
                        break;
                      case 4:
                        typePay = "Cartão de Débito";
                        break;
                      case 5:
                        typePay = "Crédito Loja";
                        break;
                      case 10:
                        typePay = "Vale Alimentação";
                        break;
                      case 11:
                        typePay = "Vale Refeição";
                        break;
                      case 12:
                        typePay = "Vale Presente";
                        break;
                      case 13:
                        typePay = "Vale Combustível";
                        break;
                      case 17:
                        typePay = "PIX";
                        break;
                      default:
                        typePay = "OUTROS"
                        break;
                    }
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
            typePay: typePay,
            total: vCFe,
          };

          setJsonXmlList((prev: any) => [item, ...prev]);

        }

    };
  });
};