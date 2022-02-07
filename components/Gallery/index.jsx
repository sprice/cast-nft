import React, { Fragment } from 'react'
import Nft from '../Nft'
import NftModal from '../NftModal'

export default function Gallery({ ownedNfts }) {
  const [open, setOpen] = React.useState(false)
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
    loaded: false,
  })
  return (
    <Fragment>
      <NftModal open={open} setOpen={setOpen} state={state} />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {ownedNfts.map((nft, index) => (
          <Nft
            key={index}
            nft={nft}
            setOpen={setOpen}
            setModalState={setState}
          />
        ))}
      </ul>
    </Fragment>
  )
}
