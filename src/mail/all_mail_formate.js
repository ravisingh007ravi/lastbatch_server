import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});



export const user_otp_verification = async (name, email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Verify Your Email - OTP",
            text: `Hello ${name}, your OTP is ${otp}. This OTP is valid for a limited time.`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification</title>
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background-color:#f3f4f6;
                    font-family:Arial, Helvetica, sans-serif;
                ">

                    <div style="
                        width:100%;
                        padding:40px 0;
                    ">

                        <div style="
                            max-width:600px;
                            margin:auto;
                            background:#ffffff;
                            border-radius:12px;
                            overflow:hidden;
                            border:1px solid #e5e7eb;
                        ">

                            <!-- Header -->
                            <div style="
                                background:#111827;
                                padding:25px;
                                text-align:center;
                            ">
                                <h1 style="
                                    margin:0;
                                    color:#ffffff;
                                    font-size:24px;
                                ">
                                    Email Verification
                                </h1>
                            </div>

                            <!-- Content -->
                            <div style="padding:35px 30px;">

                                <p style="
                                    margin:0 0 15px;
                                    color:#111827;
                                    font-size:18px;
                                ">
                                    Hello <strong>${name}</strong>,
                                </p>

                                <p style="
                                    margin:0 0 25px;
                                    color:#4b5563;
                                    font-size:15px;
                                    line-height:1.6;
                                ">
                                    Please use the following OTP to verify your
                                    email address.
                                </p>

                                <!-- OTP -->
                                <div style="
                                    text-align:center;
                                    margin:30px 0;
                                ">
                                    <div style="
                                        display:inline-block;
                                        padding:18px 35px;
                                        background:#f0fdf4;
                                        border:2px solid #22c55e;
                                        border-radius:10px;
                                    ">
                                        <span style="
                                            font-size:32px;
                                            font-weight:bold;
                                            letter-spacing:8px;
                                            color:#166534;
                                        ">
                                            ${otp}
                                        </span>
                                    </div>
                                </div>

                                <p style="
                                    margin:0;
                                    color:#6b7280;
                                    font-size:14px;
                                    text-align:center;
                                ">
                                    Do not share this OTP with anyone.
                                </p>

                            </div>

                            <!-- Footer -->
                            <div style="
                                background:#f9fafb;
                                padding:20px;
                                text-align:center;
                                border-top:1px solid #e5e7eb;
                            ">
                                <p style="
                                    margin:0;
                                    color:#6b7280;
                                    font-size:13px;
                                ">
                                    If you didn't request this verification,
                                    you can safely ignore this email.
                                </p>
                            </div>

                        </div>
                    </div>

                </body>
                </html>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (err) {
        console.log(err.message);
    }
};


export const admin_login_otp_verification = async (name, email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Admin Login Verification - OTP",

            text: `
Hello ${name},

Your admin login OTP is ${otp}.

Please do not share this OTP with anyone.
            `,

            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Admin Login Verification</title>
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background:#f3f4f6;
                    font-family:Arial, Helvetica, sans-serif;
                ">

                    <div style="padding:40px 15px;">

                        <div style="
                            max-width:600px;
                            margin:auto;
                            background:#ffffff;
                            border-radius:12px;
                            overflow:hidden;
                            border:1px solid #e5e7eb;
                        ">

                            <!-- Header -->
                            <div style="
                                background:#111827;
                                padding:25px;
                                text-align:center;
                            ">
                                <h1 style="
                                    margin:0;
                                    color:#ffffff;
                                    font-size:23px;
                                ">
                                    Admin Login Verification
                                </h1>

                                <p style="
                                    margin:8px 0 0;
                                    color:#d1d5db;
                                    font-size:13px;
                                ">
                                    Secure administrator access
                                </p>
                            </div>

                            <!-- Content -->
                            <div style="padding:35px 30px;">

                                <p style="
                                    color:#111827;
                                    font-size:18px;
                                ">
                                    Hello <strong>${name}</strong>,
                                </p>

                                <p style="
                                    color:#4b5563;
                                    font-size:15px;
                                    line-height:1.6;
                                ">
                                    A login attempt was made to your
                                    administrator account. Use the OTP below
                                    to complete your login.
                                </p>

                                <div style="
                                    text-align:center;
                                    margin:30px 0;
                                ">
                                    <div style="
                                        display:inline-block;
                                        background:#f0fdf4;
                                        border:2px solid #22c55e;
                                        border-radius:10px;
                                        padding:18px 35px;
                                    ">
                                        <span style="
                                            color:#166534;
                                            font-size:32px;
                                            font-weight:bold;
                                            letter-spacing:8px;
                                        ">
                                            ${otp}
                                        </span>
                                    </div>
                                </div>

                                <div style="
                                    background:#f9fafb;
                                    border-left:4px solid #22c55e;
                                    padding:15px;
                                ">
                                    <p style="
                                        margin:0;
                                        color:#4b5563;
                                        font-size:13px;
                                        line-height:1.5;
                                    ">
                                        Security Tip: Never share your OTP
                                        with anyone, including support staff.
                                    </p>
                                </div>

                            </div>

                            <!-- Footer -->
                            <div style="
                                background:#f9fafb;
                                border-top:1px solid #e5e7eb;
                                padding:18px;
                                text-align:center;
                            ">
                                <p style="
                                    margin:0;
                                    color:#6b7280;
                                    font-size:12px;
                                ">
                                    This is an automated security email.
                                    Please do not reply.
                                </p>
                            </div>

                        </div>

                    </div>

                </body>
                </html>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (err) {
        console.log(err.message);
    }
};


