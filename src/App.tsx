import { useState } from "react";
import XMLParser from "react-xml-parser";

import "./App.css";

function App() {
  const [xmlItems, setXmlItems] = useState<any>([]);
  const [item, setItems] = useState<any>([]);

  const handleFile = (event: any) => {
    const itensCopy = Array.from(event.target.files);
    let final: any = [];

    itensCopy.forEach((item) => {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file, "windows-1251");
      reader.onloadend = () => {
        const xmlToJson = new XMLParser().parseFromString(reader.result);

        let obj = {
          nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
          chave: xmlToJson.children[1]?.children[0].children[2].value,
          data: xmlToJson.children[0]?.children[0].children[0].children[6]
            .value,
        };

        console.log("obg", obj);
        setItems((prev: any) => [obj, ...prev]);
      };
    });

    setItems(final);
  };

  return (
    <div className="App">
      <input type="file" multiple accept="text/xml" onChange={handleFile} />

      <br />
      <br />

      {item.map((nota: any, index: number) => {
        return (
          <tr key={index}>
            <td>Nnf: {nota.nnf}</td>
            <td>chave: {nota.chave}</td>
            <td>data: {nota.data}</td>
          </tr>
        );
      })}
    </div>
  );
}

export default App;
