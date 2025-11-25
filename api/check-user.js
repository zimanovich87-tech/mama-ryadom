// /api/check-user.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;
    const url = `https://script.google.com/macros/s/AKfycbzDBVfhILT7Q5jazaFgVXovqbcaRRFKUk3XmxcKhMeLoronwT51DuCda0UmjHsXrTc-Fw/exec`;
    const params = new URLSearchParams({ action: 'check_user', userId });
    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'POST',
      body: JSON.stringify({ action: 'check_user', userId }),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Check user error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
