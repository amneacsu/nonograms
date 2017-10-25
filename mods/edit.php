<?php

$select=query("SELECT * FROM grids WHERE pid=$page[request]");
if (mysql_num_rows($select)) {
	$grid=fetch($select);

	$page['content-class']='centered';
	$page['content'].=template('mods/create',array(
		'header'=>'Edit grid',
		'op'=>'edit',
		'pid'=>$grid['pid'],
		'name'=>$grid['name'],
		'data'=>$grid['data'],
		'size'=>preg_replace('/x.*/','',$grid['size'])
	));
} else {
	$page['content'].=template('mods/play-notfound');
}

?>
