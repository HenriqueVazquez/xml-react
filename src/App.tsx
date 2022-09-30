import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [count, setCount] = useState("");

  useEffect(() => {
    async function handleGetPriceList() {
      const config = {
        headers: { "Content-Type": "application/xml" },
      };

      try {
        const { data } = await axios.get("public/a.xml", config);
        console.log("data", data);
        setCount(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    handleGetPriceList();
  }, []);

  return (
    <div className="App">
      <pre>{count}</pre>
    </div>
  );
}

export default App;
