import fetch from "node-fetch";

interface ChatMessage {
    role: string;
    content: string;
}

interface ChatRequestbody {
    messages: Array<ChatMessage>;
    model?: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301";
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string | string[];
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: Record<string, number>;
    user?: string;
}

export class ChatGPT35 {
    token: string;

    constructor(token: string) {
        this.setAuthToken(token)
    }

    setAuthToken(token) {
        this.token = token;
    }

    async completions(body: ChatRequestbody) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.token}` },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                ...body,
            }),
        });
        const data = await response.json();
        return data;
    }
}
