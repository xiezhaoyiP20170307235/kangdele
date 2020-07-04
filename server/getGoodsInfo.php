<?php
include_once "./connectDB.php";

$good_id = $_REQUEST["good_id"];
// 多表查询

$sql = "SELECT * FROM goods WHERE good_id = $good_id";

mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);

?>