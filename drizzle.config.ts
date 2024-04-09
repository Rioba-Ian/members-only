import * as dotenv from "dotenv";
import { cwd } from "process";
import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

export default {
 schema: "./lib/db/schema.ts",
 out: "./drizzle",
 driver: "pg",
 dbCredentials: {
  connectionString: process.env.DRIZZLE_DATABASE_URL!,
 },
} satisfies Config;
