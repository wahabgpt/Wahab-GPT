"use strict";

/* =========================================================
   WAHABGPT
   LOCAL OLLAMA AI
   ========================================================= */

const OLLAMA_URL = "http://127.0.0.1:11434/api/chat";
const OLLAMA_MODEL = "qwen2.5:0.5b";


/* =========================================================
   AI SYSTEM PROMPT
   ========================================================= */

const SYSTEM_PROMPT = `
You are WahabGPT.

IDENTITY
- Your AI name is WahabGPT.
- The user's name is Abdul Wahab Badar.
- The user can also be called Wahab.
- Your creator is Abdul Wahab Badar.
- You are a local AI assistant powered by Ollama.
- Model: qwen2.5:0.5b.

IMPORTANT
- WahabGPT is the AI name.
- Abdul Wahab Badar is the user's name.
- NEVER confuse the AI name with the user's name.
- If the user asks "What is my name?", use the PERSONAL DATABASE.
- If the user asks "What should you call me?", use the PERSONAL DATABASE.
- If the user asks "What is my AI's name?", answer WahabGPT.
- If the user asks "Who created you?", answer Abdul Wahab Badar.

DATABASE RULES
- A PERSONAL DATABASE is provided separately.
- The PERSONAL DATABASE is the source of truth for information about the user.
- Always use the database when answering questions about the user.
- NEVER invent personal information.
- NEVER guess personal information.
- NEVER create fake projects, skills, education, interests or goals.
- If information is not in the database, say that the information is not available in the database.

LANGUAGE
- Understand Roman Urdu.
- Understand Urdu.
- Understand English.
- Understand Hinglish.
- Understand spelling mistakes and informal messages.

CODING
- Help with HTML, CSS and JavaScript.
- When the user asks for code, give working code.
- Understand commands such as:
  "10 div bana do"
  "button red kar do"
  "header ka color change karo"
- Preserve the user's existing project structure.
- Do not remove existing functionality unless requested.

RESPONSE
- Keep simple questions short.
- For coding problems, explain briefly and provide the required code.
- If the user asks for a complete file, provide the complete replacement file.
`;

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

const newChatBtn = document.getElementById("newChatBtn");
const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.querySelector(".sidebar");


/* =========================================================
   CHAT MEMORY
   ========================================================= */

let conversationHistory = [];
let DATABASE = null;
let databasePromise = null;

async function loadDatabase() {
    if (databasePromise) {
        return databasePromise;
    }

    databasePromise = fetch("./{.json", {
        cache: "no-store"
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error(
                `Database load failed: HTTP ${response.status}`
            );
        }

        const text = await response.text();

        DATABASE = JSON.parse(text);

        console.log("✅ DATABASE LOADED");
        console.log(DATABASE);

        return DATABASE;
    })
    .catch(error => {
        console.error("❌ DATABASE ERROR:", error);
        DATABASE = {};
        return DATABASE;
    });

    return databasePromise;
}

/* =========================================================
   SEND MESSAGE
   ========================================================= */

async function sendMessage(text = null) {

    if (!messageInput && !text) {
        return;
    }

    const message = text !== null
        ? String(text).trim()
        : messageInput.value.trim();

    if (!message) {
        return;
    }

    if (welcome) {
        welcome.style.display = "none";
    }

    addMessage("user", escapeHTML(message));

    if (messageInput) {
        messageInput.value = "";
        autoResize();
    }

    setSendButtonState(true);

    showTyping();

    try {

        const aiResponse = await getAIResponse(message);

        removeTyping();

        await typeAIMessage(aiResponse);

    } catch (error) {

        console.error("WahabGPT Error:", error);

        removeTyping();

        let errorMessage = error.message || "Unknown error";

        addMessage(
            "ai",
            `
            <strong>❌ AI Connection Error</strong>
            <br><br>
            ${escapeHTML(errorMessage)}
            <br><br>
            <small>
            Make sure Ollama is running and
            qwen2.5:0.5b is installed.
            </small>
            `
        );

    } finally {

        setSendButtonState(false);

        if (messageInput) {
            messageInput.focus();
        }
    }
}


