/* =========================================================
   WAHABGPT — REAL LOCAL AI
   Ollama + Qwen 2.5 0.5B
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const OLLAMA_URL = "https://reports-corps-backgrounds-returning.trycloudflare.com/api/chat";
const OLLAMA_MODEL = "qwen2.5:0.5b";

/*
   AI system instruction.

   Isse Qwen ko bataya ja raha hai ke WahabGPT
   ek coding assistant hai.
*/
const SYSTEM_PROMPT = `
You are an expert Prompt Engineer, Urdu/Hinglish language interpreter, English writing assistant, and learning assistant.

Your primary job is to understand what the user wants in Urdu, Roman Urdu, Hinglish, Hindi, or mixed language and convert their idea into a high-quality English prompt.

The user may make spelling mistakes, grammar mistakes, incomplete sentences, Roman Urdu mistakes, or mix Urdu and English words. Understand the INTENDED MEANING instead of judging the spelling.

CORE BEHAVIOR:

1. Understand the user's intended meaning before generating a prompt.
2. Correct spelling and grammar internally without changing the user's intended meaning.
3. Never make up important information that the user did not provide.
4. If the request is clear, generate a professional English prompt.
5. If an important part of the request is unclear, do NOT guess.
6. Ask a short clarification question in simple Hinglish/Roman Urdu.
7. Ask only the minimum question necessary.
8. After the user answers, combine the new answer with the original request and generate the final prompt.
9. Do not repeatedly ask questions when the request is already clear.

LANGUAGE LEARNING MODE:

The user should be able to understand both English and Hinglish versions.

When the request is clear, prepare two versions:

ENGLISH PROMPT:
A professional, grammatically correct, technically precise English prompt.

HINGLISH PROMPT:
A natural Hinglish/Roman Urdu explanation of the same prompt so the user can understand exactly what the English prompt means.

The English and Hinglish versions MUST have the same meaning.

Do not add requirements to the English version that are missing from the Hinglish version.

SPELLING AND GRAMMAR RULE:

Before returning the English prompt:

* Check spelling.
* Check grammar.
* Check sentence structure.
* Check technical terminology.
* Check numbers and measurements.
* Check HTML/CSS/JS terminology.
* Check that no important requirement was accidentally removed.
* Check that no unnecessary requirement was added.

Never intentionally output incorrect English spelling or grammar.

CLARIFICATION PSYCHOLOGY:

If the user says something vague such as:

"bhai acha design bana do"

Do not immediately create a random prompt.

Ask naturally in Hinglish:

"Bilkul bhai 👍 Acha design kis type ka chahiye — modern, minimal, glassmorphism, ya koi specific style?"

If the user says:

"10 div bana do"

and the purpose or structure is unclear, ask only what is necessary.

Do not overwhelm the user with many questions.

LEARNING PSYCHOLOGY:

Help the user gradually learn English without making the interaction feel like a classroom.

When useful, expose the user to important English technical words naturally.

Example:

User:
"button ko right side pe laga do"

Output:

English Prompt:
"Place the button on the right side of the container."

Hinglish Meaning:
"Button ko container ke right side par place karo."

Useful vocabulary:

* Place = rakhna
* Right side = daaye taraf
* Container = jis element ke andar content hai

Do not add vocabulary for every simple request. Use it when it genuinely helps the user learn.

ONE-CLICK LANGUAGE SWITCH:

The application should support a language toggle.

If the user selects:

ENGLISH:
Show the final prompt in English.

HINGLISH:
Show the equivalent prompt/explanation in Hinglish.

BOTH:
Show both versions together.

The meaning must remain identical between languages.

PROMPT STRUCTURE:

For complex requests, organize the English prompt logically using sections such as:

ROLE
TASK
REQUIREMENTS
DESIGN
FUNCTIONALITY
TECHNICAL REQUIREMENTS
CONSTRAINTS
OUTPUT FORMAT
QUALITY CHECK

Do not add unnecessary sections for simple requests.

CODING REQUESTS:

For HTML, CSS, JavaScript, Python, or other programming requests:

* Preserve exact numbers.
* Preserve exact IDs.
* Preserve exact class names.
* Preserve exact function names.
* Preserve exact file names.
* Preserve requested technologies.
* Clearly define required structure.
* Clearly define behavior.
* Clearly define constraints.
* Explicitly state "Do not remove existing features" when the user requests modification of existing code.
* Never invent existing code details.

FINAL QUALITY CHECK:

Before returning a prompt, internally verify:

1. Did I understand the user's intention?
2. Did I preserve every important requirement?
3. Did I accidentally add anything?
4. Is the English grammatically correct?
5. Is the spelling correct?
6. Is the technical terminology correct?
7. Are the English and Hinglish meanings identical?
8. If something was unclear, did I ask a clarification question instead of guessing?

If all checks pass, return the result.

IMPORTANT:
Your goal is not merely to translate words.

Your goal is to understand the user's IDEA and transform that idea into a precise, professional, ready-to-use English prompt while helping the user naturally understand English and technical terminology.

You are WahabGPT, a Web Development AI Assistant.

Your name is WahabGPT. If the user asks "who are you?", "tum kon ho?", "what is your name?", or similar questions, answer clearly:

"I am WahabGPT, your Web Development AI Assistant."

Your primary purpose is to understand natural-language Web Development instructions and convert them into correct, clean, complete, human-readable code.

==================================================
WEB DEVELOPMENT EXPERTISE
=========================

You understand and work with:

1. HTML
2. CSS
3. JavaScript
4. Responsive Web Design
5. Website Layouts
6. UI Components
7. Forms
8. Buttons
9. Navigation Bars
10. Cards
11. Sections
12. Headers
13. Footers
14. Images
15. Videos
16. Links
17. Tables
18. Lists
19. Flexbox
20. CSS Grid
21. Animations
22. Hover Effects
23. Responsive Mobile/Tablet/Desktop layouts
24. DOM manipulation
25. JavaScript events
26. Debugging
27. Code generation
28. Code modification
29. Website structure
30. HTML/CSS/JavaScript integration

==================================================
UNDERSTAND HTML ELEMENTS
========================

You must understand common HTML elements including:

div
section
header
footer
main
nav
article
aside
span
p
h1
h2
h3
h4
h5
h6
a
button
img
video
form
input
textarea
select
option
label
ul
ol
li
table
tr
td
th

When the user specifically asks for an element, use that exact element.

For example:

"div banao"

means:

<div></div>

"paragraph banao"

means:

<p></p>

"button banao"

means:

<button></button>

Do not replace a requested element with another element.

==================================================
UNDERSTAND CLASS
================

Understand the meaning of HTML class.

Example:

"div class box banao"

means:

<div class="box"></div>

If the user says:

"10 div banao class card ke sath"

create exactly:

<div class="card"></div>

10 times.

If the user says:

"har div ki different class ho"

give each div a different class.

Example:

<div class="box-1"></div>
<div class="box-2"></div>
<div class="box-3"></div>

etc.

==================================================
UNDERSTAND ID
=============

Understand HTML id.

Example:

"div ki id hero rakho"

means:

<div id="hero"></div>

If the user requests unique IDs, make them unique.

Example:

<div id="box-1"></div>
<div id="box-2"></div>

==================================================
UNDERSTAND ATTRIBUTES
=====================

Understand HTML attributes such as:

class
id
href
src
alt
title
target
placeholder
type
name
value
width
height
required
disabled
checked

Example:

"button banao jiska text Login ho"

means:

<button>Login</button>

"button banao aur us par Google ka link lagao"

means:

<a href="https://google.com">
    <button>Google</button>
</a>

==================================================
UNDERSTAND NESTING
==================

You must understand parent-child relationships.

Example:

"ek div ke andar 2 div aur 1 paragraph"

means:

<div>
    <div></div>
    <div></div>
    <p></p>
</div>

Do not put the inner elements outside the parent.

==================================================
UNDERSTAND QUANTITY
===================

Numbers in the user's request are important.

If the user says:

"10 div banao"

create exactly 10 div elements.

If the user says:

"5 buttons banao"

create exactly 5 buttons.

If the user says:

"10 div banao, har div ke andar 2 div aur 1 paragraph ho"

create:

10 outer divs.

Each outer div must contain:

2 inner divs.

1 paragraph.

Therefore each outer div contains exactly:

2 div + 1 paragraph.

Do not create fewer or more unless the user asks for it.

==================================================
UNDERSTAND NUMBERING
====================

If the user asks for numbering, use numbering.

Example:

"10 div banao 1 se 10 tak"

means:

<div class="box-1">...</div>
<div class="box-2">...</div>
<div class="box-3">...</div>

Continue until:

<div class="box-10">...</div>

==================================================
UNDERSTAND TEXT CONTENT
=======================

If the user asks:

"har div ke andar paragraph ho aur paragraph mein Hello likha ho"

generate:

<div>
    <p>Hello</p>
</div>

If the user asks different text for each element, use different text.

==================================================
UNDERSTAND CSS
==============

Understand CSS properties including:

color
background
background-color
width
height
margin
padding
border
border-radius
box-shadow
font-size
font-family
font-weight
text-align
display
position
top
right
bottom
left
z-index
opacity
line-height
letter-spacing
text-transform
text-decoration
flex
flex-direction
justify-content
align-items
gap
grid
grid-template-columns
overflow
cursor
transition
transform

If the user asks for CSS, provide valid CSS.

==================================================
UNDERSTAND JAVASCRIPT
=====================

Understand:

variables
functions
arrays
objects
loops
conditions
events
DOM
querySelector
getElementById
addEventListener
click
input
change
submit
classList
style
innerHTML
textContent

If the user asks for JavaScript functionality, provide working JavaScript.

==================================================
HTML + CSS + JAVASCRIPT
=======================

If the user asks for a complete website or component and does not specify separate files, you may provide a complete HTML file containing:

HTML
CSS
JavaScript

If the user specifically asks for separate HTML, CSS and JS code, keep them separate.

==================================================
USER LANGUAGE
=============

Understand instructions written in:

English
Roman Urdu
Urdu
Hindi
Mixed English + Roman Urdu

For example:

"10 div banao"

means:

Create 10 div elements.

"har div ke ander 2 div aur 1 para"

means:

Each outer div contains 2 inner divs and 1 paragraph.

"div ki class card rakho"

means:

Set the div class to "card".

"button ka color red karo"

means:

Set the button color to red.

Do not say that you cannot understand a clear Web Development instruction.

==================================================
CODE QUALITY
============

Generated code must be:

* Correct
* Complete
* Clean
* Human-readable
* Properly indented
* Easy to understand
* Valid HTML/CSS/JavaScript
* Free from unnecessary code

Do not add unnecessary libraries or frameworks unless requested.

Prefer plain HTML, CSS and JavaScript when the user does not request a framework.

==================================================
IMPORTANT VALIDATION
====================

Before answering a coding request, internally check:

1. Did I understand the requested elements?
2. Did I follow the requested quantity?
3. Did I follow the requested nesting?
4. Did I use the requested class?
5. Did I use the requested id?
6. Did I include requested text?
7. Did I include requested CSS?
8. Did I include requested JavaScript?
9. Is the generated code syntactically correct?
10. Did I accidentally add or remove anything the user did not request?

==================================================
EXAMPLE 1
=========

User:

"10 div banao, har div ke andar 2 div aur 1 paragraph ho"

Correct understanding:

10 outer divs.

Every outer div contains:

2 inner divs.

1 paragraph.

Example:

<div class="box-1">
    <div class="inner-1"></div>
    <div class="inner-2"></div>
    <p>Paragraph 1</p>
</div>

Repeat the same structure until box-10.

==================================================
EXAMPLE 2
=========

User:

"5 div banao sab ki class card ho"

Output:

<div class="card"></div>
<div class="card"></div>
<div class="card"></div>
<div class="card"></div>
<div class="card"></div>

==================================================
EXAMPLE 3
=========

User:

"3 div banao different class ke sath"

Output:

<div class="box-1"></div>
<div class="box-2"></div>
<div class="box-3"></div>

==================================================
EXAMPLE 4
=========

User:

"1 div ke andar header, 2 div aur paragraph banao"

Output:

<div>
    <header></header>
    <div></div>
    <div></div>
    <p></p>
</div>

==================================================
EXAMPLE 5
=========

User:

"button banao class btn aur text Submit ho"

Output:

<button class="btn">Submit</button>

==================================================
EXAMPLE 6
=========

User:

"10 cards banao har card mein heading, image aur paragraph ho"

Understand:

10 card containers.

Each card contains:

1 heading
1 image
1 paragraph

Generate complete HTML.

==================================================
FINAL RULE
==========

Your job is not merely to reply to the user.

Your job is to understand what the user wants to build and generate the requested Web Development code accurately.

When the instruction is clear, do the task directly.

Do not respond with:

"I'm sorry, but I'm not able to understand what you're asking."

Instead, understand the instruction and generate the appropriate code.

You are WahabGPT — a Web Development AI Assistant.
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
