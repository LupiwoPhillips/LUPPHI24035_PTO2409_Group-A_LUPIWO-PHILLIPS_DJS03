# DJS03 Project Brief: Book Connect - Abstractions

# Book Connect

Book Connect is a browser-based JavaScript application that allows users to explore, search, and preview a curated library of books. The app utilizes modular JavaScript, responsive design principles, and dynamic DOM manipulation to deliver a clean and functional reading discovery experience.

---

## 🔍 Features

- Browse books in paginated format (36 per page)
- Filter books by genre, author, and title keyword
- Toggle between day and night themes
- View detailed book previews in a modal overlay
- Responsive layout with accessible design patterns

---

## 🧠 Project Structure & Refactoring Rationale

The project is structured for separation of concerns and scalability:

- 📁 `index.html` – Semantically structured markup and theme-linked assets
- 🎨 `styles.css` – Responsive styles using CSS variables and media queries
- 📄 `data.js` – Central source of data (books, genres, authors) and pagination constants
- ⚙️ `scripts.js` – Modular JavaScript handling UI state, rendering, and event-driven interactions

### Refactoring & Abstraction Goals

Refactoring focused on improving clarity, scalability, and maintainability:

- 🧩 Modularization: All data was decoupled from logic and isolated in `data.js`.
- 🛠 Utility Functions: Core actions (rendering previews, populating dropdowns, theming) are abstracted into reusable, purpose-driven functions.
- 🎯 State Management: Controlled using `let matches` and `page`, reducing global side effects and supporting deterministic re-rendering.
- 🗃 Declarative DOM Queries: Centralized in a single `elements` object to avoid repetition and improve readability.
- 🎨 Dynamic Theming: Applied using CSS variables set via JavaScript, allowing for theme switching while respecting system preferences.

---

## 🧪 Key Reflections

### Challenges Encountered

- Managing preview modals and click delegation required traversing composed paths from user interactions.
- Ensuring graceful fallback when search results yielded no matches.
- Avoiding memory leaks and maintaining consistent state across user interactions.

### Lessons Learned

- Centralizing data and configuration simplifies updates and testing.
- Abstracting DOM manipulation allows easier updates to markup and structure.
- Progressive enhancement improves UX across a wide range of devices and accessibility needs.

---

## 🚀 Getting Started

1. Clone the repository
2. Open `index.html` in a browser
3. Browse and enjoy the book discovery experience

---

## 🌙 Theming

The app supports dark and light themes based on the user’s system preferences. Theme can be manually changed via the settings overlay.

---

## 📦 Future Enhancements

- Add persistent local storage for theme and last viewed book
- Add category bookmarks or reading list feature
- Incorporate real-time API for dynamic book data
