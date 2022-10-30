
import formatCurrency from '../../ultils/formatCurrency';
import { handleCalcTotal } from '../HandleCalcTotal';
import { handleFilterXmlByType } from '../HandleFilterXmlByType';
import { handlePaymentTypeTotalizer } from '../HandlePaymentTypeTotalizer';



export function Totalizers(jsonXmlList: any) {
  return (
    <section className="w-full flex flex-col items-center justify-center m-8 font-normal" > <>
      <h1 className="text-blue-700 font-black text-2xl font-sans drop-shadow-2xl">
        Totalizadores
      </h1>
      <div className="flex items-centeront-black justify-center font-sans ">
        {handlePaymentTypeTotalizer(jsonXmlList)}
      </div>
      <div className="flex items-centeront-black justify-center font-sans">
        {handleFilterXmlByType(jsonXmlList, 55)}
        {handleFilterXmlByType(jsonXmlList, 65)}


        <div className="mx-1 flex  flex-col font-normal items-center justify-center font-sans">
          <div className='font-black'>Total: {formatCurrency(handleCalcTotal(jsonXmlList))}</div>
          <div className='font-black'>Arquivos: {jsonXmlList.length}</div>
        </div>

      </div>

    </>
    </section >
  )
}

















