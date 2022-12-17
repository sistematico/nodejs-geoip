import Fastify from 'fastify'
import RequestIp from '@supercharge/request-ip'
import geoip from 'geoip-lite'

const fastify = Fastify({ logger: true, trustProxy: true })

fastify.get('/', function (request, reply) {
  let ip = '177.43.78.177'
  if (process.env.NODE_ENV == 'production') ip = RequestIp.getClientIp(request)
  const geo = geoip.lookup(ip);
  reply.send({ geo })
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})