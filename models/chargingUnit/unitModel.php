<?php
class UnitModel {
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }

    // Create a new unit charge
    public function createUnit($idUnitCharge, $unitLocation, $unitStatus) {
        $query = "INSERT INTO chargingUnit (idUnitCharge, unitLocation, unitStatus)
                  VALUES ('$idUnitCharge', '$unitLocation', '$unitStatus')";
        return mysqli_query($this->con, $query);
    }

    // Get all unit charges
    public function getUnits() {
        $query = "SELECT * FROM chargingUnit";
        return mysqli_query($this->con, $query);
    }

    // Update a unit charge
    public function updateUnit($idUnitCharge, $unitLocation, $unitStatus) {
        $query = "UPDATE chargingUnit SET 
                  unitLocation = '$unitLocation', 
                  unitStatus = '$unitStatus' 
                  WHERE idUnitCharge = '$idUnitCharge'";
        return mysqli_query($this->con, $query);
    }

    // Soft delete a unit charge (set status to Non-Active)
    public function deleteUnit($idUnitCharge) {
        $query = "UPDATE chargingUnit SET unitStatus = 'Non-Active' WHERE idUnitCharge = '$idUnitCharge'";
        return mysqli_query($this->con, $query);
    }
}
?>