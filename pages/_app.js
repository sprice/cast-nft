import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import '../styles/globals.css'

const chains = defaultChains

const infuraId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const connectors = () => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Porthole',
        jsonRpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_URL,
      },
    }),
  ]
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
