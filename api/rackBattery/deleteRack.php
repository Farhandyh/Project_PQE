<?php
include_once '../../controllers/rackBattery/rackBatteryController.php';

$controller = new RackBatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data['idRack'])) {
        if ($controller->deleteRack($data['idRack'])) {
            echo json_encode(["message" => "Rack marked as Non-Active"]);
        } else {
            echo json_encode(["message" => "Failed to delete rack"]);
        }
    } else {
        echo json_encode(["message" => "Rack ID is required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>