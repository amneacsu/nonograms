<?php

foreach (array('username','password1','password2','email') as $h) {
	$$h=$_POST['nn_'.$h];
}

$select=query("SELECT * FROM users WHERE username='$username' OR email='$email'");
if (mysql_num_rows($select)) {
	echo template('layout/post',array(
		'message'=>'Username or e-mail already in use'
	));
} else if (!mysql_num_rows($select)) {
	$password=sha1($password1);
	query("INSERT INTO users (username,password,email) VALUES ('$username','$password','$email')");
	setcookie('nn_user',$username,time()+$cfg['cookie-length'],$cfg['cookie-path'],$cfg['cookie-domain']);
	setcookie('nn_pass',$password,time()+$cfg['cookie-length'],$cfg['cookie-path'],$cfg['cookie-domain']);
	header('Location: /');
}

?>
