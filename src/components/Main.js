// import React, { useState } from "react";
// import Table from "./Table";
// import { cryptocurrencyList } from "../cryptocurrency-list";

// const AVAILABLE_BALANCE = 17042.67;

// function Main() {
//   const [amount, setAmount] = useState("");
//   const [hasInteracted, setHasInteracted] = useState(false); // Nuevo para controlar si el usuario ya escribió algo

//   const handleInputChange = (e) => {
//     setAmount(e.target.value);
//     setHasInteracted(true); // Marcamos que ya hubo interacción
//   };

//   const getErrorMessage = () => {
//     // Si está vacío, solo mostramos error si el usuario ya interactuó o si se requiere
//     if (amount === "") {
//       return hasInteracted ? "Amount cannot be empty" : "";
//     }
//     const num = parseFloat(amount);
//     if (num < 0.01) {
//       return "Amount cannot be less than $0.01"; // Texto exacto que pide el test
//     }
//     if (num > AVAILABLE_BALANCE) {
//       return "Amount cannot exceed the available balance";
//     }
//     return "";
//   };

//   const errorMessage = getErrorMessage();
//   const isValid = errorMessage === "";

//   return (
//     <div className="layout-column align-items-center mx-auto">
//       <h1>CryptoRank Exchange</h1>
//       <section>
//         <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
//           <label>
//             I want to exchange ${" "}
//             <input 
//               className="w-10" 
//               data-testid="amount-input" 
//               required 
//               type="number" 
//               placeholder="USD" 
//               value={amount}
//               onChange={handleInputChange}
//             />{" "}
//             of my $<span>{AVAILABLE_BALANCE}</span>:
//           </label>
          
//           {errorMessage && (
//             <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0">
//               {errorMessage}
//             </p>
//           )}
//         </div>
//       </section>
      
//       <Table 
//         cryptocurrencies={cryptocurrencyList} 
//         amount={amount} 
//         isValid={isValid} 
//       />
//     </div>
//   );
// }

// export default Main;

import React, { useState, useEffect } from "react";
import Table from "./Table";
import { cryptocurrencyList } from "../cryptocurrency-list";

const AVAILABLE_BALANCE = 17042.67;

function Main() {
  const [amount, setAmount] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // 1. Transformamos la lista estática en un estado
  const [cryptos, setCryptos] = useState(cryptocurrencyList);

  // 2. Añadimos useEffect para consumir la API en tiempo real al cargar
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,binancecoin,ripple&vs_currencies=usd')
      .then((response) => response.json())
      .then((data) => {
        // 3. Aquí actualizamos las tasas de la lista según lo que devuelva la API
        // (Nota: Debes asegurar que las propiedades coincidan con el formato que Table.js espera)
        const updatedList = cryptocurrencyList.map((crypto) => {
          let liveRate = crypto.rate; // Valor por defecto si no coincide
          
          // Mapeo según el ID o nombre que use tu API de CoinGecko
          if (crypto.name === "Bitcoin" && data.bitcoin) liveRate = 1 / data.bitcoin.usd;
          if (crypto.name === "Ethereum" && data.ethereum) liveRate = 1 / data.ethereum.usd;
          if (crypto.name === "Dogecoin" && data.dogecoin) liveRate = 1 / data.dogecoin.usd;
          if (crypto.name === "BNB" && data.binancecoin) liveRate = 1 / data.binancecoin.usd;
          if (crypto.name === "XRP" && data.ripple) liveRate = 1 / data.ripple.usd;

          return { ...crypto, rate: liveRate };
        });

        setCryptos(updatedList);
      })
      .catch((error) => console.error("Error al obtener tasas en vivo:", error));
  }, []);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    setHasInteracted(true);
  };

  const getErrorMessage = () => {
    if (amount === "") {
      return hasInteracted ? "Amount cannot be empty" : "";
    }
    const num = parseFloat(amount);
    if (num < 0.01) {
      return "Amount cannot be less than $0.01";
    }
    if (num > AVAILABLE_BALANCE) {
      return "Amount cannot exceed the available balance";
    }
    return "";
  };

  const errorMessage = getErrorMessage();
  const isValid = errorMessage === "";

  return (
    <div className="layout-column align-items-center mx-auto">
      <h1>CryptoRank Exchange</h1>
      <section>
        <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
          <label>
            I want to exchange ${" "}
            <input 
              className="w-10" 
              data-testid="amount-input" 
              required 
              type="number" 
              placeholder="USD" 
              value={amount}
              onChange={handleInputChange}
            />{" "}
            of my $<span>{AVAILABLE_BALANCE}</span>:
          </label>
          
          {errorMessage && (
            <p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0">
              {errorMessage}
            </p>
          )}
        </div>
      </section>
      
      {/* 4. Pasamos el estado dinámico (cryptos) en lugar de la lista estática directa */}
      <Table 
        cryptocurrencies={cryptos} 
        amount={amount} 
        isValid={isValid} 
      />
    </div>
  );
}

export default Main;