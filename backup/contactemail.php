<?php                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ?><?php
if(isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	//echo "error; you need to submit the form!";

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$visitor_mobile = $_POST['mobile'];
$message = $_POST['message'];
 

$subject =$name." is requesting services from your website contact page";


$from = $visitor_email;
// $to="ravi_bellala@yahoo.co.in";
 $to="nexendesigns@gmail.com";


$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=utf-8\r\n"; 
// $headers .= "To: ".$to."\r\n"; 
$headers .= "From: ".$name." <".$from.">\r\n"; 
$headers .= "Reply-To: ".$name." <".$from.">\r\n"; 
$headers .= "Return-Path: ".$name." <".$from.">\r\n";  

$message='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Queens NRI</title>
    <style type="text/css">
    body,
    td,
    th {
        /*  font-family: Geneva, Arial, Helvetica, sans-serif;*/
        font-family: Oxygen, Helvetica Neue, Arial, sans-serif !important;
        font-size: 14px;
	
    }
    
    body {
        background-color: #FFFFFF;
        margin-left: 0px;
        margin-top: 0px;
        margin-right: 0px;
        margin-bottom: 0px;
    }
    
    .even {
        background-color: #f3f3f3;
    }
    </style>
</head>

<body>
    <div>
        <table width="1000" border="1" align="center" cellpadding="0" cellspacing="0" style=" border-radius: 5px;border-color:#0076BE;bgcolor:#FFFFFF">
            <tbody>
               <tr>
                    <td height="50">
                        <table width="95%" border="0" align="center" cellpadding="5" style=" border-radius: 5px;" cellspacing="0">
                            <tr>
                                <td align="left" colspan="3"><span style="color: #000000; border-bottom:#999999 1px solid;"><strong><h3>Following are the Appointment Details</h3></strong></span></td>
                            </tr>
                            <tr class="even" style="background-color: #f3f3f3;">
                                <td align="left" style="width :20%"><strong>Name</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$name.'</strong>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="width :20%"><strong>Email ID</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$visitor_email.'</strong>
                                </td>
                            </tr>
                            <tr class="even" style="background-color: #f3f3f3;">
                                <td align="left" style="width :20%"><strong>Mobile</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$visitor_mobile.'</strong>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="width :20%"><strong>Message</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$message.'</strong>
                                </td>
                            </tr>
                            <tr>
                                <td align="left">
                                </td>
                            </tr>
                            <tr>
                                <td align="left" colspan="3" style="border-bottom:#999999 1px solid">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="left" colspan="3">Have a question? <strong>Contact us</strong>. Do not reply to this email.</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
';
  


mail( $to,$subject,$message,$headers);

 //done. redirect to thank-you page.
header('Location: thank-you.html');
}

?> 



