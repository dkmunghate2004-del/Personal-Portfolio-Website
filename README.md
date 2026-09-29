# Personal Portfolio (Full-Stack)

Frontend: HTML/CSS/JS · Backend: Node.js + Express · Database: MongoDB

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and set `MONGODB_URI` (free cluster at mongodb.com/atlas, or local MongoDB)
3. `npm start` → open http://localhost:3000

## Add a project
curl -X POST localhost:3000/api/projects -H "Content-Type: application/json" \
 -d '{"title":"My App","description":"What it does","tech":["React"],"link":"https://...","repo":"https://github.com/..."}'

## Deploy (Render / Railway / Heroku)
Push to GitHub, create a Node web service, build `npm install`, start `npm start`,
and add `MONGODB_URI` as an environment variable. (Netlify/Vercel host only static files; use them only if you convert the API to serverless functions.)

## Personalize
Edit "Your Name", the about text and skills in `public/index.html`, and replace the `seed` projects in `server.js`.
