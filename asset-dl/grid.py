import sys
from PIL import Image, ImageDraw
path=sys.argv[1]; out=sys.argv[2]
im=Image.open(path).convert('RGB')
W=1000; r=W/im.width
im2=im.resize((W,int(im.height*r)))
d=ImageDraw.Draw(im2)
for x in range(0,W,100):
    d.line([(x,0),(x,im2.height)],fill=(255,0,0)); d.text((x+3,3),str(round(x/W,3)),fill=(255,255,0))
for y in range(0,im2.height,100):
    d.line([(0,y),(W,y)],fill=(255,0,0)); d.text((3,y+2),str(round(y/im2.height,3)),fill=(0,255,255))
im2.save(out,quality=85); print(im2.size)
