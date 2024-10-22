<?php
include_once '../../config/database.php';
include_once '../../models/battery/batteryModel.php';

class BatteryController {
    private $model;
 
    public function __construct() {
        global $con;
        $this->model = new BatteryModel($con);
    }

    // Handle battery creation
    public function createBattery($data) {
        return $this->model->createBattery($data['idBattery'], $data['batteryCapacity'], $data['batteryStatus']);
    }

    // Handle fetching all battery
    public function getBattery() {
        return $this->model->getBattery();
    }

    // Handle battery update
    public function updateBattery($data) {
        return $this->model->updateBattery($data['idBattery'], $data['batteryCapacity'], $data['batteryStatus']);
    }

    // Handle battery deletion (soft delete)
    public function deleteBattery($idBattery) {
        return $this->model->deleteBattery($idBattery);
    }
}
?>