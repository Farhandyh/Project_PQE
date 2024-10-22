<?php
class RackBatteryModel {
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }

    // Create a new rack
    public function createRackBattery($idRack, $rackCapacity, $rackStatus) {
        $query = "INSERT INTO rackBattery (idRack, rackCapacity, rackStatus)
                  VALUES ('$idRack', '$rackCapacity', '$rackStatus')";
        return mysqli_query($this->con, $query);
    }

    // Get all racks
    public function getRackBattery() {
        $query = "SELECT * FROM rackBattery";
        return mysqli_query($this->con, $query);
    }

    // Update a rack
    public function updateRackBattery($idRack, $rackCapacity, $rackStatus) {
        $query = "UPDATE rackBattery SET 
                  rackCapacity = '$rackCapacity', 
                  rackStatus = '$rackStatus' 
                  WHERE idRack = '$idRack'";
        return mysqli_query($this->con, $query);
    }

    // Soft delete a rack (set status to Non-Active)
    public function deleteRackBattery($idRack) {
        $query = "UPDATE rackBattery SET rackStatus = 'Non-Active' WHERE idRack = '$idRack'";
        return mysqli_query($this->con, $query);
    }
}
?>