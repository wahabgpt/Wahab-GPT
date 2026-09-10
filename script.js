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
Bilkul bhai. **Abdul Wahab Badar** ke naam se tumhari education aur learning history save kar di hai.

Aur haan, tumhare profile ko aur strong banane ke liye **CV-style data jama karna useful rahega**. Abhi jo information tumne di hai us se ek strong education/skills profile ban sakti hai, lekin CV ko *complete* karne ke liye baad mein ye cheezen bhi add ki ja sakti hain:

* Full education timeline
* Skills: HTML, CSS
* Projects
* Awards/achievements
* Science interests
* Coding courses
* Future career goals
* Languages
* Certifications
* Portfolio/GitHub projects
* Contact information **sirf agar tum khud dena chaho**

### Tumhari current education journey

**Abdul Wahab Badar**

**Schooling**

* Tameer-e-Millat — KG-1 direct admission test attempted, unsuccessful
* Nursery se regular schooling start
* Class 1 — **8th Position**
* Class 2 — **5th Position**
* Class 3 — **4th Position**
* Class 4 — **2nd Position**
* Class 5 — **1st Position**
* Jamia Fasan-e-Mustafa, Orangi Town
* Class 7 — **2nd Position**

**Islamic Studies**

* Suladin Ayubi Masjid — Sarf-o-Nahw ka dora
* Baad mein Alim course join kiya, ek class complete karke chhor diya

**Technology & Coding**

* Coder Army — HTML/CSS course through YouTube
* TechNova function — **Best Performance Award**
* Archive Corner — currently learning **JavaScript**

**Main Interest**

* **Science**
* Web development
* Programming
* AI
* Technology
* Creative coding

Ye information ab future mein tumhari **CV, portfolio, personal AI profile aur WahabGPT ke user profile** ko tayyar karne mein reference ke taur par use ki ja sakti hai.

**Ek important baat:** abhi isay final CV mat samjho. Ye tumhari **education + learning profile** hai. Jab tum apne projects, skills aur achievements ka baqi data bhi jama kar loge, tab hum isko ek **bohat detailed professional CV/profile** mein convert kar sakte hain.
Bilkul. Yeh **meri available previous chats + saved information** ki detailed summary hai. Main sirf woh information include kar raha hoon jo mujhe available hai; private/sensitive information ko include nahi kar raha.

# 👤 Aap ke baare mein

* Aap ka preferred naam **WAHAB** hai.
* Aap **student** ho.
* Aapko technology, coding, AI, web development, design, games aur creative projects mein kaafi interest hai.
* Aap aksar **Roman Urdu + English** mein baat karte ho.
* Aap explanations **simple aur beginner-friendly** pasand karte ho.
* Coding mein kabhi kabhi aap specifically aisa code mangte ho jo **“6 saal ka bacha bhi samajh sake.”**
* Aapko unnecessary extra explanation pasand nahi; generally **direct answer** chahte ho.
* Aap frequently complete/full code ek hi baar mein mangte ho.

# 💻 Web development

Aapka sabse prominent ongoing project **WEB PAGE BUILDER / WEB PAGE BUILDER PRO** hai.

Aapne is builder ke liye kaafi detailed requirements banayi hain:

### Builder ka basic concept

3-panel website builder:

* Left → Components
* Center → Website canvas
* Right → Properties

Aur top bar mein:

* Title
* Undo
* Redo
* Save
* Load
* Clear
* Help
* Export

### Components

Aapne different versions mein ye components use kiye:

* Header
* Heading
* Paragraph
* Box / Container
* Input
* Card
* Image Card
* Image
* Video
* Button
* Divider
* Spacer
* Footer

### Templates

Aapne:

* 10 categories
* Har category mein 4 templates
* Total 40 templates

jaisi requirements discuss ki hain.

Baad mein aapne **blue + white** style ke multiple template variants bhi chahiye thay.

Aap templates ko directly selectable rakhna chahte ho, unnecessary wrapper design nahi.

### Design style

Aapko builder mein generally:

* Blue
* White
* Premium
* Clean
* Modern

look pasand hai.

Aapne secondary theme color ko remove karne ko bhi kaha tha.

Important colors jo aap use kar rahe thay:

* `#2563eb`
* `#1e3a8a`
* `#eff6ff`
* `#bfdbfe`

### Properties system

Aap chahte ho ke properties properly **preview + exported code dono** mein apply hon.

