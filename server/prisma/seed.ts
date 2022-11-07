import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Does",
            email: "john.ddoes112as3@gmail.com",
            avatarUrl: "https://github.com/gasparcl.png",
        },
    })

    const poll = await prisma.poll.create({
        data: {
            title: "Example Poll",
            code: "BOL520",
            ownerId: user.id,

            // criações encadeadas (enchaveadas)
            participants: {
                create: {
                    userId: user.id,
                },
            },
        },
    })

    await prisma.game.create({
        data: {
            date: "2022-11-22T12:00:00.201Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR",
        },
    })

    await prisma.game.create({
        data: {
            date: "2022-11-25T12:00:00.201Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            // criações encadeadas (enchaveadas)
            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_pollId: {
                                userId: user.id,
                                pollId: poll.id,
                            },
                        },
                    },
                },
            },
        },
    })
}

main()
