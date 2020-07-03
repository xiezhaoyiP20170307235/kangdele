<?php
// 1、链接数据库
include "./connectDB.php";
$good_id = $_REQUEST["good_id"];
$user_id = $_REQUEST["user_id"];
$num = $_REQUEST["num"];

// 2、执行操作
// 先检查当前的商品在购物车中是否存在，如果没有加入新的一条，如果有数量相加，执行语句num+1
$sql = "SELECT * FROM cart WHERE good_id = $good_id AND user_id = $user_id";
// echo $sql;
$result = mysqli_query($db,$sql);
$resultnum = mysqli_num_rows($result);
// echo $num;
print_r($resultnum);

if($resultnum == 0){
    $sql = "INSERT INTO cart ".
    "(cart_id,user_id,good_id,num) ".
    "VALUES ".
    "(NULL,$user_id,$good_id,$num)";
    // echo $sql;
}elseif($resultnum == 1){
    $sql = "UPDATE cart SET num = num + 1 WHERE good_id = $good_id AND user_id = $user_id";
}


$retval = mysqli_query($db,$sql);

if(!$retval){
    die('添加购物车失败：'. mysqli_error($conn));
}
echo "添加成功";


?>