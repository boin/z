<? 

header("Cache-Control: private, post-check=0, pre-check=0, max-age=0, no-store");
header("Pragma: no-cache");
header("Expires: -1");

//$self = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
$self = $_SERVER['PHP_SELF'];
if(isset($_POST['downTime'])&&isset($_POST['upTime'])){
	if(is_numeric($_POST['downTime'])&&is_numeric($_POST['upTime'])){
		showResult();
	}else{
		showTest();
	}
}elseif($_POST['action']=='uploadTest'){
	echo 'ok';
}else{
	showTest();
}
function showTest(){?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>网速测试程序  测试正在进行中……</title>
</head>
<body>
<table align="center" cellpadding="1" cellspacing="0">
<tr>
	<td height="30" colspan="2" align="center"><b>下载速度测试中</b></td>
</tr>
<tr>
	<td width="300" style="border:1px solid blue"><table cellpadding="0" cellspacing="0">
	<tr>
		<td id="downProgressBar" bgcolor="blue" style="width:0px; height:17px"></td>
	</tr>
	</table></td>
	<td id="downProgressNum" align="right" width="35">0%</td>
</tr>
<form id="TestForm" action="" method="post"><input name="downTime" id="downTime" type="hidden" /><input name="upTime" id="upTime" type="hidden" /></form>
</table>
<script type="text/javascript">
<!--
function $id(id){
	return document.getElementById(id);
}

function setDownProgress(){
	Percentage++;
	dpb.style.width=(Percentage*3)+'px';
	dpn.innerHTML = Percentage+'%';
}

function setUpProgress(){
	Percentage+=10;
	upb.style.width=(Percentage*3)+'px';
	upn.innerHTML = Percentage+'%';
	if(Percentage==100){
		upTime =(new Date()).getTime() - upTime;
		submitTest();
	}
}

function XmlHttp(){
	try{
		if(window.XMLHttpRequest){
			var req = new XMLHttpRequest();
			if(req.readyState == null){
				req.readyState = 1;
				req.addEventListener("load", function(){
					req.readyState = 4;
					if(typeof req.onreadystatechange == "function")
						req.onreadystatechange();
				}, false);
			}
			return req;
		}
		if(window.ActiveXObject){
			return new ActiveXObject(getXmlHttpPrefix() + ".XmlHttp");
		}
	}
	catch(e){}
}

function getXmlHttpPrefix(){
	if(getXmlHttpPrefix.prefix)
		return getXmlHttpPrefix.prefix;
	var prefixes = ["MSXML2","Microsoft","MSXML","MSXML3"];
	var o;
	for(var i=0;i<prefixes.length;i++){
		try{
			o = new ActiveXObject(prefixes[i] + ".XmlHttp");
			return getXmlHttpPrefix.prefix = prefixes[i];
		}
		catch(ex){};
	}
}

function upTest(){
	var xmlHttp = XmlHttp();
	if(!xmlHttp)errorSubmit();
	xmlHttp.open('POST','<?=$GLOBALS['self']?>',true);
	xmlHttp.setRequestHeader("Content-Length",upBody.length);
	xmlHttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
			setUpProgress();
		}else if(xmlHttp.readyState == 3){
			upTest();
		}
	}
	xmlHttp.send(upBody);
}

function submitTest(){
	$id('downTime').value=downTime;
	$id('upTime').value=upTime;
	$id('TestForm').submit();
}

function errorSubmit(t){
	if(t)
		upTime = t;
	else
		upTime = 0;
	submitTest();
}

var dpb = $id("downProgressBar");
var dpn = $id("downProgressNum");
var upClickCount = Percentage = 0;
var downTime =(new Date()).getTime();
-->
</script><?php
$outText = getTestText();
for($i = 1;$i<100;$i++){
	echo '<!--'.$outText."-->\n";
	echo "<script type=\"text/javascript\">setDownProgress();</script>\n";
}
?>
<script type="text/javascript">
var outstr = '<?=$outText?>';
setDownProgress();
downTime =(new Date()).getTime()-downTime;
</script>
<table align="center" cellpadding="1" cellspacing="0">
<tr>
	<td height="30" colspan="2" align="center"><b>上转速度测试中</b></td>
</tr>
<tr>
	<td width="300" style="border:1px solid blue"><table cellpadding="0" cellspacing="0">
	<tr>
		<td id="upProgressBar" bgcolor="blue" style="width:0px; height:17px"></td>
	</tr>
	</table></td>
	<td id="upProgressNum" align="right" width="35">0%</td>
</tr>
</table>
<script type="text/javascript">
Percentage =0;
var upb = $id("upProgressBar");
var upn = $id("upProgressNum");
var upBody='';
for(i=0;i<10;i++)upBody +=outstr;
upBody = 'action=uploadTest&content='+upBody;
setTimeout('errorSubmit(-1)',300000);
upTest();
var upTime =(new Date()).getTime();
</script>
</body>
</html><?php
}
function showResult(){?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>测试结果</title>
</head>
<body>
说明，本程序测试的上传速度为上传到本站的速度<br /><br /><?php
	$dKBps = round(500000/$_POST['downTime'],2);
	$dKbps = $dKBps * 8;
	echo '下载速度：'.$dKbps.'Kbps，相当于'.$dKBps."KB/s<br />\n";
	if($_POST['upTime']=='-1'){
		echo '上转测试超时。';
	}else if($_POST['upTime']=='0'){
		echo '您的浏览器不支持本上传测试程序，请使用IE6.0以上或FireFox。';
	}else{
		$uKBps = round(500000/$_POST['upTime'],2);
		$uKbps = $uKBps * 8;
		echo '上传速度：'.$uKbps.'Kbps，相当于'.$uKBps.'KB/s';
	}
	echo '<br /><br /><br /><span style="padding-left:100px"><a href="'.$GLOBALS['self'].'">再测一次</a></span>'?>
</body>
</html><?php
}
function getTestText(){
	$result;
	for($i = 0;$i<5000;$i++){
		$result .= '*';
	}
	return $result;
}?>
