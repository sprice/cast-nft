import React, { Fragment } from 'react'
import Nav from '../components/Nav'
import Gallery from '../components/Gallery'

export default function Home() {
  const [state, setState] = React.useState({
    ownedNfts: [],
    loading: true,
  })

  // Fetch NFTs when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/nfts')
        const json = await res.json()
        const { ownedNfts } = json
        setState((x) => ({ ...x, ownedNfts }))
      } catch (error) {
        console.log('error calling /api/nfts', error)
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

  return (
    <Fragment>
      <Nav />
      {state?.ownedNfts?.length && <Gallery ownedNfts={state?.ownedNfts} />}
    </Fragment>
  )
}
