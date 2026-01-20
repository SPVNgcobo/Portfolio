# Email Setup Guide for Portfolio Contact Form

## Overview

Your portfolio contact form is now configured to send emails using **EmailJS**, a free service that allows sending emails directly from the frontend without needing a backend server.

## Setup Instructions

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up Free" (or Sign In if you already have an account)
3. Complete the registration process
4. Verify your email

### Step 2: Create an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click "Add Service"
3. Choose **Gmail** (or your preferred email provider)
4. Follow the prompts to authorize EmailJS to send emails from your Gmail account
   - You may need to create an app password if you have 2FA enabled
5. Copy your **Service ID** (looks like: `service_xxxxxxxxxxxxx`)

### Step 3: Create an Email Template

1. Go to **Email Templates**
2. Click "Create New Template"
3. Configure the template with these settings:

**Template Settings:**

- **To Email:** `{{to_email}}`
- **From Email:** `{{from_email}}`
- **From Name:** `{{from_name}}`
- **Subject:** New Contact Form Submission - {{subject}}

**Email Body Template:**

```text
Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Subject: {{subject}}

Message:
{{message}}

---
This is an automated message from your portfolio contact form.
```

4. Click "Save Template"
5. Copy your **Template ID** (looks like: `template_xxxxxxxxxxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account Settings** (icon in the top-right)
2. Click on the **API** tab
3. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxx`)

### Step 5: Update Your Code

Open `script.js` and replace the placeholder values:

```javascript
// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace this
})();

// In the form submission handler, replace:
const response = await emailjs.send(
    "YOUR_SERVICE_ID_HERE",  // Replace with your Service ID
    "YOUR_TEMPLATE_ID_HERE",  // Replace with your Template ID
    {
        to_email: "s.p.ngcobo@outlook.com", // Update if needed
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || "Not provided",
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
    }
);
```

**Example after replacement:**

```javascript
emailjs.init("pk_48f2ksjdh2d_8s7d82d92d");
emailjs.send(
    "service_1a2b3c4d5e6f",
    "template_9z8y7x6w5v4u",
    { ... }
);
```

### Step 6: Test Your Form

1. Save all changes
2. Open your portfolio in a browser
3. Fill out the contact form
4. Click "Send Message"
5. You should receive an email at the address configured in your EmailJS service

## Features Included

- ✅ **Form Validation** - All required fields must be filled
- ✅ **Loading State** - Button shows "Sending..." while processing
- ✅ **Success Message** - Confirmation message appears after sending
- ✅ **Error Handling** - Clear error messages if something goes wrong
- ✅ **Auto-Reset** - Form clears after successful submission
- ✅ **Reply-To Header** - Sender's email is set as reply-to

## Troubleshooting

### No email received?

- Check your spam/junk folder
- Verify your Service ID and Template ID are correct
- Ensure your EmailJS account is active
- Check the browser console (F12) for error messages

### "Invalid credentials" error?

- Double-check your Public Key in the EmailJS init
- Verify Service ID and Template ID are correct
- Make sure EmailJS account is still active

### Form not submitting?

- Open DevTools (F12) → Console tab
- Look for error messages
- Verify all required form fields are filled

## Updating Your Email Address

If you want to receive emails at a different address:

1. Create a new EmailJS Email Service with that address
2. Update the Service ID in `script.js`

Or simply edit the `to_email` field in the JavaScript:

```javascript
to_email: "your-new-email@gmail.com"
```

## Security Notes

- Your Public Key is public-facing (safe to expose)
- Never expose your Private Key or Service configuration
- EmailJS handles email delivery securely
- No backend server needed for this to work

## Support

For issues with EmailJS, visit: [EmailJS Documentation](https://www.emailjs.com/docs/)

---

**Last Updated:** January 2026  
**Version:** 1.0
