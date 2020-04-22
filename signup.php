<!DOCTYPE html>
<html>
    <head>
        <title>Signup!</title>
        <meta charset="utf-8">
    </head>
    <style>
    html{
        background-color: beige;
    }

	div{
		margin: 0 auto;
		text-align: center;
		width: 600px;
	}

    input[type=text],[type="password"] {
      width: 50%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
    }

    input[type=submit], button {
      width: 25%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      background: black;
      color: white;
    }

    #mainHeading {
        padding: 20px;
        text-align: center;
    }

    .btn {
        width: 25%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        background: black;
        color: white;
    }

    </style>
    <body>
        <h1 id="mainHeading">Sign Up!</h1>
        <?php
        if(isset($_GET["msg"])){
            echo "<p style='text-align:center; color: red;'>".$_GET["msg"]."</p>";
        }
        ?>
        <div>
            <p>Enter following details to signup!</p>
            <form action="./php/signup.php" method="post">
                <label>Username:</label>
                <input placeholder="Enter username" type="text" name="username" required="" autocomplete="false">
                <br>
                <label>Password:</label>
                <input placeholder="Enter password" type="password" name="password" required="" autocomplete="false">
                <br>
                <input type="submit" name="" value="Signup">
            </form>
            <br>
            <a href="login.php">Already Registered? Login Here!</a>
            <br>
            <br>
            <br>
            <a href="index.html">&#8592; Back to welcome page!</a>
        </div>
    </body>
</html>
