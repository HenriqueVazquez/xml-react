import React from 'react';
import { ExcelItem } from '../../interfaces/ExcelItem';
import formatCurrency from '../../ultils/formatCurrency';

// import { Container } from './styles';

function ListItens(item: ExcelItem, index: number) {
  return (
    <tr
      key={index}
      className={`${item.mod === 55 && "bg-zinc-200"} ${item.status === "Faltou sistema" ? "bg-red-500 color " : ""}`}
    >
      <td className={`px-6 py-4 text-sm font-medium   whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : "text-black"}`}>
        {item.nnf}
      </td>
      <td className={`px-6 py-4 text-sm   whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : "text-black"}`}>
        {item.chave}
      </td>
      <td className={`px-6 py-4 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : " text-black"}`}>
        {item.data}
      </td>
      <td className={`px-6 py-4 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : " text-black"}`}>
        {formatCurrency(item.total)}
      </td>
      <td className={`px-6 py-4 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? "text-sky-50" : " text-black"}`}>
        {formatCurrency(item.total)}
      </td>
    </tr>)
}

export default ListItens;