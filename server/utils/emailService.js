import { createTransport } from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
    // Remove service: 'gmail' to have more control
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
      ciphers: 'SSLv3' // Support older SSL versions if needed
    },
    connectionTimeout: 10000, // 10 seconds connection timeout
    greetingTimeout: 10000, // 10 seconds greeting timeout
    socketTimeout: 15000, // 15 seconds socket timeout
    pool: true, // Use pooled connections
    maxConnections: 5, // Maximum number of simultaneous connections
    maxMessages: 100, // Maximum messages per connection
  });
};

// Send contact form notification email
export const sendContactFormEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BitWisdom Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL, // Owner's email address
      subject: `New Contact Form Submission - ${contactData.subject || 'No Subject'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0080ff; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00f0ff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${contactData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${contactData.email}</div>
              </div>
              ${contactData.organization ? `
              <div class="field">
                <div class="label">Organization:</div>
                <div class="value">${contactData.organization}</div>
              </div>
              ` : ''}
              ${contactData.subject ? `
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${contactData.subject}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${contactData.message}</div>
              </div>
              <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};

// Send qualifying application notification email
export const sendQualifyingApplicationEmail = async (applicationData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BitWisdom Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL, // Owner's email address
      subject: `New Qualifying Customer Application - ${applicationData.businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; color: #0080ff; margin-bottom: 10px; border-bottom: 2px solid #00f0ff; padding-bottom: 5px; }
            .field { margin-bottom: 12px; }
            .label { font-weight: bold; color: #666; }
            .value { margin-top: 3px; padding: 8px; background: white; border-left: 3px solid #00f0ff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Qualifying Customer Application</h2>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Business Information</div>
                <div class="field">
                  <div class="label">Business Name:</div>
                  <div class="value">${applicationData.businessName}</div>
                </div>
                <div class="field">
                  <div class="label">Business Address:</div>
                  <div class="value">${applicationData.businessAddress}</div>
                </div>
                <div class="field">
                  <div class="label">Phone Number:</div>
                  <div class="value">${applicationData.phoneNumber}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${applicationData.emailAddress}</div>
                </div>
                <div class="field">
                  <div class="label">Business Type:</div>
                  <div class="value">${applicationData.businessType}</div>
                </div>
                <div class="field">
                  <div class="label">Registration Number:</div>
                  <div class="value">${applicationData.registrationNumber}</div>
                </div>
                <div class="field">
                  <div class="label">Registration Jurisdiction:</div>
                  <div class="value">${applicationData.registrationJurisdiction}</div>
                </div>
                <div class="field">
                  <div class="label">Tax ID:</div>
                  <div class="value">${applicationData.taxId}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Ownership Information</div>
                <div class="field">
                  <div class="label">Beneficial Owners:</div>
                  <div class="value">${applicationData.beneficialOwners}</div>
                </div>
                <div class="field">
                  <div class="label">Nationality:</div>
                  <div class="value">${applicationData.nationality}</div>
                </div>
                <div class="field">
                  <div class="label">Corporate Structure:</div>
                  <div class="value">${applicationData.corporateStructure}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Financial Information</div>
                <div class="field">
                  <div class="label">Source of Funds:</div>
                  <div class="value">${applicationData.sourceOfFunds}</div>
                </div>
                <div class="field">
                  <div class="label">Intended Use:</div>
                  <div class="value">${applicationData.intendedUse}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Submitted Documents</div>
                <div class="field">
                  <div class="value">
                    ✓ Government ID<br>
                    ✓ Articles of Incorporation<br>
                    ✓ Certificate of Incorporation<br>
                    ✓ Proof of Address
                  </div>
                </div>
              </div>

              <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Qualifying application email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending qualifying application email:', error);
    throw error;
  }
};

// Send waitlist notification email
export const sendWaitlistEmail = async (waitlistData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BitWisdom Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Waitlist Signup - ${waitlistData.waitlistType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0080ff; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00f0ff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Waitlist Signup</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Waitlist Type:</div>
                <div class="value">${waitlistData.waitlistType}</div>
              </div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${waitlistData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${waitlistData.email}</div>
              </div>
              <div class="field">
                <div class="label">Submitted At:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Waitlist email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending waitlist email:', error);
    throw error;
  }
};

// Send confirmation email to user who submitted contact form
export const sendContactConfirmationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BitWisdom" <${process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: 'Thank you for contacting BitWisdom',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%); color: white; padding: 30px 20px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .message { background: white; padding: 20px; border-left: 4px solid #00f0ff; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">BitWisdom</h1>
              <p style="margin: 10px 0 0 0;">Message Received</p>
            </div>
            <div class="content">
              <p>Dear ${contactData.name},</p>
              <p>Thank you for reaching out to BitWisdom. We have received your message and our team will review it shortly.</p>
              <div class="message">
                <h3 style="margin-top: 0; color: #0080ff;">Your Message:</h3>
                ${contactData.subject ? `<p><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
                <p>${contactData.message}</p>
              </div>
              <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to us directly.</p>
              <div class="footer">
                <p><strong>BitWisdom Team</strong></p>
                <p>Email: ${process.env.EMAIL_USER}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact confirmation email sent to user:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to user who submitted qualifying application
export const sendQualifyingConfirmationEmail = async (applicationData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BitWisdom" <${process.env.EMAIL_USER}>`,
      to: applicationData.emailAddress,
      subject: 'Your BitWisdom Qualifying Application Has Been Received',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%); color: white; padding: 30px 20px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .info-box { background: white; padding: 20px; border-left: 4px solid #00f0ff; margin: 20px 0; }
            .next-steps { background: #e6f7ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">BitWisdom</h1>
              <p style="margin: 10px 0 0 0;">Application Received</p>
            </div>
            <div class="content">
              <p>Dear ${applicationData.businessName} Team,</p>
              <p>Thank you for submitting your Qualifying Customer Application to BitWisdom. We have successfully received your application.</p>
              <div class="info-box">
                <h3 style="margin-top: 0; color: #0080ff;">Application Details:</h3>
                <p><strong>Business Name:</strong> ${applicationData.businessName}</p>
                <p><strong>Business Type:</strong> ${applicationData.businessType}</p>
                <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="next-steps">
                <h3 style="margin-top: 0; color: #0080ff;">Next Steps:</h3>
                <ul>
                  <li>Our compliance team will review your application and submitted documents</li>
                  <li>We will verify your business information and conduct due diligence</li>
                  <li>You will receive an update on your application status within 5-7 business days</li>
                  <li>If additional information is required, we will contact you directly</li>
                </ul>
              </div>
              <p>If you have any questions about your application, please don't hesitate to contact us.</p>
              <div class="footer">
                <p><strong>BitWisdom Compliance Team</strong></p>
                <p>Email: ${process.env.EMAIL_USER}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Qualifying confirmation email sent to user:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending qualifying confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to user who joined waitlist
export const sendWaitlistConfirmationEmail = async (waitlistData) => {
  try {
    const transporter = createTransporter();

    const waitlistTypeDisplay = waitlistData.waitlistType === 'mobile-node'
      ? 'Mobile Node'
      : waitlistData.waitlistType === 'laptop-node'
      ? 'Laptop Node'
      : waitlistData.waitlistType;

    const mailOptions = {
      from: `"BitWisdom" <${process.env.EMAIL_USER}>`,
      to: waitlistData.email,
      subject: `You're on the BitWisdom ${waitlistTypeDisplay} Waitlist!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00f0ff 0%, #0080ff 100%); color: white; padding: 30px 20px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
            .welcome-box { background: white; padding: 20px; border-left: 4px solid #00f0ff; margin: 20px 0; text-align: center; }
            .info-box { background: #e6f7ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">BitWisdom</h1>
              <p style="margin: 10px 0 0 0;">Welcome to the Waitlist</p>
            </div>
            <div class="content">
              <p>Dear ${waitlistData.name},</p>
              <div class="welcome-box">
                <h2 style="color: #0080ff; margin-top: 0;">🎉 You're In!</h2>
                <p>You've successfully joined the <strong>${waitlistTypeDisplay}</strong> waitlist.</p>
              </div>
              <p>Thank you for your interest in BitWisdom's ${waitlistTypeDisplay} program. We're excited to have you on board!</p>
              <div class="info-box">
                <h3 style="margin-top: 0; color: #0080ff;">What Happens Next?</h3>
                <ul style="text-align: left;">
                  <li>We'll keep you updated on the development progress</li>
                  <li>You'll be among the first to know when ${waitlistTypeDisplay} becomes available</li>
                  <li>We'll send you exclusive early access information</li>
                  <li>No action is needed from you at this time - just stay tuned!</li>
                </ul>
              </div>
              <p>In the meantime, feel free to explore our website and learn more about our vision for decentralized AI infrastructure.</p>
              <div class="footer">
                <p><strong>BitWisdom Team</strong></p>
                <p>Email: ${process.env.EMAIL_USER}</p>
                <p style="margin-top: 15px; font-size: 12px; color: #999;">You're receiving this email because you signed up for the BitWisdom ${waitlistTypeDisplay} waitlist.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Waitlist confirmation email sent to user:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending waitlist confirmation email:', error);
    throw error;
  }
};

// Generic email sender (for future use)
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"BitWisdom" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
