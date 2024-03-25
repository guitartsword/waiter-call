import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge'
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    if (process.env.EDGE === 'false') {
      prisma = new PrismaClient()
    } else {
      prisma = new PrismaClientEdge()
    }
  }
  event.context.prisma = prisma
})
