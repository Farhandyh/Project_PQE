<?php
header('Access-Control-Allow-Origin: *'); // Izinkan semua asal
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Metode yang diizinkan
header('Access-Control-Allow-Headers: Content-Type'); // Header yang diizinkan
include_once '../../controllers/battery/batteryController.php';

$controller = new BatteryController();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $controller->getBattery();
    $batteries = [];

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $batteries[] = $row;
        }
        echo json_encode($batteries);
    } else {
        echo json_encode(["message" => "No batteries found"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>