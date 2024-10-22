<?php
include_once '../../controllers/rackBattery/rackBatteryController.php';

$controller = new RackBatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $controller->getRack();
    $racks = [];

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $racks[] = $row;
        }
        echo json_encode($racks);
    } else {
        echo json_encode(["message" => "No racks found"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
