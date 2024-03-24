import type { H3Event } from 'h3'

export default eventHandler((event: H3Event) => {
  const prisma = event.context.prisma
  const { params } = event.context

  const id = params.id

  const data = {
    status: 'IDLE'
  }

  return prisma.table.update({ where: { id }, data })
})
