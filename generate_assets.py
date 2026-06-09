# -*- coding: utf-8 -*-
"""Generate portfolio, partner, and brand image assets."""
import os
import html

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "images")
os.makedirs(IMG, exist_ok=True)


def svg(path, w, h, inner, view_box=None):
    vb = view_box or f"0 0 {w} {h}"
    content = f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{vb}">{inner}</svg>'
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def portfolio_card(filename, title, subtitle, color):
    inner = f'''
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{color}"/>
      <stop offset="100%" stop-color="#0a0e17"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#g)"/>
  <rect x="24" y="24" width="552" height="352" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" rx="12"/>
  <text x="300" y="180" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">{title}</text>
  <text x="300" y="230" font-family="Arial,sans-serif" font-size="16" fill="rgba(255,255,255,0.75)" text-anchor="middle">{subtitle}</text>
  <text x="300" y="340" font-family="Arial,sans-serif" font-size="12" fill="rgba(255,255,255,0.4)" text-anchor="middle">BIGAutosys Portfolio</text>'''
    svg(os.path.join(IMG, filename), 600, 400, inner)


def partner_logo(filename, title, sub, color, bg="#fff"):
    inner = f'''
  <rect width="200" height="60" fill="{bg}" rx="4"/>
  <text x="100" y="28" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="{color}" text-anchor="middle">{title}</text>
  <text x="100" y="48" font-family="Arial,sans-serif" font-size="11" fill="#555" text-anchor="middle">{sub}</text>'''
    svg(os.path.join(IMG, filename), 200, 60, inner)


def brand_logo(filename, name, sub, color):
    inner = f'''
  <rect width="240" height="64" fill="#111827" rx="8"/>
  <text x="20" y="42" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="{color}">{name}</text>
  <text x="20" y="58" font-family="Arial,sans-serif" font-size="10" fill="#94a3b8">{sub}</text>'''
    svg(os.path.join(IMG, filename), 240, 64, inner)


def product_visual(filename, title, lines, color):
    items = "".join(
        f'<text x="40" y="{120 + i * 28}" font-family="Arial,sans-serif" font-size="14" fill="#cbd5e1">• {html.escape(line)}</text>'
        for i, line in enumerate(lines)
    )
    inner = f'''
  <rect width="480" height="320" fill="#111827" rx="12"/>
  <rect x="16" y="16" width="448" height="288" fill="#1a2332" rx="8" stroke="{color}" stroke-width="2"/>
  <text x="40" y="56" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="{color}">{html.escape(title)}</text>
  {items}'''
    svg(os.path.join(IMG, filename), 480, 320, inner)


PORTFOLIO = [
    ("portfolio_hanmi.svg", "한미약품", "수처리 모니터링", "#c0392b"),
    ("portfolio_dongkuk.svg", "동국제약", "수처리 시스템", "#8e44ad"),
    ("portfolio_reyon.svg", "이연제약", "생산 설비 모니터링", "#2980b9"),
    ("portfolio_sdi_oled.svg", "삼성 SDI", "설비 제어", "#1a5276"),
    ("portfolio_binex.svg", "바이넥스", "중량 시스템", "#16a085"),
    ("portfolio_hyundai.svg", "현대자동차", "공조 제어 (아산)", "#2c3e50"),
    ("portfolio_seoyon.svg", "서연이화", "플라스틱 사출라인", "#34495e"),
    ("portfolio_doosan.svg", "두산현대인프라코어", "무인지게차(AGV)", "#7f8c8d"),
    ("portfolio_haesung.svg", "해성디에스", "노광기 제어", "#d35400"),
    ("portfolio_neoflam.svg", "네오플램", "도장 라인 제어", "#e67e22"),
    ("portfolio_ecopro.svg", "에코프로비엠", "유틸리티 제어", "#27ae60"),
    ("portfolio_lpg.svg", "한국 LPG 사업단", "배관망 모니터링", "#2ecc71"),
    ("portfolio_hydrogen.svg", "제주 그린에너지", "수소 충전소", "#1abc9c"),
    ("portfolio_kepco.svg", "한국전력공사", "SF6 가스 분석", "#3498db"),
    ("portfolio_unist.svg", "UNIST", "가스 캐비닛", "#9b59b6"),
    ("portfolio_hy.svg", "한국야쿠르트", "냉동창고", "#e91e63"),
    ("portfolio_chamfre.svg", "참프레", "냉동창고", "#00bcd4"),
]

PARTNERS = [
    ("partner_sdi.svg", "Samsung SDI", "삼성 SDI", "#1428a0"),
    ("partner_hyundai.svg", "HYUNDAI", "현대자동차", "#002c5f"),
    ("logo_hanwha.svg", "HANWHA", "한화에어로스페이스", "#F58025"),
    ("partner_kepco.svg", "KEPCO", "한국전력공사", "#0066b3"),
    ("logo_keco.svg", "K-eco", "한국환경공단", "#009944"),
    ("partner_lpg.svg", "K-LPG", "LPG 사업관리원", "#006837"),
    ("partner_hanmi.svg", "Hanmi", "한미약품", "#e60012"),
    ("partner_dongkuk.svg", "Dongkook", "동국제약", "#0054a6"),
    ("partner_seoyon.svg", "Seoyon", "서연이화", "#003876"),
    ("partner_haesung.svg", "Haesung DS", "해성디에스", "#004098"),
    ("partner_unist.svg", "UNIST", "울산과학기술원", "#005BAC"),
    ("logo_theyireh.svg", "THE IRE", "주식회사 더이레", "#1a1a1a"),
]

if __name__ == "__main__":
    for fn, title, sub, color in PORTFOLIO:
        portfolio_card(fn, title, sub, color)

    for fn, title, sub, color in PARTNERS:
        partner_logo(fn, title, sub, color)

    brand_logo("brand_autonics.svg", "AUTONICS", "SCADA Master", "#E4002B")
    brand_logo("brand_easyview.svg", "EasyView", "Advanced HMI Solution", "#0066CC")
    brand_logo("brand_zenon.svg", "zenon", "by COPA-DATA", "#00A651")

    product_visual("product_hmi.svg", "EasyView HMI", [
        "XE / IP / iE / cMT Series",
        "300+ Communication Drivers",
        "Remote Monitoring & IIoT",
    ], "#0066CC")

    product_visual("product_zenon.svg", "zenon Platform", [
        "FDA 21 CFR Part 11",
        "IEC 61850 Energy",
        "Pharma & Manufacturing",
    ], "#00A651")

    # Company logo
    inner = '''
  <text x="0" y="32" font-family="Arial,sans-serif" font-weight="700" font-size="28" fill="#6c757d">BIG</text>
  <text x="62" y="32" font-family="Arial,sans-serif" font-weight="700" font-size="28" fill="#F58025">Autosys</text>'''
    svg(os.path.join(IMG, "logo.svg"), 200, 44, inner, "0 0 200 44")

    print("Generated", len(PORTFOLIO) + len(PARTNERS) + 5, "assets in", IMG)
