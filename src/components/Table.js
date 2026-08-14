import React from "react";

function Table({ cryptocurrencies, amount, isValid }) {
  const parsedAmount = parseFloat(amount);

  return (
    <div className="card card-text mt-10 mx-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Exchange Rate</th>
            <th>Number of Coins</th>
          </tr>
        </thead>
        <tbody data-testid="exchange-data">
          {cryptocurrencies.map((crypto, index) => {
            let numberOfCoins = "n/a";

            // Si el input está vacío, muestra "0"
            if (amount === "") {
              numberOfCoins = "0";
            } else if (isValid && !isNaN(parsedAmount)) {
              numberOfCoins = (parsedAmount * crypto.rate).toFixed(8);
            }

            return (
              <tr key={index}>
                <td>{crypto.name}</td>
                <td>1 USD = {crypto.rate} {crypto.code}</td>
                <td>{numberOfCoins}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;