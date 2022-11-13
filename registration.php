<?php
if(isset($_POST['submit']))
{

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$visitor_mobile = $_POST['phone'];
$designation = $_POST['designation'];
$institution = $_POST['institution'];
$message = $_POST['message'];

 $subject ="Stroke Update 2019";

$from = $visitor_email;
// $from="";
 $to="contact@strokeupdate.co.in";


$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=utf-8\r\n"; 
$headers .= "To: ".$to." <".$to.">\r\n"; 
$headers .= "From: ".$name." <".$from.">\r\n"; 
$headers .= "Reply-To: ".$name." <".$from.">\r\n"; 
$headers .= "Return-Path: ".$name." <".$from.">\r\n";  

$message='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Untitled Document</title>
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
        background-color: #e4e3e3;
    }
    </style>
</head>

<body>
    <div>
        <table width="1000" border="1" align="center" cellpadding="0" cellspacing="0" style="    border-radius: 5px;border-color:#0076BE;bgcolor:#FFFFFF">
            <tbody>
                <tr>
                    <td width="1000" height="50">
                        <table cellspacing="0" cellpadding="0" align="center" border="0" width="100%" style="border-radius: 5px;">
                            <tbody>
                                <tr height="12">
                                    <td width=" " height=" " bgcolor="#6686ff"><img src="images/mail-banner.jpg" /> </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="50">
                        <table width="95%" border="0" align="center" cellpadding="5" style="border-radius: 5px;" cellspacing="2">
                            <tr>
                                <td align="left" colspan="3"><span style="color: #000000; border-bottom:#999999 1px solid;"><strong><h3>Here are the details of the person registered for the conference</h3></strong></span></td>
                            </tr>
                            <tr class="even" style="background-color: #e4e3e3;">
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
                            <tr class="even" style="background-color: #e4e3e3;">
                                <td align="left" style="width :20%"><strong>Mobile</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$visitor_mobile.'</strong>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="width :20%"><strong>Speciality</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$designation.'</strong>
                                </td>
                            </tr>
                            <tr class="even" style="background-color: #e4e3e3;">
                                <td align="left" style="width :20%"><strong>Appointment Date</strong>
                                </td>
                                <td align="left" style="width :5%"><strong>:</strong>
                                </td>
                                <td align="left"><strong>'.$institution.'</strong>
                                </td>
                            </tr>
                            <tr class="even" style="background-color: #e4e3e3;">
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



