import { read, utils } from 'xlsx';
import { ExcelItem } from '../../interfaces/ExcelItem';
import { GetModel } from '../GetModel';

// import { Container } from './styles';

async function HandleFileChangeExcel(event: any, setSystemList: any) {
  const f = await (event.target.files[0]).arrayBuffer();
  const wb = read(f);
  const data = utils.sheet_to_json<ExcelItem>(wb.Sheets[wb.SheetNames[0]]);
  const vendasExcel = Object.values(data);
  let objetoVendasExcel: any = []




  if (vendasExcel[0].__EMPTY_17 === "Chave NFC-e / SAT") {



    for (let i = 1; i <= (vendasExcel.length - 1); i++) {
      if (vendasExcel[i].__EMPTY_1) {

        objetoVendasExcel.push({
          nnf: vendasExcel[i].__EMPTY,
          chave: vendasExcel[i].__EMPTY_17,
          data: vendasExcel[i].__EMPTY_1,
          mod: GetModel(vendasExcel[i].__EMPTY_17),
          status: "OK",
          total: vendasExcel[i].__EMPTY_13,

        })
      }
    }

  } else

    if (vendasExcel[0].__EMPTY_17 !== "Chave NFC-e / SAT") {

      if (vendasExcel[0].CHAVE) {
        console.log("Entrou")


        vendasExcel.forEach((vendaExcel) => {

          objetoVendasExcel.push({
            nnf: vendaExcel.NUMERO,
            chave: vendaExcel.CHAVE,
            data: vendaExcel.DATA,
            mod: GetModel(vendaExcel.CHAVE),
            status: "OK",
            total: vendaExcel.VALOR,
          });

        })
      } else

        if (vendasExcel[0]['Numero da Nota']) {

          vendasExcel.forEach((vendaExcel) => {


            if (vendaExcel['Numero da Nota'] || vendaExcel['Chave'])


              objetoVendasExcel.push({
                nnf: vendaExcel['Numero da Nota'],
                chave: vendaExcel['Chave'],
                data: vendaExcel['Data'].replace(" -", ""),
                mod: GetModel(vendaExcel['Chave']),
                status: "OK",
                total: vendaExcel['Valor Total'],
              });

          });
        } else
          if (vendasExcel[0].__EMPTY_14 === "Chave") {



            for (let i = 1; i <= (vendasExcel.length - 1); i++) {
              objetoVendasExcel.push({
                nnf: vendasExcel[i].__EMPTY,
                chave: vendasExcel[i].__EMPTY_14,
                data: vendasExcel[i].__EMPTY_1,
                mod: GetModel(vendasExcel[i].__EMPTY_14),
                status: "OK",
                total: vendasExcel[i].__EMPTY_11,
              });

            };


          }

    }
  setSystemList(objetoVendasExcel);

}

export default HandleFileChangeExcel;