<?php

// 1、链接数据库
include_once "./connectDB.php";

//2、 获取一个页面的数量
$size = 28;

// 页码数量：商品的总数
$sql = "SELECT * FROM goods";
mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);

$total = mysqli_num_rows($result);

// echo $total;

// 计算页码数量
$num = ceil($total / $size);

echo $num;

?>