import urllib.request
import urllib.parse
import urllib.error
import re
import html
import os
import time

PAGES = {
    "Faculty": "https://sites.google.com/view/daase/people/faculty",
    "Ph_D_Students": "https://sites.google.com/view/daase/people/ph-d-students",
    "Post_Graduate_Students": "https://sites.google.com/view/daase/people/post-graduate-students",
    "Under_Graduate_Students": "https://sites.google.com/view/daase/people/under-graduate-students",
    "Non_Teaching_Staff": "https://sites.google.com/view/daase/people/non-teaching-staff",
    "Alumni": "https://sites.google.com/view/daase/people/alumni"
}

BASE_DIR = os.path.join(os.getcwd(), "scraped_images")

def sanitize_filename(name):
    """Cleans up names so they are safe to use as filenames."""
    # Remove titles like Dr. or Prof. just to standardise? No, user said name of the person. Let's keep them if they exist, just remove invalid chars.
    name = html.unescape(name)
    # Remove weird characters and trailing spaces
    name = re.sub(r'[\/\\\:\*\?\"\<\>\|]', '', name)
    # Replace spaces with underscores
    name = re.sub(r'\s+', '_', name.strip())
    # remove leading punctuation if any
    name = re.sub(r'^_+|_+$', '', name)
    return name

def extract_people(html_text):
    """Uses heuristical regex to find images and name pairs."""
    people = []

    # Unescape all html just in case (for the data-code iframes)
    text = html.unescape(html_text)

    # Pattern 1: Used generally in Faculty page iframes (data-code)
    # <img src="URL" ...> ... <div class="name">Name</div>
    pattern1 = re.compile(r'<img[^>]*?src="([^"]+)"[^>]*?>\s*<div class="name">\s*([^<]+?)\s*</div>', re.IGNORECASE | re.DOTALL)
    for match in pattern1.findall(text):
        people.append((match[0], match[1]))

    # Pattern 2: Used in Google Sites native image grid
    # <img src="URL" ...> ... <div class="tyJCtd"> ... <span >Name</span>
    pattern2 = re.compile(r'<img[^>]*?src="([^"]+)"[^>]*?>.*?<div class="tyJCtd[^>]*>.*?<p[^>]*>.*?<span[^>]*>([^<]+)</span>', re.IGNORECASE | re.DOTALL)
    for match in pattern2.findall(text):
         # Exclude placeholder spacer text like whitespace
        if match[1].strip():
            people.append((match[0], match[1]))
            
    # Pattern 3: Direct alt tag native images that don't match pattern 1
    # <img src="URL" alt="NAME">
    pattern3 = re.compile(r'<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]+)"[^>]*?>', re.IGNORECASE)
    for match in pattern3.findall(text):
        if match[1].strip() and "image" not in match[1].lower(): # exclude generic alt texts
            people.append((match[0], match[1]))

    # Deduplicate based on name, keeping the first URL found
    unique_people = {}
    for url, name in people:
        clean_name = sanitize_filename(name)
        if clean_name and clean_name not in unique_people:
            # Fix relative URLs
            if url.startswith('/'):
                url = 'https://sites.google.com' + url
            unique_people[clean_name] = url
            
    return unique_people

def download_image(url, save_path):
    """Downloads an image from a URL, faking User-Agent."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(save_path, 'wb') as f:
                f.write(response.read())
        return True
    except urllib.error.URLError as e:
        # Retry once if it is a timeout
        try:
            time.sleep(1)
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                with open(save_path, 'wb') as f:
                    f.write(response.read())
            return True
        except Exception as retry_e:
            print(f"   [!] Failed to download {url}: {retry_e}")
            return False
    except Exception as e:
        print(f"   [!] Failed to download {url}: {e}")
        return False

def main():
    if not os.path.exists(BASE_DIR):
        os.makedirs(BASE_DIR)
        
    for section, url in PAGES.items():
        print(f"\n[{section}] Fetching page: {url}")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req)
            html_text = response.read().decode('utf-8')
        except Exception as e:
            print(f"Failed to fetch {section} URL: {e}")
            continue

        people = extract_people(html_text)
        print(f"[{section}] Found {len(people)} unique people/images.")
        
        if not people:
            continue
            
        section_dir = os.path.join(BASE_DIR, section)
        if not os.path.exists(section_dir):
            os.makedirs(section_dir)
            
        success_count = 0
        for name, img_url in people.items():
            # Assume .jpg if not clear from URL, although Google URLs might not have extensions
            ext = ".jpg"
            if ".png" in img_url.lower(): ext = ".png"
            elif ".jpeg" in img_url.lower(): ext = ".jpeg"
            elif ".gif" in img_url.lower(): ext = ".gif"
            
            filename = f"{name}{ext}"
            filepath = os.path.join(section_dir, filename)
            
            # Avoid re-downloading if already exists (makes it idempotent)
            if os.path.exists(filepath):
                 success_count += 1
                 continue
                 
            if download_image(img_url, filepath):
                success_count += 1
                
        print(f"[{section}] Successfully gathered {success_count}/{len(people)} images.")

if __name__ == "__main__":
    main()
