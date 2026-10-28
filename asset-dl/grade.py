from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import numpy as np

def dark_grade(im, brightness=0.62, color=0.42, contrast=1.08, tint=0.32, red_wash=0.10):
    im = im.convert('RGB')
    im = ImageEnhance.Color(im).enhance(color)
    im = ImageEnhance.Brightness(im).enhance(brightness)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    arr = np.asarray(im).astype(np.float32)
    lum = arr.mean(axis=2, keepdims=True)/255.0
    ink = np.array([10,11,15], dtype=np.float32)
    arr = arr*(1-tint*(1-lum)) + ink*(tint*(1-lum))
    out = Image.fromarray(np.clip(arr,0,255).astype(np.uint8))
    if red_wash:
        wm = Image.linear_gradient('L').rotate(90).resize(out.size).point(lambda v: int(v*red_wash))
        red = Image.new('RGB', out.size, (190,26,33))
        out = Image.composite(Image.blend(out, red, 0.5), out, wm)
    # gentle vignette
    W,H = out.size
    vig = Image.new('L', out.size, 0)
    ImageDraw.Draw(vig).ellipse([-int(W*0.1),-int(H*0.15),int(W*1.1),int(H*1.15)], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(min(W,H)*0.12))
    vig = vig.point(lambda v: 255-int((255-v)*0.85))
    out = Image.composite(out, Image.new('RGB', out.size, (7,8,10)), vig)
    return out

def crop_ratio(im, ratio, fx=0.5, fy=0.5):
    w,h = im.size
    if w/h > ratio: nw,nh = int(h*ratio), h
    else: nw,nh = w, int(w/ratio)
    l=int((w-nw)*fx); t=int((h-nh)*fy)
    return im.crop((l,t,l+nw,t+nh))
