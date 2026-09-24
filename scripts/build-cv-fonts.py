"""
Builds the self-hosted CV fonts (public/fonts/cv/*.ttf).

Every file is a static, Latin + Latin-Extended (Azerbaijani/Turkish) subset TrueType instance.
The SAME files are used by the browser preview (@font-face) and embedded into the PDF (jsPDF),
so the two can never diverge.

Usage:  python3 scripts/build-cv-fonts.py <dir-with-source-fonts> <output-dir>
Sources come from https://github.com/google/fonts (ofl/...) - see SOURCES below.
Requires: pip install fonttools brotli
"""
import io, os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

UNICODES = "U+0020-007E,U+00A0-00FF,U+0100-017F,U+018F,U+0259,U+02C6,U+02DC,U+2013,U+2014,U+2018-201E,U+2022,U+2026,U+20AC,U+20BC,U+2192,U+2212"
ALL = [300, 400, 500, 600, 700, 800, 900]

# slug: (source file, pinned axes, weights, italic source file or None, italic weights)
SOURCES = {
    "inter":               ("Inter.ttf",        {"opsz": 14},               ALL, None, []),
    "manrope":             ("Manrope.ttf",      {},                         ALL, None, []),
    "plus-jakarta-sans":   ("Jakarta.ttf",      {},                         ALL, None, []),
    "bricolage-grotesque": ("Bricolage.ttf",    {"opsz": 14, "wdth": 100},  ALL, None, []),
    "space-grotesk":       ("SpaceGrotesk.ttf", {},                         ALL, None, []),
    "work-sans":           ("WorkSans.ttf",     {},                         ALL, None, []),
    "archivo":             ("Archivo.ttf",      {"wdth": 100},              ALL, None, []),
    "libre-franklin":      ("LibreFranklin.ttf",{},                         ALL, None, []),
    "playfair-display":    ("Playfair.ttf",     {},                         ALL, "PlayfairI.ttf", [400, 600]),
    "lora":                ("Lora.ttf",         {},                         ALL, "LoraI.ttf", [400, 600]),
    "source-serif-4":      ("SourceSerif.ttf",  {"opsz": 14},               ALL, "SourceSerifI.ttf", [400, 600]),
    "fraunces":            ("Fraunces.ttf",     {"opsz": 14, "SOFT": 0, "WONK": 0}, ALL, None, []),
    "ibm-plex-sans":       ("Plex.ttf",         {"wdth": 100},              ALL, None, []),
}
# Poppins is not variable: static files, mapped by weight.
POPPINS = {300: "Light", 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"}

def ensure_schwa(font):
    """Azerbaijani needs U+0259 (ə) and U+018F (Ə). Some families (Bricolage Grotesque, Manrope) lack them.
    ə is a turned 'e' - we build it by rotating 'e' 180 degrees; Ə is that glyph scaled to cap height.
    Doing this in the font file keeps the browser preview and the PDF identical (no silent fallback)."""
    from fontTools.pens.transformPen import TransformPen
    from fontTools.pens.ttGlyphPen import TTGlyphPen
    from fontTools.pens.boundsPen import BoundsPen
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font['hmtx']
    glyf = font['glyf']

    def add(name, code, draw_from, transform, advance):
        pen = TTGlyphPen(gs)
        gs[draw_from].draw(TransformPen(pen, transform))
        glyf[name] = pen.glyph()
        order = font.getGlyphOrder()
        if name not in order:
            order.append(name)
            font.setGlyphOrder(order)
        hmtx[name] = (advance, 0)
        for table in font['cmap'].tables:
            if table.isUnicode():
                table.cmap[code] = name

    if 0x259 not in cmap and 'e' in gs:
        bp = BoundsPen(gs); gs['e'].draw(bp)
        x0, y0, x1, y1 = bp.bounds
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        adv = hmtx[cmap[ord('e')]][0]
        add('uni0259', 0x259, cmap[ord('e')], (-1, 0, 0, -1, 2 * cx, 2 * cy), adv)
        cmap = font.getBestCmap()
    if 0x18F not in cmap and 0x259 in cmap and 'E' in gs and 'x' in gs:
        def height(ch):
            bp = BoundsPen(gs); gs[cmap[ord(ch)]].draw(bp); return bp.bounds[3]
        k = height('E') / height('x')
        base = cmap[0x259]
        add('uni018F', 0x18F, base, (k, 0, 0, k, 0, 0), int(hmtx[base][0] * k))
    # round-trip so glyph maps/caches are rebuilt for the subsetter
    buf = io.BytesIO(); font.save(buf); buf.seek(0)
    return TTFont(buf)

def write_subset(font, path):
    opts = subset.Options()
    opts.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk"]
    opts.hinting = False
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    font.save(path)

def instance(src, pins, weight):
    f = TTFont(os.path.join(SRC, src))
    axes = {a.axisTag: a for a in f["fvar"].axes}
    loc = dict(pins)
    if "wght" in axes:
        loc["wght"] = max(axes["wght"].minValue, min(axes["wght"].maxValue, weight))
    for tag, a in axes.items():   # any axis we did not pin -> default
        loc.setdefault(tag, a.defaultValue)
    inst = instancer.instantiateVariableFont(f, loc)
    return ensure_schwa(inst)

for slug, (src, pins, weights, isrc, iweights) in SOURCES.items():
    for w in weights:
        write_subset(instance(src, pins, w), f"{OUT}/{slug}-{w}.ttf")
    for w in iweights:
        write_subset(instance(isrc, pins, w), f"{OUT}/{slug}-{w}i.ttf")

for w, name in POPPINS.items():
    f = TTFont(os.path.join(SRC, f"Poppins-{name}.ttf"))
    f = ensure_schwa(f)
    write_subset(f, f"{OUT}/poppins-{w}.ttf")
print("done")
