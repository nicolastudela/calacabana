import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  undefined,
  process.env.GOOGLE_PRIVATE_KEY,
  process.env.GOOGLE_CALENDAR_SCOPES_READ_ONLY
);

const calendar = google.calendar({
  version: "v3",
  // project: process.env.GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    // console.error(err.stack);
    res.status(500).json({error: err});
  },
  onNoMatch: (_req, res) => {
    res.status(404).send("Request can't be resolved");
  },
}).get(async (_req, res) => {
    const eventsResponse = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    if (eventsResponse.status === 200) {
      res.status(200).json(eventsResponse.data.items);
    } else {
      res
        .status(eventsResponse.status)
        .json({ statusText: eventsResponse.statusText });
    }
}).post((req,_post,next) => {
  console.log(`1er post: ${req}`);
  next();
}).post((_req,res) => res.status(404).send("LA CONCHA DE TU MADRE ALBOYS"));

export default handler;
