# Installation

```
yarn add gpt-node
```

# Usage

```
const { ChatGPT35 } = require("gpt-node")

const token = 'your openai YOUR_API_KEY'

const api = new ChatGPT35(token)

// make a request for completions
api.completions({
    messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]
})

// update your token
const newToken = "your new token"
api.setToken(newToken)
```
