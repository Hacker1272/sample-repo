<?php
	require_once ("./config.php");
	$user_selected_date = $_POST['user_selected_date'];
	$user_selected_centre = $_POST['user_selected_centre'];

	$q = "SELECT COUNT(appointment_id) as count FROM appointments WHERE appointment_date = $user_selected_date AND centre_id = $user_selected_centre";
	$result=$con->query($q);
	
	while($row=$result->fetch_array())
	{
		$data = $row['count'];
	}
	
	echo json_encode($data);
?>