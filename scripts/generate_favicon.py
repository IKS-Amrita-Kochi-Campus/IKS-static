"""
Favicon Generator Script
Generates multiple favicon sizes from the IKS logo (iks.webp)
Creates: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, android-chrome icons
"""

from PIL import Image
import os

def generate_favicons(source_image_path: str, output_dir: str):
    """
    Generate various favicon sizes from a source image.
    
    Args:
        source_image_path: Path to the source image (iks.webp)
        output_dir: Directory to save the generated favicons
    """
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Open the source image
    print(f"[INFO] Opening source image: {source_image_path}")
    img = Image.open(source_image_path)
    
    # Convert to RGBA if not already (for transparency support)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    print(f"[OK] Image loaded: {img.size[0]}x{img.size[1]} pixels, mode: {img.mode}")
    
    # Define favicon sizes and filenames
    favicon_sizes = [
        (16, 16, "favicon-16x16.png"),
        (32, 32, "favicon-32x32.png"),
        (48, 48, "favicon-48x48.png"),
        (180, 180, "apple-touch-icon.png"),
        (192, 192, "android-chrome-192x192.png"),
        (512, 512, "android-chrome-512x512.png"),
    ]
    
    generated_files = []
    
    # Generate PNG favicons at different sizes
    for width, height, filename in favicon_sizes:
        output_path = os.path.join(output_dir, filename)
        
        # Resize with high-quality resampling
        resized = img.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(output_path, "PNG", optimize=True)
        
        print(f"[OK] Generated: {filename} ({width}x{height})")
        generated_files.append(output_path)
    
    # Generate favicon.ico (multi-size ICO file)
    ico_path = os.path.join(output_dir, "favicon.ico")
    
    # Create multiple sizes for the ICO file
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = []
    
    for size in ico_sizes:
        resized = img.resize(size, Image.Resampling.LANCZOS)
        ico_images.append(resized)
    
    # Save as ICO with multiple sizes embedded
    ico_images[0].save(
        ico_path,
        format='ICO',
        sizes=ico_sizes,
        append_images=ico_images[1:]
    )
    
    print(f"[OK] Generated: favicon.ico (multi-size: 16x16, 32x32, 48x48)")
    generated_files.append(ico_path)
    
    # Generate site.webmanifest
    manifest_content = '''{
    "name": "IKS Amrita - Indian Knowledge Systems",
    "short_name": "IKS Amrita",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#78350f",
    "background_color": "#fafaf9",
    "display": "standalone"
}'''
    
    manifest_path = os.path.join(output_dir, "site.webmanifest")
    with open(manifest_path, 'w') as f:
        f.write(manifest_content)
    
    print(f"[OK] Generated: site.webmanifest")
    generated_files.append(manifest_path)
    
    print(f"\n[SUCCESS] Generated {len(generated_files)} favicon files!")
    print(f"[INFO] Output directory: {output_dir}")
    
    return generated_files


if __name__ == "__main__":
    # Get the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define paths relative to the Next.js project structure
    project_root = os.path.dirname(script_dir)  # iks-app folder
    source_image = os.path.join(project_root, "public", "assets", "iks.webp")
    output_directory = os.path.join(project_root, "public")
    
    print("=" * 50)
    print("IKS Amrita Favicon Generator")
    print("=" * 50)
    print(f"Source: {source_image}")
    print(f"Output: {output_directory}")
    print("=" * 50 + "\n")
    
    if not os.path.exists(source_image):
        print(f"[ERROR] Source image not found at {source_image}")
        exit(1)
    
    generate_favicons(source_image, output_directory)
    
    print("\n" + "=" * 50)
    print("Next Steps:")
    print("=" * 50)
    print("The layout.tsx file will be updated to use these favicons.")
    print("Refresh your browser to see the new favicon!")
