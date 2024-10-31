<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            width: 400px;
            padding: 40px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border: 3px solid #007bff;
            text-align: center; /* Center text */
        }
        .header-with-image {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px; /* Space between header and form */
            position: relative; /* Allows absolute positioning of the image */
        }
        .header-text {
            margin-right: 20px; /* Space between text and image */
        }
        .header-text h1 {
            margin: 0;
            font-size: 24px;
            color: #007bff;
        }
        .header-text h2 {
            margin: 5px 0;
            font-size: 18px;
            color: #333;
        }
        .bank-image {
            width: 100px; /* Reduced size for the image */
            height: auto;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Optional shadow for the image */
            position: absolute;
            right: 0;
        }
        .form-group {
            margin-bottom: 20px;
            text-align: left; /* Align labels and inputs to the left */
        }
        .form-group label {
            display: block;
            margin-bottom: 10px;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            box-sizing: border-box;
            border: 2px solid #ddd;
            border-radius: 5px;
        }
        .form-group button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 15px;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }
        .form-group button:hover {
            background-color: #0056b3;
        }
        .message {
            margin-top: 20px;
            font-size: 16px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header section -->
        <div class="header-with-image">
            <div class="header-text">
                <h1>Transaction</h1>
            </div>
            <img class="bank-image" src="./images/bank.png" alt="Bank Image">
        </div>

        <!-- Signup form -->
        <form id="signupForm">

            <div class="form-group">
                <button type="submit">....</button>
            </div>
            
            <div class="message" id="message"></div>
        </form>
    </div>

</body>
</html>
