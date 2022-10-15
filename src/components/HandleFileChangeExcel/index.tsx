import { read, utils } from 'xlsx';
import { ExcelItem } from '../../interfaces/ExcelItem';

// import { Container } from './styles';

async function HandleFileChangeExcel(event: any, setSystemList: any) {
  const f = await (event.target.files[0]).arrayBuffer();
  const wb = read(f);
  const data = utils.sheet_to_json<ExcelItem>(wb.Sheets[wb.SheetNames[0]]);
  const vendasExcel = Object.values(data);
  let objetoVendasExcel: any = []




  console.log(vendasExcel[0].value)

  if (vendasExcel[0].__EMPTY_17 === "Chave NFC-e / SAT") {


    for (let i = 1; i <= (vendasExcel.length - 1); i++) {
      if (vendasExcel[i]?.__EMPTY_17) {
        objetoVendasExcel.push({
          number: vendasExcel[i].__EMPTY,
          chave: vendasExcel[i].__EMPTY_17,
          status: "OK",
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
          status: "OK",
          total: vendaExcel.VALOR,
        });

      })
    } else

      if (vendasExcel[0]['Numero da Nota']) {

        vendasExcel.forEach((vendaExcel) => {

          if (vendaExcel['Numero da Nota'] || vendaExcel['Chave'])


            objetoVendasExcel.push({
              number: vendaExcel['Numero da Nota'],
              chave: vendaExcel['Chave'],
              status: "OK",
              total: vendaExcel['Valor Total'],
            });

        });
      } else
        if (vendasExcel[0].__EMPTY_14 === "Chave") {



          for (let i = 1; i <= (vendasExcel.length - 1); i++) {
            objetoVendasExcel.push({
              number: vendasExcel[i].__EMPTY,
              chave: vendasExcel[i].__EMPTY_14,
              status: "OK",
              total: vendasExcel[i].__EMPTY_11,
            });

          };


        }

  }
  setSystemList(objetoVendasExcel);

}

export default HandleFileChangeExcel;