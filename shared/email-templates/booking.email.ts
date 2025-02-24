export const bookingEmailTemplate: string = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Booking</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e6f0ff;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2a9df4;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
        }
        .content h2 {
            color: #2a9df4;
        }
        .content p {
            color: #333333;
            line-height: 1.6;
        }
        .footer {
            background-color: #f0f8ff;
            color: #666666;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        a {
            color: #1a73e8;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Booking!</h1>
        </div>
        <div class="content">
            <h2>Your Spot Has Been Confirmed</h2>
            <p>Dear {{USER_NAME}},</p>
            <p>Thank you for booking a free class with Fusion Studios! Your spot has been confirmed, and we are thrilled to have you join us.</p>
            <p>We will get back to you as soon as possible with more details about your class. In the meantime, feel free to explore more about our classes and instructors on our <a href="https://www.fusionstudios.es">website</a>.</p>
            <p>Looking forward to dancing with you soon!</p>
            <p>Best regards,</p>
            <p>The Fusion Studios Team</p>
        </div>
        <div class="footer">
            &copy; 2025 Fusion Studios. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
