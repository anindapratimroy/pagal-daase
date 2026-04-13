import os
import re
import json

people_images_dir = '/Users/lab_mac_pc_1/Downloads/DAASE/daase-react/public/people_images'

# Gather all image files
images_map = []
for root, _, files in os.walk(people_images_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, people_images_dir)
            images_map.append({
                'filename': f,
                'path': '/people_images/' + rel_path,
                'clean_name': re.sub(r'[^a-zA-Z\s]', '', f.replace('_', ' ').replace('.', ' ')).strip().lower()
            })

def simplify_name(n):
    return re.sub(r'[^a-zA-Z\s]', '', n.replace('.', ' ')).strip().lower()

# Let's extract names from fallback.js
fallback_file = '/Users/lab_mac_pc_1/Downloads/DAASE/daase-react/src/data/fallback.js'
with open(fallback_file, 'r', encoding='utf-8') as f:
    content = f.read()

names = re.findall(r"name\:\s*['\"](.*?)['\"]", content)
# Also alumni names which are strings in arrays, maybe hard to parse. But we'll try string arrays too:
arrays = re.findall(r"\[(.*?)\]", content, re.DOTALL)
for arr in arrays:
    items = re.findall(r"['\"](.*?)['\"]", arr)
    for item in items:
        # Very rough heuristical check to see if it's a typical name length
        if 3 < len(item) < 35 and " " in item:
            names.append(item)

names = list(set(names))
final_map = {}

for name in names:
    s_name = simplify_name(name)
    # Exclude non-names (very basic filter)
    if 'batch' in s_name or 'workshop' in s_name or 'research' in s_name or 'lab' in s_name:
        continue
    
    # Try to find best match
    best_match = None
    best_score = 0
    for img in images_map:
        img_s = img['clean_name']
        # If the image clean name is a substring of the name, or vice-versa
        # or exactly equal
        if s_name == img_s or s_name in img_s or img_s in s_name:
            # We want exact substring match
            # But let's handle parts
            best_match = img['path']
            break
        
        # Check token overlaps
        name_tokens = set(s_name.split())
        img_tokens = set(img_s.split())
        overlap = len(name_tokens.intersection(img_tokens))
        if overlap > 0 and overlap >= max(min(len(name_tokens), 2), 1) and len(img_tokens) >= 2:
            best_match = img['path']
            break
            
    if best_match:
        final_map[name] = best_match

output_path = '/Users/lab_mac_pc_1/Downloads/DAASE/daase-react/src/data/imageMap.js'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('export const imageMap = \n')
    f.write(json.dumps(final_map, indent=2))
    f.write(';\n')

print(f"Generated imageMap.js with {len(final_map)} entries out of {len(names)} names.")
