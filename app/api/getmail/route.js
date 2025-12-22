import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { from, subject, body } = await request.json();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });
  const mailOptions = {
    from: from,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: body, 
  };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred: ' + error.message);
      return NextResponse.json({ message: 'Failed to send email' } , { status: 500 });
    }});


  return NextResponse.json({ message: 'Email sent successfully' } , { status: 200 });
}