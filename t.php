<?php
header('Content-Type: application/json');
print_r($_SERVER['HTTP_REFERER']);
if($_GET['rd'])
header('X-JSON: {RET:"OK",RELOAD:1}');
else
header('Location: t.php?rd=1');
die("{RET:'OK'}");
?>