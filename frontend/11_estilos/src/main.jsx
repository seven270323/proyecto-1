import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { Network } from "@aptos-labs/ts-sdk";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AptosWalletAdapterProvider 
      autoConnect={true}
      optInWallets={["Petra"]}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => console.log(error)}
    >
      <App />
    </AptosWalletAdapterProvider>
  </StrictMode>,
)
