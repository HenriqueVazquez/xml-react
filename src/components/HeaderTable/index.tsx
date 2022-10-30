

export function HeaderTable() {
  return (
    <thead className="bg-gradient-to-r from-blue-400 to-blue-600 mb-3">
      <tr className=" bg-gradient-to-r from-blue-400 to-blue-600 ">
        <th className="px-6 py-3 text-base font-black text-left text-gray-200 uppercase rounded-l-full ">
          Nnf
        </th>
        <th className="px-6 py-3 text-base font-black text-left   text-gray-200 uppercase ">
          Chave
        </th>
        <th className="px-6 py-3 text-base font-black text-left text-gray-200 uppercase font-s">
          Data
        </th>
        <th className="px-6 py-3 text-base font-black text-left   text-gray-200 uppercase ">
          Tipo pagamento
        </th>
        <th className="px-6 py-3 text-base font-black text-left text-gray-200 uppercase ">
          Valor
        </th>
        <th className="px-6 py-3 text-base font-black text-left  text-gray-200 uppercase rounded-r-full">
          Status
        </th>
      </tr>
    </thead>
  )
}

