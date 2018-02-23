window.onload = function() {

    let game = new Phaser.Game(1200, 900, Phaser.AUTO, 'pew-pew', { preload: preload, create: create, update: update, render: render });

    function preload () {
        game.load.image('gryphonImage', '../resources/gryphon.png');
        game.load.image('tiles', '../resources/sci-fi-tiles.png');
    }

    let gryphon;

    function create () {

        game.stage.backgroundColor = "#7EC0EE";

        let data = '';

        for (let y = 0; y < 128; y++)
        {
            for (let x = 0; x < 128; x++)
            {
                data += game.rnd.between(1, 20).toString();

                if (x < 127)
                {
                    data += ',';
                }
            }

            if (y < 127)
            {
                data += "\n";
            }
        }

        game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);
        map = game.add.tilemap('dynamicMap', 16, 16);
        map.addTilesetImage('tiles', 'tiles', 16, 16);

        layer = map.createLayer(0);
        layer.resizeWorld();

        gryphon = game.add.sprite(game.world.centerX, game.world.centerY, 'gryphonImage');
        gryphon.anchor.setTo(0, 0);
        gryphon.scale.setTo(0.5, 0.5);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        cursors = game.input.keyboard.createCursorKeys();

        map.createLayer(1);


    }

    function update () {
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && gryphon.x >= 0) {
        gryphon.x -= 8;
      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && gryphon.x <= 1975) {
        gryphon.x += 8;
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && gryphon.y >= 0) {
        gryphon.y -= 8;
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && gryphon.y <= 1975) {
        gryphon.y += 8;
      }

      if (cursors.left.isDown) {
          game.camera.x -= 8;
      }
      if (cursors.right.isDown) {
          game.camera.x += 8;
      }

      if (cursors.up.isDown) {
          game.camera.y -= 8;
      }
      if (cursors.down.isDown) {
          game.camera.y += 8;
      }
    }

    function render() {
      game.debug.inputInfo(32, 32);
    }

};
