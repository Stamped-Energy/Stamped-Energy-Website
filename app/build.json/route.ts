const builtAt = new Date().toISOString();

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      ref: process.env.VERCEL_GIT_COMMIT_REF ?? null,
      deploymentUrl: process.env.VERCEL_URL ?? null,
      builtAt,
    },
    {
      headers: {
        "X-Robots-Tag": "noindex",
      },
    },
  );
}