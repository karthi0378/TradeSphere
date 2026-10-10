
# TradeSphere Web Frontend

This frontend uses plain HTML, CSS and JavaScript so it is easy to understand and present in a BCA viva.

## Run

1. Start the Flask backend:
   `python run.py`
2. Open `index.html` in a browser.

If the browser blocks local API requests, serve the frontend with a small local server from the frontend folder:

```powershell
python -m http.server 5500
```

Then open:
`http://127.0.0.1:5500`

The frontend calls:
`http://127.0.0.1:5000/api`
