import { LitElement, html } from 'lit';

export class NavigationMenu extends LitElement {
  render() {
    return html`
      <nav>
        <a href="/">Employee List</a>
        
        <a href="/add">Add Employee</a>
      </nav>
    `;
  }

  createRenderRoot() { return this; }
}

customElements.define('navigation-menu', NavigationMenu);
