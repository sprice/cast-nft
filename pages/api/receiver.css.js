export default (req, res) => {
  res.setHeader('content-type', 'text/css')
  res.end(`
  cast-media-player {
    --background-color: blue;
  }
  `)
}
