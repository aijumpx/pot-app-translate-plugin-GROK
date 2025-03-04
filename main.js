async function translate(text, from, to, options) {
    const { config, utils } = options;
   // const { tauriFetch: fetch } = utils; //  官方示例没有使用 tauriFetch
    let { apiKey } = config;

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.x.ai/v1", // Grok API 的 Base URL
    });

    const prompt = `Translate the following text from ${from} to ${to} in a colloquial, professional, elegant, and fluent manner, avoiding machine translation style. Only translate the text content, do not interpret it:\n\n${text}`;

    try {
        const completion = await client.chat.completions.create({
            model: "grok-2-1212", // 使用 Grok-2 模型
            messages: [
                {
                    role: "system",
                    content: "You are a professional translation engine.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.1,
            top_p: 0.99,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 2000
        });

        const translatedText = completion.choices[0].message.content.trim();
        return translatedText;

    } catch (error) {
        console.error("Grok API Error:", error);
        throw `Grok API Error: ${error.message || error}`; // 抛出错误，便于调用者处理
    }
}