/* =========================================================
   GET AI RESPONSE
   ========================================================= */
async function getAIResponse(userMessage) {

    const database = await loadDatabase();

    const q = userMessage
        .toLowerCase()
        .trim();

    /*
       PERSONAL DATABASE ANSWERS
    */

    if (
        q.includes("what is my name") ||
        q.includes("what's my name") ||
        q.includes("mera naam kya hai") ||
        q.includes("mera name kya hai")
    ) {
        const name = database?.user?.name || "Abdul Wahab Badar";
        return `Tumhara naam ${name} hai.`;
    }

    if (
        q.includes("what should you call me") ||
        q.includes("what do you call me") ||
        q.includes("call me what") ||
        q.includes("mujhe kya bulao") ||
        q.includes("mujhe kis naam se bulao")
    ) {
        const name =
            database?.user?.preferred_name ||
            "Wahab";

        return `Main tumhein ${name} bulaunga.`;
    }

    if (
        q.includes("what is my ai") ||
        q.includes("what is my ai's name") ||
        q.includes("what is the name of my ai") ||
        q.includes("my ai name") ||
        q.includes("meri ai ka naam")
    ) {
        const aiName =
            database?.identity?.ai_name ||
            "WahabGPT";

        return `Tumhari AI ka naam ${aiName} hai.`;
    }

    if (
        q.includes("who created wahabgpt") ||
        q.includes("who created you") ||
        q.includes("who is your creator") ||
        q.includes("tumhein kis ne banaya") ||
        q.includes("tumhara creator kon hai")
    ) {
        const creator =
            database?.identity?.creator ||
            "Abdul Wahab Badar";

        return `WahabGPT ko ${creator} ne banaya hai.`;
    }

    if (
        q.includes("what is abdul wahab badar") ||
        q.includes("who is abdul wahab badar") ||
        q.includes("abdul wahab badar kon hai") ||
        q.includes("abdul wahab badar kaun hai")
    ) {
        const name =
            database?.user?.name ||
            "Abdul Wahab Badar";

        const status =
            database?.user?.status ||
            "student";

        return `${name} user hain. Woh ${status} hain aur WahabGPT ke creator bhi hain.`;
    }


    /*
       NORMAL AI CHAT
    */

    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    const databaseContext = JSON.stringify(
        database,
        null,
        2
    );

    const apiMessages = [

        {
            role: "system",
            content: SYSTEM_PROMPT
        },

        {
            role: "system",
            content: `
PERSONAL DATABASE

${databaseContext}

IMPORTANT:
- Abdul Wahab Badar is the USER.
- Wahab is the user's preferred name.
- WahabGPT is the AI.
- Abdul Wahab Badar is the creator of WahabGPT.
- NEVER say Abdul Wahab Badar is the AI.
- NEVER confuse the user with the AI.
- NEVER invent personal information.
- If personal information is not in the database, say it is not available.
`
        },

        ...conversationHistory
    ];

    let response;

    try {

        response = await fetch(
            OLLAMA_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    model: OLLAMA_MODEL,

                    messages: apiMessages,

                    stream: false,

                    options: {
                        temperature: 0.2
                    }
                })
            }
        );

    } catch (error) {

        throw new Error(
            "Ollama se connection nahi ho raha. Check karo ke Ollama running hai."
        );
    }

    if (!response.ok) {

        let serverError = "";

        try {
            serverError = await response.text();
        } catch (e) {
            serverError = "";
        }

        throw new Error(
            `Ollama API Error ${response.status} ${serverError}`
        );
    }

    let data;

    try {

        data = await response.json();

    } catch (error) {

        throw new Error(
            "Ollama ne valid JSON response nahi diya."
        );
    }

    const aiText =
        data &&
        data.message &&
        data.message.content
            ? data.message.content
            : "";

    if (!aiText.trim()) {

        throw new Error(
            "Ollama ne empty response diya."
        );
    }

    conversationHistory.push({
        role: "assistant",
        content: aiText
    });

    return aiText.trim();
}
/* =========================================================
   ADD MESSAGE
   ========================================================= */

