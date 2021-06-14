<?php
require_once("./config.php");
$query = "SELECT * FROM routes";
$res = $con->query($query);
$data= array();
while($row=$res->fetch_array()){
    $rk = $row['route_key'];
    $src = $row['src'];
    $dest = $row['dest'];
    $temp = array(0=>$src,1=>$dest);
    $data[$rk]=$temp;
}
echo json_encode($data);
?>