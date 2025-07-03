<?php
// Basic email sending from the form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize data using the 'name' attributes from your HTML form
    $jmeno = htmlspecialchars($_POST["name"] ?? '');    // Corresponds to name="name" in HTML
    $telefon = htmlspecialchars($_POST["phone"] ?? '');  // Corresponds to name="phone" in HTML
    $email = htmlspecialchars($_POST["email"] ?? '');
    $sluzba = htmlspecialchars($_POST["service"] ?? ''); // Corresponds to name="service" in HTML
    $zprava = htmlspecialchars($_POST["message"] ?? ''); // Corresponds to name="message" in HTML

    // Recipient email address
    $to = "info@visiondetailing.cz";
    // Email subject
    $subject = "Nová poptávka z webu Vision Detailing"; // "New inquiry from Vision Detailing website"

    // Email headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=utf-8";

    // Email message body
    $message = "Jméno: $jmeno\nTelefon: $telefon\nEmail: $email\nSlužba: $sluzba\n\nZpráva:\n$zprava";

    // Attempt to send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Zpráva byla úspěšně odeslána."; // "Message was successfully sent."
    } else {
        echo "Odeslání zprávy selhalo. Zkuste to prosím později."; // "Message sending failed. Please try again later."
    }
} else {
    echo "Neplatný požadavek."; // "Invalid request."
}
?>