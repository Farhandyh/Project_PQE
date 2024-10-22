<?php
include_once '../../config/database.php';
include_once '../../models/rackBattery/rackBatteryModel.php';

class RackBatteryController {
    private $model;

    public function __construct() {
        global $con;
        $this->model = new RackBatteryModel($con);
    }

    // Handle rack creation
    public function createRack($data) {
        return $this->model->createRackBattery($data['idRack'], $data['rackCapacity'], $data['rackStatus']);
    }

    // Handle fetching all rack
    public function getRack() {
        return $this->model->getRackBattery();
    }

    // Handle rack update
    public function updateRack($data) {
        return $this->model->updateRackBattery($data['idRack'], $data['rackCapacity'], $data['rackStatus']);
    }

    // Handle rack deletion (soft delete)
    public function deleteRack($idRack) {
        return $this->model->deleteRackBattery($idRack);
    }
}
?>