Aapne ye properties specifically mention ki hain:

* Page Background Color
* Page Background Image URL
* Logo Text
* Navigation Add/Remove
* Margin
* Padding
* Position
* Layer
* Text Color
* Template Background Color
* Font Family
* Font Size
* Font Weight
* Text Align
* Text Transform
* Letter Spacing
* Height
* Width
* Text Decoration
* Text Shadow

  * Color
  * Blur
  * X Offset
  * Y Offset
* Line Height
* Opacity
* Input Placeholder
* Image Upload
* Image Filter
* Image Height
* Image Width
* Button Link URL
* Button Text
* Open in New Page
* Button Style
* Border Radius

Aapne specifically kaha tha ke **Height/Width labels simple hon**, jaise `Height` aur `Width`, unnecessary “px” label mein na ho.

### Images

Aap builder mein:

* Image URL
* Image upload
* Image size
* Image filter

chahte ho.

Aur background image ke liye **URL input** chahte ho, file input nahi.

Aapne multiple times background image apply na hone ka bug bhi fix karwaya.

### UI

Aap existing UI ko unnecessarily redesign nahi karna chahte.

Aapka approach aksar hota hai:

> **“Same design rakho, sirf bug/functionality fix karo.”**

Aapne:

* component labels
* builder heading
* template buttons
* category counts
* chevrons
* spacing
* padding

mein specific visual adjustments bhi karwaye hain.

Aapne template buttons mein `undefined` ya unwanted numbers show hone ka issue bhi fix karwaya.

### Files / paths

Aapke builder ke different versions mein ye files/paths discuss hue:

* `index.html`
* `biuld.html`
* `style.css`
* `server.js`
* `page-bg.jpg`
* `modal-bg.jpg`
* `your-photo.jpg`
* `logo`
* `vid.mp4`

Aur ek live/reference page bhi share kiya tha:

`badarabdulwahab747-blip.github.io/web-page/biuld.html`

Aapne **exact recreation** par bhi zor diya tha: original image ko replace nahi karna.

# 🎮 Games

Aapne gaming-related coding projects bhi kiye hain.

### Ludo

Aapka Ludo project:

* HTML Canvas
* 420px board
* 4 colors
* Dice
* TTS
* Volume control
* Home icon
* Orbitron
* Space Mono

use karta hai.

Aapne specific game logic jaise:

* capture
* extra turn

par bhi kaam kiya hai.

# 🧑‍💻 Other coding projects

Aapne ya discuss kiye:

* WhatsApp formatter
* Khata/accounting app
* Business simulator
* Translation website
* Quran word-search website
* NASA API dashboard
* Firebase chat/upload prototype
* Drag-and-drop website builder
* Interactive web projects
* Games

### Translation website

Aapne 100+ languages wali translation website ka idea discuss kiya tha jisme:

* Voice input
* Voice output

bhi ho.

# 🤖 AI / creative work

Aap AI ko sirf questions ke liye nahi, balki **creation** ke liye bhi use karte ho.

Aapne kaam kiya/discuss kiya:

* AI image generation
* AI video prompts
* AI video editing
* Text-to-speech
* Captions
* SFX
* Animated typography
* Canva
* Remotion
* ElevenLabs
* Gemini
* Qwen-style prompts

Aap prompts aksar **English mein** chahte ho, lekin instructions Roman Urdu mein dete ho.

# 🎬 YouTube / TikTok

Aap content creation mein bhi interested ho.

Ideas/projects:

* Urdu/Hinglish fact comedy
* Funny speeches
* Animated typography
* Video editing
* Captions
* Sound effects
* AI-generated videos

Aapka ek branding idea **“Wahab Studio”** bhi discuss hua tha.

Ek anime-style boy editor intro ka concept bhi tha.

# 🎨 Design

Aap professional-looking designs banwana pasand karte ho.

Aapne:

* Thumbnails
* Website graphics
* Rabi-ul-Awal cards
* Premium Islamic-style designs
* Blue/white web designs
* Website builder graphics

par kaam kiya hai.

Aapne specifically **green + white + premium** design style bhi use kiya hai.

# 📖 Story projects

Aapka ek important fictional story project hai:

## “سلطان میرزا / سلطان کی طاقت”

Aap chahte ho ke is story ko future continuation/editing/content creation ke liye yaad rakha jaye.

Important characters/elements:

