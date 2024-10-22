<?php
include_once '../../controllers/chargingUnit/unitController.php';

$controller = new UnitController();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data['idUnitCharge'])) {
        if ($controller->deleteUnit($data['idUnitCharging'])) {
            echo json_encode(["message" => "Unit marked as Non-Active"]);
        } else {
            echo json_encode(["message" => "Failed to delete unit"]);
        }
    } else {
        echo json_encode(["message" => "Unit ID is required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>