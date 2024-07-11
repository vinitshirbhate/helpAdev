import { createEnv } from "@t3-oss/env-nextjs";
import { Stream } from "stream";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    DATABASE_URL: z.string().url(),
    StreamApiKey: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    StreamApiKey: process.env.NEXT_PUBLIC_GET_STREAM_API_KEY,
  },
});
