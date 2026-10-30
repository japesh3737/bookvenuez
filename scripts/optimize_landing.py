from pathlib import Path
import concurrent.futures, io, json, re, urllib.request
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=(root/'src/components/ui/wilderness.tsx').read_text(encoding='utf-8')
urls=re.findall(r"src: '(https://cdn\.21st\.dev/[^']+)'",source)
out=root/'public/images/landing'
out.mkdir(parents=True,exist_ok=True)
if not urls and (out/'manifest.json').exists():
    urls=[item['source'] for item in json.loads((out/'manifest.json').read_text())]
def convert(pair):
    index,url=pair
    raw=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=60).read()
    image=Image.open(io.BytesIO(raw)).convert('RGBA')
    sizes={}
    for name,width,quality in [('desktop',1920,83),('mobile',960,78)]:
        resized=image.copy();resized.thumbnail((width,2000),Image.Resampling.LANCZOS)
        dest=out/f'layer-{index}-{name}.webp'
        resized.save(dest,'WEBP',quality=quality,method=6,exact=True)
        sizes[name]=dest.stat().st_size
    return {'index':index,'source':url,'originalBytes':len(raw),**sizes}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    result=list(pool.map(convert,enumerate(urls)))
assert len(result)==17
(out/'manifest.json').write_text(json.dumps(result,indent=2))
print(json.dumps({'layers':len(result),'originalBytes':sum(r['originalBytes'] for r in result),'desktopBytes':sum(r['desktop'] for r in result),'mobileBytes':sum(r['mobile'] for r in result)}))
