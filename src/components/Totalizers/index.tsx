import React from 'react';
import { ExcelItem } from '../../interfaces/ExcelItem';
import formatCurrency from '../../ultils/formatCurrency';
import { handleCalcTotal } from '../HandleCalcTotal';
import { handleFilterXmlByType } from '../HandleFilterXmlByType';

// import { Container } from './styles';

export function Totalizers(jsonXmlList: any) {
  return (
    <section className="w-full flex flex-col items-center justify-center m-8" > <>
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

    </>
    </section >
  )
}

















