# WEB103 Project 1 - *Lantern List*

Submitted by: Mithun Venkatesh Gowda

About this web app: **Lantern List is a field guide to eight night markets and night food streets in Taipei, Bangkok, Hong Kong, and Seoul. Each stop shares the same details — name, city, region, specialty, hours, price, vibe, and a photo — so you can browse the list and open a page for every market.**

Time spent: 2-4 hours

## Required Features
The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app displays a title**
- [x] **The web app displays at least five unique list items, each with at least three displayed attributes (such as title, text, and image)**
- [x] **The user can click on each item in the list to see a detailed view of it, including all database fields**
  - [x] **Each detail view should be a unique endpoint, such as as `http://localhost:3000/markets/raohe` and `localhost:3000/markets/yaowarat`**
- [x] **The web app serves an appropriate 404 page when no matching route is defined**
- [x] **The web app is styled using Picocss**

The following **optional** features are implemented:

- [x] The web app displays items in a unique format, such as cards rather than lists or animated list items

The following **additional** features are implemented:

- [x] Filter the list by region (Taiwan, Thailand, Hong Kong, South Korea)
- [x] Search markets by name, city, specialty, or description

## Video Walkthrough

**Note: please be sure to show the unique URL for each detailed view in the address bar.**
Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/)

## Notes
To run the app, use two terminals, the same way as the [WEB103 Lab 1 exemplar](https://github.com/codepath/web103-lab1-exemplar):

1. Open a terminal and navigate into the `client` directory.
2. Run `npm install` to install the client dependencies.
3. Run `npm run dev` to start the frontend.
4. Open a **new** terminal and navigate into the `server` directory.
5. Run `npm install` to install the server dependencies.
6. Run `npm run start` to start the backend.

Open [http://localhost:5173](http://localhost:5173). That is the site. The Vite dev server forwards `/api` to the Express server on port 3001. Opening [http://localhost:3001](http://localhost:3001) shows the API heading, not the market pages.

Detail routes follow `/markets/:slug` on the Vite site, for example [http://localhost:5173/markets/raohe](http://localhost:5173/markets/raohe). An unknown slug, such as `/markets/not-a-market`, and any other unknown path render the client 404 page.

The list items share the same fields on purpose, so Unit 2 can move this data into a database without redesigning the pages. Photos are stored in `client/public/images` and come from Unsplash.

The fiddly part was making the detail route and the 404 agree: `/markets/raohe` should render a market, while `/markets/nope` should be a 404 instead of an empty detail page.

## License

Copyright 2026 Mithun V Gowda

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
