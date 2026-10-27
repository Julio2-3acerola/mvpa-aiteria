from pathlib import Path
from html.parser import HTMLParser
import json,re,subprocess,xml.etree.ElementTree as ET
s=Path('index.html').read_text(encoding='utf-8')
class Audit(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a':self.links.append(a)
  if tag=='img':self.images.append(a)
a=Audit();a.feed(s);assert len(a.ids)==len(set(a.ids))
for link in a.links:
 href=link['href'];assert href.startswith(('https://','#')),href
 if href.startswith('#'):assert href[1:] in a.ids,href
for im in a.images:
 assert Path(im['src']).is_file(),im
 assert all(k in im for k in ['width','height','alt']),im
assert len(re.findall('<h1[ >]',s))==1
for ld in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):json.loads(ld)
for js in re.findall(r'<script>(.*?)</script>',s,re.S):subprocess.run(['node','--check'],input=js,text=True,encoding='utf-8',check=True)
ET.parse('sitemap.xml')
print('PASS: âncoras, HTTPS, imagens, dimensões, alt, h1, IDs, JSON-LD, XML e sintaxe JS.')
