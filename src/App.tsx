import { useEffect, useState } from "react";
import { handleCalcTotal } from "./components/HandleCalcTotal";

import formatCurrency from "../src/ultils/formatCurrency";

import ExportToCSV from "./components/ExportToCSV";

import "./styles/main.css";
import { IXmlItem } from "./interfaces/IXmlItem";
import { ExcelItem } from "./interfaces/ExcelItem";
import ListItens from "./components/ListItens";
import HeaderTable from "./components/HeaderTable";
import { Totalizers } from "./components/Totalizers";
import { HandleFileChange } from "./components/HandleFileChange";
import HandleFileChangeExcel from "./components/HandleFileChangeExcel";
import { LookForDivergences } from "./components/LookForDivergences";


function App() {
  const [jsonXmlList, setJsonXmlList] = useState<IXmlItem[]>([]);
  const [systemList, setSystemList] = useState<ExcelItem[]>([]);
  const [notaFaltando, setNotaFaltando] = useState<any[]>([]);

  const total = formatCurrency(handleCalcTotal(jsonXmlList));
  const faltaSistemaTotalValor = formatCurrency(handleCalcTotal(notaFaltando));
  const faltaSistemaTotal = notaFaltando.length;



  const handleFileChange = (event: any) => {
    HandleFileChange(event, setJsonXmlList)
  };


  const handleFileChangeExcel = async (event: any) => {
    HandleFileChangeExcel(event, setSystemList)
  }

  useEffect(() => {
    LookForDivergences(jsonXmlList, systemList, setNotaFaltando)
  }, [systemList]);





  return (
    <div className="flex flex-col items-center justify-center mb-8">
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


            <label className="block mb-4">
              <span className="rounded-full bg-blue-50 text-blue-700 font-semibold py-2 px-4 rounded-full m-8 cursor-pointer hover:bg-blue-100">Enviar consulta de fechamento ou sentença vendas para comparar</span>
              <input
                className="sr-only mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 m-8 cursor-pointer"
                type="file"
                multiple
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, application/vnd.ms-excel"
                id="input_dom_element"
                onChange={handleFileChangeExcel}
              />
            </label>


          </div>
          <section className="w-3/5 border rounded-lg">
            <table className="w-full divide-gray-200">
              <HeaderTable />
              <tbody className="divide-y divide-gray-200">
                {jsonXmlList.map((item, index: number) => {
                  return (
                    ListItens(item, index)
                  );
                })}
              </tbody>
            </table>
          </section>
          <button
            className="bg-blue-50 text-blue-700 font-semibold py-2 px-4 rounded-full m-8 cursor-pointer hover:bg-blue-100"
            onClick={(e) => ExportToCSV({ jsonXmlList, total, faltaSistemaTotalValor, faltaSistemaTotal, notaFaltando }, "relatorio")}>
            Exportar para Excel
          </button>
          {Totalizers(jsonXmlList)}



          {notaFaltando.length !== 0 ?
            <>
              <h1 className="text-blue-700 font-medium text-2xl mb-4 ">
                Notas que faltaram
              </h1>

              <section className="w-3/5 border rounded-lg">

                <table className="w-full divide-gray-200 ">
                  <HeaderTable />

                  <tbody className="divide-y divide-gray-200">



                    {notaFaltando.length !== 0 ?
                      notaFaltando.map((item: ExcelItem, index: number) => {
                        return (
                          ListItens(item, index)
                        );
                      })
                      :
                      ""
                    }

                  </tbody>
                </table>
              </section>
            </>
            :
            ""
          }
        </>
      )
      }

    </div >
  );

}

export default App;
