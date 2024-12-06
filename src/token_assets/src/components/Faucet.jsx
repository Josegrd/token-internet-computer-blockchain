import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client"

function Faucet() {
  const [isDisable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true)

    // deploy to blockchain first =====
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
       agentOptions: { identity } 
    });
    // ================================

    // after deploy change payOut to
    // setButtonText(await authenticatedCanister.payOut());

    setButtonText(await token.payOut()); // comment this after deploy
    // setDisable(false)

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 GARD token to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisable}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
