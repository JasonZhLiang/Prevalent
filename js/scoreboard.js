var app = angular.module("scoreboard", []);

app.controller("scoreboardController", ['$scope', function($scope) {

    $scope.players = [
        { id: 1, name: "Justin" },
        { id: 2, name: "Liam" },
        { id: 3, name: "Steve (CEO)" },
        { id: 4, name: "Dan" },
        { id: 5, name: "Lee" },
        { id: 6, name: "Gavin" },
        { id: 7, name: "Tracey" },
        { id: 8, name: "David" },
        { id: 9, name: "Sam" },
        { id: 10, name: "Chris" },
        { id: 11, name: "Joe" },
        { id: 12, name: "Emma" }
    ];

    $scope.results = [
        { id: 1, player_1: "Justin", score_1: 11, player_2: "Steve (CEO)", score_2: 6},
        { id: 2, player_1: "Steve (CEO)", score_1: 13, player_2: "Dan", score_2: 11},
        { id: 3, player_1: "Liam", score_1: 6, player_2: "Lee", score_2: 11},
        { id: 4, player_1: "Liam", score_1: 11, player_2: "Steve (CEO)", score_2: 9},
        { id: 5, player_1: "Justin", score_1: 14, player_2: "Lee", score_2: 12},
        { id: 6, player_1: "Justin", score_1: 10, player_2: "Dan", score_2: 12},
        { id: 7, player_1: "Dan", score_1: 11, player_2: "Lee", score_2: 9},
        { id: 8, player_1: "Justin", score_1: 11, player_2: "Liam", score_2: 3},
        { id: 9, player_1: "Tracey", score_1: 11, player_2: "Emma", score_2: 8},
        { id: 10, player_1: "Emma", score_1: 11, player_2: "Dan", score_2: 9}
    ];

    
    $scope.league = [];
    
    var winnerName='';
    

    $scope.results.forEach(element => {
        if (element.score_1>element.score_2){
            winnerName=element.player_1;

        }else{
            winnerName=element.player_2;
        }
        $scope.league.push(winnerName);
        // console.log(winnerName);
    });

    console.log($scope.league);

    // $scope.players.forEach(element => {
    //     element.point = 0;
    //     $scope.league.push(element);
    // });
    // console.log($scope.league);



    function processLeague(){
        $scope.players.forEach(element => {
        element.point = 0;
        $scope.league.forEach(item =>{
            if (item == element.name){
                element.point +=  2;
            }
        })
        // $scope.leagueDisplay.push(element);
        });
        console.log($scope.players);
        
        $scope.players.sort((a,b)=>{
            return b.point-a.point;
        });
        $scope.players.sort((a,b)=>{
            if (a.name.includes('CEO')){
                a.point=0;
                return 1;
            } else if (b.name.includes('CEO')){
                b.point=0;
                return -1;
            }else{
                return 0;
            }

        });
    }
    
    processLeague();

    $scope.errorMessage = "";
    $scope.error = false;

    $scope.addResult = function(result) {
        console.log($scope.error);
        if ((result.score_1 < 11) && (result.score_2 < 11)){
            console.log($scope.error);
            $scope.errorMessage = 'game not finish, keep palying until reach 11 points!';
            $scope.error = true;
        }else if( Math.abs(result.score_1 - result.score_2)<2){
            $scope.errorMessage = 'game not finish, keep palying until win 2 points!';
            $scope.error = true;
        }else if( Math.abs(result.score_1 - result.score_2)>2 && ((result.score_1 > 11) || (result.score_2 > 11))){
            $scope.errorMessage = 'check your input, two scores difference should be not great than 2 when beyond 11';
            $scope.error = true;
        }else {
            $scope.error = false;
            result.id = $scope.results.length + 1;
            $scope.results.push(result);

            if (result.score_1>result.score_2){
                winnerName=result.player_1;
    
            }else{
                winnerName=result.player_2;
            }
            $scope.league.push(winnerName);
            processLeague();
            $scope.result = {};
        }
    };

    $scope.addPlayer = function(player) {
        player.id = $scope.players.length + 1;
        player.point=0;
        console.dir(player);
        $scope.players.push(player);
        $scope.player = {};
        console.dir($scope.players);
    };
}]);