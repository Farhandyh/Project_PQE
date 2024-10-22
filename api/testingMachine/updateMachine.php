<?php
include_once '../../controllers/testingMachine/machineController.php';

$controller = new MachineController();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->updateMachine($data)) {
        echo json_encode(["message" => "Machine updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update machine"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>