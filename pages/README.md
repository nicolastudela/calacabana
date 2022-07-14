# NextJS Routing and API Routes

## Routing System

NextJS uses a path based routing system, no React Router is needed for routing. This particular routing system enables application to work both with SSR/SSG and CSR at the same time. Applications will behave as Static Pages for first render, Hydrating React app later and becoming a SPA.

This means that pointing to, `http://domain/some/path` will load the page available on the `./pages/some/path.js`.

Routing will work both on server side SSR/SSG and client side using special NextJS Routing components and hooks.

[NextJS Routing Documentation](https://nextjs.org/docs/routing/introduction)

### About `./pages` Folder

All js files inside `/page` folder are consider pages, and must follow some structure well defined by NextJS.

> ⚠️ **We can't put Components on any subfolder of pages**

[NextJS Pages Documentation](https://nextjs.org/docs/basic-features/pages)

### About `./pages/api` Folder

All js files inside `/page/api` folder are considered a NextJS middleware API. This is intended to adapt data coming from different APIs or data sources to be accessed by SSR and SSR.

> ⚠️ **API Routes are not enabled during build phase** thus we cannot use them on any `getStaticProps` function on any static page.

[NextJS API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)

### Dynamic Routing

We can have dynamic routing using NextJS, that means loading a templated page that will be adapted based on some slug on the url.

Dynamic routing is implemented in a similar way using special named paths, any param on our path must be specified between brackets either at a folder or file level,

- `./pages/some/dynamic/[path].js`
  - Will catch any route that doesn't have a full path match
  - Will make the param value to be accessible on the code
  - `http://domain/some/dynamic/foo` will render the page present at `./pages/some/dynamic/[path].js` and make `foo` available as the value of the param `path`
- `./pages/some/[granular]/dynamic/[path].js`
  - Will catch any route that doesn't have a full path match
  - Will make the params values to be accessible on the code
  - `http://domain/some/bar/dynamic/foo` will render the page present at `./pages/some/[granular]/dynamic/[path].js` and make `foo` available as the value of the param `path`, and `bar` available as the value of the param `granular`

Same logic applies for `./page/api/...`

[NextJS Dynamic Routing Documentation](https://nextjs.org/docs/routing/dynamic-routes)

## Basic flows for Rendering

### CSR (Client Side Rendering)

NextJS will deliver the minimum HTML markup to attach the Single Page Application on the Client Side, browser will download JS Chunks and any other needed content and render React components fully client side.

- Faster time to interactive
- Slower time to first full view
- Bad SEO Scoring, no static content present
- No server required, all content can be cached by CDN

![CSR Diagram](https://i.ibb.co/RbgWZ83/CSR.png 'CSR Diagram')

### SSR (Server Side Rendering)

NextJS will build static HTML content on the server side after client request. Once browser renders the HTML version of the page will download JS Chunks and hydrate the React Components for dynamic and interaction.

- Faster time to first full view
- Slower time to interactive
- Better SEO Scoring, first view is fully rendered on the server side
- Enable dynamic prebuilt on server side based on state
- Requires more server computation power
- Requires a running server

![SSR Diagram](https://i.ibb.co/KzwVvk8/SSR.png 'SSR Diagram')

### SSG (Static Site Generation)

NextJS will prebuilt static HTML Content during build phase. Once browser renders the HTML version of the page will download JS Chunks and hydrate the React Components for dynamic and interaction. It's similar to SSR, but HTML is prebuilt on build phase, some limitations applied because of this.

- Fastest time to first full view
- Slower time to interactive
- Better SEO Scoring, first view is prebuilt on server side
- All content must be static, no state during build phase
- No server required, all content can be cached by CDN

![SSG Diagram](https://i.ibb.co/VHwr0kR/SSG.png 'SSG Diagram')

## Data Fetching

Data fetching is the process on getting data server side, to be delivered as part of the initial render and make it available for Hydrate React components after.

### SSG Data Fetching

Static Site Generation is run during the build phases for predefined routes, or on demand for undefined routes if enabled.

#### **getStaticPaths**

Static Site build phase is configured using the `getStaticPaths` function that must be exported on every page implementing that functionality. In this file we setup the routes to prebuilt as long as the post build configuration. This is necessary if we are using Dynamic Routing, otherwise the absolute path will be prebuilt and no `getStaticPaths` function is needed.

> ⚠️ **API Routes is not available during build phase** You must get data from source without using the NextJS API Middleware because the NextJS node server is not running during build phase.

[NextJS getStaticPaths Documentation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)

#### **getStaticProps**

Data to generate the static page is retrieved using the `getStaticProps` function exported by the page generating static content. This function will return a set of props that will be injected on the react component both during build phase to generate the static view and during hydration to generate dynamic views.

Component generated during the build phase will be bundled as an HTML file so the browser can quickly render a full first view. Along with the HTML markup, a JSON object will be send with all the information to hydrate the components once Browser execute react.

For dynamic route pages with [fallback enabled](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required), we can provide a `notFound` attribute to validate static data before delivering the content to the browser, redirecting to a 404 page if data is invalid.

We can provide a `revalidate` attribute that will invalidate cache once `revalidate` seconds elapsed and will require to rebuild static page.

> ⚠️ **API Routes is not available during build phase** You must get data from source without using the NextJS API Middleware because the NextJS node server is not running during build phase.

> ⚠️ **All data passed to `props` is bundled on the JSON object** Despite of using or not on the Component, all data passed to the props attribute will be available on the HTML file as a JSON object t hydrate the Component once React is executed. Is important to filter data and limit the props to just the needed and public available information. This is important both for performance and security issues

[NextJS getStaticProps Documentation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)

### SSR Data Fetching

#### **getServerSideProps**

Similar to `getStaticProps` except that this is run on the server with every new request to the site, API Middleware routes are available here, and we can deliver any dynamic page we want because no cache is going to happen to this type of pages.

Same params apply to this function, except for `invalidate` that is not needed because there's no caching from NextJS Side.

[NextJS getServerSideProps Documentation](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)
