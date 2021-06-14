<?php
    require_once("./config.php");
    $query = "SELECT * FROM distances";
    $res = $con->query($query);
    $data = array();
    while($row = $res->fetch_array()){
        $rid = $row['route_key'];
        $dis = $row['distance'];
        $data[$rid]=$dis;
    }
    echo json_encode($data);
?>