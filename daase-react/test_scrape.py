import urllib.request
import re

url = "https://sites.google.com/view/daase/home"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

links = re.findall(r'href="([^"]+daase[^"]+)"', html)
print("Found links:")
for l in sorted(list(set(links))):
    print(l)
