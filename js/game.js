var Game = window.Game || {};

Game = (function () {

  const GAME_WELCOME = 'welcome';
  const GAME_STATE_JOIN_OR_CREATE = 'join_or_create';
  const GAME_STATE_JOIN = 'join';
  const GAME_STATE_CREATE = 'create';
  const GAME_LOBBY = 'lobby';
  const GAME_IN_GAME = 'in_game';
  const GAME_SERVER_OFFLINE = 'offline';

  const GAME_STATES = [
    GAME_WELCOME,
    GAME_STATE_JOIN_OR_CREATE,
    GAME_STATE_JOIN,
    GAME_STATE_CREATE,
    GAME_LOBBY,
    GAME_IN_GAME,
    GAME_SERVER_OFFLINE,
  ];

  var _that = this;
  var client;
  var roomWaiting;

  function loadState(newState) {
    loadUiForState(newState);

    switch (newState) {
      case GAME_WELCOME:
        $('#start').on('click', function () {
          loadState(GAME_STATE_JOIN_OR_CREATE);
        });
        break;

      case GAME_STATE_JOIN_OR_CREATE:
        $('.create').on('click', function () {
          loadState(GAME_STATE_CREATE);
        });

        // $('.join').on('click', function () {
        //   client.join("my_room", { 'roomName': 'eflyax' }).then(room => {
        //     processConnection(room);
        //   }).catch(e => {
        //     console.error("join error", e);
        //   });
        // });
        break;

      case GAME_STATE_CREATE:
        // loadState(GAME_LOBBY);
        $('.btn-create-room').on('click', function () {
          client.joinOrCreate("my_room", { 'roomName': $('.room-code').val() }).then(room => {
            roomWaiting.leave();
            console.log(room);
            //  processConnection(room);

          }).catch(e => {
            console.error("join error", e);
          });
        });
        break;
    }

  }

  function loadUiForState(newState) {
    GAME_STATES.forEach(function (state) {
      $('#' + state).hide();
    });
    $('#' + newState).show();
  }

  function initialize() {
    client = new Colyseus.Client('ws://eflyax.cz:2567');
    console.log(client);
    client.join("room_waiting", {}).then(room => {
      roomWaiting = room;
      loadState(GAME_WELCOME);
    }).catch(e => {
      console.log(e);
      loadState(GAME_SERVER_OFFLINE);
    });
  }

  return {
    init: function () {
      initialize();
    },
    loadState: function (state) {
      loadState(state);
    },
  }

});
