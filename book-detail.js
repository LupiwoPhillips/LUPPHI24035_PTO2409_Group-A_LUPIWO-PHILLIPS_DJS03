class BookDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    display: none;
                    z-index: 100;
                    background-color: rgba(0, 0, 0, 0.7);
                    justify-content: center;
                    align-items: center;
                }

                :host([open]) {
                    display: flex;
                }

                .modal {
                    background: var(--color-light, #fff);
                    color: var(--color-dark, #000);
                    border-radius: 8px;
                    max-width: 800px;
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 2rem;
                    position: relative;
                }

                .modal img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                }

                .modal__close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                }

                .modal__title {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .modal__subtitle {
                    font-size: 1rem;
                    color: #555;
                }

                .modal__description {
                    font-size: 0.95rem;
                    line-height: 1.6;
                }
            </style>

            <div class="modal">
                <button class="modal__close" title="Close">&times;</button>
                <img class="modal__image" />
                <h3 class="modal__title"></h3>
                <div class="modal__subtitle"></div>
                <p class="modal__description"></p>
            </div>
        `;

        this.shadowRoot.querySelector('.modal__close').addEventListener('click', () => {
            this.removeAttribute('open');
        });
    }

    set data({ image, title, subtitle, description }) {
        this.shadowRoot.querySelector('.modal__image').src = image;
        this.shadowRoot.querySelector('.modal__title').textContent = title;
        this.shadowRoot.querySelector('.modal__subtitle').textContent = subtitle;
        this.shadowRoot.querySelector('.modal__description').textContent = description;
    }
}

customElements.define('book-detail', BookDetail);
