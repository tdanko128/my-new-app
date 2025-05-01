# Express + EJS Web App Boilerplate

This is a simple Node.js boilerplate using Express.js and EJS templating, ideal for building dynamic web apps.

---

## 🚀 Features

- Express.js routing
- EJS templating with layouts
- Static asset handling (CSS, JS, images)
- Environment-based configuration support
- Clean separation of dev vs. production

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)

---

## 💻 Development Setup

1. Clone the repository:

```bash
git clone https://github.com/tdanko128/node_js_web_app_template.git
cd node_js_web_app_template
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server using `nodemon`:

```bash
npm run dev
```

> ⚠️ If you don't have `nodemon`, install it with:
> ```bash
> npm install --save-dev nodemon
> ```

---

## 🔧 Available Scripts

### `npm run dev`
Starts the app using `nodemon` (for development).

### `npm start`
Starts the app using `node app.js` (for production).

---

## 🚢 Preparing for Production

1. **Remove dev tools (like nodemon):**

```bash
npm uninstall nodemon
```

2. **Ensure your `start` script in `package.json` uses `node`:**

```json
"scripts": {
  "start": "node app.js"
}
```

3. **Install only production dependencies:**

```bash
npm install --production
```

4. **Set environment variables:**

Use a `.env` file for local development and set real environment variables in your hosting provider.

Example `.env` file:

```
PORT=3000
NODE_ENV=development
```

Make sure `.env` is in `.gitignore`.

---

## ✅ Example Folder Structure

```
your-app-name/
├── public/
│   └── css/
├── routes/
│   └── index.js
├── views/
│   ├── partials/
│   └── index.ejs
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

## 🧬 Creating a New Project from This Boilerplate

There are two options depending on whether you're using a local copy or a GitHub template:

### 🌐 Clone from GitHub Template

If you've already published this boilerplate to GitHub (e.g., as `template-web-app`):

```bash
# Clone the template
git clone https://github.com/tdanko128/node_js_web_app_template.git my-new-app
cd my-new-app

# Remove the original GitHub remote
git remote remove origin

# Create a new repo: https://github.com/new
git remote add origin https://github.com/yourusername/my-new-app.git
git push -u origin master
```

Now your new app is connected to its own GitHub repo and ready to develop.
