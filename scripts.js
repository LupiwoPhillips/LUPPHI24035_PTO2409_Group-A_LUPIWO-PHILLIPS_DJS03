import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

/** ====== State Management ====== */
let page = 1;
let matches = books;

/** ====== DOM Elements ====== */
const elements = {
    listItems: document.querySelector('[data-list-items]'),
    listButton: document.querySelector('[data-list-button]'),
    listMessage: document.querySelector('[data-list-message]'),
    listActive: document.querySelector('[data-list-active]'),
    listBlur: document.querySelector('[data-list-blur]'),
    listImage: document.querySelector('[data-list-image]'),
    listTitle: document.querySelector('[data-list-title]'),
    listSubtitle: document.querySelector('[data-list-subtitle]'),
    listDescription: document.querySelector('[data-list-description]'),
    searchOverlay: document.querySelector('[data-search-overlay]'),
    searchForm: document.querySelector('[data-search-form]'),
    searchTitle: document.querySelector('[data-search-title]'),
    searchGenres: document.querySelector('[data-search-genres]'),
    searchAuthors: document.querySelector('[data-search-authors]'),
    searchCancel: document.querySelector('[data-search-cancel]'),
    settingsOverlay: document.querySelector('[data-settings-overlay]'),
    settingsForm: document.querySelector('[data-settings-form]'),
    settingsTheme: document.querySelector('[data-settings-theme]'),
    settingsCancel: document.querySelector('[data-settings-cancel]'),
    headerSearch: document.querySelector('[data-header-search]'),
    headerSettings: document.querySelector('[data-header-settings]'),
    listClose: document.querySelector('[data-list-close]')
};

/** ====== Utility Functions ====== */

function createBookPreview({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
}

function renderBookList(bookList, start = 0, end = BOOKS_PER_PAGE) {
    const fragment = document.createDocumentFragment();
    for (const book of bookList.slice(start, end)) {
        fragment.appendChild(createBookPreview(book));
    }
    elements.listItems.appendChild(fragment);
}

function populateDropdown(dropdownElement, optionsData, defaultText) {
    const fragment = document.createDocumentFragment();
    const defaultOption = document.createElement('option');
    defaultOption.value = 'any';
    defaultOption.innerText = defaultText;
    fragment.appendChild(defaultOption);

    for (const [id, name] of Object.entries(optionsData)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        fragment.appendChild(option);
    }

    dropdownElement.appendChild(fragment);
}

function applyTheme(theme) {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

/** ====== Event Handlers ====== */

function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
        let titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        let authorMatch = filters.author === 'any' || book.author === filters.author;

        if (genreMatch && titleMatch && authorMatch) {
            result.push(book);
        }
    }

    page = 1;
    matches = result;
    elements.listItems.innerHTML = '';

    if (result.length < 1) {
        elements.listMessage.classList.add('list__message_show');
    } else {
        elements.listMessage.classList.remove('list__message_show');
        renderBookList(result);
    }

    updateShowMoreButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    elements.searchOverlay.open = false;
}

function handleShowMore() {
    renderBookList(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
    page += 1;
    updateShowMoreButton();
}

function handlePreviewClick(event) {
    const pathArray = Array.from(event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (node?.dataset?.preview) {
            active = books.find(book => book.id === node.dataset.preview);
            break;
        }
    }

    if (active) {
        elements.listActive.open = true;
        elements.listBlur.src = active.image;
        elements.listImage.src = active.image;
        elements.listTitle.innerText = active.title;
        elements.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        elements.listDescription.innerText = active.description;
    }
}

function handleSettingsSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    applyTheme(theme);
    elements.settingsOverlay.open = false;
}

/** ====== Helper Functions ====== */

function updateShowMoreButton() {
    const remaining = matches.length - (page * BOOKS_PER_PAGE);
    elements.listButton.disabled = remaining <= 0;
    elements.listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;
}

/** ====== Initial Render ====== */

function init() {
    // Initial Book List
    renderBookList(matches);

    // Populate Filters
    populateDropdown(elements.searchGenres, genres, 'All Genres');
    populateDropdown(elements.searchAuthors, authors, 'All Authors');

    // Apply System Theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'night' : 'day');
    elements.settingsTheme.value = prefersDark ? 'night' : 'day';

    updateShowMoreButton();

    /** Event Listeners */
    elements.searchCancel.addEventListener('click', () => elements.searchOverlay.open = false);
    elements.settingsCancel.addEventListener('click', () => elements.settingsOverlay.open = false);
    elements.headerSearch.addEventListener('click', () => {
        elements.searchOverlay.open = true;
        elements.searchTitle.focus();
    });
    elements.headerSettings.addEventListener('click', () => elements.settingsOverlay.open = true);
    elements.listClose.addEventListener('click', () => elements.listActive.open = false);
    elements.searchForm.addEventListener('submit', handleSearch);
    elements.listButton.addEventListener('click', handleShowMore);
    elements.listItems.addEventListener('click', handlePreviewClick);
    elements.settingsForm.addEventListener('submit', handleSettingsSubmit);
}

init();
