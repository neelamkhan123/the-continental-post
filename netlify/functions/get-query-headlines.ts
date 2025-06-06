import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const API_KEY = process.env.VITE_API_KEY;
  const query = event.queryStringParameters?.q;

  if (!API_KEY || !query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing API key or query" }),
    };
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from NewsAPI" }),
    };
  }
};

export { handler };
