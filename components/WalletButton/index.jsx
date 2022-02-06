import React, { Fragment, useState } from 'react'
import { useAccount } from 'wagmi'
import ConnectModal from '../ConnectModal'

const displayAddress = (address) => {
  if (!address) return
  return `${address.substring(0, 5)}…${address.substring(38)}`
}

export default function WalletButton() {
  const [open, setOpen] = useState(false)

  const [{ data }, disconnect] = useAccount()

  const onConnectClick = () => {
    setOpen(!open)
  }

  const disconnectText = `Connected as ${displayAddress(data?.address)}`

  const onClick = data ? disconnect : onConnectClick
  const buttonText = data ? disconnectText : 'Connect Wallet'

  return (
    <Fragment>
      <ConnectModal open={open} setOpen={setOpen} />
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </Fragment>
  )
}
