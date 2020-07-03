<?php

header("Content-type:text/html;charset=utf8");

// 1、链接数据库
include "./connectDB.php";

$page = $_REQUEST["page"];
$sort = $_REQUEST["sort"];

$limit = $page * 28;

// 2、查询获取数据库中的所有商品
if($sort == "default"){
    $sql = "SELECT * FROM goods Order BY good_id LIMIT $limit,28";
}elseif($sort == "price_asc"){
    $sql = "SELECT * FROM goods Order BY price ASC LIMIT $limit,28";
}elseif($sort == "price_desc"){
    $sql = "SELECT * FROM goods Order BY price DESC LIMIT $limit,28";
}


mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);


$data = mysqli_fetch_all($result,MYSQLI_ASSOC);


// 3、把数据转换为JSON数据返回
echo json_encode($data);

?>