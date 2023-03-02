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
declare class ChatGPT35 {
    token: string;
    constructor(token: string);
    setAuthToken(token: any): void;
    completions(body: ChatRequestbody): Promise<any>;
}

export { ChatGPT35 };
