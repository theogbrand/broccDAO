import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

// FE SDK for connecting wallets 
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// Chains to support
// 4 = Rinkeby
const supportedChainIds = [4];

// wallets to support
// injected == Metamask
const connectors = {
  injected: {},
};


// Render the App component to the DOM wrapped with ThirdwebWeb3Provider
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
