import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

UA = "StampedEnergyWebsite/1.0"
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "industries" / "plant"

UNSPLASH = [
    # cement
    ("cement", "kiln-aux.jpg", "1516937941344-00b4e0337589", "https://unsplash.com/photos/6xeDIZgoPaw"),
    ("cement", "crushers.jpg", "1735672091081-f32dc9a4b5d3", "https://unsplash.com/photos/jhG1l5oba_8"),
    ("cement", "whr-pipes.jpg", "1646124839366-67161db62d80", "https://unsplash.com/photos/jSMvAmew4Wo"),
    ("cement", "plant-exterior.jpg", "1636747423727-2d39d0aa9796", "https://unsplash.com/photos/ceIrXAEZj4U"),
    # steel
    ("steel", "melt.jpg", "1697281679290-ad7be1b10682", "https://unsplash.com/photos/P8jEvckndSE"),
    ("steel", "plant-smoke.jpg", "1692263661319-11b0a5992231", "https://unsplash.com/photos/5RqyP9MsuH4"),
    ("steel", "cooling.jpg", "1760378105099-968c06b9b4bd", "https://unsplash.com/photos/l-zTZjqsfM8"),
    ("steel", "interior.jpg", "1646563737535-f1a01c2c6a23", "https://unsplash.com/photos/q6F5KmGBYnU"),
    # pharma / lab / HVAC-ish
    ("pharma", "lab-01.jpg", "1582719471384-894fbb16e074", "https://unsplash.com/photos"),
    ("pharma", "lab-02.jpg", "1579684385127-1ef15d508118", "https://unsplash.com/photos"),
    ("pharma", "lab-03.jpg", "1576091160399-112ba8d25d1d", "https://unsplash.com/photos"),
    ("pharma", "lab-04.jpg", "1532187863486-abf9dbad1b69", "https://unsplash.com/photos"),
    ("pharma", "lab-05.jpg", "1581091226825-a6a2a5aee158", "https://unsplash.com/photos"),
    ("pharma", "hvac-duct.jpg", "1567789884554-0b7620177c78", "https://unsplash.com/photos"),
    # chemical / tanks / pipes / plant
    ("chemical", "pipes.jpg", "1624484582400-3b947099da49", "https://unsplash.com/photos/w2POsL0NOmo"),
    ("chemical", "stacks.jpg", "1655086934013-29850369986c", "https://unsplash.com/photos/_a-8YaseIEc"),
    ("chemical", "factory.jpg", "1568621422837-a343133e2bb9", "https://unsplash.com/photos/f0az5ZOH2d0"),
    ("chemical", "complex.jpg", "1666219462105-2909c2d72d01", "https://unsplash.com/photos/EeqxbxILScA"),
]

WIKI_TITLES = [
    ("cement", "mills.jpg", "File:Ball mill of former Queensland Cement and Lime Company in Rocks Riverside Park, Brisbane, 2022, 02.jpg"),
    ("cement", "ash-grove.jpg", "File:Ash Grove Cement factory 01.jpg"),
    ("steel", "eaf.jpg", "File:Electric arc furnace.jpg"),
    ("steel", "eaf-electrodes.jpg", "File:Electrodes arm for the electric arc furnace.jpg"),
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as res:
        return res.read()


def wiki_thumb(title: str) -> tuple[str, str, str]:
    q = urllib.parse.urlencode(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|mime|size",
            "iiurlwidth": "1600",
            "format": "json",
        }
    )
    data = json.loads(fetch("https://commons.wikimedia.org/w/api.php?" + q))
    page = next(iter(data["query"]["pages"].values()))
    info = page["imageinfo"][0]
    meta = info.get("extmetadata") or {}
    return (
        info.get("thumburl") or info["url"],
        (meta.get("LicenseShortName") or {}).get("value") or "",
        (meta.get("Artist") or {}).get("value") or "",
    )


def main() -> None:
    credits = ["# Plant-band photo credits", ""]
    for slug, name, photo_id, page in UNSPLASH:
        dest = OUT / slug / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=1600&q=80"
        print("unsplash", dest)
        try:
            data = fetch(url)
        except Exception as e:
            print("  FAIL", e)
            continue
        if len(data) < 20000:
            print("  too small", len(data))
            continue
        dest.write_bytes(data)
        credits.append(f"- `{slug}/{name}` Unsplash photo `{photo_id}` {page}")
        credits.append("  License: Unsplash License (https://unsplash.com/license)")
        credits.append("")
        time.sleep(0.4)

    time.sleep(3)
    for slug, name, title in WIKI_TITLES:
        dest = OUT / slug / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        print("wiki", title)
        try:
            url, lic, artist = wiki_thumb(title)
            data = fetch(url)
        except Exception as e:
            print("  FAIL", e)
            continue
        dest.write_bytes(data)
        credits.append(f"- `{slug}/{name}` {title}")
        credits.append(f"  {lic}. {artist[:180]}")
        credits.append(f"  https://commons.wikimedia.org/wiki/{urllib.parse.quote(title.replace(' ', '_'))}")
        credits.append("")
        time.sleep(1.2)

    (OUT / "CREDITS.md").write_text("\n".join(credits), encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
