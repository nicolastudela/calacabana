# CALACABANA


## Environment Config   


__Debugging pourposes__  

`MOCK_CALENDAR_API=true` Will return stubbed results from calendar API. Won't hit real GoogleAPI.

`MAINTENANCE_MODE=1` Will redirect all trafic to a static maintenance page

__Required__

*Sengrid api key*

`SENDGRID_KEY`

*GoogleCalendar API related*

`GOOGLE_PRIVATE_KEY`

`GOOGLE_CLIENT_EMAIL`

`GOOGLE_CALENDAR_SCOPES_FULL`

`GOOGLE_CALENDAR_SCOPES_READ_ONLY`

`GOOGLE_PROJECT_NUMBER`

`CABANA_GOOGLE_CALENDAR_ID`

`CALA_GOOGLE_CALENDAR_ID`

Follow this a explanatory tutorial on [how to configure Google Account](https://www.geeksforgeeks.org/how-to-integrate-google-calendar-in-node-js/)


## Next.js How to start app on dev 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Server Side Debugging

For debugging on the server you need to run the project using
```bash
yarn dev-debug
```
### Using Chrome inspector:

After that you can open a new tab in Google Chrome and go to `chrome://inspect`, you should see your Next.js application inside the "Remote Target" section. Now click "inspect" to open a screen that will be your debugging environment from now on. 

Another way to open the dedicated DevTools for node is having the DevTools opened and then clicking on the "node button" that is next to the "toggle device button".

### Using VSCode

We will be using the `attach` mode of VS Code to attach the VS Code inspector to our running project started with `yarn dev-debug`.

You need to create a `launch.json` file inside the `.vscode` folder with this content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "attach",
      "name": "Attach Nodejs",
      "skipFiles": ["<node_internals>/**"],
      "sourceMaps": true,
      "port": 9229
    }
  ]
}
```
For more info about debugging Next.js applications you can visit https://nextjs.org/docs/advanced-features/debugging

------------------
