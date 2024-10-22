<?php
include_once '../../controllers/battery/batteryController.php';

$controller = new BatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data['idBattery'])) {
        if ($controller->deleteBattery($data['idBattery'])) {
            echo json_encode(["message" => "Battery marked as Non-Active"]);
        } else {
            echo json_encode(["message" => "Failed to delete battery"]);
        }
    } else {
        echo json_encode(["message" => "Battery ID is required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>