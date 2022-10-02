import { useEffect, useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import "./App.css";

function App() {
  const [count, setCount] = useState("");
  const [key, setKey] = useState("");
  const [creatAt, setCreatAt] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    async function handleGetPriceList() {
      const config = {
        headers: { "Content-Type": "application/xml" },
      };

      try {
        const { data } = await axios.get("public/a.xml", config);
        const xmlToJson = new XMLParser().parseFromString(data);

        setKey(xmlToJson.children[1].children[0].children[2].value);
        setCount(
          xmlToJson.children[0].children[0].children[0].children[5].value
        );
        setCreatAt(
          xmlToJson.children[0].children[0].children[0].children[6].value
        );
        setTotal(
          xmlToJson.children[0].children[0].children[11].children[0].children[1]
            .value
        );
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    handleGetPriceList();
  }, []);

  return (
    <div className="App">
      <ul>
        <li>nNF: {count}</li>
        <li>Chave: {key}</li>
        <li>Data: {creatAt}</li>
        <li>Total: {total}</li>
      </ul>
    </div>
  );
}

export default App;
