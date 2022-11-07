**Creating a JWT TOKEN**

<!-- 1) Install the library that works with current server framework (Fastify) -->

    npm i @fastify/jwt

<!-- 2) import jwt from "@fastify/jwt" - on /server.ts -->

<!-- 3) register jwt, with secret within, to fastify -->

**in production, the content below (secret value) needs to be an environment variable**
await fastify.register(jwt, {
secret: "nlwcopa",
})

<!-- 4) create/generate token sign - on /routes/auth.ts -->

    const token = fastify.jwt.sign({
        name: user.name,
        avatarUrl: user.avatarUrl
    }, {
        sub: user.id,
        <!-- is highly recommended to use a smaller expire period -->
        expiresIn: '7 days'
    })

<!-- 5) create - on /plugins/authenticate.ts - authenticate async function -->

    export async function authenticate(request: FastifyRequest) {
        await request.jwtVerify()
    }

<!-- 6) validating jwt token - on /routes/auth.ts -->

    fastify.get("/me", { onRequest: [authenticate] }, async (request) => {
        return { user: request.user }
    })
