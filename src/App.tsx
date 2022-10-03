import { useState } from "react";
import { format } from "date-fns";

import ptBR from "date-fns/locale/pt-BR";
import XMLParser from "react-xml-parser";

import formatCurrency from "../src/ultils/formatCurrency";

import "./styles/main.css";

interface IXmlItem {
  key: string;
  dateTime: string;
  nnf: string;
  total: number;
}

function App() {
  const [jsonXmlList, setJsonXmlList] = useState<IXmlItem[]>([]);

  const handleFileChange = (event: any) => {
    const itensCopy = Array.from(event.target.files);
    let processedFiles: IXmlItem[] = [];

    itensCopy.forEach((itemXml: any) => {
      let reader = new FileReader();
      reader.readAsText(itemXml, "windows-1251");
      reader.onloadend = () => {
        const xmlToJson = new XMLParser().parseFromString(reader.result);

        let findTotal = xmlToJson.children[0].children[0].children;
        findTotal = findTotal.find((item: any) => item.name === "total");

        let item = {
          nnf: xmlToJson.children[0]?.children[0].children[0].children[5].value,
          key: xmlToJson.children[1]?.children[0].children[2].value,
          dateTime: format(
            new Date(
              xmlToJson.children[0]?.children[0].children[0].children[6].value
            ),
            "dd/MM/yyyy HH:mm:ss",
            { locale: ptBR }
          ),
          total: parseFloat(findTotal.children[0].children[21].value),
        };

        setJsonXmlList((prev: any) => [item, ...prev]);
      };
    });

    setJsonXmlList(processedFiles);
  };

  function handleCalcTotal(items: IXmlItem[]) {
    let valor: number = 0;
    items.forEach((item) => {
      valor += item.total;
    });

    return valor;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        <label className="block">
          <span className="sr-only">Choose File</span>
          <input
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 m-8 cursor-pointer"
            type="file"
            multiple
            accept="text/xml"
            onChange={handleFileChange}
          />
        </label>
      </form>

      {jsonXmlList.length > 0 && (
        <>
          <section className="w-3/5 border rounded-lg">
            <table className="w-full divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    Nnf
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    Chave
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    Data
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jsonXmlList.map((item, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {item.nnf}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {item.key}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {item.dateTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="m-5 flex flex-col items-center justify-center font-medium">
            <div>Arquivos processados: {jsonXmlList.length}</div>
            <div>
              Valor total: {formatCurrency(handleCalcTotal(jsonXmlList))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
