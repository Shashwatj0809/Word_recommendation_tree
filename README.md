#  Bigram Word Recommendation Mind Map

A simple, interactive web app that suggests possible next words based on a user’s input using a **Bigram Tree Model** built in Python. The frontend is built with **React.js + Vite**, and the backend uses **Flask** with a tree-like data structure to provide dynamic suggestions.

---

## ✨ Features

-  **Bigram Tree-based Prediction** – Suggests next words based on static corpus input.
-  **Live Recommendations** – Suggestions appear instantly as you type.
-  **Mind Map Visualization** – Tracks the word flow like a mental model.
-  **Frontend in React** – Lightweight, modern, and responsive.
-  **Backend in Python (Flask)** – Simple API serving intelligent responses.

---

## 🏗 Architecture Overview

```text
┌─────────────┐        (1) User types a word         ┌──────────────┐
│   Browser   ├────────────────────────────────────▶│  React Frontend
└────┬────────┘                                      │ (Vite
