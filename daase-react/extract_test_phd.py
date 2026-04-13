import urllib.request
import re
import html

url = "https://sites.google.com/view/daase/people/ph-d-students"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
text = urllib.request.urlopen(req).read().decode('utf-8')
text = html.unescape(text)

# We will try a few patterns.
# Pattern 1: the one we used for faculty
pattern1 = re.compile(r'<img[^>]*?src="([^"]+)"[^>]*?>\s*<div class="name">\s*([^<]+?)\s*</div>', re.IGNORECASE | re.DOTALL)
matches1 = pattern1.findall(text)

# Pattern 2: Typical Google Sites layout where name is in a tyJCtd class
# Sometimes they put name next to image
pattern2 = re.compile(r'<img[^>]*?src="([^"]+)"[^>]*?>.*?<div class="tyJCtd[^>]*>.*?<p[^>]*>.*?<span[^>]*>(.[^<]+)</span>', re.IGNORECASE | re.DOTALL)
matches2 = pattern2.findall(text)

print(f"Total found p1: {len(matches1)}")
print(f"Total found p2: {len(matches2)}")

# Let's see if we can find generic images
imgs = re.findall(r'<img[^>]*?src="([^"]+)"[^>]*?>', text)
print(f"Total raw imgs found: {len(imgs)}")
