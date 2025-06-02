import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { Pool } from "pg";

function createDatabasePool(): Pool {
  const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
    process.env;
  const connectionString = `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  return new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000/api/v1/auth",
  advanced: {
    cookiePrefix: "__simplifactu",
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
  },
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
    },
  },
  trustedOrigins:
    process.env.TRUSTED_ORIGINS?.split(",").map((o) => o.trim()) ?? [],
  plugins: [openAPI()],
  database: createDatabasePool(),
  user: {
    modelName: "users",
    fields: {
      createdAt: "created",
      updatedAt: "updated",
      image: "avatar",
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    passwordResetTokenExpiry: 3600,
  },
});
