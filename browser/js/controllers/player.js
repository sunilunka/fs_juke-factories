app.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

	// var audio = document.createElement('audio');
	$scope.isPlaying = PlayerFactory.isPlaying;
	
	var audio = PlayerFactory.audio;

	$scope.$on('startIt', function (evt, data) {
		$scope.start(data.song);
		console.log("Songs from server are: ", data.album.songs);
		var songs = data.album.songs;
		PlayerFactory.songs = songs;
	});

	// $scope.load = function (song) {
	// 	PlayerFactory.audio.src = song.audioUrl;
	// 	PlayerFactory.audio.load();
	// 	PlayerFactory.currentSong = song;
	// 	$rootScope.$broadcast('songLoad', song);
	// 	PlayerFactory.progress = 0;
	// }

	// $scope.pause = function () {
	// 	audio.pause();
	// 	$scope.isPlaying = false;
	// };

	// $scope.play = function () {
	// 	audio.play();
	// 	PlayerFactory.isPlaying = true;
	// };


	$scope.start = PlayerFactory.start

	$scope.toggle = function () {
		if (PlayerFactory.isPlaying) PlayerFactory.pause();
		else $scope.play();
	};

	// $scope.moveTo = function (index) {
	// 	index += songs.length
	// 	index %= songs.length;
	// 	$scope.start(songs[index]);
	// };

	// $scope.forward = function () {
	// 	var index = songs.indexOf(PlayerFactory.currentSong);
	// 	$scope.moveTo(index + 1);
	// };

	// $scope.back = function () {
	// 	var index = songs.indexOf(PlayerFactory.currentSong);
	// 	$scope.moveTo(index - 1);
	// };

	audio.addEventListener('timeupdate', function () {
		PlayerFactory.progress = 100 * audio.currentTime / audio.duration;
		$scope.$digest();
	});

	audio.addEventListener('ended', function () {
		PlayerFactory.next();
		$rootScope.$digest();
	});

});