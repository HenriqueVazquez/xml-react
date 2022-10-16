
import formatCurrency from '../../ultils/formatCurrency';
import { handleCalcTotal } from '../HandleCalcTotal';
import { handleFilterXmlByType } from '../HandleFilterXmlByType';

// import { Container } from './styles';

export function Totalizers(jsonXmlList: any) {
  return (
    <section className="w-full flex flex-col items-center justify-center m-8 font-normal" > <>
      <h1 className="text-blue-700 font-normal text-2xl font-permanent drop-shadow-2xl">
        Totalizadores
      </h1>

      <div className="m-5 flex items-centeront-black justify-center font-sans">
        {handleFilterXmlByType(jsonXmlList, 55)}
        {handleFilterXmlByType(jsonXmlList, 65)}


        <div className="mx-2 flex  flex-col font-normal items-center justify-center font-sans">
          <div className='font-black'>Total: {formatCurrency(handleCalcTotal(jsonXmlList))}</div>
          <div className='font-black'>Arquivos: {jsonXmlList.length}</div>
        </div>

      </div>

    </>
    </section >
  )
}

















