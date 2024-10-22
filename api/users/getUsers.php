<?php 
 include_once '../../controllers/users/usersController.php';

 $controller = new UsersController();
 
 if ($_SERVER['REQUEST_METHOD'] == 'GET') {
     $users = $controller->getUsers(); // Mengambil hasil dari getUsers()
 
     // Memeriksa apakah $users tidak null dan memiliki data
     if ($users !== null && count($users) > 0) {
         echo json_encode($users);
     } else {
         echo json_encode(["message" => "User not found"]);
     }
 } else {
     echo json_encode(["message" => "Invalid request method"]);
 }
?>