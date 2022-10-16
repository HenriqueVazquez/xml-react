import { useEffect, useState } from "react";
import { handleCalcTotal } from "./components/HandleCalcTotal";

import formatCurrency from "../src/ultils/formatCurrency";

import ExportToCSV from "./components/ExportToCSV";

import "./styles/main.css";
import { IXmlItem } from "./interfaces/IXmlItem";
import { ExcelItem } from "./interfaces/ExcelItem";
import ListItens from "./components/ListItens";
import { HeaderTable } from "./components/HeaderTable";
import { Totalizers } from "./components/Totalizers";
import { HandleFileChange } from "./components/HandleFileChange";
import HandleFileChangeExcel from "./components/HandleFileChangeExcel";
import { LookForDivergences } from "./components/LookForDivergences";
import { ClearCache } from "./components/ClearCache";



function App() {
  const [jsonXmlList, setJsonXmlList] = useState<IXmlItem[]>([]);
  const [systemList, setSystemList] = useState<ExcelItem[]>([]);
  const [missingNote, setMissingNote] = useState<any[]>([]);

  const total = formatCurrency(handleCalcTotal(jsonXmlList));
  const missingSystemAmount = formatCurrency(handleCalcTotal(missingNote));
  const numberOfNotesMissing = missingNote.length;
  const style = "default";




  const handleFileChange = (event: any) => {
    HandleFileChange(event, setJsonXmlList)

  };


  const handleFileChangeExcel = async (event: any) => {
    HandleFileChangeExcel(event, setSystemList)
  }

  useEffect(() => {
    LookForDivergences(jsonXmlList, systemList, setMissingNote, missingNote)
  }, [systemList]);



  return (

    <div className="flex flex-col items-center justify-center mb-8  text-blue-700  w-full
     py-4 px-8  font-black          
     ">
      <h1 className="block mt-10 mb-5  drop-shadow-2xl font-normal text-2xl 
      font-permanent
      "> Buscar pela divergencias entre XML e consulta de faturamento ou sentença venda</h1>

      <form className="flex items-center">

        <label className="block mt-5 mb-8">
          <span

            className="
          bg-blue-50
          text-blue-700 
          font-semibold py-6 px-8           
          rounded-full m-8 cursor-pointer
           hover:bg-blue-100 text-lg "
          >Envie os arquivos XMLs</span>
          <input
            className="
            sr-only"
            id="sendXML"
            type="file"
            multiple
            accept="text/xml"
            onChange={handleFileChange}
          />
        </label>

        {jsonXmlList.length > 0 && (
          <button
            className="bg-blue-50
             text-blue-700 font-semibold py-3 px-8 
             rounded-full m-8 cursor-pointer hover:bg-blue-100"
            onClick={() => ClearCache(setJsonXmlList, setSystemList, setMissingNote)}
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


            <label className="block mb-8">
              <span
                className="bg-blue-50
               text-blue-700 
               font-semibold py-5 px-8 
               rounded-full m-8 cursor-pointer
                hover:bg-blue-100 text-lg">

                Enviar consulta de fechamento ou sentença vendas para comparar

              </span>
              <input
                className="sr-only  cursor-pointer"
                id="sendExcel"
                type="file"
                multiple
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                 .csv, application/vnd.ms-excel"


                onChange={handleFileChangeExcel}

              />
            </label>


          </div>
          <section className="w-3/5 border rounded-lg">
            <table className="w-full divide-gray-200">
              <HeaderTable />
              <tbody className="divide-y  w-full">
                {jsonXmlList.map((item, index: number) => {
                  return (
                    ListItens(item, index)
                  );
                })}
              </tbody>
            </table>
          </section>
          <button
            className="bg-blue-50 text-blue-700 
            font-semibold py-6 px-10 rounded-full m-8 
            cursor-pointer hover:bg-blue-100 text-lg"
            onClick={() => ExportToCSV({
              jsonXmlList,
              total,
              missingSystemAmount,
              numberOfNotesMissing,
              missingNote
            },
              "relatorio"
            )}>
            Exportar para Excel
          </button>
          {
            Totalizers(jsonXmlList)
          }



          {missingNote.length !== 0 ?
            <>
              <h1 className="text-blue-700 mb-4 font-normal text-2xl font-permanent drop-shadow-2xl ">
                Notas que faltaram
              </h1>

              <section className="w-3/5 border rounded-lg">
                <table className="w-full divide-y  divide-gray-200">
                  <HeaderTable />
                  <tbody className="divide-y  w-full">

                    {missingNote.length !== 0 ?
                      missingNote.map((item: ExcelItem, index: number) => {
                        return (
                          ListItens(item, index, style)
                        );
                      })
                      :
                      ""
                    }

                  </tbody>
                </table>
              </section>
              {
                Totalizers(missingNote)
              }
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
