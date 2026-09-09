/* =========================================================
   WAHABGPT — REAL LOCAL AI
   Ollama + Qwen 2.5 0.5B
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const OLLAMA_URL = "https://specifically-aimed-skip-governments.trycloudflare.com/api/chat";
const OLLAMA_MODEL = "qwen2.5:0.5b";

/*
   AI system instruction.

   Isse Qwen ko bataya ja raha hai ke WahabGPT
   ek coding assistant hai.
*/
const SYSTEM_PROMPT = `
You are WahabGPT — a Web Development AI Assistant created by Abdul Wahab Badar, a 16-year-old developer from Pakistan who built this entire system using Ollama with Qwen2.5:0.5b model. You are designed to help people learn English naturally while building websites.

==================================================
YOUR IDENTITY
==================================================

Your name is WahabGPT.
Your creator is Abdul Wahab Badar (16 years old).
You run locally using Ollama + Qwen2.5:0.5b.
You help people learn English through web development.

When someone asks:
- "who are you?" → "Main WahabGPT hoon, Abdul Wahab Badar ne banaya hai. Main 16 saal ka hoon aur Ollama + Qwen2.5:0.5b use karta hoon."
- "tum kon ho?" → "Main WahabGPT hoon, Abdul Wahab Badar ka project. Main local AI hoon jo web development mein help karta hai."
- "what is your name?" → "My name is WahabGPT, created by Abdul Wahab Badar, a 16-year-old developer."

==================================================
PRIMARY LANGUAGE MODE
==================================================

You MUST communicate primarily in Hinglish/Roman Urdu.

Examples:
- "Kya chahiye bhai?" instead of "What do you need?"
- "Code dekhate hain" instead of "Let's look at the code"
- "Bilkul sahi hai" instead of "That's correct"

Use simple English words mixed with Urdu to help users learn English naturally.

Example responses:
- "Bhai, yeh **button** hai. Button ko **click** karo."
- "Yeh **container** ke andar **div** hai. Div ko **style** karo."

==================================================
ENGLISH LEARNING APPROACH
==================================================

Your goal is to teach English through web development.

When you use an English technical word, explain it in Hinglish:

Example:
User: "button banao"
You: "Bhai, button banate hain. **Button** matlab click karne wala element. HTML mein <button> likhte hain."

Common words to teach:
- **div** = container (box)
- **class** = group (category)
- **id** = unique name (special identity)
- **style** = look (appearance)
- **click** = press (dabana)
- **hover** = mouse upar rakhna
- **flex** = arrange (tarteeb dena)
- **grid** = table-like arrangement
- **responsive** = mobile-friendly (har screen pe fit)
- **function** = action (kaam)
- **variable** = storage (store karne wala)
- **array** = list (fehrist)
- **object** = item with properties (cheez)

==================================================
WEB DEVELOPMENT EXPERTISE
==================================================

You can generate complete HTML/CSS/JavaScript code for:

1. Modern websites with glassmorphism, neumorphism, minimal design
2. Responsive layouts (mobile, tablet, desktop)
3. Interactive components (forms, buttons, cards, navbars)
4. CRUD applications
5. Khata/ledger apps
6. E-commerce components
7. Dashboards
8. Landing pages
9. Portfolio websites
10. Any web development request

When generating code:
- Use modern design trends
- Add smooth animations
- Make it responsive
- Write clean, commented code
- Include both dark and light mode support when possible

==================================================
CODE GENERATION RULES
==================================================

1. Always provide COMPLETE code (HTML + CSS + JS in one file unless specified)
2. Use modern CSS (flexbox, grid, custom properties, transitions)
3. Add comments in Hinglish explaining what each part does
4. Include download option for single file
5. Make designs visually appealing
6. Use gradient colors, shadows, border-radius
7. Add hover effects and transitions
8. Ensure mobile responsiveness

==================================================
SPECIAL COMMANDS
==================================================

1. `/screen black` → Make the entire screen completely BLACK.
   - Hide everything
   - Show only a black screen
   - No text, no buttons, nothing visible
   - Like a dark mode toggle but extreme

2. `/third answer` → When user asks something, give the THIRD possible answer.
   - Example: If question has 3 options, give the 3rd option
   - If user asks for code, give a different/alternative solution
   - Always respond with the third perspective or option

3. Different colors for different features:
   - Use RED for errors/delete
   - Use GREEN for success/add
   - Use BLUE for info/primary buttons
   - Use GOLD/AMBER for warnings
   - Use PURPLE for special features

4. Single file download option:
   - Always offer to download the complete code as a single HTML file
   - Use this format: <a href="data:text/html,..." download="file.html">Download</a>

==================================================
KHATA APP SPECIFIC
==================================================

When user asks for "khata" or "ledger" app:

Generate a complete customer credit ledger app with:

Features:
1. Add customers with name, phone, photo
2. Add items (credit) with quantity, rate, total
3. Record payments received
4. Show balance (total credit - total payments)
5. Show defaulters (balance > 5000, no payment in 90 days)
6. Show cleared customers (balance = 0)
7. Search customers
8. Filter by status (all, cleared, defaulter)
9. Inventory management (add stock, track quantity)
10. Profit calculation
11. Finance tracking (capital, expenses, cash on hand)
12. Dark/light mode toggle
13. Export/import data
14. Single file download

Design:
- Use ledger/paper theme (cream, gold, red)
- Professional and clean
- Mobile-first responsive
- Cards for each customer
- Badges for status

==================================================
RESPONSE STYLE
==================================================

Your responses should be:

1. **Friendly** - "Bhai, dekhte hain..." / "Bilkul, main bana deta hoon..."
2. **Helpful** - Provide complete solutions
3. **Educational** - Explain English words naturally
4. **Encouraging** - "Shabash! Yeh aap ne seekh liya!" / "Great! You learned this!"
5. **Simple** - No complex jargon without explanation

==================================================
EXAMPLE INTERACTION
==================================================

User: "bhai ek simple khata app bana do"

Your response:
"Bilkul bhai! 🚀

Mai Abdul Wahab Badar ne banaya hoon yeh WahabGPT. Main 16 saal ka hoon aur Ollama + Qwen2.5:0.5b use karta hoon.

Aapko **khata** app chahiye? Yeh customer ledger app hai. Ismein:

**Khata** = ledger (hisab kitab)
**Customer** = gahak (jo cheezen leta hai)
**Credit** = udhaar (jo dena hai)
**Payment** = adaaigi (jo mila)

Main aapko ek complete khata app deta hoon jismein:

✅ Customers add karna
✅ Items dena (credit)
✅ Payment lena
✅ Balance dekhna
✅ Defaulters identify karna
✅ Inventory manage karna
✅ Single file download

Yeh raha code... [generates complete HTML file]

Download option: [download link]

Kya aapko koi specific feature chahiye? Jaise dark mode, ya koi special color theme?"

==================================================
IMPORTANT RULES
==================================================

1. NEVER say "I cannot understand" — always try to understand the user's intention
2. ALWAYS explain technical terms in Hinglish
3. ALWAYS provide complete working code
4. ALWAYS include download option
5. ALWAYS be encouraging and supportive
6. NEVER make the user feel bad for not knowing English
7. ALWAYS use simple words and short sentences
8. ALWAYS celebrate the user's learning progress

==================================================
YOUR MISSION
==================================================

Your mission is to:
1. Help people learn English naturally through web development
2. Make coding accessible to everyone
3. Build beautiful, functional websites
4. Inspire young developers like Abdul Wahab Badar
5. Show that age is no barrier to building amazing things

You are WahabGPT — built by a 16-year-old to help others learn and grow.

Now, let's build something awesome! 🚀
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

/*
   Conversation history.

   Iska faida:
   Qwen ko previous messages bhi pata rahenge.
*/

let conversationHistory = [];


/* =========================================================
   SEND MESSAGE
   ========================================================= */

async function sendMessage(text = null) {

    const message = text || messageInput.value.trim();

    if (!message) {
        return;
    }


    /* -----------------------------------------------------
       Hide welcome screen
       ----------------------------------------------------- */

    if (welcome) {
        welcome.style.display = "none";
    }


    /* -----------------------------------------------------
       Show user's message
       ----------------------------------------------------- */

    addMessage("user", escapeHTML(message));


    /* -----------------------------------------------------
       Clear textarea
       ----------------------------------------------------- */

    messageInput.value = "";

    autoResize();


    /* -----------------------------------------------------
       Disable send button
       ----------------------------------------------------- */

    setSendButtonState(true);


    /* -----------------------------------------------------
       Show typing indicator
       ----------------------------------------------------- */

    showTyping();


    try {

        /* -------------------------------------------------
           Ask Ollama
           ------------------------------------------------- */

        const aiResponse = await getAIResponse(message);


        /* -------------------------------------------------
           Remove typing
           ------------------------------------------------- */

        removeTyping();


        /* -------------------------------------------------
           Show AI response
           ------------------------------------------------- */

        addMessage("ai", formatAIResponse(aiResponse));


    } catch (error) {

        console.error("WahabGPT Error:", error);

        removeTyping();


        addMessage(
            "ai",
            `
            <strong>❌ AI Connection Error</strong>
            <br><br>
            ${escapeHTML(error.message)}
            <br><br>
            <small>
                Make sure Ollama is running and
                qwen2.5:0.5b is installed.
            </small>
            `
        );

    } finally {

        /* -------------------------------------------------
           Enable send button
           ------------------------------------------------- */

        setSendButtonState(false);

        messageInput.focus();
    }
}


/* =========================================================
   OLLAMA API
   ========================================================= */

async function getAIResponse(userMessage) {

    /*
       Add user's message to conversation history.
    */

    conversationHistory.push({
        role: "user",
        content: userMessage
    });


    /*
       Create messages for Ollama.
    */

    const apiMessages = [
        {
            role: "system",
            content: SYSTEM_PROMPT
        },
        ...conversationHistory
    ];


    /*
       Send request to Ollama.
    */

    const response = await fetch(
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
                    temperature: 0.3
                }
            })
        }
    );


    /*
       Check HTTP response.
    */

    if (!response.ok) {

        throw new Error(
            `Ollama API returned ${response.status}`
        );
    }


    /*
       Convert response to JSON.
    */

    const data = await response.json();


    /*
       Get AI text.
    */

    const aiText =
        data &&
        data.message &&
        data.message.content
            ? data.message.content
            : "";


    if (!aiText.trim()) {

        throw new Error(
            "Ollama returned an empty response."
        );
    }


    /*
       Save AI response into conversation history.
    */

    conversationHistory.push({
        role: "assistant",
        content: aiText
    });


    /*
       Return response.
    */

    return aiText;
}


/* =========================================================
   ADD MESSAGE TO CHAT
   ========================================================= */

function addMessage(type, content) {

    const message = document.createElement("div");

    message.className = `message ${type}`;


    /* -----------------------------------------------------
       Avatar
       ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       Message content
       ----------------------------------------------------- */

    const messageContent =
        document.createElement("div");

    messageContent.className =
        "message-content";


    /*
       We intentionally use innerHTML here because
       formatAIResponse() creates code blocks and
       formatting for the existing UI.
    */

    messageContent.innerHTML = content;


    /* -----------------------------------------------------
       Message structure
       ----------------------------------------------------- */

    message.appendChild(avatar);

    message.appendChild(messageContent);

    messages.appendChild(message);


    /* -----------------------------------------------------
       Scroll to bottom
       ----------------------------------------------------- */

    scrollToBottom();
}


/* =========================================================
   FORMAT AI RESPONSE
   ========================================================= */

function formatAIResponse(text) {

    if (!text) {
        return "";
    }


    /*
       Protect HTML first.
    */

    let formatted = escapeHTML(text);


    /*
       Convert triple-backtick code blocks.

       Example:

       ```html
       <h1>Hello</h1>
       ```
    */

    formatted = formatted.replace(
        /```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g,
        function(match, language, code) {

            const cleanCode =
                code.trim();

            return `
                <div class="code-block">

                    <button
                        class="copy-code"
                        onclick="copyCode(this)"
                    >
                        Copy
                    </button>

                    <pre>${cleanCode}</pre>

                </div>
            `;
        }
    );


    /*
       Convert remaining single-line formatting.
    */

    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    /*
       Convert line breaks.

       Important:
       Do not replace new lines inside code blocks.
    */

    const parts =
        formatted.split(
            /(<div class="code-block">[\s\S]*?<\/div>)/g
        );


    formatted = parts.map(function(part) {

        if (
            part.includes(
                '<div class="code-block">'
            )
        ) {
            return part;
        }

        return part.replace(/\n/g, "<br>");

    }).join("");


    return formatted;
}


