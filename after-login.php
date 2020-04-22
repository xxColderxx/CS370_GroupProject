<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to Game!</title>
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

    table, th, td  {
      border: 1px solid black;
    }

    th, td {
      padding: 15px;
      text-align: left;
    }

    </style>
    <body>
        <h1 id="mainHeading"><?php echo $_GET["msg"]; ?></h1>
        <div>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Highest Score</th>
                </tr>

                <?php
                include("./php/db.php");
                $select = "SELECT * FROM scores ORDER BY score DESC LIMIT 10;";
                $result = mysqli_query($conn,$select);
                $resultCount = mysqli_num_rows($result);
                if($resultCount == 0){
                    echo "<tr><td colspan='2' style='color:red;'>0 Results Found!</td></tr>";
                }else{
                    while ($row = mysqli_fetch_array($result)) {
                    echo "<tr><td>".$row["username"]."</td><td>".$row["score"]."</td></tr>";
                    }
                }
                ?>
            </table>
            <br>
            <br>
            <br>
            <a class="btn" href="game.php">Click to continue</a>            
        </div>
    </body>
</html>
