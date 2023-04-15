
if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    $to = 'iordache.marian21@gmail.com';
    $subject = 'New Form Submission';
    $message = "Name: $name\nPhone: $phone\nEmail: $email\n";

    $headers = 'From: Your Website <noreply@yourdomain.com>' . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
}

