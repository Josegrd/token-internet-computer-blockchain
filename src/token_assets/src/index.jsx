import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 

  const authClient = await AuthClient.create();

  if(authClient.isAuthenticated()) {
    handleAuthenticated(authClient)
  }else{
    await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess:() => {
      handleAuthenticated(authClient);
    }
  });
  }

  

  async function handleAuthenticated(authClient) {
      // to see identity after login (after deployed) ===
      const identity = await authClient.getIdentity();
      const userPricipal = identity._principal.toString();
      console.log(userPricipal);
      // to check the balance authenticated user
      // ================================================

      ReactDOM.render(<App />, document.getElementById("root"));
  }
}

init();