function addMessage(type, content) {

    if (!messages) {
        console.error("messages element nahi mila.");
        return null;
    }

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const avatar = document.createElement("div");

    avatar.className = "avatar";

    if (type === "user") {

        avatar.innerHTML = `
            <i class="fa-solid fa-user"></i>
        `;

    } else {

        avatar.innerHTML = `
            <i class="fa-solid fa-robot"></i>
        `;
    }

    const messageContent =
        document.createElement("div");

    messageContent.className =
        "message-content";

    messageContent.innerHTML = content;

    message.appendChild(avatar);

    message.appendChild(messageContent);

    messages.appendChild(message);

    scrollToBottom();

    return message;
}


/* =========================================================
   REAL TYPING EFFECT
   ========================================================= */

async function typeAIMessage(text) {

    if (!messages) {
        return;
    }

    const message = document.createElement("div");

    message.className = "message ai";

    const avatar = document.createElement("div");

    avatar.className = "avatar";

    avatar.innerHTML = `
        <i class="fa-solid fa-robot"></i>
    `;

    const messageContent =
        document.createElement("div");

    messageContent.className =
        "message-content";

    message.appendChild(avatar);

    message.appendChild(messageContent);

    messages.appendChild(message);

    scrollToBottom();

    /*
       Character-by-character typing.
    */

    let currentText = "";

    for (let i = 0; i < text.length; i++) {

        currentText += text[i];

        messageContent.innerHTML =
            formatAIResponse(currentText);

        scrollToBottom();

        let delay = 8;

        if (text[i] === "\n") {
            delay = 30;
        }

        await sleep(delay);
    }
}


/* =========================================================
   SLEEP
   ========================================================= */

function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}


/* =========================================================
   FORMAT AI RESPONSE
   ========================================================= */

