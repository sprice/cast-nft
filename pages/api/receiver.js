export default (req, res) => {
  res.setHeader('content-type', 'text/html')
  res.end(`
  <html>
  <head>
    <!-- <link rel="stylesheet" href="/api/receiver.css" media="screen" /> -->
    <script type="text/javascript"
        src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js">
    </script>
  </head>
  <body>
    <cast-media-player></cast-media-player>
    <script>
      cast.framework.CastReceiverContext.getInstance().start();
    </script>
    <!-- <script src="/api/receiver-js"></script> -->
  </body>
  </html>
    `)
}
