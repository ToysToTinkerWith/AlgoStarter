
import React from "react";


import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";

import { WalletManager, WalletId, NetworkId, WalletProvider } from '@txnlab/use-wallet-react'


import Connect from "../components/connect";



export default function MyApp(props) {

  const manager = new WalletManager({
    wallets: [WalletId.PERA, WalletId.DEFLY],
    defaultNetwork: NetworkId.MAINNET // or just 'mainnet'
  })

  const { Component, pageProps } = props;


  return (
    
    
    <React.Fragment>
     
      <WalletProvider manager={manager}>

        <CssBaseline />
        <Connect />        
        <Component {...pageProps} />
      </WalletProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