function formatAIResponse(text) {

    if (!text) {
        return "";
    }

    let formatted = escapeHTML(text);


    /*
       Code blocks
    */

    formatted = formatted.replace(
        /```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g,

        function(match, language, code) {

            const cleanCode =
                code.trim();

            const languageName =
                language || "code";

            return `
                <div class="code-block">

                    <div class="code-header">
                        <span>${languageName}</span>

                        <button
                            class="copy-code"
                            onclick="copyCode(this)"
                        >
                            Copy
                        </button>
                    </div>

                    <pre>${cleanCode}</pre>

                </div>
            `;
        }
    );


    /*
       Bold
    */

    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    /*
       Inline code
    */

    formatted = formatted.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
    );


    /*
       Protect code blocks from BR replacement.
    */

    const parts =
        formatted.split(
            /(<div class="code-block">[\s\S]*?<\/div>)/g
        );


    formatted =
        parts.map(function(part) {

            if (
                part.includes(
                    '<div class="code-block">'
                )
            ) {
                return part;
            }

            return part.replace(
                /\n/g,
                "<br>"
            );

        }).join("");


    return formatted;
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================================
   TYPING INDICATOR
   ========================================================= */

function showTyping() {

    removeTyping();

    if (!messages) {
        return;
    }

    const typing =
        document.createElement("div");

    typing.className =
        "message ai typing-message";

    typing.id =
        "typingIndicator";

    typing.innerHTML = `
        <div class="avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">

            <span class="typing-dots">
                <span>●</span>
                <span>●</span>
                <span>●</span>
            </span>

        </div>
    `;

    messages.appendChild(typing);

    scrollToBottom();
}


/* =========================================================
   REMOVE TYPING
   ========================================================= */

function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );

    if (typing) {
        typing.remove();
    }
}


/* =========================================================
   COPY CODE
   ========================================================= */

async function copyCode(button) {

    try {

        const codeBlock =
            button.closest(".code-block");

        if (!codeBlock) {
            return;
        }

        const pre =
            codeBlock.querySelector("pre");

        if (!pre) {
            return;
        }

        const code =
            pre.innerText;

        await navigator.clipboard.writeText(code);

        const oldText =
            button.innerText;

        button.innerText =
            "Copied!";

        setTimeout(
            function() {

                button.innerText =
                    oldText;

            },
            1500
        );

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

        button.innerText =
            "Failed";

        setTimeout(
            function() {

                button.innerText =
                    "Copy";

            },
            1500
        );
    }
}


/* =========================================================
   TEXTAREA AUTO RESIZE
   ========================================================= */

function autoResize() {

    if (!messageInput) {
        return;
    }

    messageInput.style.height =
        "auto";

    messageInput.style.height =
        Math.min(
            messageInput.scrollHeight,
            150
        ) + "px";
}


/* =========================================================
   SEND BUTTON STATE
   ========================================================= */

function setSendButtonState(isLoading) {

    if (!sendButton) {
        return;
    }

    sendButton.disabled =
        isLoading;

    if (isLoading) {

        sendButton.style.opacity =
            "0.6";

        sendButton.style.cursor =
            "wait";

    } else {

        sendButton.style.opacity =
            "";

        sendButton.style.cursor =
            "";
    }
}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollToBottom() {

    const chatArea =
        document.querySelector(".chat-area");

    if (!chatArea) {
        return;
    }

    requestAnimationFrame(
        function() {

            chatArea.scrollTop =
                chatArea.scrollHeight;

        }
    );
}


/* =========================================================
   ENTER KEY
   ========================================================= */

if (messageInput) {

    messageInput.addEventListener(
        "input",
        autoResize
    );


    messageInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();
            }
        }
    );
}


/* =========================================================
   SEND BUTTON
   ========================================================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        function() {

            sendMessage();

        }
    );
}


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

document
    .querySelectorAll("[data-prompt]")
    .forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const prompt =
                        button.getAttribute(
                            "data-prompt"
                        );

                    if (!prompt) {
                        return;
                    }

                    sendMessage(prompt);

                }
            );

        }
    );


/* =========================================================
   NEW CHAT
   ========================================================= */

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        function() {

            conversationHistory = [];

            if (messages) {
                messages.innerHTML = "";
            }

            if (welcome) {
                welcome.style.display = "";
            }

            if (messageInput) {

                messageInput.value = "";

                autoResize();

                messageInput.focus();
            }

            removeTyping();

        }
    );
}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

if (mobileMenu && sidebar) {

    mobileMenu.addEventListener(
        "click",
        function() {

            sidebar.classList.toggle(
                "open"
            );

        }
    );
}


/* =========================================================
   CLOSE MOBILE SIDEBAR
   ========================================================= */

if (sidebar) {

    sidebar
        .querySelectorAll(
            ".menu-item, .recent-chat"
        )
        .forEach(
            function(item) {

                item.addEventListener(
                    "click",
                    function() {

                        if (
                            window.innerWidth <= 900
                        ) {

                            sidebar.classList.remove(
                                "open"
                            );
                        }

                    }
                );

            }
        );
}


/* =========================================================
   STARTUP
   ========================================================= */
document.addEventListener(
    "DOMContentLoaded",
    async function() {

        console.log(
            "🤖 WahabGPT started"
        );

        console.log(
            "Model:",
            OLLAMA_MODEL
        );

        console.log(
            "Ollama URL:",
            OLLAMA_URL
        );

        await loadDatabase();

        if (messageInput) {

            messageInput.focus();

            autoResize();
        }

    }
);
