//@TODO: secure with session data

import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../utils'

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID

const aWeb3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
)

const handler = async (req, res) => {
  const { slug } = req.query

  const { method } = req
  switch (method) {
    case 'GET':
      const data = await aWeb3.alchemy.getNftMetadata({
        contractAddress: slug[0],
        tokenId: slug[1],
      })

      const response = {
        contract: data?.contract?.address,
        tokenId: data?.id?.tokenId,
        tokenType: data?.id?.tokenMetadata?.tokenType,
        title: data?.title,
        description: data?.description,
        media: { image: data?.media[0]?.uri?.gateway },
        metadata: {
          image: data?.metadata?.image,
          attributes: data?.metadata?.attributes,
        },
      }
      res.send(JSON.stringify(response))
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions())
