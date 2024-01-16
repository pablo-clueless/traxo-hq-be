import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors()
	app.setGlobalPrefix(`/api/${process.env.VERSION}`)

	await app.listen(Number(process.env.PORT) || 3000)
	app.enableShutdownHooks()
}
bootstrap()
