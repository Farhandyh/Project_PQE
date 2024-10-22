<?php
include_once '../../controllers/chargingUnit/unitController.php';

$controller = new UnitController();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->updateUnit($data)) {
        echo json_encode(["message" => "Unit updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update unit"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>