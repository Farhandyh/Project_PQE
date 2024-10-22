<?php
include_once '../../controllers/chargingUnit/unitController.php';

$controller = new UnitController();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->createUnit($data)) {
        echo json_encode(["message" => "Charging unit created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create charging unit"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>