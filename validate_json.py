import json
import os
import glob

def validate_json_files():
    chapters_dir = '/Users/tim/Project/analects_web/src/data/chapters'
    json_files = glob.glob(os.path.join(chapters_dir, '*.json'))
    
    has_error = False
    
    print(f"Checking {len(json_files)} files in {chapters_dir}...")
    
    for file_path in json_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                json.load(f)
            # print(f"OK: {os.path.basename(file_path)}")
        except json.JSONDecodeError as e:
            has_error = True
            print(f"ERROR: {os.path.basename(file_path)} - {e}")
        except Exception as e:
            has_error = True
            print(f"ERROR: {os.path.basename(file_path)} - {e}")

    if not has_error:
        print("\nAll JSON files are valid!")
    else:
        print("\nFound JSON errors.")

if __name__ == "__main__":
    validate_json_files()
