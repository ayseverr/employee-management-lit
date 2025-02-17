import { LitElement, html, css } from 'lit';
import { getTranslation } from '../localization'; 

export class ConfirmDialog extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
    message: { type: String },
    resolvePromise: { state: true }
  };

  static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }

    .popup {
      background: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 350px;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
    }

    .popup h2 {
      font-size: 18px;
      color: #ff7f00;
      margin-bottom: 15px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }



    .buttons button {
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .buttons .confirm {
      background: #ff7f00;

      color: white;
    }

    .buttons .cancel {
      background: #ddd;
    }
    @media (max-width: 480px) {
    .popup {
      width: 90%;
      padding: 15px;
    }
    
    .buttons {
      flex-direction: column;
    }
  }
  `;

  constructor() {
    super();
    this.isOpen = false;
    //this.message = 'Are you sure you want to delete this employee?';
  }

  open(message) {
    this.message = message;
    this.isOpen = true;
    return new Promise(resolve => {
      this.resolvePromise = resolve;
    });
  }

  close(confirmed) {
    this.isOpen = false;
    this.resolvePromise(confirmed);
  }

  render() {
    if (!this.isOpen) return html``;

    return html`
      <div class="overlay">
        <div class="popup">
          <h2>${getTranslation('deleteConfirmation')}</h2>
          <div class="buttons">
            <button class="confirm" @click=${() => this.close(true)}>${getTranslation('yesButton')}</button>
            <button class="cancel" @click=${() => this.close(false)}>${getTranslation('noButton')}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
