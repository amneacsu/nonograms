<?php

function getConfig() {
	global $sql,$cfg;
	$pairs=array();
	$select=query("SELECT * FROM config");
	for ($i=0;$i<mysql_num_rows($select);$i++) {
		$row=fetch($select);
		$pairs[$row['key']]=$row['type']=='int'?intval($row['value']):$row['value'];
	}
	$cfg=array_merge($cfg,$pairs);
}

function dbConnect() {
	global $sql;
	$link=mysql_connect($sql['hostname'],$sql['username'],$sql['password']);
	if (!$link) {
		die("Couldn't connect to database server");
	} else {
		mysql_select_db($sql['database']);
	}
}

function query($query) {
	$result=mysql_query($query) or die(mysql_error()."<br/><br/><b>Query:</b> ".$query);
	return $result;
}

function fetch($set) {
	return mysql_fetch_assoc($set);
}

function template($file,$dataset=array()) {
	$data=getFile('template/'.$file.".html");
	foreach ($dataset as $header=>$value) $data=str_replace("{{$header}}",$value,$data);
	return $data;
}

function getFile($file) {
	$data='';
	$handle=fopen($file,"r");
	while ($buffer=fgets($handle,8192)) $data.=$buffer;
	fclose($handle);
	return $data;
}

function page_set_var($key,$value) {
	global $page;
	$page[$key]=$value;
}

function safename($string) {
	return preg_replace(array(
		'/[^\w\s-]/',
		'/[\s]/',
		'/--/'
	),array(
		'',
		'-',
		''
	),strtolower($string));
}

?>
