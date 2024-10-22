<?php
include_once '../../controllers/users/usersController.php';

$controller = new UsersController();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($controller->createUser($data)) {
        echo json_encode(["message" => "User created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add new user"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>