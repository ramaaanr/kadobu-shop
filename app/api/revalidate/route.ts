// app/api/revalidate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidateTag } from 'next/cache';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tag } = req.query;
    if (!tag) {
      return res.status(400).json({ error: 'Tag is required' });
    }
    revalidateTag(tag[0]);
    res.status(200).json({ revalidated: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to revalidate' });
  }
}
