:root {
    --bg-primary: #212121;
    --bg-secondary: #171717;
    --bg-sidebar: #171717;
    --text-primary: #ececec;
    --text-secondary: #8e8ea0;
    --border-color: #4d4d4f;
    --accent-color: #10a37f;
    --hover-bg: #2f2f2f;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Söhne', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    height: 100vh;
    overflow: hidden;
}

.app-container {
    display: flex;
    height: 100%;
}

/* Sidebar */
.sidebar {
    width: 260px;
    background-color: var(--bg-sidebar);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    border-right: 1px solid var(--border-color);
}

.sidebar-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.new-chat-btn {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background 0.2s;
}

.new-chat-btn:hover {
    background-color: var(--hover-bg);
}

.close-sidebar {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 1.2rem;
    cursor: pointer;
}

.history-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.history-label {
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-bottom: 10px;
    padding-left: 10px;
}

.sidebar-footer {
    padding: 10px;
    border-top: 1px solid var(--border-color);
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.user-profile:hover {
    background-color: var(--hover-bg);
}

.avatar {
    width: 30px;
    height: 30px;
    background-color: var(--accent-color);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
}

.user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 0.9rem;
    font-weight: 600;
}

.plan {
    font-size: 0.75rem;
    color: var(--text-secondary);
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
}

.top-bar {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
}

.menu-btn, .settings-btn {
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 1.2rem;
    cursor: pointer;
}

.model-selector {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--hover-bg);
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
}

/* Chat Area */
.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.welcome-screen {
    text-align: center;
    margin-top: 10vh;
    max-width: 600px;
}

.welcome-screen h1 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.suggestions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 30px;
}

.suggestion-card {
    background-color: var(--hover-bg);
    padding: 15px;
    border-radius: 5px;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s;
}

.suggestion-card:hover {
    background-color: #404040;
}

.suggestion-card i {
    margin-bottom: 10px;
    color: var(--text-secondary);
}

/* Messages */
.message {
    display: flex;
    gap: 15px;
    padding: 20px 0;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.message-avatar {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    flex-shrink: 0;
}

.user-msg .message-avatar {
    background-color: #5436DA; /* User color */
}

.ai-msg .message-avatar {
    background-color: var(--accent-color); /* AI color */
}

.message-content {
    line-height: 1.6;
    font-size: 1rem;
}

/* Input Area */
.input-area {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, rgba(33,33,33,0) 0%, var(--bg-primary) 20%);
}

.input-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    background-color: var(--hover-bg);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: flex-end;
    padding: 10px;
}

textarea {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--text-primary);
    resize: none;
    outline: none;
    max-height: 200px;
    padding-right: 40px;
    font-size: 1rem;
}

#send-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

#send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.disclaimer {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 10px;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: var(--bg-secondary);
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    border: 1px solid var(--border-color);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.close-modal {
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-body label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.modal-body input, .modal-body textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    background-color: var(--hover-bg);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    border-radius: 5px;
}

.test-btn, .save-btn {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: 600;
}

.test-btn {
    background-color: var(--hover-bg);
    color: var(--text-primary);
    margin-right: 10px;
}

.save-btn {
    background-color: var(--accent-color);
    color: white;
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar {
        position: absolute;
        left: -260px;
        height: 100%;
        z-index: 100;
    }
    
    .sidebar.active {
        transform: translateX(260px);
    }
    
    .close-sidebar {
        display: block;
    }
    
    .suggestions {
        grid-template-columns: 1fr;
    }
}