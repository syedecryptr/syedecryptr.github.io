<?php


$name = $_POST["formname"];
$email_address = $_POST["formemail"];
$message = $_POST["formmessage"];
	

// write the email content
$email_content = "Name: $name\n";
$email_content .= "Email Address: $email_address\n";
$email_content .= "Message:\n\n$message";
	
// send the email
mail ("syed@kmap.hol.es", "New Contact Message", $email_content);
	
// send the user back to the form
header("Location: http://www.kmap.hol.es"); exit;

?>
