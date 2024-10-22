<?php
class BatteryModel {
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }

    // Create a new battery
    public function createBattery($idBattery, $batteryCapacity, $batteryStatus) {
        $query = "INSERT INTO battery (idBattery, batteryCapacity, batteryStatus)
                  VALUES ('$idBattery', '$batteryCapacity', '$batteryStatus')";
        return mysqli_query($this->con, $query);
    }

    // Get all batteries 
    public function getBattery() {
        $query = "SELECT * FROM battery";
        return mysqli_query($this->con, $query);
    }

    // Update a battery
    public function updateBattery($idBattery, $batteryCapacity, $batteryStatus) {
        $query = "UPDATE battery SET 
                  batteryCapacity = '$batteryCapacity', 
                  batteryStatus = '$batteryStatus', 
                  WHERE idBattery = '$idBattery'";
        return mysqli_query($this->con, $query);
    }

    // Soft delete a battery (set status to Non-Active)
    public function deleteBattery($idBattery) {
        $query = "UPDATE battery SET batteryStatus = 'Non-Active' WHERE idBattery = '$idBattery'";
        return mysqli_query($this->con, $query);
    }
}
?>