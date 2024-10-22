<?php
class UsersModel {
    private $con;

    public function __construct($db) {
        $this->con = $db;
    }

    // Create a new user
    public function createUser($idUsers, $name, $username, $password, $email, $role, $userStatusString) {
        // Konversi string ke integer untuk userStatus
        $userStatus = ($userStatusString === 'Active') ? 1 : 0;

        $query = "INSERT INTO users (idUsers, name, username, password, email, role, userStatus)
                  VALUES ('$idUsers', '$name', '$username', '$password', '$email', '$role', '$userStatus')";
        return mysqli_query($this->con, $query);
    }

    // Get all users
    public function getUsers() {
        $query = "SELECT * FROM users";
        $result = mysqli_query($this->con, $query);

        if (!$result) {
            return null; // Mengembalikan null jika terjadi kesalahan pada query
        }

        // Mengonversi userStatus dari integer ke string
        $users = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $row['userStatus'] = ($row['userStatus'] == 1) ? 'Active' : 'Non-Active';
            $users[] = $row;
        }
        return $users; // Mengembalikan array hasil
    }


    // Update a user
    public function updateUser($idUsers, $name, $username, $password, $email, $role, $userStatusString) {
        // Konversi string ke integer untuk userStatus
        $userStatus = ($userStatusString === 'Active') ? 1 : 0;

        $query = "UPDATE users SET 
                  name = '$name', 
                  username = '$username', 
                  password = '$password', 
                  email = '$email', 
                  role = '$role', 
                  userStatus = '$userStatus' 
                  WHERE idUsers = '$idUsers'";
        return mysqli_query($this->con, $query);
    }

    // Soft delete a user (set status to Non-Active)
    public function deleteUser($idUsers) {
        $query = "UPDATE users SET userStatus = 0 WHERE idUsers = '$idUsers'"; // 0 untuk Non-Active
        return mysqli_query($this->con, $query);
    }
}
?>
