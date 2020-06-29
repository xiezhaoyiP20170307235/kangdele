<?php
$db = mysqli_connect("127.0.0.1","root","","kdldyf");

if(!$db){
    die('链接错误：'.mysqli_error($db));
}

?>