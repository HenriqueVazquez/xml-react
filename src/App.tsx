import { useEffect, useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";

import "./App.css";

function App() {
  const [count, setCount] = useState({});

  useEffect(() => {
    async function handleGetPriceList() {
      const config = {
        headers: { "Content-Type": "application/xml" },
      };

      try {
        const { data } = await axios.get("public/a.xml", config);
        console.log("data", data);
        const xmlToJson = new XMLParser().parseFromString(data);
        console.log(xmlToJson);
        setCount(xmlToJson);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    handleGetPriceList();
  }, []);

  return <div className="App">{count && <pre>{count.name}</pre>}</div>;
}

export default App;
