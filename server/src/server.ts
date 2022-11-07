import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"

import { pollRoutes } from "./routes/poll"
import { gameRoutes } from "./routes/game"
import { guessRoutes } from "./routes/guess"
import { authRoutes } from "./routes/auth"
import { userRoutes } from "./routes/user"

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    // Creating jwt user token - in production, the content below (secret) needs to be an environment variable
    await fastify.register(jwt, {
        secret: "nlwcopa",
    })

    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(pollRoutes)
    await fastify.register(userRoutes)

    await fastify.listen({ port: 3535, host: "0.0.0.0" })
}

bootstrap()
