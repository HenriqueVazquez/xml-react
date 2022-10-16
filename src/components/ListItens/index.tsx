
import { ExcelItem } from '../../interfaces/ExcelItem';
import formatCurrency from '../../ultils/formatCurrency';

// import { Container } from './styles';

function ListItens(item: ExcelItem, index: number, style?: string) {
  return (
    <tr
      key={index}
      className={`${item.mod === 55 && "bg-zinc-200 w-full"} 
      ${item.status === "Faltou sistema" ?
          style !== "default" ? "bg-red-600 color " : "" : item.status === "Venda cancelada" ? style !== "default" ? "bg-purple-900 color " : "" : ""
        } 
        `}
    >
      <td className={`px-6 py-4 text-sm   whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.nnf}
      </td>
      <td className={`px-6 py-4 text-sm   whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.chave}
      </td>
      <td className={`px-6 py-4 text-sm  whitespace- owrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.data}
      </td>
      <td className={`px-6 py-4 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {formatCurrency(item.total)}
      </td>
      <td className={`px-6 py-4 text-sm  whitespace-nowrap ${item.status === "Faltou sistema" ? style !== "default" ? "text-sky-50" : "text-black" :
        item.status === "Venda cancelada" ? style !== "default" ? "text-sky-50" : "text-black" : "text-black"} `}>
        {item.status}
      </td>
    </tr>)
}

export default ListItens;