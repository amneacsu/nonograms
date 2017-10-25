<?php

$select=query("SELECT uid FROM users WHERE username='$page[request]'");
if (mysql_num_rows($select)) {

	$user=fetch($select);


	$select=query("SELECT pid,name,size,uid,(SELECT AVG(rating) FROM ratings WHERE pid=grids.pid) AS rating FROM grids");
	if (mysql_num_rows($select)) {
		$list='';
		for ($i=0;$i<mysql_num_rows($select);$i++) {
			$row=fetch($select);
			$list.=template('mods/list-item',$row);
		}
	} else {
		$list=template('mods/list-empty');
	}

	$page['content'].=template('mods/user',array(
		'username'=>$page['request'],
		'list'=>$list
	));
} else {
	$page['content'].=template('mods/user-notfound');
}

?>
