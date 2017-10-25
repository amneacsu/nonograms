<?php

session_start();
require 'config.php';
require 'common.php';

dbConnect();
getConfig();

$logged=array(
	'uid'=>0,
	'level'=>0
);

if (isset($_COOKIE['nn_user']) and isset($_COOKIE['nn_pass'])) {
	$_SESSION['nn_user']=$_COOKIE['nn_user'];
	$_SESSION['nn_pass']=$_COOKIE['nn_pass'];
}

if (isset($_SESSION['nn_user']) and isset($_SESSION['nn_pass'])) {
	$select=query("SELECT * FROM users WHERE username='$_SESSION[nn_user]' AND password='$_SESSION[nn_pass]'");
	if (mysql_num_rows($select)) {
		$logged=fetch($select);
	}
}

?>
