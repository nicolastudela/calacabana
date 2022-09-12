# CALACABANA


## Environment Config   


__Debugging pourposes__  

`MOCK_CALENDAR_API=1` Will return stubbed results from calendar API. Won't hit real GoogleAPI.

`MAINTENANCE_MODE=1` Will redirect all trafic to a static maintenance page

`NEXT_PUBLIC_MOCK_MAPS=1` Will show an empty box instead of the real map

`MOCK_GOOGLE_PLACES_REVIEWS_API=1` Will mock reviews fetch from place API (outstanding reviews)

__Required__

*Email addresses*

`OWNER_NOTICE_EMAIL_RECIPIENT` Email address where the apartment manager wants to be notified about some event.

`OTHER_NOTICE_EMAIL_RECIPENTS` Email addresses list (csv formatted) of people that wants to susbribe to notifications.

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

*GooglePlaces API related*

`GOOGLE_PLACES_API_KEY` 

`GOOGLE_PLACES_ID` (this is the google place id given for calacabana, i.e. where we can fetchreviews and other info about the google place)

`GOOGLE_PLACE_OUTSTANDING_REVIEWS_API_PATH` (this is a google_place url, where we fetch "outstanding" reviews, 5 more relevant. To get all google reviews we would need to access google bussiness apis)

*GoogleAnalytics API*

`NEXT_PUBLIC_GA_ID` Analitics GTAG id used. (We currently using one for production and others envs)


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
