export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { prompt, template } = await request.json();

    const systemPrompt = `You are Canyon's demo assistant. Generate a brief, realistic description of an enterprise internal app that would be built based on the user's input. Keep it under 100 words. Be specific about data sources, metrics, and access controls. Do not use em dashes.`;

    const userMessage = template
      ? `Generate a description for this enterprise app template: "${template}"`
      : `Generate a description for this enterprise app request: "${prompt}"`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 256,
        messages: [{ role: "user", content: userMessage }],
        system: systemPrompt,
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "Unable to generate description.";

    return Response.json({ description: text });
  } catch (error) {
    return Response.json({ error: "Demo generation failed" }, { status: 500 });
  }
}
