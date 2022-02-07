import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChromecast } from '@fortawesome/free-brands-svg-icons'

const displayAddress = (address) => {
  if (!address) return
  return `${address.substring(0, 5)}…${address.substring(38)}`
}

export default function Nft({ nft }) {
  const [state, setState] = React.useState({
    contract: '',
    tokenId: '',
    title: '',
    description: '',
    tokenType: '',
    media: { image: '' },
    metadata: {
      image: '',
      attributes: [],
    },
    loading: false,
  })
  const [loaded, setLoaded] = useState(false)

  // Fetch nft when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch(
          `/api/nft/${nft.contract?.address}/${nft?.id?.tokenId}`,
        )
        const json = await res.json()
        setState((x) => ({
          ...x,
          ...json,
          loading: true,
        }))
        setLoaded(true)
      } catch (error) {
        console.log('error calling /api/me', error)
      } finally {
        setState((x) => ({ ...x, loading: false }))
      }
    }
    // 1. page loads
    ;(async () => await handler())()

    // 2. window is focused (in case user logs out of another window)
    // window.addEventListener('focus', handler)
    // return () => window.removeEventListener('focus', handler)
  }, [loaded])

  const isSupported = !!state?.media?.image.length

  const castClick = () => {
    console.log('casting title', state?.title)
    console.log('casting image', state?.media?.image)
  }

  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col p-8">
        {isSupported && (
          <img
            className="flex-shrink-0 mx-auto"
            src={state?.media?.image}
            alt=""
          />
        )}
        {!isSupported && (
          <div className="w-32 h-32 flex-shrink-0 mx-auto rounded-full bg-gray-100">
            &nbsp;
          </div>
        )}
        <h3 className="mt-6 text-gray-900 text-sm font-medium">
          {state?.title}
          {!isSupported && <p className="text-gray-300">Not yet supported</p>}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Contract Address</dt>
          <dd className="text-gray-500 text-sm">
            <a href={`https://etherscan.io/address/${state?.contract}`}>
              {displayAddress(state?.contract)}
            </a>
          </dd>
        </dl>
      </div>
      {isSupported && (
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="-ml-px w-0 flex-1 flex">
              <a
                href="#"
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                onClick={castClick}
              >
                <FontAwesomeIcon icon={faChromecast} />
                <span className="ml-3">Cast</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}
