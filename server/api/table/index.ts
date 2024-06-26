import type { H3Event } from 'h3'

export default eventHandler((event: H3Event) => {
  const prisma = event.context.prisma
  return prisma.table.findMany({
    orderBy: [{
      location: 'asc'
    }, {
      name: 'asc'
    }, {
      id: 'asc'
    }]
  })
})
