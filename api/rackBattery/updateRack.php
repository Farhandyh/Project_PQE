<?php
include_once '../../controllers/rackBattery/rackBatteryController.php';

$controller = new RackBatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->updateRack($data)) {
        echo json_encode(["message" => "Rack updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update rack"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>