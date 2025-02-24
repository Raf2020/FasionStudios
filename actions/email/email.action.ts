"use server";

import { AppConfig } from "@/shared/constants/app.const";
import { bookingEmailTemplate } from "@/shared/email-templates/booking.email";
import nodemailer from "nodemailer";

export const sendEmailForBooking = async (email: string, userName: string) => {
  let template = bookingEmailTemplate;
  template = template.replace("{{USER_NAME}}", userName);
  return await sendEmail(email, undefined, template);
};

export const sendEmail = async (
  email: string,
  text?: string,
  html?: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Usually 587 for TLS
      secure: false, // Set to true for port 465
      auth: {
        user: AppConfig.SenderGmail,
        pass: AppConfig.SenderGmailPass, // App password
      },
    });

    const mailOptions = {
      from: `Fusion Studio <${AppConfig.SenderGmail}>`,
      to: email,
      subject: "Welcome to Fusion Studio",
      text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
};

/**
 * How to get App Password
 * 1. Enable 2-step verification for gmail
 * 2. Search for "app password" in search box of myaccount.google.com
 */
