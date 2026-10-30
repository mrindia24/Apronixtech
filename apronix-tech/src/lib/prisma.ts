import { Prisma, PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * DATABASE_URL can point to local Postgres or any managed database provider.
 */
const datasourceUrl = process.env.DATABASE_URL || undefined;

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

/** Missing tables (P2021) or an unreachable / unconfigured database. */
function isSchemaOrConnectionError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  return error instanceof Prisma.PrismaClientKnownRequestError && ['P1001', 'P2021'].includes(error.code);
}

function emptyResult(operation: string): unknown {
  if (operation === 'findMany' || operation === 'groupBy') return [];
  if (operation === 'count') return 0;
  return null;
}

function createClient(): PrismaClient {
  const client = new PrismaClient({
    datasourceUrl,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
  if (!isBuildPhase) return client;

  // On a first deploy migrations may run after the build, so prerendering can
  // run before the tables exist. Render empty states instead of failing the
  // build; ISR revalidation fills the pages in once data is there.
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, args, query }) {
          try {
            return await query(args);
          } catch (error) {
            if (!isSchemaOrConnectionError(error)) throw error;
            console.warn(`[prisma:build] database not ready, ${operation} returned empty`);
            return emptyResult(operation);
          }
        },
      },
    },
  }) as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
