<?php
include_once '../../controllers/rackBattery/rackBatteryController.php';

$controller = new RackBatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->createRack($data)) {
        echo json_encode(["message" => "Rack created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create rack"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>