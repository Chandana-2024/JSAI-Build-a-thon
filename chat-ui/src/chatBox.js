import { LitElement, html, css } from 'lit';

class ChatBox extends LitElement {
  static styles = css`
    .chat-box {
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 10px;
      max-width: 400px;
      margin: 20px auto;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 1rem;
    }
  `;

  static properties = {
    messages: { type: Array }
  };

  constructor() {
    super();
    this.messages = [];
  }

  handleInput(e) {
    if (e.key === 'Enter') {
      const message = e.target.value;
      if (message.trim() !== '') {
        this.messages = [...this.messages, message];
        e.target.value = '';
      }
    }
  }

  render() {
    return html`
      <div class="chat-box">
        ${this.messages.map(msg => html`<p>👤 ${msg}</p>`)}
        <input type="text" @keydown="${this.handleInput}" placeholder="Type and press Enter..." />
      </div>
    `;
  }
}

customElements.define('chat-box', ChatBox);
