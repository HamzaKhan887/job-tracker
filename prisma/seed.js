const { PrismaClient } = require('@prisma/client')
const data = require('./mock_data.json')
const db = new PrismaClient()

async function main() {
  const clerkId = 'user_3JKeCH7cF5QI8qh1G4TDXkIv5Ne'
  await db.job.deleteMany({ where: { clerkId } })
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    }
  })
  for (const job of jobs) {
    await db.job.create({
      data: job,
    })
  }
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
