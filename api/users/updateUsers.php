<?php
include_once '../../controllers/users/usersController.php';

$controller = new UsersController();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->updateUser($data)) {
        echo json_encode(["message" => "User updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update user"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>