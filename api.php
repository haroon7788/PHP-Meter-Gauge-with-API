<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With');

// Step:1
$dataAPI = file_get_contents("php://input");  // used to get Form Input through API in JSON Format.

// Step:2
$dataAPI = json_decode($dataAPI, true); // 'true' decodes in associative array.

// Step:3
$gaugeValue = floor($dataAPI['form_value']);  // storing value from decoded API data.

// Step:4 Now we can use this input value in our Database
$connection = mysqli_connect("localhost", "root", "", "ajax_db") or die("Connection Failed.");

if ($gaugeValue < 0 || $gaugeValue > 100) {
  die();
} else {
  $updateQuery = "UPDATE ajax_db.gauge SET g_value = {$gaugeValue}";
  $updateQueryResult = mysqli_query($connection, $updateQuery);

  if ($updateQueryResult) {
    $dataQuery = "SELECT * FROM ajax_db.gauge";
    $dataQueryResult = mysqli_query($connection, $dataQuery);

    if (mysqli_num_rows($dataQueryResult) > 0) {
      while ($row = mysqli_fetch_assoc($dataQueryResult)) {
        // Step:5
        // We'll return/echo the value that we got from decoded API.
        $outputValue = ['input_value' => $row['g_value']]; // First we create PHP Assoc Array.
        $outputValue = json_encode($outputValue); // And then we convert this into JSON Object. 
        echo $outputValue;
      }
    }
  }
}

mysqli_close($connection);
