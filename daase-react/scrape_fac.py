import os
import urllib.request
import re

URL = "https://sites.google.com/view/daase/research/research-facilities?authuser=0"
OUTPUT_DIR = "public/images/facilities"
os.makedirs(OUTPUT_DIR, exist_ok=True)

try:
    print(f"Fetching {URL}")
    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # regex to find img src starting with https
    img_urls = re.findall(r'<img[^>]+src=["\'](https://[^"\']+)["\']', html)
    
    count = 1
    for src in img_urls:
        if "logo" in src.lower() or "avatar" in src.lower() or "icon" in src.lower():
            continue
            
        print(f"Downloading {src}")
        try:
            req_img = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(req_img).read()
            if len(img_data) > 3000:
                with open(f"{OUTPUT_DIR}/fac_{count}.jpg", "wb") as f:
                    f.write(img_data)
                print(f"Saved fac_{count}.jpg ({len(img_data)} bytes)")
                count += 1
            if count > 12:
                break
        except Exception as e:
            print("Failed to download image:", e)

    print(f"Successfully downloaded {count-1} facilities images.")

except Exception as e:
    print("Error:", e)
