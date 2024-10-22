<?php
include_once '../../controllers/battery/batteryController.php';

$controller = new BatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->updateBattery($data)) {
        echo json_encode(["message" => "Battery updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update battery"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>