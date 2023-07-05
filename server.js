const jsonServer = require('json-server')
// const server = jsonServer.create()
const cors = require('cors');
const server = jsonServer.create();
server.use(cors());
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({ noCors: true })

// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*'),
//   res.header('Access-Control-Allow-Methods', '*')
//   next()
// })

server.use('/', router)
server.listen(3000, () => {
  console.log('Mock api server listening at localhost:5001')
})


