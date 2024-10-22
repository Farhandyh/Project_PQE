<?php
include_once '../../config/database.php';
include_once '../../models/chargingUnit/unitModel.php';

class UnitController {
    private $model;

    public function __construct() {
        global $con;
        $this->model = new UnitModel($con);
    }

    // Handle unit creation
    public function createUnit($data) {
        return $this->model->createUnit($data['idUnitCharge'], $data['unitLocation'], $data['unitStatus']);
    }

    // Handle fetching all units
    public function getUnit() {
        return $this->model->getUnit();
    }

    // Handle unit update
    public function updateUnit($data) {
        return $this->model->updateUnit($data['idUnitCharge'], $data['unitLocation'], $data['unitStatus']);
    }

    // Handle unit deletion (soft delete)
    public function deleteUnit($idUnitCharge) {
        return $this->model->deleteUnit($idUnitCharge);
    }
}
