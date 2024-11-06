<?php
include_once '../../controllers/users/usersController.php';

$controller = new UsersController();

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data['idUsers'])) {
        if ($controller->deleteUser($data['idUsers'])) {
            echo json_encode(["message" => "User marked as Non-Active"]);
        } else {
            echo json_encode(["message" => "Failed to delete User"]);
        }
    } else {
        echo json_encode(["message" => "User ID's required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>