import type { Handler } from "@netlify/functions";

const handler: Handler = async () => {
  const API_KEY = process.env.VITE_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key missing" }),
    };
  }

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
};

export { handler };
