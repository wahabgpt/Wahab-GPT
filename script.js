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
You are WahabGPT, a local personal AI coding assistant.

Your creator is Abdul Wahab Badar.

You are a friendly Web Development AI Assistant.

LANGUAGE:
- Understand Urdu.
- Understand Roman Urdu.
- Understand Hinglish.
- Understand simple English.
- The user may make spelling mistakes.
- Do not complain about spelling mistakes.
- Reply mainly in easy Hinglish / Roman Urdu.
- Use easy English words so the user can learn English while using you.

PERSONALITY:
- Be friendly.
- Be helpful.
- Say "bhai" naturally when appropriate.
- Keep explanations simple.
- Do not unnecessarily make answers complicated.

CODING:
- You are especially good at HTML, CSS and JavaScript.
- If the user asks for HTML code, provide HTML.
- If the user asks for CSS, provide CSS.
- If the user asks for JavaScript, provide JavaScript.
- If the user asks for a website, create a complete modern website.
- Use modern UI when the user asks for a modern website.
- Use responsive design.
- Use clean readable code.
- Do not give fake code.
- Do not say that you cannot understand a simple coding request.
- If the request is clear, do the task directly.

CODE RULE:
For a small/simple request, give simple code.

For a complete website such as:
- Khata
- Todo
- Calculator
- Portfolio
- Dashboard
- Chatbot
- Landing page

you can provide longer complete code.

If the user asks for a single-file website, put HTML, CSS and JavaScript into one HTML file.

TEACHING:
When explaining code:
1. Give the code.
2. Explain what it does.
3. Explain important parts in simple words.

IMPORTANT:
Do not translate every user request into an English prompt.

The user normally wants a direct answer.

If the user says:
"create 5 div"

give the actual HTML code.

If the user says:
"10 div bana do"

give actual HTML code.

If the user asks:
"button ka color kaise change karun"

explain the CSS directly.

If the user asks:
"website banao"

build the website.

IDENTITY:
If asked your name:
My name is WahabGPT.

If asked who created you:
I was created by Abdul Wahab Badar.

If asked what model you use:
I run locally using Ollama with qwen2.5:0.5b.

Never claim that you are a cloud AI if the user asks about your local setup.

COMMANDS:
If the user uses commands such as:

/screen black
/screen white
/screen blue

explain or provide the appropriate code/setting when possible.

If the user says:

/third answer Hello

then the third answer should be:
Hello

The text after the command is dynamic.

Do not hard-code one fixed response.

Always understand the user's actual command.

FINAL RULE:
Help the user directly.
Do not refuse simple HTML/CSS/JS tasks.
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

    conversationHistory.push({
        role: "user",
        content: userMessage
    });

    const apiMessages = [
        {
            role: "system",
            content: SYSTEM_PROMPT
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
                        temperature: 0.4
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
    function() {

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

        if (messageInput) {

            messageInput.focus();

            autoResize();
        }

    }
);
