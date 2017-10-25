<?php

if ($page['request']) {
	$filter="WHERE safename='$page[request]'";
} else {
	$filter="ORDER BY RAND()";
}

$select=query("SELECT name,size,data,(SELECT username FROM users WHERE uid=grids.uid) AS author FROM grids ".$filter." LIMIT 1");
if (mysql_num_rows($select)) {
	$grid=fetch($select);
	$grid['width']=preg_replace('/x.*/','',$grid['size']);
	$grid['height']=preg_replace('/.*x/','',$grid['size']);
	$page['content-class']='centered';
	$page['content'].=template('mods/play',$grid);
} else {
	$page['content'].=template('mods/play-notfound');
}

?>
