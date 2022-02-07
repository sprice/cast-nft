import WalletButton from '../WalletButton'
import SIWEButton from '../SIWEButton'

export default function Nav() {
  return (
    <div className="flex mt-2 justify-end">
      <div className="max-w-7xl sm:px-6 lg:px-8">
        <WalletButton />
        <SIWEButton />
      </div>
    </div>
  )
}
