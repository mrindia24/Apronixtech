import { getStore } from '@netlify/blobs';
import { blobsAvailable, mimeFromFilename, UPLOADS_STORE } from '@/src/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /uploads/:file
 * Serves media uploaded on Netlify from Netlify Blobs. Files written to
 * public/uploads in local development are served statically before this runs.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!blobsAvailable() || !/^[a-z0-9._-]+$/i.test(file)) {
    return new Response('Not found', { status: 404 });
  }

  const data = await getStore(UPLOADS_STORE).get(file, { type: 'arrayBuffer' });
  if (!data) return new Response('Not found', { status: 404 });

  return new Response(data, {
    headers: {
      'Content-Type': mimeFromFilename(file),
      // Filenames include a random suffix, so content never changes in place.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
