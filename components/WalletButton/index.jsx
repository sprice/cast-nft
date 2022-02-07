import React, { Fragment, useState } from 'react'
import { useAccount } from 'wagmi'
import ConnectModal from '../ConnectModal'

const displayAddress = (address) => {
  if (!address) return
  return `${address.substring(0, 5)}…${address.substring(38)}`
}

export default function WalletButton() {
  const [open, setOpen] = useState(false)

  const [{ data, error, loading }, disconnect] = useAccount({
    fetchEns: true,
  })

  const shortAddress = displayAddress(data?.address)

  const connectedName = data?.ens?.name
    ? `${data?.ens.name} (${shortAddress})`
    : shortAddress

  const onConnectClick = () => {
    setOpen(!open)
  }

  if (data) {
    return (
      <Fragment>
        <ConnectModal open={open} setOpen={setOpen} />
        {connectedName}
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={disconnect}
        >
          Disconnect
        </button>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <ConnectModal open={open} setOpen={setOpen} />
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onConnectClick}
      >
        Connect Wallet
      </button>
    </Fragment>
  )
}
