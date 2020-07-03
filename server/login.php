<?php

header("Content-type:text/html;charset=utf8");
$userid = $_REQUEST["userid"];
$password = $_REQUEST["password"];

/* 用户登录的时候逻辑： */
/* 先检查该用户是否存在，如果不存在那么应该返回错误提示:该用户名不存在 */
/* 如果用户存在，那么应该继续检查密码，如果密码不正确，应该返回错误提示：密码不正确 */
/* 如果密码正确，应该返回正确的提示：登录成功！！！ */
include_once "./connectDB.php";

$sql = "SELECT * FROM `user` WHERE user_id = '$userid'";
mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);


$data = array("status"=>"","data"=>array("msg"=>""));

$num = mysqli_num_rows($result);  //该方法得到的是记录的条数：$r["num_rows"]

if($num == 1){
    $res = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $res = $res[0];
    if($password === $res['user_password']){
        $username = $res["user_name"];
        $data["status"] = "success";
        $data["data"]["msg"] = "恭喜你，登录成功";
        $data["data"]["userId"] = $userid;
        $data["data"]["password"] = $password;
        $data["data"]["username"] = $username;
    }else{
        $data["status"] = "error";
        $data["data"]["msg"] = "登录失败，密码不正确！！！";
    }
}else{
    $data["status"] = "error";
    $data["data"]["msg"] = "登录失败，该手机号码不存在，请先注册！";
}

echo json_encode($data,true);

?>