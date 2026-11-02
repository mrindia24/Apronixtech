import { describe, expect, it } from 'vitest';
import { instagramEmbedUrl } from '@/src/lib/instagram';

describe('instagramEmbedUrl', () => {
  it('places the embed path before and removes tracking parameters', () => {
    expect(
      instagramEmbedUrl('https://www.instagram.com/reel/DfNd_L8I4N1/?mdxt=dnZpMjV2azZmN3hr'),
    ).toBe('https://www.instagram.com/reel/DfNd_L8I4N1/embed/');
  });

  it('handles reel URLs with a trailing slash', () => {
    expect(instagramEmbedUrl('https://www.instagram.com/reel/DfNd_L8I4N1/')).toBe(
      'https://www.instagram.com/reel/DfNd_L8I4N1/embed/',
    );
  });
});
