<?php

require 'init.php';


$page=array(
	'title'=>'',
	'content'=>'',
	'content-class'=>'',
	'userbar'=>template('layout/userbar-'.($logged['uid']>0?'user':'guest'),$logged),
	'nav'=>template('layout/nav-'.($logged['uid']>0?'user':'guest'),$logged)
);

$page['request']=$_GET['request'];


if ($_GET['mod']) require 'mods/'.$_GET['mod'].'.php';
echo template('layout/skeleton',$page);

?>
