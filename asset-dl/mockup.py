from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import numpy as np

def homography(src_pts, dst_pts):
    A, B = [], []
    for (u,v),(x,y) in zip(src_pts, dst_pts):
        A.append([u,v,1,0,0,0,-u*x,-v*x]); B.append(x)
        A.append([0,0,0,u,v,1,-u*y,-v*y]); B.append(y)
    h = np.linalg.solve(np.array(A,float), np.array(B,float)).tolist() + [1.0]
    return np.array(h).reshape(3,3)

def insert(photo_path, quad_norm, screen_path, out_path,
           brightness=0.95, glow=0.18, blur=0.6):
    photo = Image.open(photo_path).convert('RGB'); W,H = photo.size
    quad = [(x*W, y*H) for x,y in quad_norm]
    w = int(round(max(abs(quad[1][0]-quad[0][0]), abs(quad[2][0]-quad[3][0]))))
    h = int(round(max(abs(quad[3][1]-quad[0][1]), abs(quad[2][1]-quad[1][1]))))
    screen = Image.open(screen_path).convert('RGB').resize((w,h), Image.LANCZOS)
    screen = ImageEnhance.Brightness(screen).enhance(brightness)

    rect = [(0,0),(w,0),(w,h),(0,h)]
    Hm = homography(rect, quad)               # screen px -> photo px
    Hi = np.linalg.inv(Hm); Hi = Hi / Hi[2,2] # photo px -> screen px
    coeffs = tuple(Hi.flatten()[:8])

    warped = screen.transform((W,H), Image.PERSPECTIVE, coeffs, Image.BICUBIC)

    mask = Image.new('L', (W,H), 0)
    ImageDraw.Draw(mask).polygon(quad, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(blur))

    # soft screen bloom so the inserted UI reads as emitting light
    if glow:
        bloom = Image.new('RGB', (W,H), (0,0,0))
        bloom.paste(warped, (0,0), mask)
        bloom = bloom.filter(ImageFilter.GaussianBlur(28))
        photo = Image.blend(photo, Image.blend(photo, bloom, 1.0), 0)  # no-op placeholder
        photo = Image.composite(Image.blend(photo, bloom, glow), photo, mask)
    out = Image.composite(warped, photo, mask)
    out.save(out_path, quality=92, optimize=True, progressive=True)
    return out

if __name__ == '__main__':
    out = insert('hi-1229861.jpg',
                 [(0.442,0.196),(0.856,0.168),(0.791,0.749),(0.393,0.699)],
                 '/tmp/shots/screen-desktop.png', 'hero-laptop-test.jpg')
    W,H = out.size
    c = out.crop((int(0.30*W),int(0.05*H),int(0.95*W),int(0.85*H)))
    c = c.resize((1100, int(c.height*1100/c.width)))
    c.save('hero-laptop-zoom.jpg', quality=92)
    print('ok')
