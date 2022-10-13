import { useEffect, useState } from "react";

import { format } from "date-fns";
import { handleCalcTotal } from "./functions/HandleCalcTotal";
import { handleFilterXmlByType } from "./functions/handleFilterXmlByType";

import ptBR from "date-fns/locale/pt-BR";
import XMLParser from "react-xml-parser";
import { read, utils } from 'xlsx';


import formatCurrency from "../src/ultils/formatCurrency";

import ExportToCSV from "./functions/ExportToCSV";


import "./styles/main.css";
import { IXmlItem } from "./interfaces/IXmlItem";
import { ExcelItem } from "./interfaces/ExcelItem";


function App() {
  const [jsonXmlList, setJsonXmlList] = useState<IXmlItem[]>([]);
  const [systemList, setSystemList] = useState<ExcelItem[]>([]);
  const [notaFaltando, setNotaFaltando] = useState<any[]>([]);



  const handleFileChange = (event: any) => {
    const itensCopy = Array.from(event.target.files);

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
          dateTime: format(
            new Date(
              xmlToJson.children[0]?.children[0].children[0].children[6].value
            ),
            "dd/MM/yyyy HH:mm:ss",
            { locale: ptBR }
          ),
          mod: parseInt(
            xmlToJson.children[0]?.children[0].children[0].children[3].value
          ),
          status: "Passou",
          total: parseFloat(findTotal.children[0].children[21].value),
        };

        setJsonXmlList((prev: any) => [item, ...prev]);
      };
    });
  };


  const handleFileChangeExcel = async (event: any) => {
    const f = await (event.target.files[0]).arrayBuffer();
    const wb = read(f);
    const data = utils.sheet_to_json<ExcelItem>(wb.Sheets[wb.SheetNames[0]]);
    const vendasExcel = Object.values(data);
    let objetoVendasExcel: any = []

    if (vendasExcel[0].__EMPTY_17 === "Chave NFC-e / SAT") {

      for (let i = 1; i <= (vendasExcel.length - 1); i++) {
        if (vendasExcel[i]?.__EMPTY_17) {
          objetoVendasExcel.push({
            number: vendasExcel[i].__EMPTY,
            chave: vendasExcel[i].__EMPTY_17,
            status: "Passou",
            total: vendasExcel[i].__EMPTY_13,

          })
        }
      }

    }

    if (vendasExcel[0].__EMPTY_17 !== "Chave NFC-e / SAT") {
      if (vendasExcel[0].CHAVE) {

        vendasExcel.forEach((vendaExcel) => {

          objetoVendasExcel.push({
            number: vendaExcel.NUMERO,
            chave: vendaExcel.CHAVE,
            status: "Passou",
            total: vendaExcel.VALOR,
          });

        })
      }

      else {
        vendasExcel.forEach((vendaExcel) => {
          if (vendaExcel['Numero da Nota'] || vendaExcel['Chave'])

            objetoVendasExcel.push({
              number: vendaExcel['Numero da Nota'],
              chave: vendaExcel['Chave'],
              status: "Passou",
              total: vendaExcel['Valor Total'],
            });

        });
      }

    }
    setSystemList(objetoVendasExcel);
  }

  useEffect(() => {
    jsonXmlList.forEach(vendaXML => {
      const compararVendas = systemList.find(vendaSistema => vendaXML.chave === vendaSistema.chave);
      if (!compararVendas && (vendaXML.chave || vendaXML.nnf)) {
        console.log(vendaXML)

        vendaXML.status = "Faltou sistema"

        setNotaFaltando((prev: any) => [vendaXML, ...prev]);

      }

    });

    systemList.forEach(vendaSistema => {
      const compararVendas = jsonXmlList.find(vendaXML => vendaSistema.chave === vendaXML.chave);
      if (!compararVendas && (vendaSistema.chave || vendaSistema.numVenda)) {
        console.log(vendaSistema)

        vendaSistema.status = "Faltou XML"

        setNotaFaltando((prev: any) => [vendaSistema, ...prev]);

      }

    });


  }, [systemList]);



  const total = formatCurrency(handleCalcTotal(jsonXmlList));
  const faltaSistemaTotalValor = formatCurrency(handleCalcTotal(notaFaltando));
  const faltaSistemaTotal = notaFaltando.length;
  console.log(typeof faltaSistemaTotalValor)

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex items-center">
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

        {jsonXmlList.length > 0 && (
          <button
            className="bg-blue-50 text-blue-700 font-semibold py-2 px-4 rounded-full m-8 cursor-pointer hover:bg-blue-100"
            onClick={() => setJsonXmlList([])}
          >
            Limpar Dados
          </button>
        )}
      </form>

      {jsonXmlList.length > 0 && (
        <>
          <div
            className="flex-column"
          >
            <button
              className="bg-blue-50 text-blue-700 font-semibold py-2 px-4 rounded-full m-8 cursor-pointer hover:bg-blue-100"
              onClick={(e) => ExportToCSV({ jsonXmlList, total, faltaSistemaTotalValor, faltaSistemaTotal, notaFaltando }, "relatorio")}>
              Exportar para Excel
            </button>


            <input
              className=" text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 m-8 cursor-pointer"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, application/vnd.ms-excel"
              id="input_dom_element"
              onChange={handleFileChangeExcel}

            />

          </div>
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
                    <tr
                      key={index}
                      className={`${item.mod === 55 && "bg-zinc-200"} ${item.status === "Faltou sistema" ? "bg-red-500 color " : ""}`}
                    >
                      <td className={`px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : ""}`}>
                        {item.nnf}
                      </td>
                      <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : ""}`}>
                        {item.chave}
                      </td>
                      <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : ""}`}>
                        {item.dateTime}
                      </td>
                      <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : ""}`}>
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="w-full flex flex-col items-center justify-center m-8">
            <h1 className="text-blue-700 font-medium text-2xl">
              Totalizadores
            </h1>

            <div className="m-5 flex items-center justify-center font-medium">
              {handleFilterXmlByType(jsonXmlList, 55)}
              {handleFilterXmlByType(jsonXmlList, 65)}

              <div className="mx-2 flex  flex-col items-center justify-center">
                <div>Total: {formatCurrency(handleCalcTotal(jsonXmlList))}</div>
                <div>Arquivos: {jsonXmlList.length}</div>
              </div>
            </div>
          </section>
        </>
      )
      }
    </div >
  );
}

export default App;
