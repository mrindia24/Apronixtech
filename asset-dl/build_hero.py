from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import numpy as np, sys
sys.path.insert(0,'.')
from mockup import insert, homography

W_OUT, H_OUT = 2400, 1500   # 8:5 canvas, downscaled later

# 1. base photo, graded
base = Image.open('hi-1229861.jpg').convert('RGB')
base = base.resize((W_OUT, int(base.height * W_OUT / base.width)), Image.LANCZOS)
base = base.crop((0, 0, W_OUT, H_OUT))
# darken + desaturate slightly so the screen and red accents own the frame
base = ImageEnhance.Brightness(base).enhance(0.62)
base = ImageEnhance.Color(base).enhance(0.72)
base = ImageEnhance.Contrast(base).enhance(1.05)
# red ambient wash, stronger toward the upper-left
wm = Image.linear_gradient('L').rotate(90).resize(base.size)
wm = wm.point(lambda v: int(v * 0.5))
red = Image.new('RGB', base.size, (224, 31, 39))
base = Image.composite(Image.blend(base, red, 0.20), base, wm)
base.save('hero-base.jpg', quality=92)

# 2. laptop screen insertion
out = insert('hero-base.jpg',
             [(0.442,0.196),(0.856,0.168),(0.800,0.826),(0.384,0.782)],
             '/tmp/shots/screen-desktop.png', 'hero-laptop.jpg',
             brightness=1.02, glow=0.30, blur=1.0)
W,H = out.size

# 3. phone mockup, floating bottom-left
PH_W, PH_H = 560, 1150          # phone body incl. bezel
PHONE_X, PHONE_Y = 300, 250
screen = Image.open('/tmp/shots/screen-mobile.png').convert('RGB')
inner_w, inner_h = int(PH_W*0.925), int(PH_H*0.945)
screen = screen.resize((inner_w, inner_h), Image.LANCZOS)
screen = ImageEnhance.Brightness(screen).enhance(1.06)

phone = Image.new('RGB', (PH_W, PH_H), (12,13,16))
body = ImageDraw.Draw(phone)
body.rounded_rectangle([0,0,PH_W-1,PH_H-1], radius=86, fill=(17,19,24))
# screen with rounded mask
mask = Image.new('L', (inner_w, inner_h), 0)
ImageDraw.Draw(mask).rounded_rectangle([0,0,inner_w-1,inner_h-1], radius=62, fill=255)
phone.paste(screen, ((PH_W-inner_w)//2, (PH_H-inner_h)//2), mask)
# subtle bezel highlight + notch
hl = ImageDraw.Draw(phone)
hl.rounded_rectangle([0,0,PH_W-1,PH_H-1], radius=86, outline=(255,255,255,26), width=3)
hl.rounded_rectangle([PH_W//2-70, 34, PH_W//2+70, 74], radius=20, fill=(10,11,13))

# drop shadow
shadow = Image.new('L', (PH_W+260, PH_H+260), 0)
ImageDraw.Draw(shadow).rounded_rectangle([130,120,130+PH_W,120+PH_H], radius=96, fill=140)
shadow = shadow.filter(ImageFilter.GaussianBlur(60))

canvas = out.copy()
canvas.paste(Image.new('RGB', shadow.size, (0,0,0)), (PHONE_X-130, PHONE_Y-120), shadow)
canvas.paste(phone, (PHONE_X, PHONE_Y), None)
canvas.save('hero-v1.jpg', quality=92, optimize=True, progressive=True)
print('hero-v1', canvas.size)

# 4. final crops
def save(im, path, size, box=None, q=84):
    x = im.crop(box) if box else im
    x = x.resize(size, Image.LANCZOS)
    x.save(path, 'JPEG', quality=q, optimize=True, progressive=True)
    return size

# edge-to-edge ambient image (about page band, contact, OG support)
save(canvas, 'final-hero-wide.jpg', (1600,1000))
# 4:3-ish right-hand hero panel: keep laptop + phone, drop dead space
save(canvas, 'final-hero-panel.jpg', (1200,1100), box=(230,30,2230,1970) if canvas.height>=1970 else (230,30,2230,canvas.height-30))
print('done')
