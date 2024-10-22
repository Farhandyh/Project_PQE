<?php
include_once '../../controllers/testingMachine/machineController.php';

$controller = new MachineController();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data['idMachine'])) {
        if ($controller->deleteMachine($data['idMachine'])) {
            echo json_encode(["message" => "Machine marked as Non-Active"]);
        } else {
            echo json_encode(["message" => "Failed to delete machine"]);
        }
    } else {
        echo json_encode(["message" => "Machine ID is required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>