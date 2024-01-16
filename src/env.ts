/* eslint-disable @typescript-eslint/no-namespace */
const requiredServerEnv = [
	"APP_URI",
	"CLOUD_KEY",
	"CLOUD_NAME",
	"CLOUD_SECRET",
	"JWT_SECRET",
	"MONGO_PASS",
	"MONGO_URI",
	"MONGO_USER",
	"NODE_ENV",
	"PRIVATE_KEY",
	"PUBLIC_KEY",
	"PORT",
	"SMTP_HOST",
	"SMTP_PASS",
	"SMTP_USER",
	"VERSION",
] as const

type RequiredServerEnvs = (typeof requiredServerEnv)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredServerEnvs, string> {
			readonly APP_URI: string
			readonly CLOUD_KEY: string
			readonly CLOUD_NAME: string
			readonly CLOUD_SECRET: string
			readonly JWT_SECRET: string
			readonly MONGO_URI: string
			readonly NODE_ENV: "development" | "production" | "test"
			readonly PRIVATE_KEY: string
			readonly PUBLIC_KEY: string
			readonly PORT: string
			readonly SMTP_HOST: string
			readonly SMTP_PASS: string
			readonly SMTP_USER: string
			readonly VERSION: string
		}
	}
}

export {}