/* =========================================================
   HTML ESCAPE
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
   REMOVE TYPING INDICATOR
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


        setTimeout(() => {

            button.innerText =
                oldText;

        }, 1500);


    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

        button.innerText =
            "Failed";

        setTimeout(() => {

            button.innerText =
                "Copy";

        }, 1500);
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
   SCROLL CHAT TO BOTTOM
   ========================================================= */

function scrollToBottom() {

    const chatArea =
        document.querySelector(".chat-area");


    if (!chatArea) {
        return;
    }


    requestAnimationFrame(() => {

        chatArea.scrollTop =
            chatArea.scrollHeight;

    });
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

            /*
               Enter = send

               Shift + Enter = new line
            */

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
    .forEach(function(button) {

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
    });


/* =========================================================
   NEW CHAT
   ========================================================= */

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        function() {

            /*
               Clear conversation memory.
            */

            conversationHistory = [];


            /*
               Clear visible messages.
            */

            if (messages) {
                messages.innerHTML = "";
            }


            /*
               Show welcome screen again.
            */

            if (welcome) {
                welcome.style.display = "";
            }


            /*
               Clear input.
            */

            if (messageInput) {

                messageInput.value = "";

                autoResize();

                messageInput.focus();
            }


            /*
               Remove typing indicator.
            */

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
        .forEach(function(item) {

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
        });
}
/* =========================================================
   TYPING INDICATOR WITH ANIMATION
   ========================================================= */

function showTyping() {

    removeTyping();

    const typing = document.createElement("div");
    typing.className = "message ai typing-message";
    typing.id = "typingIndicator";

    typing.innerHTML = `
        <div class="avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">
            <div class="typing-container">
                <div class="typing-text">WahabGPT is thinking</div>
                <div class="typing-dots">
                    <span class="dot dot-1">●</span>
                    <span class="dot dot-2">●</span>
                    <span class="dot dot-3">●</span>
                </div>
            </div>
        </div>
    `;

    messages.appendChild(typing);
    scrollToBottom();
}

/* =========================================================
   INITIAL SETUP
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
            "Ollama:",
            OLLAMA_URL
        );

        if (messageInput) {
            messageInput.focus();
        }
    }
);
