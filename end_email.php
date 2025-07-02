<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(strip_tags(trim($_POST["name"])));
    $email = htmlspecialchars(strip_tags(trim($_POST["email"])));
    $phone = htmlspecialchars(strip_tags(trim($_POST["phone"])));
    $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

    // Your email address where you want to receive messages
    $recipient = "info@visiondetailing.cz";
    $subject = "Nová zpráva z kontaktního formuláře Vision Detailing od " . $name;

    $email_content = "Jméno: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Telefon: $phone\n";
    }
    $email_content .= "Zpráva:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $name <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (OK) response code.
        http_response_code(200);
        echo "Děkujeme! Vaše zpráva byla odeslána.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Něco se pokazilo a zprávu se nepodařilo odeslat.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "Přístup zakázán.";
}
?>