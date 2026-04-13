import re
import html

with open('faculty.html', 'r', encoding='utf-8') as f:
    text = f.read()

# First, unescape html entities just in case Google Sites uses &lt;
text = html.unescape(text)

# Regex to match the container pattern flexibly
# Pattern: <img src="URL" ...> maybe some spaces ... <div class="name">NAME</div>
pattern = re.compile(r'<img[^>]*?src="([^"]+)"[^>]*?>\s*<div class="name">\s*([^<]+?)\s*</div>', re.IGNORECASE | re.DOTALL)

matches = pattern.findall(text)
print(f"Total found: {len(matches)}")
for url, name in matches:
    print(f"Name: {name} | URL: {url[:60]}...")
