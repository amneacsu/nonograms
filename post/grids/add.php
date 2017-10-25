<?php

$name=$_POST['name'];
$safename=safename($name);
$size=$_POST['size'];
$data='['.$_POST['data'].']';


query("INSERT INTO grids (name,safename,data,uid,size) VALUES ('$name','$safename','$data',$logged[uid],'".$size."x".$size."')");

if (!$name) {
	$pid=mysql_insert_id();
	$name='Grid #'.$pid;
	$safename=safename($name);
	query("UPDATE grids SET name='$name', safename='$safename' WHERE pid=$pid");
}

header('Location: /pick/');


?>
