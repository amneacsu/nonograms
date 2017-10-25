<?php

foreach (array('username','password') as $h) {
	$$h=$_POST['nn_'.$h];
}


$password=sha1($password);
$select=query("SELECT * FROM users WHERE username='$username' AND password='$password'");
if (!mysql_num_rows($select)) {
	echo template('layout/post',array(
		'message'=>'Invalid username or password'
	));
} else {
	setcookie('nn_user',$username,time()+$cfg['cookie-length'],$cfg['cookie-path'],$cfg['cookie-domain']);
	setcookie('nn_pass',$password,time()+$cfg['cookie-length'],$cfg['cookie-path'],$cfg['cookie-domain']);
	header('Location: /');
}

?>
