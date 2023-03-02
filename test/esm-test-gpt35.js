import { ChatGPT35 } from "../es/gpt35";

const testGPT35 = async () => {
    const api = new ChatGPT35("your token")

    const result = await api.completions({
        messages: [
            {
                role: "ai",
                content: "hello"
            },
            {
                role: "user",
                content: "你是谁？"
            }
        ]
    })

    console.log(result)
}

testGPT35()