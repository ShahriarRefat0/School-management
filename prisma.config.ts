import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: 'prisma/schema.prisma',

  migrations: {
    path: 'prisma/migrations',
  },

  datasource: {
    // url: env("DATABASE_URL"),
    // shadowDatabaseUrl: env("DIRECT_URL")
       url: process.env.DATABASE_URL!,
    directUrl: process.env.DIRECT_URL!,
  },
});


// Please do:
//before start your code.
// 1️⃣ git pull origin development
// 2️⃣ npx prisma generate
// 3️⃣ npx prisma migrate dev



// If you get drift/conflict error, run:

// npx prisma migrate reset


// if add new schema or change in /prisma/schema.prisma then run this:
// npx prisma migrate dev --name add-student
