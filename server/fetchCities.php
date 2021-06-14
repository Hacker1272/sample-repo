<?php
require_once("./config.php");
$sql = "SELECT * FROM cities";
$res = $con->query($sql);
$data= array();
while($row=$res->fetch_array()){
    $cid = $row['id'];
    $name = $row['city'];
    $data[$cid] = $name;
}
echo json_encode($data);
?>