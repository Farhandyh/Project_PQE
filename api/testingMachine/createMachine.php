<?php
include_once '../../controllers/testingMachine/machineController.php';

$controller = new MachineController();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->createMachine($data)) {
        echo json_encode(["message" => "Machine created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create machine"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>