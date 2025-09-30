import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  const rawData = fetch('https://pamix.ch/wp-json/pamix/v1/alle-daten/', {
    cache: 'no-cache',
  });
  console.log('Cron job executed');
  return Response.json({ success: true });
};
