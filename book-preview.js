class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const image = this.getAttribute('image') || '';
        const title = this.getAttribute('title') || 'No Title';
        const author = this.getAttribute('author') || 'Unknown';
        const id = this.getAttribute('data-preview') || '';

        this.shadowRoot.innerHTML = `
            <style>
                .preview {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--color-light, #fff);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    cursor: pointer;
                    width: 100%;
                    text-align: left;
                    transition: background 0.3s;
                }

                .preview:hover {
                    background: rgba(0, 0, 0, 0.05);
                }

                .preview__image {
                    width: 80px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 4px;
                }

                .preview__info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .preview__title {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: bold;
                }

                .preview__author {
                    font-size: 0.875rem;
                    color: #555;
                }
            </style>
            <button class="preview" data-preview="${id}">
                <img class="preview__image" src="${image}" alt="${title}" />
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${author}</div>
                </div>
            </button>
        `;
    }
}

customElements.define('book-preview', BookPreview);
