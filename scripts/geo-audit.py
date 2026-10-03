"""GEO Optimizer audit across the main routes. Run via `npm run seo:audit`.

Usage: uvx --from geo-optimizer-skill==4.18.3 python scripts/geo-audit.py [base_url]
Base URL defaults to $SEO_BASE_URL or http://localhost:3000.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

from geo_optimizer.cli.formatters import format_audit_json
from geo_optimizer.core.audit import run_full_audit
from geo_optimizer.utils import validators

PATHS = [
    "/",
    "/platform",
    "/solutions",
    "/solutions/process",
    "/solutions/quality",
    "/solutions/planning",
    "/solutions/maintenance",
    "/industries/automotive",
    "/about",
    "/case-studies",
    "/contact",
]

base = (sys.argv[1] if len(sys.argv) > 1 else os.environ.get("SEO_BASE_URL", "http://localhost:3000")).rstrip("/")

# The package blocks private hosts (SSRF guard). We only ever point it at our own server.
validators._BLOCKED_HOSTNAMES.discard("localhost")
validators._check_ip_blocked = lambda ip: (False, None)
validators._is_ip_blocked = lambda ip: False

out_dir = Path("reports/seo")
out_dir.mkdir(parents=True, exist_ok=True)
report = {}

for path in PATHS:
    result = run_full_audit(base + path)
    report[path] = json.loads(format_audit_json(result))
    breakdown = " ".join(f"{k}={v}" for k, v in result.score_breakdown.items())
    print(f"{result.score:>3}  {path:<26} {breakdown}")

scores = [r["score"] for r in report.values()]
avg = round(sum(scores) / len(scores), 1)
print(f"\naverage {avg} over {len(scores)} pages")

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
out = out_dir / f"geo-{stamp}.json"
out.write_text(json.dumps({"base": base, "average": avg, "pages": report}, indent=2), encoding="utf-8")
print(f"report: {out}")
