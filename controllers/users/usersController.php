<?php
include_once '../../config/database.php';
include_once '../../models/users/usersModel.php';

class UsersController {
    private $model;

    public function __construct() {
        global $con;
        $this->model = new UsersModel($con);
    }

    // Handle user creation
    public function createUser($data) {
        return $this->model->createUser(
            $data['idUsers'],
            $data['name'],
            $data['username'],
            $data['password'],
            $data['email'],
            $data['role'],
            $data['userStatus'] // Pastikan ini adalah string "Active" atau "Non-Active"
        );
    }

    // Handle fetching all users
    public function getUsers() {
        return $this->model->getUsers();
    }

    // Handle user update
    public function updateUser($data) {
        return $this->model->updateUser(
            $data['idUsers'],
            $data['name'],
            $data['username'],
            $data['password'],
            $data['email'],
            $data['role'],
            $data['userStatus'] // Pastikan ini adalah string "Active" atau "Non-Active"
        );
    }

    // Handle user deletion (soft delete)
    public function deleteUser($idUsers) {
        return $this->model->deleteUser($idUsers);
    }
}
?>
