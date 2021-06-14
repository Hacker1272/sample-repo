<?php
	require './config.php';
	$patient_name = $_POST['patient_name'];
	$patient_age = $_POST['patient_age'];
	$patient_address = $_POST['patient_address'];

	$q = "INSERT INTO patients(name,age,address) VALUES('$patient_name','$patient_age','$patient_address')";
	$result = $con->query($q);
	$data = "-1";
	if($result==TRUE)
	{
		$data = "covid192021000".strval($con->insert_id);
	}
	else{
		echo "Error!!!!";
	}
	echo json_encode($data);
?>