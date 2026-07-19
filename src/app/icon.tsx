import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 100%)',
        color: '#10b981',
        fontSize: 22,
        fontWeight: 900,
        fontFamily: 'monospace',
        borderRadius: 6,
        border: '1px solid #262626',
      }}
    >
      {'</>'}
    </div>,
    { ...size },
  );
}
