import { read, utils } from 'xlsx';
import { IXmlItem } from '../../interfaces/IXmlItem';

import { GetModel } from '../../ultils';


export async function HandleFileChangeExcel(event: any, setSystemList: any) {
  const f = await (event.target.files[0]).arrayBuffer();
  const wb = read(f);
  const data = utils.sheet_to_json<IXmlItem>(wb.Sheets[wb.SheetNames[0]]);
  const excelSales = Object.values(data);
  let objetoVendasExcel: any = []




  if (excelSales[0].__EMPTY_17 === "Chave NFC-e / SAT") {



    for (let i = 1; i <= (excelSales.length - 1); i++) {
      if (excelSales[i].__EMPTY_1) {

        objetoVendasExcel.push({
          nnf: excelSales[i].__EMPTY,
          chave: excelSales[i].__EMPTY_17,
          data: excelSales[i].__EMPTY_1,
          mod: GetModel(excelSales[i].__EMPTY_17),
          status: "OK",
          total: excelSales[i].__EMPTY_13,

        })
      }
    }

  } else

    if (excelSales[0].__EMPTY_17 !== "Chave NFC-e / SAT") {

      if (excelSales[0].CHAVE) {



        excelSales.forEach((excelSale) => {

          objetoVendasExcel.push({
            nnf: excelSale.NUMERO,
            chave: excelSale.CHAVE,
            data: excelSale.DATA,
            mod: GetModel(excelSale.CHAVE),
            status: "OK",
            total: excelSale.VALOR,
          });

        })
      } else

        if (excelSales[0]['Numero da Nota']) {


          excelSales.forEach((excelSale) => {


            if (excelSale['Numero da Nota'] || excelSale['Chave'])


              objetoVendasExcel.push({
                nnf: excelSale['Numero da Nota'],
                chave: excelSale['Chave'],
                data: excelSale['Data'].replace(" -", ""),
                mod: GetModel(excelSale['Chave']),
                status: "OK",
                total: excelSale['Valor Total'],
              });

          });
        } else
          if (excelSales[0].__EMPTY_14 === "Chave") {

            for (let i = 1; i <= (excelSales.length - 1); i++) {
              objetoVendasExcel.push({
                nnf: excelSales[i].__EMPTY,
                chave: excelSales[i].__EMPTY_14,
                data: excelSales[i].__EMPTY_6,
                mod: GetModel(excelSales[i].__EMPTY_14),
                status: "OK",
                total: excelSales[i].__EMPTY_11,
              });

            };


          }

    }
  setSystemList(objetoVendasExcel);

}
