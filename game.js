(function gameSetup() {
  'use strict';

  var shipElem = document.getElementById('ship');

  // Create your "ship" object and any other variables you might need...

  var ship = {
    htmlElem: shipElem,
    velocity: 0,
    angle: 0
  };

  ship.htmlElem.style.top = '500px';
  ship.htmlElem.style.left = '30px';

  console.log(ship);

  var allAsteroids = [];

  shipElem.addEventListener('asteroidDetected', function (event) {
    // You can detect when a new asteroid appears with this event.
    // The new asteroid's HTML element will be in:  event.detail
    allAsteroids.push(event.detail);
    // console.log(event.detail, "HI");
    // console.log(allAsteroids);
    console.log('asteroid box: ',event.detail.getBoundingClientRect());
    console.log('ship box: ', ship.htmlElem.getBoundingClientRect());
    // What might you need/want to do in here?

  });

  /**
  * Use this function to handle when a key is pressed. Which key? Use the
  * event.keyCode property to know:
  *
  * 37 = left
  * 38 = up
  * 39 = right
  * 40 = down
  *
  * @param  {Event} event   The "keyup" event object with a bunch of data in it
  * @return {void}          In other words, no need to return anything
  */
  function handleKeys(event) {
    console.log(event.keyCode);
    if
      (event.keyCode === 37) {
      // console.log('gotit');
      ship.angle -= 5;
      console.log(ship.angle);
      ship.htmlElem.style.transform = 'rotate(' + ship.angle + 'deg)';
      console.log('rotate(' + ship.angle + 'deg)');
      // ship.htmlElem.style.transform = rotate(90);
    } else

    if (event.keyCode === 39) {
      ship.angle += 5;
      // console.log(ship.angle);
      ship.htmlElem.style.transform = 'rotate(' + ship.angle + 'deg)';
    }

    if (event.keyCode === 38) {
      ship.velocity += 2;
    }
    if (event.keyCode === 40) {
      ship.velocity -= 3;
    }
    // }

    // Implement me!

  }
  document.querySelector('body').addEventListener('keyup', handleKeys);

  /**
  * This is the primary "game loop"... in traditional game development, things
  * happen in a loop like this. This function will execute every 20 milliseconds
  * in order to do various things. For example, this is when all game entities
  * (ships, etc) should be moved, and also when things like hit detection happen.
  *
  * @return {void}
  */
  function gameLoop() {
    // This function for getting ship movement is given to you (at the bottom).
    // NOTE: you will need to change these arguments to match your ship object!
    // What does this function return? What will be in the `move` variable?
    // Read the documentation!
    var move = getShipMovement(ship.velocity, ship.angle); // returns the object left and top (at bottom)
    var top = parseInt(ship.htmlElem.style.top); // 20
    // console.log(top, 'TOP');
    top -= move.top; // don't understand this line // top = top - move.top


    // console.log(move.top);
    // console.log(top, 'another top');
    ship.htmlElem.style.top = top + 'px'; // 20px
    // console.log(ship.htmlElem.style.top);

    var left = parseInt(ship.htmlElem.style.left);
    left += move.left;
    ship.htmlElem.style.left = left + 'px';



    // Move the ship here!


    // Time to check for any collisions (see below)...
    checkForCollisions();
  }

  /**
  * This function checks for any collisions between asteroids and the ship.
  * If a collision is detected, the crash method should be called with the
  * asteroid that was hit:
  *    crash(someAsteroidElement);
  *


  * You can get the bounding box of an element using:
  *    someElement.getBoundingClientRect();
  *
  * A bounding box is an object with top, left, width, and height properties
  * that you can use to detect whether one box is on top of another.
  *
  * @return void
  */
  // function checkForCollisions(posOfShip, posOfAst) {
  //   var posOfShip = ship.htmlElem.getBoundingClientRect();
  //   var posOfAst = allAsteroid[i].getBoundingClientRect();
  //
  //   for (i = 0; i < allAsteroids.length; i++) {
  //     if  (posOfShip.top < posOfAst.top && posOfAst.top <= (posOfShip.top + posOfShip.height))
  //         (posOfShip.left < posOfAst.left && posOfAst.left <= (posOfShip.left+ posOfShip.width)) {
  //             console.log ('A crash occured!');
  //     }
  //
  //   }
  //
  // }


  /**
  * This event handler will execute when a crash occurs
  *
  * return {void}
  */
  document.querySelector('main').addEventListener('crash', function () {
    console.log('A crash occurred!');

    // What might you need/want to do in here?

  });



  /** ************************************************************************
  *             These functions and code are given to you.
  *
  *                   !!! DO NOT EDIT BELOW HERE !!!
  ** ************************************************************************/

  var loopHandle = setInterval(gameLoop, 20);

  /**
  * Executes the code required when a crash has occurred. You should call
  * this function when a collision has been detected with the asteroid that
  * was hit as the only argument.
  *
  * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
  * @return {void}
  */
  function crash(asteroidHit) {
    document.querySelector('body').removeEventListener('keyup', handleKeys);
    asteroidHit.classList.add('hit');
    document.querySelector('#ship').classList.add('crash');

    var event = new CustomEvent('crash', { detail: asteroidHit });
    document.querySelector('main').dispatchEvent(event);
  }

  /**
  * Get the change in ship position (movement) given the current velocity
  * and angle the ship is pointing.
  *
  * @param  {Number} velocity The current speed of the ship (no units)
  * @param  {Number} angle    The angle the ship is pointing (no units)
  * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
  */
  function getShipMovement(velocity, angle) {
    return {
      left: (velocity * Math.sin(angle * Math.PI / 180)),
      top: (velocity * Math.cos(angle * Math.PI / 180))
    };
  }

})();
