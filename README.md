# Web Dev Tutorial Notes

A personal web application that serves as my compiled web development notes.

Instead of writing notes in a traditional document, I built them into a React application. Every topic I studied became another opportunity to practice HTML, CSS, JavaScript, React, component design, layouts, navigation, and responsive design.

The website is primarily a reference for myself. The notes are written as reminders of concepts I've already learned rather than beginner-friendly tutorials.

> 🌐 Live Demo:
> <https://tutorial-compiled-notes.vercel.app/>

---

## Why this project exists

I often revisit concepts that I haven't used for a while. Rather than searching through folders of text files or notebooks, I wanted a single place where I could quickly navigate through everything I had studied.

Building the notes themselves also became part of my learning process. While writing a normal document would have been much faster, creating this application allowed me to continuously practice frontend development while documenting what I learned.

---

## Project Evolution

This project has evolved alongside my learning journey.

```
HTML + CSS
      │
      ▼
Flask version
      │
      ▼
React + Vite (current)
```

It originally started as a collection of static HTML pages.

After learning Flask, I migrated the notes into a Flask application to make navigation easier.

Once I became comfortable with React fundamentals, I rebuilt the project again using React, where it currently continues to grow.

Some older topics (such as JavaScript and Flask) still exist in previous versions and are gradually being migrated into the current React application.

---

## Current Topics

Current notes include topics such as:

1. Python
    - FastAPI
    - Flask
    - Django
    - SQLAlchemy
    - AsyncIO
    - Alembic
    - FastAPI JWT Auth
2. HTML
3. CSS
    - Tailwind
4. JavaScript
    - Basics
    - React
    - TypeScript
    - Next.js
    - Prisma
5. SQL
    - MySQL
    - PostgreSQL
6. Git

More topics will continue to be added as I learn them.

---

## Features

- Organized learning notes by technology
- Multiple levels of navigation for quick access
- Responsive layout
- Desktop sidebar navigation
- Mobile drawer navigation
- Internal guide summaries for longer topics
- Dark theme interface
- Built entirely with reusable React components

---

## Tech Stack

Frontend

- React 19
- React Router
- Vite
- Tailwind CSS

Utilities

- Axios

Deployment

- Vercel

---

## Running Locally

Clone the repository

```bash
git clone https://github.com/Ivan-Alexis-Tan/tutorial-compiled-notes
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## Future Plans

Some ideas planned for future updates include:

- Continue migrating older notes
- Add syntax highlighting for code examples
- Add search functionality
- Improve overall styling
- Continue expanding topics as I learn new technologies

---

## Disclaimer

These notes are written primarily as a personal reference.

They assume I already understand the surrounding context, so they may not always contain detailed explanations suitable for someone learning the topic for the first time.

---

## License

No license has been specified for this project.