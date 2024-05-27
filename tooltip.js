class ToolTip extends HTMLElement {
  // constructor(): created custom Element but not yet mounted to DOM yet
  constructor() {
    super();

    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text.';
    this.attachShadow({mode: 'open'});
    // const tooltipTemplate = document.querySelector('#tooltip-template');
    // this.shadowRoot.appendChild(tooltipTemplate.content.cloneNode(true));

    // defining here our own template in shadow DOM:
    this.shadowRoot.innerHTML = /* html */ `
    <style> 
      div { 
        background-color: black; 
        color: white; 
        position: absolute; 
        z-index: 10 
      }
    </style>
    <slot>Some default</slot>
    <span> (?)</span>
    `;
  }

  // connectedCallback(): executes when mounted/rendered to the DOM
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  // _ prefix: you should not call this method from outside => private!
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}
customElements.define('katrin-tooltip', ToolTip);
