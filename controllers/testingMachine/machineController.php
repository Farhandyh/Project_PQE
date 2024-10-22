<?php
include_once '../../config/database.php';
include_once '../../models/testingMachine/machineModel.php';

class MachineController {
    private $model;

    public function __construct() {
        global $con;
        $this->model = new MachineModel($con);
    }

    // Handle machine creation
    public function createMachine($data) {
        return $this->model->createMachine($data['idMachine'], $data['machineName'], $data['machineType'], $data['machineStatus']);
    }

    // Handle fetching all machines
    public function getMachine() {
        return $this->model->getMachine();
    }

    // Handle machine update
    public function updateMachine($data) {
        return $this->model->updateMachine($data['idMachine'], $data['machineName'], $data['machineType'], $data['machineStatus']);
    }

    // Handle machine deletion (soft delete)
    public function deleteMachine($idMachine) {
        return $this->model->deleteMachine($idMachine);
    }
}
?>