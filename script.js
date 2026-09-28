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
You are WahabGPT, a personal AI assistant.

IDENTITY
- AI name: WahabGPT
- User name: Abdul Wahab Badar
- User preferred name: Wahab
- Creator of WahabGPT: Abdul Wahab Badar
- You are powered by Ollama.
- Model: qwen2.5:0.5b

DATABASE REASONING
A PERSONAL DATABASE is provided to you with every request.

You must READ and UNDERSTAND the database before answering questions
about the user.

The database is the source of truth.

When the user asks something about themselves:
1. Find the relevant information in the database.
2. Understand what the information means.
3. Use the relevant fields to form the answer.
4. Answer naturally.
5. Do not mention internal database paths unless useful.
6. Do not invent information.
7. Do not guess missing information.
8. Do not confuse the user with the AI.
9. Do not confuse Abdul Wahab Badar with WahabGPT.

IMPORTANT IDENTITY RULES
- Abdul Wahab Badar = the user and creator.
- Wahab = user's preferred name.
- WahabGPT = the AI.
- Never say the user's name is WahabGPT.
- Never say Abdul Wahab Badar is the AI.
- If information is not present in the database, say you do not have that information.

REASONING EXAMPLES

If the database says:
user.name = Abdul Wahab Badar
then:
"What is my name?"
means the user's name, so answer Abdul Wahab Badar.

If the database says:
user.preferred_name = Wahab
then:
"What should you call me?"
means the preferred name, so answer Wahab.

If the database says:
identity.ai_name = WahabGPT
then:
"What is my AI's name?"
means the AI name, so answer WahabGPT.

If the database says:
identity.creator = Abdul Wahab Badar
then:
"Who created WahabGPT?"
means the creator, so answer Abdul Wahab Badar.

If the database contains projects.major,
and the user asks about their projects,
use the projects stored there.

If the database contains education,
and the user asks about education,
use the education information stored there.

If the database contains skills,
interests, learning_goals, coding_preferences or future_goals,
use those fields when relevant.

LANGUAGE
- Understand English.
- Understand Urdu.
- Understand Roman Urdu.
- Understand Hinglish.
- Understand informal spelling.
- Respond naturally in the user's language.
- If the user writes Roman Urdu, prefer Roman Urdu.
- If the user writes English, prefer English.

CODING
- Help with HTML, CSS and JavaScript.
- Understand beginner coding requests.
- Give working code.
- Preserve existing project structure.
- Do not remove existing functionality unless requested.
- If the user asks for a complete file, provide the complete file.

RESPONSE STYLE
- Simple.
- Direct.
- Friendly.
- Do not make unnecessary long explanations.
- Do not invent personal information.
`;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const messages =
    document.getElementById("messages");

const welcome =
    document.getElementById("welcome");

const newChatBtn =
    document.getElementById("newChatBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.querySelector(".sidebar");


/* =========================================================
   CHAT MEMORY
   ========================================================= */

let conversationHistory = [];

let DATABASE = null;

let databasePromise = null;


/* =========================================================
   LOAD DATABASE
   ========================================================= */

async function loadDatabase() {

    if (databasePromise) {
        return databasePromise;
    }

    databasePromise = fetch("./database.json", {
        cache: "no-store"
    })
    .then(async response => {

        if (!response.ok) {

            throw new Error(
                `Database load failed: HTTP ${response.status}`
            );
        }

        const text =
            await response.text();

        try {

            DATABASE =
                JSON.parse(text);

        } catch (error) {

            throw new Error(
                "Database JSON invalid hai."
            );
        }

        console.log(
            "✅ DATABASE LOADED"
        );

        console.log(
            "📚 DATABASE:",
            DATABASE
        );

        return DATABASE;

    })
    .catch(error => {

        console.error(
            "❌ DATABASE ERROR:",
            error
        );

        DATABASE = {};

        return DATABASE;
    });

    return databasePromise;
}


/* =========================================================
   CREATE DATABASE CONTEXT
   ========================================================= */

function createDatabaseContext(database) {

    if (!database || typeof database !== "object") {
        return "{}";
    }

    return JSON.stringify(
        database,
        null,
        2
    );
}


/* =========================================================
   SEND MESSAGE
   ========================================================= */

async function sendMessage(text = null) {

    if (!messageInput && !text) {
        return;
    }

    const message =
        text !== null
            ? String(text).trim()
            : messageInput.value.trim();

    if (!message) {
        return;
    }

    if (welcome) {
        welcome.style.display = "none";
    }

    addMessage(
        "user",
        escapeHTML(message)
    );

    if (messageInput) {

        messageInput.value = "";

        autoResize();
    }

    setSendButtonState(true);

    showTyping();

    try {

        const aiResponse =
            await getAIResponse(message);

        removeTyping();

        await typeAIMessage(
            aiResponse
        );

    } catch (error) {

        console.error(
            "WahabGPT Error:",
            error
        );

        removeTyping();

        const errorMessage =
            error.message ||
            "Unknown error";

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

    const database =
        await loadDatabase();

    const databaseContext =
        createDatabaseContext(database);


    /*
       Save user message
    */

    conversationHistory.push({

        role: "user",

        content: userMessage

    });


    /*
       Give database to AI
    */

    const databaseMessage = `
