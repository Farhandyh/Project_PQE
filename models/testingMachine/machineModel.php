<?php
class MachineModel {
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }

    // Create a new machine
    public function createMachine($idMachine, $machineName, $machineType, $machineStatus) {
        $query = "INSERT INTO testingMachine (idMachine, machineName, machineType, machineStatus)
                  VALUES ('$idMachine', '$machineName', '$machineType', '$machineStatus')";
        return mysqli_query($this->con, $query);
    }

    // Get all machines
    public function getMachine() {
        $query = "SELECT * FROM testingMachine";
        return mysqli_query($this->con, $query);
    }

    // Update a machine
    public function updateMachine($idMachine, $machineName, $machineType, $machineStatus) {
        $query = "UPDATE testingMachine SET 
                  machineName = '$machineName', 
                  machineType = '$machineType', 
                  machineStatus = '$machineStatus' 
                  WHERE idMachine = '$idMachine'";
        return mysqli_query($this->con, $query);
    }

    // Soft delete a machine (set status to Non-Active)
    public function deleteMachine($idMachine) {
        $query = "UPDATE testingMachine SET machineStatus = 'Non-Active' WHERE idMachine = '$idMachine'";
        return mysqli_query($this->con, $query);
    }
}
?>