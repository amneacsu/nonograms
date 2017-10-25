<?php

$list='';
$select=query("SELECT pid,name,safename,size,uid,(SELECT AVG(rating) FROM ratings WHERE pid=grids.pid) AS rating FROM grids");
for ($i=0;$i<mysql_num_rows($select);$i++) {
	$row=fetch($select);
	$row['ops']='';
	if ($row['uid']==$logged['uid'] or $logged['level']>1) {
		$row['ops']='<a href="/edit/'.$row['pid'].'/">edit</a>';
	}
	$row['rating']=round($row['rating']);
	$list.=template('mods/list-item',$row);
}

$page['content'].=template('mods/pick',array('list'=>$list));

?>
