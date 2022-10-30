import { IXmlItem } from "../../interfaces/IXmlItem";
import formatCurrency from "../../ultils/formatCurrency";

export function handlePaymentTypeTotalizer(items: IXmlItem[]) {

  let totalCash: number = 0;
  let totalCheck: number = 0;
  let totalCreditCard: number = 0;
  let totalDebitCard: number = 0;
  let totalCreditStore: number = 0;
  let totalFoodStamps: number = 0;
  let totalMealTicket: number = 0;
  let totalGiftCard: number = 0;
  let totalFuelVoucher: number = 0;
  let totalPIX: number = 0;
  let totalOuthers: number = 0;


  items.forEach((item) => {
    switch (item.typePay) {
      case "Dinheiro":
        totalCash = totalCash + item.total;
        break;
      case "Cheque":
        totalCheck = totalCheck + item.total;
        break;
      case "Cartão de Crédito":
        totalCreditCard = totalCreditCard + item.total;
        break;
      case "Cartão de Débito":
        totalDebitCard = totalDebitCard + item.total;
        break;
      case "Crédito Loja":
        totalCreditStore = totalCreditStore + item.total;
        break;
      case "Vale Alimentação":
        totalFoodStamps = totalFoodStamps + item.total;
        break;
      case "Vale Refeição":
        totalMealTicket = totalMealTicket + item.total;
        break;
      case "Vale Presente":
        totalGiftCard = totalGiftCard + item.total;
        break;
      case "Vale Combustível":
        totalFuelVoucher = totalFuelVoucher + item.total;
        break;
      case "PIX":
        totalPIX = totalPIX + item.total;
        break;
      default:
        totalOuthers = totalOuthers + item.total;
        break;
    }
  });
 
  return (
    <div className="flex flex-col items-center justify-center font-black font-sans mt-6 w-full">
      <div className="flex font-black font-sans  w-full items-center justify-evenly gap-10 ">
        {totalCash ?
          <div>
            {`Dinheiro:  ${formatCurrency(totalCash)} `}
          </div>
          : null}

        {totalCheck ?
          <div>
            {`Cheque:  ${formatCurrency(totalCheck)} `}
          </div>
          : null}

        {totalCreditCard ?
          <div>
            {`Cartão de Crédito:  ${formatCurrency(totalCreditCard)} `}
          </div>
          : null}

        {totalDebitCard ?
          <div>
            {`Cartão de Débito:  ${formatCurrency(totalDebitCard)} `}
          </div>
          : null}

        {totalCreditStore ?
          <div>
            {`Crédito Loja:  ${formatCurrency(totalCreditStore)} `}
          </div>
          : null}

        {totalFoodStamps ?
          <div>
            {`Vale Alimentação:  ${formatCurrency(totalFoodStamps)}`}
          </div>
          : null}

        {totalMealTicket ?
          <div>
            {`Vale Refeição:  ${formatCurrency(totalMealTicket)} `}
          </div>
          : null}

        {totalGiftCard ?
          <div>
            {`Vale Presente:  ${formatCurrency(totalGiftCard)} `}
          </div>
          : null}

        {totalFuelVoucher ?
          <div>
            {`Vale Combustível:  ${formatCurrency(totalFuelVoucher)} `}
          </div>
          : null}

        {totalPIX ?
          <div>
            {`PIX:  ${formatCurrency(totalPIX)} `}
          </div>
          : null}

        {totalOuthers ?
          <div>
            {`Outros:  ${formatCurrency(totalOuthers)} `}
          </div>
          : null}


      </div>

    </div>
  );
}