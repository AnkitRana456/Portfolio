import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, and message.'
      });
    }

    let savedMessage = null;
    let dbStatus = 'disconnected';

    // 1. Try persisting to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const newMessage = new Message({ name, email, message });
        savedMessage = await newMessage.save();
        dbStatus = 'saved_to_mongodb';
      } catch (dbErr) {
        console.error('MongoDB save error:', dbErr.message);
        dbStatus = 'save_error';
      }
    } else {
      console.log('MongoDB not connected, logging message to server console fallback.');
      console.log('New Contact Submission:', { name, email, message, timestamp: new Date() });
    }

    // 2. Try sending Email via Nodemailer if EMAIL_USER & EMAIL_PASS are configured
    let emailStatus = 'skipped';
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass && emailPass !== 'your_app_password_here' && emailPass !== 'demo_pass') {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        await transporter.sendMail({
          from: `"Portfolio Terminal" <${emailUser}>`,
          to: 'ankitrana210704@gmail.com',
          subject: `[Dev Console] New Message from ${name}`,
          html: `
            <div style="font-family: monospace; background: #0a0e0f; color: #00ffc2; padding: 20px; border-radius: 8px;">
              <h2 style="color: #ffb454;">> NEW TERMINAL MESSAGE RECEIVED</h2>
              <hr style="border-color: #1a2628;" />
              <p><strong>NAME:</strong> ${name}</p>
              <p><strong>EMAIL:</strong> ${email}</p>
              <p><strong>TIMESTAMP:</strong> ${new Date().toISOString()}</p>
              <hr style="border-color: #1a2628;" />
              <p><strong>MESSAGE:</strong></p>
              <p style="background: #111719; padding: 12px; color: #e2e8f0; border-left: 3px solid #00ffc2;">${message}</p>
            </div>
          `
        });
        emailStatus = 'sent';
      } catch (mailErr) {
        console.error('Nodemailer Error:', mailErr.message);
        emailStatus = 'failed';
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Message processed successfully',
      meta: {
        dbStatus,
        emailStatus,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Contact Handler Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error while executing command.'
    });
  }
});

export default router;
