/* eslint-disable */
// import * as functions from 'firebase-functions';
import {onRequest} from "firebase-functions/v2/https";
import {warn, info, error as _error} from "firebase-functions/logger";
import * as express from "express";
import * as cors from "cors";

import sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/", (req, res) => {
  const {email, subject, message} = req.body;

  if (!email || !subject || !message) {
    warn("Invalid form data should not exist!");
    warn(`Email: ${email}`);
    warn(`Subject: ${subject}`);
    warn(`Message: ${message}`);

    return res.status(406).end(`I need a valid email:\n\
      email: '${email}'\n\
      subject: '${subject}'\n\
      message: '${message}'\n`
    );
  }

  sendEmail("orsobrunoradauti@gmail.com", email, subject, message);
  sendEmail("ifrim_gicusor@icloud.com", email, subject, message);

  return res.status(200).send("Email has been successfully sent");
});

function sendEmail(emailTo: string, emailFrom: string, subject: string, message: string) {
  const msg = {
    from: "zingier.hobby0e@icloud.com", // Change to your verified sender
    to: emailTo, // Change to your recipient
    subject: subject,
    text: "This is the text part and I still don't know what it is for",
    html: `<h1>Vuia loft apartments</h1>\
      <h3>Persoana cu emailul ${emailFrom} a scis:</h3><p>${message}</p>`,
  };

  sgMail.send(msg)
    .then(() => {
      info(`Email sent to <${emailTo}> from custumers email <${emailFrom}>`);
    })
    .catch((error) => {
      _error(error);
    });
}

export const helloWorld = onRequest(app);
