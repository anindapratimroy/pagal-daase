import os
import re
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

urls = {
    'home': 'https://sites.google.com/view/daase/home?authuser=0',
    'gallery': 'https://sites.google.com/view/daase/gallery?authuser=0', # Assuming there's a gallery or they are on home
    'research': 'https://sites.google.com/view/daase/research/research-facilities?authuser=0'
}

download_dirs = {
    'home': 'public/images/placements',
    'gallery': 'public/images/gallery',
    'research': 'public/images/research'
}

for k, d in download_dirs.items():
    os.makedirs(os.path.join('/Users/lab_mac_pc_1/Downloads/DAASE/daase-react', d), exist_ok=True)

for key, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
            # Find image URLs (very basic for Google Sites)
            img_urls = re.findall(r'<img[^>]*src=["\'](https://[^"\']+)["\']', html)
            print(f"Found {len(img_urls)} in {key}")
            
            # Find mp4 URLs
            vid_urls = re.findall(r'https://[^"\']+\.mp4[^"\']*', html)
            print(f"Found {len(vid_urls)} videos in {key}")
            
            count = 1
            for img_url in list(set(img_urls)):
                if "cleardot" in img_url or "google" not in img_url:
                    continue
                try:
                    ext = "jpg"
                    if "png" in img_url: ext = "png"
                    filename = f"img_{count}.{ext}"
                    filepath = os.path.join('/Users/lab_mac_pc_1/Downloads/DAASE/daase-react', download_dirs[key], filename)
                    urllib.request.urlretrieve(img_url, filepath)
                    count += 1
                except Exception as e:
                    print(f"Failed to download {img_url}: {e}")
                    
            vcount = 1
            for vid_url in list(set(vid_urls)):
                try:
                    filename = f"vid_{vcount}.mp4"
                    filepath = os.path.join('/Users/lab_mac_pc_1/Downloads/DAASE/daase-react', download_dirs[key], filename)
                    urllib.request.urlretrieve(vid_url, filepath)
                    vcount += 1
                except Exception as e:
                    print(f"Failed to download {vid_url}: {e}")
                    
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print("Scraping finished.")
