<?php include("./php/db.php"); 
if(isset($_SESSION["login"]) == true){
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Game</title>
        <meta charset="utf-8">
    </head>
    <style>
    
	canvas{
        margin-left: auto;
        margin-right: auto;
        display: block;
        border: black solid;
        
    }
    
    html{
        background-color: beige;
    }

	.main {
		margin: 0 auto;
		width: 1000px;
	}

    .gameBoard{
        margin: 0 auto;
        text-align: right;
        width: 600px;
        float: right;
    }

    .scoreBoard{
        margin: 0 auto;
        text-align: left;
        width: 300px;
        float: left;
        padding-top: 25px;
    }

    table, th, td  {
      border: 1px solid black;
    }

    th, td {
      padding: 10px;
      text-align: left;
    }

    </style>
    <body>
        
        <div class="main">
            <div class="scoreBoard">
                <h1>Score Board</h1>
                <h4>Current Username: <b style="color: green;"><?php echo ucfirst($_SESSION["username"]); ?> </b></h4>
                <table>
                <tr>
                    <th>Username</th>
                    <th>Highest Score</th>
                </tr>

                <tbody id="scoreTable">
                <?php
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
                </tbody>
            </table>
            </div>

            <div class="gameBoard">
                <canvas id="canvas" width="600" height="600"></canvas>
                <div>
                    Time: <span id='time'>30</span>
                    Score: <span id='score'>0</span>
                    Difficulty: <select id='difficulty' onchange="updateScore();">
                        <option>Select The Difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                        <option>Hell</option>
                    </select>
                    <button id='reset' onclick="updateScore();">Reset</button>
                </div>

                <form id="updateScoreForm" action="./php/update-score.php" method="post">
                    <input type="hidden" name="inputScore" id="inputScore" value="0">
                </form>
            </div>
        </div>
		
        <script src='script.js'></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    
    </body>
</html>
<?php
}else{
    header("location: login.php?msg=Login to continue game!");
}
?>
