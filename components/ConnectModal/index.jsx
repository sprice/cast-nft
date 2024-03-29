import React, { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useConnect } from 'wagmi'

const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export default function ConnectModal({ open, setOpen }) {
  const [{ data: connectData, error: connectError }, connect] = useConnect()

  const installMetamask = () => {
    window.open('https://metamask.io')
  }

  const isMounted = useIsMounted()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="mt-2 font-medium text-center text-black sm:text-sm">
                Connect your Ethereum Wallet
              </div>
              {connectData.connectors.map((x) => {
                if (x.name === 'Injected') {
                  return (
                    <div key={x.id} className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="text-base inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={installMetamask}
                      >
                        Install Metamask
                      </button>
                    </div>
                  )
                }
                return (
                  <div key={x.id} className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="text-base inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      disabled={isMounted ? !x.ready : false}
                      onClick={() => {
                        setOpen(false)
                        connect(x)
                      }}
                    >
                      {isMounted && x.name}
                      {isMounted ? !x.ready && ' (unsupported)' : ''}
                    </button>
                  </div>
                )
              })}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
