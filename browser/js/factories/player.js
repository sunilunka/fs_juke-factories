app.factory('PlayerFactory', function ($rootScope) {
	return {

    songs: [],

    audio: document.createElement('audio'),

    isPlayingBool: false,

    currentSong: null,

    progress: 0,


    isPlaying: function(){
      return this.isPlayingBool;
    },

    load: function (song) {
      this.audio.src = song.audioUrl;
      this.audio.load();
      this.currentSong = song;
      $rootScope.$broadcast('songLoad', song);
      this.progress = 0;
    },

    start: function (song, songList) {
      this.songs = songList;
      this.pause();
      this.load(song);
      this.resume();
    },

    pause: function () {
      this.audio.pause();
      this.isPlayingBool = false;
    },

    resume: function() {
      this.audio.play();
      this.isPlayingBool = true;
    },

    getCurrentSong: function(){
      return this.currentSong;
    },

    getProgress: function(){
      return this.progress;
    },


    moveTo: function (index) {
      index += this.songs.length
      index %= this.songs.length;
      console.log("Songs are: ", this.songs);
      console.log("this index: ", index);
      this.start(this.songs[index]);
    },

    next: function () {
      var index = this.songs.indexOf(this.currentSong);
      this.moveTo(index + 1);
    },

    previous: function () {
      var index = this.songs.indexOf(this.currentSong);
      this.moveTo(index - 1);
    }


  // $load = function (song) {
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   PlayerFactory.currentSong = song;
  //   $rootScope.$broadcast('songLoad', song);
  //   $scope.progress = 0;
  // }







  };
});