export const user_login_detect = async (name, email) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "New Login Detected",

            text: `
Hello ${name},

A new login was detected on your account.

If this was you, you can safely ignore this email.

If you don't recognize this activity, please secure your account immediately.
            `,

            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Login Detected</title>
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background:#f3f4f6;
                    font-family:Arial, Helvetica, sans-serif;
                ">

                    <div style="padding:40px 15px;">

                        <div style="
                            max-width:600px;
                            margin:auto;
                            background:#ffffff;
                            border:1px solid #e5e7eb;
                            border-radius:12px;
                            overflow:hidden;
                        ">

                            <div style="
                                background:#111827;
                                padding:25px;
                                text-align:center;
                            ">
                                <h1 style="
                                    margin:0;
                                    color:#ffffff;
                                    font-size:24px;
                                ">
                                    New Login Detected
                                </h1>
                            </div>

                            <div style="padding:35px 30px;">

                                <p style="
                                    color:#111827;
                                    font-size:18px;
                                ">
                                    Hello <strong>${name}</strong>,
                                </p>

                                <p style="
                                    color:#4b5563;
                                    font-size:15px;
                                    line-height:1.6;
                                ">
                                    We detected a new login to your account.
                                </p>

                                <div style="
                                    margin:25px 0;
                                    padding:20px;
                                    background:#f0fdf4;
                                    border:1px solid #bbf7d0;
                                    border-radius:8px;
                                ">
                                    <p style="
                                        margin:0;
                                        color:#166534;
                                        font-size:15px;
                                        font-weight:bold;
                                    ">
                                        ✓ Login activity detected
                                    </p>
                                </div>

                                <p style="
                                    color:#6b7280;
                                    font-size:14px;
                                    line-height:1.6;
                                ">
                                    If this login was made by you, no action
                                    is required.
                                </p>

                                <p style="
                                    color:#4b5563;
                                    font-size:14px;
                                    line-height:1.6;
                                ">
                                    If you don't recognize this activity,
                                    please change your password and secure
                                    your account.
                                </p>

                            </div>

                            <div style="
                                background:#f9fafb;
                                border-top:1px solid #e5e7eb;
                                padding:18px;
                                text-align:center;
                            ">
                                <p style="
                                    margin:0;
                                    color:#6b7280;
                                    font-size:12px;
                                ">
                                    This is an automated security notification.
                                </p>
                            </div>

                        </div>

                    </div>

                </body>
                </html>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (err) {
        console.log(err.message);
    }
};


export const user_delete_account = async (name, email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Confirm Account Deletion - OTP",

            text: `
Hello ${name},

You requested to delete your account.

Your account deletion OTP is ${otp}.

If you did not request this, please secure your account immediately.
            `,

            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirm Account Deletion</title>
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background:#f3f4f6;
                    font-family:Arial, Helvetica, sans-serif;
                ">

                    <div style="padding:40px 15px;">

                        <div style="
                            max-width:600px;
                            margin:auto;
                            background:#ffffff;
                            border:1px solid #e5e7eb;
                            border-radius:12px;
                            overflow:hidden;
                        ">

                            <div style="
                                background:#111827;
                                padding:25px;
                                text-align:center;
                            ">
                                <h1 style="
                                    margin:0;
                                    color:#ffffff;
                                    font-size:24px;
                                ">
                                    Confirm Account Deletion
                                </h1>
                            </div>

                            <div style="padding:35px 30px;">

                                <p style="
                                    color:#111827;
                                    font-size:18px;
                                ">
                                    Hello <strong>${name}</strong>,
                                </p>

                                <p style="
                                    color:#4b5563;
                                    font-size:15px;
                                    line-height:1.6;
                                ">
                                    You requested to delete your account.
                                    Please enter the OTP below to confirm
                                    this action.
                                </p>

                                <div style="
                                    text-align:center;
                                    margin:30px 0;
                                ">
                                    <div style="
                                        display:inline-block;
                                        padding:18px 35px;
                                        background:#f0fdf4;
                                        border:2px solid #22c55e;
                                        border-radius:10px;
                                    ">
                                        <span style="
                                            color:#166534;
                                            font-size:32px;
                                            font-weight:bold;
                                            letter-spacing:8px;
                                        ">
                                            ${otp}
                                        </span>
                                    </div>
                                </div>

                                <div style="
                                    background:#f9fafb;
                                    border-left:4px solid #111827;
                                    padding:15px;
                                    margin-top:25px;
                                ">
                                    <p style="
                                        margin:0;
                                        color:#4b5563;
                                        font-size:13px;
                                        line-height:1.5;
                                    ">
                                        Account deletion is a permanent action.
                                        Make sure you want to continue before
                                        entering this OTP.
                                    </p>
                                </div>

                                <p style="
                                    color:#6b7280;
                                    font-size:13px;
                                    margin-top:25px;
                                ">
                                    If you did not request account deletion,
                                    do not share this OTP.
                                </p>

                            </div>

                            <div style="
                                background:#f9fafb;
                                border-top:1px solid #e5e7eb;
                                padding:18px;
                                text-align:center;
                            ">
                                <p style="
                                    margin:0;
                                    color:#6b7280;
                                    font-size:12px;
                                ">
                                    This is an automated security email.
                                </p>
                            </div>

                        </div>

                    </div>

                </body>
                </html>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (err) {
        console.log(err.message);
    }
};