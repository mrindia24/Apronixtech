export function instagramEmbedUrl(reel: string): string {
  const url = new URL(reel);
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/embed/`;
  url.search = '';
  url.hash = '';
  return url.toString();
}
