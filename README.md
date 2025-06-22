# Full Stack Engineer Challenge – Payload CMS + Lexical

Hi, I’m Sahil 👋

This repo is my submission for the Full Stack Engineer Challenge. The project is built with **Payload CMS** using **Lexical Editor**, MongoDB, and custom rich text features in TypeScript.

---

## ✅ What I’ve Built

- **Payload CMS Setup**  
  Started with the Payload blank template and connected it to a MongoDB database.

- **Post Collection**  
  Added a simple `Posts` collection with:
  - `title` field (plain text)
  - `content` field (custom Lexical editor)

- **Custom Lexical Editor**  
  Replaced Payload’s default editor with a fully custom Lexical editor including a floating toolbar.

- **Highlight Feature (`<mark>`)**  
  - Added a toolbar button to wrap/unwrap selected text in `<mark>` tags  
  - Button reflects active state  
  - Correctly exports as `<mark>` in HTML

- **Footnote Feature (`<sup>`)**  
  - Replaced superscript with a footnote system  
  - Clicking the button inserts a footnote with global auto-numbering  
  - Modal allows entering rich text content  
  - When exporting to HTML:
    - `<sup><a href=...>` links are rendered in content
    - Footnotes are collected in a `<footer><ul><li>…</li></ul></footer>` at the end

- **Custom Toolbar**  
  Built from scratch, includes:
  - Bold, Italic, Underline, Strikethrough  
  - Highlight  
  - Footnote button (replacing Superscript)
  - Removed Subscript button



##Loom video Link :-  https://www.loom.com/share/69607e7384494862980a71149082ebb3?sid=3ff4d100-5346-4be6-b06d-db6e9d6b5c0f


