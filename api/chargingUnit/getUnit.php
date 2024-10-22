<?php
include_once '../../controllers/chargingUnit/unitController.php';

$controller = new UnitController();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $controller->getUnit();
    $units = [];

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $units[] = $row;
        }
        echo json_encode($units);
    } else {
        echo json_encode(["message" => "No units found"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
