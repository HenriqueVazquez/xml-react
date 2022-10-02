import { useState } from "react";

import XMLParser from "react-xml-parser";

import "./App.css";

function App() {
  const [xmlItems, setXmlItems] = useState<any>([]);
  const [jsonXmlList, setJsonXmlList] = useState<any>([]);

  const handleFile = (event: any) => {
    const itensCopy = Array.from(event.target.files);
    let processedFiles: any = [];

    itensCopy.forEach((itemXml: any) => {
      let file = event.target.files[0];
      let reader = new FileReader();

      reader.readAsText(itemXml, "windows-1251");

      reader.onloadend = () => {
        const xmlToJson = new XMLParser().parseFromString(reader.result);

        let findTotal = xmlToJson.children[0].children[0].children;
        findTotal = findTotal.find((item: any) => item.name === "total");

        let item = {
          nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
          chave: xmlToJson.children[1]?.children[0].children[2].value,
          data: xmlToJson.children[0]?.children[0].children[0].children[6]
            .value,
          total: findTotal.children[0].children[21].value,
        };

        setJsonXmlList((prev: any) => [item, ...prev]);
      };
    });

    setJsonXmlList(processedFiles);
  };

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
                    <td>{item.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default App;
