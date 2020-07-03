<?php
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];
// 多表查询

$sql = "SELECT cart.*,goods.name,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.good_id AND user_id = $user_id";

mysqli_query($db,"SET NAMES utf8");
$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($data,true);

?>