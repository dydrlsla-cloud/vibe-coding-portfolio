import os

def create_svg(path, width, height, text, bg_color="#2c3e50"):
    # Ensure text is XML safe (basic)
    safe_text = text.replace("&", "&amp;")
    
    svg_content = f"""<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="{bg_color}"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="white" text-anchor="middle" dy=".3em">{safe_text}</text>
    <rect width="100%" height="100%" fill="none" stroke="#fff" stroke-opacity="0.2" stroke-width="4"/>
</svg>"""
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Created {path}")

def main():
    if not os.path.exists("images"):
        os.makedirs("images")
        
    # Standard size for portfolio
    p_w, p_h = 600, 400
    
    # 1. Logo
    create_svg("images/logo.svg", 200, 50, "BIGAutosys", "#0A192F")
    
    # 2. Hero Background
    create_svg("images/hero_bg.svg", 1920, 1080, "Hero Background Image", "#112240")
    
    # 3. Portfolio Images
    items = [
        ("portfolio_hanmi.svg", "Hanmi Pharm"),
        ("portfolio_dongkuk.svg", "Dongkook Pharm"),
        ("portfolio_reyon.svg", "Reyon Pharm"),
        ("portfolio_sdi_oled.svg", "Samsung SDI"),
        ("portfolio_binex.svg", "Binex"),
        ("portfolio_hyundai.svg", "Hyundai Motor"),
        ("portfolio_seoyon.svg", "Seoyon E-Hwa"),
        ("portfolio_haesung.svg", "Haesung DS"),
        ("portfolio_neoflam.svg", "Neoflam"),
        ("portfolio_ecopro.svg", "EcoPro BM"),
        ("portfolio_lpg.svg", "Korea LPG Agency"),
        ("portfolio_hydrogen.svg", "Jeju Green Energy"),
        ("portfolio_kepco.svg", "KEPCO"),
        ("portfolio_unist.svg", "UNIST"),
        ("portfolio_hy.svg", "Korea Yakult"),
        ("portfolio_chamfre.svg", "Chamfre")
    ]
    
    for filename, text in items:
        # Vary colors slightly for visual distinction
        create_svg(f"images/{filename}", p_w, p_h, text, "#233554")

    print("All images generated.")

if __name__ == "__main__":
    main()
