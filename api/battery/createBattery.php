<?php
include_once '../../controllers/battery/batteryController.php';

$controller = new BatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->createBattery($data)) {
        echo json_encode(["message" => "Battery created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create battery"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>