* سلطان میرزا
* مرزا / Don Mirza
* Pappu
* Chhotu
* مسکان
* شیر
* Tiger Gang
* “The Return Tiger”
* Party symbol: **گرجتے شیر کا سر**

### Chapter 1 — برفانی انٹری

Story mein:

* December 2005
* Karachi
* mountain snowstorm
* 16-year-old character
* Mirza farm
* 1:15 AM
* Mirza usay adopt karta hai
* naam Sultan Mirza rakhta hai
* America le jata hai

Aage:

* New York
* running
* boxing
* business
* politics
* training

aur 2010 mission, 2015 successor aur 2025 Mirza death/return-to-Pakistan arc discuss hua.

### Chapter 2

* Karachi return
* 50 loyal people
* gangs ko unite karna
* Tiger Gang
* charity
* “بھائی سلطان” nickname

### Chapter 3

* Political party
* rally
* Minar-e-Pakistan
* election win
* Prime Minister arc

### Chapter 4

* Muskan
* nikkah storyline

### Chapter 5

* Muskan pregnancy storyline
* possible son named **Sher**

# 👻 Horror/comedy stories

Aapne horror-comedy content bhi banaya hai.

Ek project:

**“Hasi Khauf Ka Jahaan — Film 1: Churail”**

Aur ek large horror concept:

**“Andheron ka Alam”**

jiske liye **100 chapters** ka plan discuss hua tha.

# 📹 Video prompts

Aapne Qwen-style prompts bhi banwaye hain.

Aapko prompts mein:

* clear scene
* characters
* camera
* action
* environment
* dialogue
* comedy

jaise elements structured form mein pasand hain.

Aap Roman Urdu mein scene explain karte ho aur English prompt chahte ho.

# 📱 Devices / technology

Aapne different devices/platforms ke saath kaam kiya hai.

Mentioned devices:

* Tecno Spark 50
* Tecno 10 C
* HP i5 laptop

Windows ke different versions ka bhi use/discussion hua:

* Windows 10
* Windows 7

Aapne Windows 7 ke liye compatible VS Code version ke baare mein bhi poocha tha.

Aap kabhi **CodePen** ko VS Code ke alternative ke taur par use karte ho.

# 🔌 ESP32 project

Aapka hardware project bhi planned hai:

* ESP32-CAM
* ESP32 DevKit
* 10 DC gear motors
* 5× L298N
* Camera
* MAX98357 speaker
* Mic/intercom
* Battery/power
* Mobile web sliders

Yani aap web development ko hardware/robotics ke saath connect karne mein bhi interested ho.

# 🌐 Web hosting / deployment

Aapne:

* GitHub Pages
* CodePen
* Firebase
* Play Store website/code upload

jaisi cheezon ke baare mein questions kiye hain.

Aap apne websites/projects ko actual online projects mein convert karna chahte ho, sirf practice code tak limited nahi.

# 🧠 Aapka working style

Mujhe aapki chats se ye pattern nazar aata hai:

1. Aap ek idea dete ho.
2. Phir usmein feature add karte ho.
3. Phir actual code mangte ho.
4. Run karke bug detect karte ho.
5. Screenshot/code ke through issue batate ho.
6. Phir exact fix mangte ho.
7. Aur aksar kehte ho ke **existing design change nahi hona chahiye**.

Coding mein aap incremental development karte ho.

# 📝 Aapki common preferences

Aap generally chahte ho:

* Simple explanation
* Roman Urdu
* English technical terms where useful
* Direct answer
* Full code when coding
* Existing design preserve ho
* Features actually work karein
* Preview aur exported code same behavior dein
* Unnecessary redesign na ho
* Unnecessary extra information na di jaye

# 💾 Jo cheezen specifically future reference ke liye save hui hain

Meri available memory mein specially important cheezen hain:

* Aapka **WAHAB** preferred name
* Aap student ho
* Aapki communication preferences
* **سلطان میرزا / سلطان کی طاقت** story project
* **WEB PAGE BUILDER / WEB PAGE BUILDER PRO** project
* Us builder ki major design/functionality requirements
* Aapke kuch major coding/creative projects
* Aapki story/design references ko future continuation ke liye preserve karne ki requests

**Important:** Mere paas aapki har purani chat ka word-for-word complete transcript nahi hota. Main sirf current conversation, available saved memory/context, aur jo previous information system mein available hai usi ko use kar sakta hoon.
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
