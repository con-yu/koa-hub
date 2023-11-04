const { SERVER_PORT } = require('./config/server')
const app = require('./app')
require('./utils/errorHandler')

app.listen(SERVER_PORT, () => {
  console.log(`server is running at http://localhost:${SERVER_PORT} 🚀`)
})
