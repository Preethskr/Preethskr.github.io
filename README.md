# Portfolio

A simple static portfolio site: plain HTML, CSS, and JavaScript, no build step.

## Files

- `index.html`: all the content. Search for `TODO` to find what to fill in.
- `styles.css`: styling. Change `--accent` at the top to set your brand color.
- `script.js`: mobile menu, dark mode toggle, and scroll animations.

## Preview locally

```sh
cd ~/portfolio
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy (GitHub Pages)

1. Create a repo named `<your-username>.github.io` on GitHub.
2. Push this folder to it.
3. The site goes live at `https://<your-username>.github.io`.

Netlify and Vercel also work: drag and drop the folder, or connect the repo.

## Custom domain (e.g. yourname.com)

1. Buy the domain from a registrar (Cloudflare, Namecheap, Porkbun, Squarespace Domains, etc.).
   It usually costs about $10–15/year for a `.com`.
2. Add a file named `CNAME` to this folder whose only line is your domain, e.g. `preethiramanujam.com`.
3. At your registrar, add these DNS records:
   - `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a `CNAME` record for `www` pointing to `<your-username>.github.io`
4. In the GitHub repo, go to **Settings → Pages**, enter the domain, and turn on **Enforce HTTPS** once it appears.

DNS changes can take up to a few hours to go live.
