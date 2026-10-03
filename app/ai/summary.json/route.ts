import { buildAiSummary } from "@/lib/seo/ai-discovery";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildAiSummary());
}
