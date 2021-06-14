<?php
	require './config.php';
	$patient_id = $_POST['patient_id'];
	$centre_id = $_POST['centre_id'];
	$vdate = $_POST['vdate'];

	$q = "INSERT INTO appointments(person_id,centre_id,appointment_date) VALUES('$patient_id','$centre_id','$vdate')";
	$result = $con->query($q);
	$data = "-1";
	if($result==TRUE)
	{
		$data = "vaccIndia".strval($con->insert_id);
	}
	else{
		echo "Error!!!!";
	}
	echo json_encode($data);
?>