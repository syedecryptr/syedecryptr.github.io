// <?php
// if(isset($_POST["formsubmit"])){

// $email=$_POST['formemail'];

// 	$name = $_POST['formname'];
// 	$message = $_POST['formmessage'];
// 	$headers = 'From:'. $email . "\r\n"; 
// 	$message = wordwrap($message, 70);
	
// 	mail("syed@kmap.hol.es", $name, $message, $headers);
// 	echo "Your mail has been sent successfuly ! Thank you for your feedback";

// }
// ?>

<?php 
      
     
    $name=$_REQUEST['formname']; 
    $email=$_REQUEST['formemail']; 
    $message=$_REQUEST['formmessage']; 
    
           
        $from="From: $name<$email>\r\nReturn-path: $email"; 
        $subject="Message sent using your contact form"; 
        mail("youremail@yoursite.com", $subject, $message, $from); 
        echo "Email sent!"; 

    
?> 