# Rural Safety Guardian

Rural Safety Guardian is a lightweight community safety website for small towns and rural families. It combines severe weather preparation, emergency planning, and simple cybersecurity guidance in one clear, easy-to-use place.

## What's Included

- A responsive landing page with safety guidance and action-focused sections
- Weather readiness tips for storms, floods, heat, and winter conditions
- Emergency planning checklists for families and households
- Basic cybersecurity advice written in plain language
- Community reminder cards that can be used as a simple safety dashboard

## Project Structure

- `index.html` - main site markup
- `styles.css` - visual design and responsive layout
- `script.js` - lightweight interactive reminders and checklist behavior
- `preview.ps1` - local preview server launcher
- `start-preview.cmd` - double-click launcher for the preview
- `overview.md` - short project summary

## Local Preview

Start a local preview server with:

```powershell
powershell -ExecutionPolicy Bypass -File .\preview.ps1
```

Then open `http://localhost:4173`.

This project is configured to use the Anaconda Python installed at `C:\Users\bestc\anaconda3\python.exe`.

If you prefer, you can also launch `start-preview.cmd` from File Explorer or the terminal.

## Purpose

Rural communities often deal with longer response times, fewer nearby resources, and scattered information. This project is intended to bring practical guidance into one helpful starting point that families can use from a phone or desktop device.
