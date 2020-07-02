<?php
include_once "./connectDB.php";

// 核心逻辑
// 1、先拿到用户提交的参数
$username = $_REQUEST["username"];
$userid = $_REQUEST["userid"];
$password = $_REQUEST["password"];

// 查看id是否被注册
$sql = "SELECT * FROM `user` WHERE user_id = '$userid'";
$r = mysqli_query($db,$sql);

$num = mysqli_num_rows($r);  //该方法得到的是记录的条数：$r["num_rows"]

// 检查：检查当前的用户名数据是否存在，如果存在那么久应该提示，否则插入
if($num == 1){
    echo '{"status":"error","msg":"该用手机号码已被注册，请重新填入新的手机号码！"}';
}else{
    $sql = "INSERT INTO user".
    "(user_name,user_id,user_password)".
    "VALUES".
    "('$username','$userid','$password')";

    $retval = mysqli_query($db,$sql);

    if(!$retval){
        die('无法插入数据：' . mysqli_error($db));
    }

    echo '{"status":"success"}';

}


?>