<?php
include_once '../../controllers/testingMachine/machineController.php';

$controller = new MachineController();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $controller->getMachine();
    $machines = [];

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $machines[] = $row;
        }
        echo json_encode($machines);
    } else {
        echo json_encode(["message" => "No machines found"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
