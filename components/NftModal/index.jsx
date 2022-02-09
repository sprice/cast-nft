import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CastButton, useCast, useCastPlayer } from 'react-cast-sender'

const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted
}

const getContentType = (extension) => {
  switch (extension) {
    case 'jpg':
      return 'image/jpeg'
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    default:
      return 'image/jpeg'
  }
}

export default function NftModal({ open, setOpen, state }) {
  const isMounted = useIsMounted()

  const { initialized, connected, deviceName } = useCast()
  const {
    loadMedia,
    currentTime,
    duration,
    isPaused,
    isMediaLoaded,
    togglePlay,
    seek,
    isMuted,
    tracks,
    editTracks,
    thumbnail,
    title,
    setVolume,
    toggleMute,
  } = useCastPlayer()

  // @TODO: handle unmount (promise timeout)
  React.useEffect(() => {
    const handler = async () => {
      if (connected) {
        // const imageUrl = state?.media?.image
        // const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession()
        // console.log('castSession', castSession)
        // const namespace = 'urn:x-cast:com.url.cast'
        // const msg = {
        //   type: 'loc',
        //   url: 'https://sp.ngrok.io/viewer.html',
        // }
        // castSession.sendMessage(
        //   namespace,
        //   msg,
        //   function () {
        //     console.log('Message sent: ', msg)
        //     notify('Message sent: ' + JSON.stringify(msg))
        //   },
        //   function () {
        //     console.log('error sending message')
        //   },
        // )
        // const fileExtension = imageUrl.split('.').pop()
        // const contentType = getContentType(fileExtension)
        // const imageUrl = state?.media?.image
        // const contentType = 'image/jpeg'

        // const imageUrl = '/video/4k.mp4'
        // const contentType = 'video/mp4'
        // const mediaInfo = new chrome.cast.media.MediaInfo(imageUrl, contentType)
        // mediaInfo.streamType = 'NONE'
        // const metadata = new chrome.cast.media.PhotoMediaMetadata()
        // console.log('metadata', metadata)
        // metadata.title = 'testing'
        // mediaInfo.metadata = metadata
        // const request = new chrome.cast.media.LoadRequest(mediaInfo)
        // loadMedia(request)
        // console.log('mediaInfo', mediaInfo)

        const mediaInfo = new window.chrome.cast.media.MediaInfo(
          'https://sp.ngrok.io/video/4k.mp4',
          'video/mp4',
        )
        const metadata = new window.chrome.cast.media.MovieMediaMetadata()
        mediaInfo.metadata = metadata

        const request = new window.chrome.cast.media.LoadRequest(mediaInfo)

        console.log('testing')
        loadMedia(request).then(() => {
          // const interval = setInterval(() => {
          //   console.log('isMediaLoaded', isMediaLoaded)
          //   if (isMediaLoaded === true) {
          //     console.log('media is loaded')
          //     clearInterval(interval)
          //   }
          // }, 500)
        })
      }
    }
    ;(async () => await handler())()
  }, [connected])

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
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {state?.title}
                  </Dialog.Title>
                </div>
                <div>
                  <img
                    className="flex-shrink-0 mx-auto"
                    src={state?.media?.image}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="-ml-px w-0 flex-1 flex">
                    <span className="w-5">{isMounted && <CastButton />}</span>
                    <span className="w-5">Cast</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
