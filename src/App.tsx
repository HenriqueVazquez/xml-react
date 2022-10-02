import { useState } from "react";

import XMLParser from "react-xml-parser";

import "./App.css";

function App() {
  const [xmlItems, setXmlItems] = useState<any>([]);
  const [jsonXmlList, setJsonXmlList] = useState<any>([]);

  const handleFile = (event: any) => {
    const itensCopy = Array.from(event.target.files);
    let processedFiles: any = [];

    itensCopy.forEach((item) => {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file, "windows-1251");
      reader.onloadend = () => {
        const xmlToJson = new XMLParser().parseFromString(reader.result);

        let item = {
          nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
          chave: xmlToJson.children[1]?.children[0].children[2].value,
          data: xmlToJson.children[0]?.children[0].children[0].children[6]
            .value,
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

      {jsonXmlList.map((item: any, index: number) => {
        return (
          <tr key={index}>
            <td>Nnf: {item.nnf}</td>
            <td>chave: {item.chave}</td>
            <td>data: {item.data}</td>
          </tr>
        );
      })}
    </div>
  );
}

export default App;
