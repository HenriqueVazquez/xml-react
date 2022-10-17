import { useEffect, useState } from "react";
import { MdReplay, MdOutlinePostAdd, MdSaveAlt } from 'react-icons/md';
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
      <h1 className="block mt-5 mb-4  drop-shadow-2xl font-black text-2xl 
      font-sans
      "> Buscar pela divergencias entre XML e consulta de faturamento ou sentença venda</h1>

      <form className="flex items-center">

        <div className="flex justify-center content-center items-center">
          <label className="block mt-2 mb-1">

            <span
              className="
          bg-blue-100
          text-blue-700 
          font-semibold py-3 px-8           
          rounded-full mb-6 cursor-pointer
           hover:bg-blue-200 text-lg flex justify-between content-center items-center"
            >
              <MdOutlinePostAdd size={25} className="mr-2" />
              Envie os arquivos XMLs</span>


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
              className="bg-blue-100 
             text-blue-700 font-semibold py-3 px-8 flex justify-between
             content-center items-center text-lg
             rounded-full mb-4 ml-8 cursor-pointer hover:bg-blue-200"
              onClick={() => ClearCache(setJsonXmlList, setSystemList, setMissingNote)}
            >

              <MdReplay size={25} className="flex mr-1" />
              <div className="flex ml-1">

                Limpar Dados
              </div>


            </button>
          )}
        </div>
      </form>

      {
        jsonXmlList.length > 0 && (
          <>
            <div
              className="flex-column"
            >

            </div>
            <label className="block mb-1">
              <span
                className="bg-blue-100
               text-blue-700 
               font-semibold py-3 px-8 
               rounded-full mb-4 cursor-pointer
                hover:bg-blue-200 
                text-lg flex justify-between content-center items-center">
                <MdOutlinePostAdd size={25} className="mr-2" />

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
            <section className="w-4/5  rounded-lg">

              <table className="w-full border-spacing-y-1.5 border-separate">

                <HeaderTable />
                <tbody className=" w-full">
                  {jsonXmlList.map((item, index: number) => {
                    return (
                      ListItens(item, index)
                    );
                  })}
                </tbody>
              </table>
            </section>
            <button
              className="bg-blue-100 text-blue-700 
            font-semibold py-4 px-10 rounded-full mb-4 mt-4 
            cursor-pointer hover:bg-blue-200 text-lg flex
            justify-between content-center items-center"
              onClick={() => ExportToCSV({
                jsonXmlList,
                total,
                missingSystemAmount,
                numberOfNotesMissing,
                missingNote
              },
                "relatorio"
              )}>
              <MdSaveAlt size={25} className="mr-3" />
              Exportar para Excel
            </button>
            {
              Totalizers(jsonXmlList)
            }



            {missingNote.length !== 0 ?
              <>
                <h1 className="text-blue-700 mb-4 font-black text-2xl font-sans drop-shadow-2xl ">
                  Notas que faltaram
                </h1>

                <section className="w-4/5">
                  <table className="w-full border-spacing-y-1.5 border-separate">
                    <HeaderTable />
                    <tbody className="  w-full mt-3">

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
