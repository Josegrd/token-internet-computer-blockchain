import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token, canisterId, createActor } from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client"

function Transfer() {
  const [recipientId, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [feedbackText, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  
  async function handleClick() {
    setHidden(true)
    setDisabled(true)

    // deploy to blockchain first =====
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
       agentOptions: { identity } 
    });
    // ================================
    // after deploy change variable result to
    // let result = await authenticatedCanister.transfer(recipient, amountToTransfer);


    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount)
    let result = await token.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisabled(false)
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled={isDisabled} id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedbackText}</p>
      </div>
    </div>
  );
}

export default Transfer;
