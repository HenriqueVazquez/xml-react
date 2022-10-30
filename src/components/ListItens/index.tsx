

import { IXmlItem } from '../../interfaces/IXmlItem';
import { formatCurrency } from "../../ultils/";

// import { Container } from './styles';

export function ListItens(item: IXmlItem, index: number, style?: string) {
  return (
    <tr
      key={index}
      className={` bg-blue-50 mb-6 pb-4 ${item.mod === 55 && "bg-zinc-200 w-full "} 
      ${item.status === "Faltou sistema" ?
          style !== "default" ? "bg-red-600 color " : "" : item.status === "Venda cancelada" ? style !== "default" ? "bg-purple-900 color " : "" : ""
        } 
        `}
    >
      <td className={`px-6 py-4 mb-6 text-sm rounded-l-full whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black " :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.nnf}
      </td>
      <td className={`px-6 py-4 mb-6 text-sm   whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.chave}
      </td>
      <td className={`px-6 py-4 mb-6 text-sm  whitespace- owrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.data}
      </td>
      <td className={`px-6 py-4 mb-6 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.typePay}
      </td>
      <td className={`px-6 py-4 mb-6 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {formatCurrency(item.total)}
      </td>
      <td className={`rounded-r-full px-6 mb-6 py-4 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.status}
      </td>
    </tr>)
}

