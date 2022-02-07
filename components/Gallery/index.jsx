import Nft from '../Nft'

export default function Gallery({ ownedNfts }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {ownedNfts.map((nft, index) => (
        <Nft key={index} nft={nft} />
      ))}
    </ul>
  )
}
