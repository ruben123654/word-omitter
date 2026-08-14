import React, { useState } from "react";
import Table from "./Table";
import { cryptocurrencyList } from "../cryptocurrency-list";

const AVAILABLE_BALANCE = 17042.67;

function Main() {
  const [amount, setAmount] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false); // Nuevo para controlar si el usuario ya escribió algo

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    setHasInteracted(true); // Marcamos que ya hubo interacción
  };

  const getErrorMessage = () => {
    // Si está vacío, solo mostramos error si el usuario ya interactuó o si se requiere
    if (amount === "") {
      return hasInteracted ? "Amount cannot be empty" : "";
    }
    const num = parseFloat(amount);
    if (num < 0.01) {
      return "Amount cannot be less than $0.01"; // Texto exacto que pide el test
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
      
      <Table 
        cryptocurrencies={cryptocurrencyList} 
        amount={amount} 
        isValid={isValid} 
      />
    </div>
  );
}

export default Main;