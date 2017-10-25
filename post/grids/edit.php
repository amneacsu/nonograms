<?php

$pid=$_POST['pid'];
$name=$_POST['name'];
$safename=safename($name);
$data='['.$_POST['data'].']';

query("UPDATE grids SET name='$name',safename='$safename',data='$data' WHERE pid=$pid");
header('Location: /pick/');

?>
