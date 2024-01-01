const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json([
    {
      "id":"3",
      "title":"This is Version 3"
    },
  ])
})

app.listen(4000, () => {
  console.log('listening for requests on port 4000')
})