PERSONAL DATABASE
=================

${databaseContext}

=================

DATABASE REASONING INSTRUCTION

Read the database above carefully.

The database contains information about the user,
the AI, projects, education, skills, interests,
learning goals and other personal information.

When answering a personal question:

- Find the relevant information.
- Understand its meaning.
- Connect related fields when necessary.
- Answer using the database.
- Never invent information.
- Never guess missing information.

IDENTITY:

User:
Abdul Wahab Badar

Preferred name:
Wahab

AI:
WahabGPT

Creator:
Abdul Wahab Badar

Remember:

Abdul Wahab Badar is the USER.
WahabGPT is the AI.

Never confuse them.
`;


    /*
       API messages
    */

    const apiMessages = [

        {
            role: "system",
            content: SYSTEM_PROMPT
        },

        {
            role: "system",
            content: databaseMessage
        },

        ...conversationHistory

    ];


    /*
       Send to Ollama
    */

    let response;

    try {

        response =
            await fetch(
                OLLAMA_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        model:
                            OLLAMA_MODEL,

                        messages:
                            apiMessages,

                        stream: false,

                        options: {

                            temperature: 0.15,

                            top_p: 0.8

                        }

                    })
                }
            );

    } catch (error) {

        throw new Error(
            "Ollama se connection nahi ho raha. Check karo ke Ollama running hai."
        );
    }


    /*
       API error
    */

    if (!response.ok) {

        let serverError = "";

        try {

            serverError =
                await response.text();

        } catch (error) {

            serverError = "";
        }

        throw new Error(
            `Ollama API Error ${response.status} ${serverError}`
        );
    }


    /*
       Read JSON
    */

    let data;

    try {

        data =
            await response.json();

    } catch (error) {

        throw new Error(
            "Ollama ne valid JSON response nahi diya."
        );
    }


    /*
       Get AI text
    */

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


    /*
       Save AI response
    */

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

        console.error(
            "messages element nahi mila."
        );

        return null;
    }

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;


    const avatar =
        document.createElement("div");

    avatar.className =
        "avatar";


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

    messageContent.innerHTML =
        content;


    message.appendChild(
        avatar
    );

    message.appendChild(
        messageContent
    );

    messages.appendChild(
        message
    );

    scrollToBottom();

    return message;
}


/* =========================================================
   AI TYPING EFFECT
   ========================================================= */

async function typeAIMessage(text) {

    if (!messages) {
        return;
    }

    const message =
        document.createElement("div");

    message.className =
        "message ai";


    const avatar =
        document.createElement("div");

    avatar.className =
        "avatar";

    avatar.innerHTML = `
        <i class="fa-solid fa-robot"></i>
    `;


    const messageContent =
        document.createElement("div");

    messageContent.className =
        "message-content";


    message.appendChild(
        avatar
    );

    message.appendChild(
        messageContent
    );

    messages.appendChild(
        message
    );

    scrollToBottom();


    let currentText = "";


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        currentText +=
            text[i];

        messageContent.innerHTML =
            formatAIResponse(
                currentText
            );

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
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );
}


/* =========================================================
   FORMAT AI RESPONSE
   ========================================================= */

function formatAIResponse(text) {

    if (!text) {
        return "";
    }

    let formatted =
        escapeHTML(text);


    formatted =
        formatted.replace(
            /```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g,

            function(
                match,
                language,
                code
            ) {

                const cleanCode =
                    code.trim();

                const languageName =
                    language || "code";

                return `
                    <div class="code-block">

                        <div class="code-header">

                            <span>
                                ${languageName}
                            </span>

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


    formatted =
        formatted.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    formatted =
        formatted.replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        );


    const parts =
        formatted.split(
            /(<div class="code-block">[\s\S]*?<\/div>)/g
        );


    formatted =
        parts
            .map(function(part) {

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

            })
            .join("");


    return formatted;
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

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


    messages.appendChild(
        typing
    );

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
            button.closest(
                ".code-block"
            );

        if (!codeBlock) {
            return;
        }


        const pre =
            codeBlock.querySelector(
                "pre"
            );

        if (!pre) {
            return;
        }


        const code =
            pre.innerText;


        await navigator.clipboard.writeText(
            code
        );


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

function setSendButtonState(
    isLoading
) {

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
        document.querySelector(
            ".chat-area"
        );

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
    .querySelectorAll(
        "[data-prompt]"
    )
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

                    sendMessage(
                        prompt
                    );

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

            conversationHistory =
                [];

            if (messages) {
                messages.innerHTML =
                    "";
            }

            if (welcome) {
                welcome.style.display =
                    "";
            }

            if (messageInput) {

                messageInput.value =
                    "";

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

if (
    mobileMenu &&
    sidebar
) {

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
