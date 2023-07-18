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
  const {name, phone, email, subject, message} = req.body;

  if (!name || !email || !subject || !message) {
    warn("Invalid form data should not exist!");
    warn(`Name: ${name} Phone number ${phone} Email: ${email} Subject: ${subject} Message: ${message}`);

    return res.status(406).end(`I need a valid email:\n\
      name: ${name}\n\
      phone: ${phone}\n\
      email: '${email}'\n\
      subject: '${subject}'\n\
      message: '${message}'\n`
    );
  }

  _sendEmail("orsobrunoradauti@gmail.com", name, email, subject, message, phone??'');
  _sendEmail("ifrim_gicusor@icloud.com", name, email, subject, message, phone??'');

  return res.status(200).send("Email has been successfully sent");
});

function _sendEmail(emailTo: string, name: string, emailFrom: string, subject: string, message: string, phone: string) {
  const msg = {
    from: "zingier.hobby0e@icloud.com", // Change to your verified sender
    to: emailTo, // Change to your recipient
    subject: subject,
    text: "This is the text part and I still don't know what it is for",
    html: `<h1>Vuia loft apartments</h1>\
      <h3>${name}</h3>\
      <p>email: ${emailFrom}</p>\
      <p>tel: ${phone}</p>\
      <p>message</p>\
      <p>${message}</p>`,
  };


  sgMail.send(msg)
    .then(() => {
      info(`Email sent to <${emailTo}> from custumer's email <${emailFrom}>`);
    })
    .catch((error) => {
      _error(error);
    });
}

export const sendEmail = onRequest(app);
