'use server';

export const cronAction = async () => {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cron`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
    cache: 'no-store',
  });
};
