<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$user_id   = $_REQUEST['user_id'];
	$good_id   = $_REQUEST['good_id'];
	$num = $_REQUEST['num'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("127.0.0.1","root","");
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("kdldyf",$conn)){
		die("数据库选择失败".mysql_error());
	}
	
	//3）、传输数据（过桥）
	$sqlstr = "UPDATE cart SET num = '".$num."' WHERE user_id='".$user_id."' AND good_id='".$good_id."'";
    $result=mysql_query($sqlstr,$conn);	
   
	if(!$result){
		die("更新数据库数量失败".mysql_error());
		echo 0; //1：表示更新成功，0：表示更新失败。
	}	
	//4）、关闭连接（拆桥）
	mysql_close($conn);
	
	//3、给客户端返回（响应）！
	
	if(!$result){
		echo 0;
	}else{
		echo 1;
	}	
	
?>