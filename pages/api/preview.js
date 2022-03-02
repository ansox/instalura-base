export default function handler(req, res) {
  const key = 'ANSO';

  if (req.query.key !== key) {
    return res.status(401).json({ message: 'Invalid key' });
  }

  res.setPreviewData({});

  res.writeHead(307, { location: '/' });

  return res.end();
}
