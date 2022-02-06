import { generateNonce } from 'siwe'

const handler = (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'text/plain')
      res.send(generateNonce())
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
