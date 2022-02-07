import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from './utils'

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID

const aWeb3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
)

const handler = async (req, res) => {
  const { method } = req

  const returnError = (status = 404) => {
    return res.status(status).send(JSON.stringify({ error: true }))
  }

  switch (method) {
    case 'GET':
      const owner = req?.session?.siwe?.address
      if (!owner) return returnError()
      const nfts = await aWeb3.alchemy.getNfts({
        owner,
      })
      res.send(JSON.stringify(nfts))
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions())
