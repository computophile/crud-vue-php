<?php

  $conn = new mysqli("localhost", "root", "",  "test");
  if($conn->connect_error){
    die("connection Failed" . $conn->connect_error);
  }
  else{
    // echo("Connected successfully with status ". $conn->connect_errno);
  }

  $result = array('error' => false);
  $action = '';
  if (isset($_GET['action'])){
    $action = $_GET['action'];
  }

  // reading the users
  if ($action == 'read'){
    $sql = $conn->query("SELECT * FROM users");
    $users = array();
    while($row = $sql->fetch_assoc()){
      array_push($users, $row);
    }
    $result['users'] = $users;
  }

  // creating the users

  if ($action == 'create'){

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    $sql = $conn->query("INSERT INTO users (name, email, phone) VALUES('$name','$email','$phone')");

    if($sql){
      $result['message'] = "User added successfully";
    }
    else{
      $result['error'] = true;
      $result['message'] = "Failed to add the user";
    }
  }


  // updating the user
  if ($action == 'update'){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    $sql = $conn->query("UPDATE users SET name='$name', email='$email', phone='$phone' WHERE id='$id'");
    if($sql){
      $result['message'] = "User updated successfully";
    }
    else{
      $result['error'] = true;
      $result['message'] = "Failed to update the user";
    }
  }

    // Delete the user
    if ($action == 'delete'){
      $id = $_POST['id'];
      $name = $_POST['name'];
      $email = $_POST['email'];
      $phone = $_POST['phone'];
  
      $sql = $conn->query("DELETE FROM users WHERE id = '$id'");
      if($sql){
        $result['message'] = "User Deleted successfully";
      }
      else{
        $result['error'] = true;
        $result['message'] = "Failed to delete the user";
      }
    }

    $conn->close();
  echo json_encode($result);
?>