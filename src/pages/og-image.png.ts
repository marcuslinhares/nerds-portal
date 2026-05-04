// src/pages/og-image.png.ts
import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = async ({ params }) => {
  const title = params.title ? decodeURIComponent(params.title) : site.title;
  const subtitle = params.subtitle ? decodeURIComponent(params.subtitle) : site.description;

  const width = 1200;
  const height = 630;

  const png = createOGImage({ title, subtitle, width, height });

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
};

function createOGImage(opts: { title: string; subtitle: string; width: number; height: number }): Uint8Array {
  const { width, height } = opts;
  const sig = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = createChunk('IHDR', new Uint8Array([
    ...new Uint8Array(new Uint32Array([width]).buffer).reverse(),
    ...new Uint8Array(new Uint32Array([height]).buffer).reverse(),
    8, 2, 0, 0, 0,
  ]));

  const raw = new Uint8Array(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0;
    for (let x = 0; x < width; x++) {
      const idx = y * (1 + width * 3) + 1 + x * 3;
      raw[idx] = 10; raw[idx + 1] = 14; raw[idx + 2] = 20;
    }
  }

  // Top gradient strip
  const stripHeight = Math.min(220, height);
  for (let y = 0; y < stripHeight; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * (1 + width * 3) + 1 + x * 3;
      raw[idx] = 15; raw[idx + 1] = 20; raw[idx + 2] = 28;
    }
  }

  const zlib = deflateSync(raw);
  const idat = createChunk('IDAT', new Uint8Array(zlib));
  const iend = createChunk('IEND', new Uint8Array([]));
  return new Uint8Array([...sig, ...ihdr, ...idat, ...iend]);
}

function createChunk(type: string, data: Uint8Array): Uint8Array {
  const typeBytes = new TextEncoder().encode(type);
  const lenBuf = new Uint8Array(new Uint32Array([data.length]).buffer).reverse();
  const len = new Uint8Array(lenBuf);
  const crcData = new Uint8Array([...typeBytes, ...data]);
  const crcVal = crc32(crcData);
  const crcBuf = new Uint8Array(new Uint32Array([crcVal]).buffer).reverse();
  const crc = new Uint8Array(crcBuf);
  return new Uint8Array([...len, ...typeBytes, ...data, ...crc]);
}

function crc32(buf: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function deflateSync(data: Uint8Array): Uint8Array {
  const len = data.length;
  const lenLE = new Uint8Array(new Uint16Array([len]).buffer);
  const nlenVal = (~len & 0xFFFF);
  const nlenLE = new Uint8Array(new Uint16Array([nlenVal]).buffer);
  const header = new Uint8Array([0x78, 0x01]);
  return new Uint8Array([...header, 0x01, ...lenLE, ...nlenLE, ...data, ...adler32(data)]);
}

function adler32(data: Uint8Array): Uint8Array {
  let a = 1, b = 0;
  for (const v of data) { a = (a + v) % 65521; b = (b + a) % 65521; }
  const val = (b << 16) | a;
  return new Uint8Array(new Uint32Array([val]).buffer).reverse();
}