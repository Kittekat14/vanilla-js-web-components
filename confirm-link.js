// When extending a specific HTML Element...

class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault();
      }
    });
  }
}

// ...we need a 3rd argument {extends: 'a} to define that extended built-in HTML element:
customElements.define('katrin-confirm-link', ConfirmLink, {extends: 'a'});
