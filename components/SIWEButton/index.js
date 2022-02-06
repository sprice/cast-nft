import React, { Fragment } from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'

export default function SIWEButton() {
  const [
    { data: accountData, error: accountError, loading: accountLoading },
  ] = useAccount()
  const [
    { data: networkData, error: networkError, loading: networkLoading },
  ] = useNetwork()

  const [state, setState] = React.useState({
    address: undefined,
    error: undefined,
    loading: undefined,
  })
  const [, signMessage] = useSignMessage()

  async function signIn() {
    try {
      const address = accountData?.address
      const chainId = networkData?.chain?.id
      if (!address || !chainId) return
      setState((x) => ({ ...x, error: undefined, loading: true }))
      // Fetch random nonce, create SIWE message, and sign with wallet
      const nonceRes = await fetch('/api/nonce')
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: await nonceRes.text(),
      })
      const signRes = await signMessage({ message: message.prepareMessage() })
      if (signRes.error) throw signRes.error

      // Verify signature
      const verifyRes = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature: signRes.data }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, address, loading: false }))
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false }))
    }
  }

  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/me')
        const json = await res.json()
        setState((x) => ({ ...x, address: json.address }))
      } catch (error) {
        console.log('error calling /api/me', error)
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    }
    // 1. page loads
    ;(async () => await handler())()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  if (accountData) {
    return (
      <div>
        {/** Display connected wallet info here */}
        {/** ... */}

        {state.address ? (
          <div>
            <div>Signed in as {state.address}</div>
            <button
              onClick={async () => {
                await fetch('/api/logout')
                setState({})
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button disabled={state.loading} onClick={signIn}>
            Sign-In with Ethereum
          </button>
        )}
      </div>
    )
  } else {
    return <Fragment />
  }
}
