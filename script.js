"use strict";

const OLLAMA_URL = "http://127.0.0.1:11434/api/chat";
const OLLAMA_MODEL = "phi3:mini"; // Tez + Samajhdar

// ... tumhara SYSTEM_PROMPT same rahega ...

async function getAIResponse(userMessage) {
    const database = await loadDatabase();
    const databaseContext = createDatabaseContext(database);

    conversationHistory.push({ role: "user", content: userMessage });

    const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: `DATABASE:\n${databaseContext}` },
        ...conversationHistory
    ];

    // FAST STREAMING FETCH
    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            messages: apiMessages,
            stream: true, // Yeh tez karega
            options: {
                temperature: 0.2,
                num_predict: 300, // Chota jawab = tez
            }
        })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";
    
    // Pehle se hi message box banao
    const aiMessageDiv = addMessage("ai", ""); 
    const contentDiv = aiMessageDiv.querySelector(".message-content");

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
            if (!line.trim()) continue;
            try {
                const json = JSON.parse(line);
                if (json.message && json.message.content) {
                    fullText += json.message.content;
                    contentDiv.innerHTML = formatAIResponse(fullText);
                    scrollToBottom();
                }
            } catch(e) {}
        }
    }

    conversationHistory.push({ role: "assistant", content: fullText });
    return fullText;
}
