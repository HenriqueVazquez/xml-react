import { useState } from "react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import XMLParser from "react-xml-parser";

import formatCurrency from "../src/ultils/formatCurrency";

import "./App.css";

function App() {
  const [jsonXmlList, setJsonXmlList] = useState<any>([]);

  const handleFile = (event: any) => {
    const itensCopy = Array.from(event.target.files);
    let processedFiles: any = [];

    itensCopy.forEach((itemXml: any) => {
      let reader = new FileReader();
      reader.readAsText(itemXml, "windows-1251");
      reader.onloadend = () => {
        const xmlToJson = new XMLParser().parseFromString(reader.result);

        let findTotal = xmlToJson.children[0].children[0].children;
        findTotal = findTotal.find((item: any) => item.name === "total");

        let item = {
          nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
          chave: xmlToJson.children[1]?.children[0].children[2].value,
          data: format(
            new Date(
              xmlToJson.children[0]?.children[0].children[0].children[6].value
            ),
            "yyyy/MM/dd HH:mm:ss",
            { locale: ptBR }
          ),
          total: parseFloat(findTotal.children[0].children[21].value),
        };

        setJsonXmlList((prev: any) => [item, ...prev]);
      };
    });

    setJsonXmlList(processedFiles);
  };

  function handleCalcTotal(items: any) {
    let valor: number = 0;
    items.forEach((x: any) => {
      valor += x.total;
    });

    return valor;
  }

  return (
    <div className="App">
      <input type="file" multiple accept="text/xml" onChange={handleFile} />
      <br />
      <br />
      {jsonXmlList.length > 0 && (
        <section>
          <table>
            <thead>
              <tr>
                <th>Nnf</th>
                <th>Chave</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {jsonXmlList.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.nnf}</td>
                    <td>{item.chave}</td>
                    <td>{item.data}</td>
                    <td>{formatCurrency(item.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div>Arquivos analizados: {jsonXmlList.length}</div>
          <div>Valor total: {formatCurrency(handleCalcTotal(jsonXmlList))}</div>
        </section>
      )}
    </div>
  );
}

export default App;
