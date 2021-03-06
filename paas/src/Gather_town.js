import React, {createRef, useEffect} from "react";
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import withRoot from './modules/withRoot';
import Loader from './Spinner';

function Town(props) {

    let canvas;
    let context;
    let canvasRef = createRef();

    let DOWN = 0;
    let UP = 2;
    let LEFT = 3;
    let RIGHT = 1;
    
    let currentDirection = DOWN;

    let walkCycle = [0, 1, 2, 3];
    let walkIndex = 0;
    
    let width = 16;
    let height = 32;
    let SCALE = 2;
    let SCALED_WIDTH = SCALE * width;
    let SCALED_HEIGHT = SCALE * height;
    
    //Add frame limit for smooth rendering
    let frameCount = 0;
    let FRAME_LIMIT = 12;

    let backgroundReady = false;
    let backgroundImg = new Image();
        
    backgroundImg.src = "/assets/town.png";
    
    backgroundImg.onload = function() {
      backgroundReady = true;
    };

    let heroReady = false;
    let heroImg = new Image();

    heroImg.src = "/assets/character.png";

    heroImg.onload = function() {
    heroReady = true;
    };

    let hero = {
        speed: 3,
        x: 500,
        y: 300
      };

      // let rupeeReady = false;
      // let rupeeImg = new Image();
      
      // rupeeImg.onload = function() {
      //   rupeeReady = true;
      // };
      
      // rupeeImg.src = "/assets/rupee.png";
      //   let rupees = {
      //   x: 0,
      //   y: 0
      //   };

    let keysDown = {};

    window.addEventListener(
        "keydown",
        function(e) {
          keysDown[e.keyCode] = true;
        },
        false
      );
      window.addEventListener(
        "keyup",
        function(e) {
          delete keysDown[e.keyCode];
        },
        false
      );

    // 키보드 입력
    window.addEventListener('keydown',e=>{
        // 마우스 좌표 찾기
        var x = hero.x;
        var y = hero.y;
        var coords = "X coords: " + x + ", Y coords: " + y;
        console.log(coords);
        // 클릭 이벤트
        if (x >= 100 && x <= 200 && y >= 300 && y <= 400) {
        if (e.keyCode === 88) {
            openWin()
            console.log('키보드 이벤트 발생!');
        }
        }
    }); 

    useEffect(() => {

        canvas = canvasRef.current;
        context = canvas.getContext("2d");

        canvas.addEventListener(
            "keydown",
            function(e) {
              keysDown[e.keyCode] = true;
            },
            false
          );

        canvas.addEventListener(
            "keyup",
            function(e) {
              delete keysDown[e.keyCode];
            },
            false
          );

    // 키보드 입력
    window.addEventListener('keydown',e=>{
      // 마우스 좌표 찾기
      var x = hero.x;
      var y = hero.y;
      var coords = "X coords: " + x + ", Y coords: " + y;
      console.log(coords);
      // 클릭 이벤트
      if (x >= 200 && x <= 300 && y >= 100 && y <= 200) {
        Enter()
        if (e.keyCode === 88) {
          //Enter()
          console.log('키보드 이벤트 발생!');
      }
      }
  });   
        // 마우스 클릭
        canvas.addEventListener('mousedown',e=>{
            // 마우스 좌표 찾기
            var x = e.clientX;
            var y = e.clientY;
            var coords = "X coords: " + x + ", Y coords: " + y;
            console.log(coords);
            // 클릭 이벤트
            if (x >= 100 && x <= 200 && y >= 200 && y <= 300) {
              Enter()
              console.log('마우스 버튼 ON 이벤트 발생!');
            }
          });
    }, []);

    function loadImage() {
        if (backgroundReady) {
          context?.drawImage(backgroundImg, 0, 0);
        }
      }

    function Enter() {
      window.location = "./Draw"
    }

    function openWin(){
        // 파스타 웹 페이지 링크 예정  
        window.open("/Draw", "","width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  
      }
      
      function moveChar(deltaX, deltaY, direction) {       
        var width = 1500;
        var height = 790;
        
        if (hero.x + deltaX > 0 && hero.x + SCALED_WIDTH + deltaX < width) {
          hero.x += deltaX * hero.speed;
        }
        if (hero.y + deltaY > 0 && hero.y + SCALED_HEIGHT + deltaY < height) {
          hero.y += deltaY * hero.speed;
        }
        currentDirection = direction;
      }

      function moveHero() {
        let hasMoved = false;
      
        if (38 in keysDown) {
          //38 = up arrow key
          moveChar(0, -1, UP);
          hasMoved = true;
        }
      
        if (40 in keysDown) {
          //40 = down arrow key
          moveChar(0, 1, DOWN);
          hasMoved = true;
        }
      
        if (37 in keysDown) {
          //37 = left arrow key
          moveChar(-1, 0, LEFT);
          hasMoved = true;
        }
      
        if (39 in keysDown) {
          //39 = right arrow key
          moveChar(1, 0, RIGHT);
          hasMoved = true;
        }
      
        if (!hasMoved) {
          walkIndex = 0;
        }
      
        //Loop walk animation
        if (hasMoved) {
          frameCount++;
          if (frameCount >= FRAME_LIMIT) {
            frameCount = 0;
            walkIndex++;
            if (walkIndex >= walkCycle.length) {
              walkIndex = 0;
            }
          }
        }
      
        drawFrame(walkCycle[walkIndex], currentDirection, hero.x, hero.y);
      }

      // function generate() {
      //   rupees.x = 32 + Math.random() * (canvas.width - 64);
      //   rupees.y = 32 + Math.random() * (canvas.height - 64);
      // }

      function drawFrame(frameX, frameY, canvasX, canvasY) {
        context?.drawImage(
          heroImg,
          frameX * width,
          frameY * height,
          width,
          height,
          canvasX,
          canvasY,
          SCALED_WIDTH,
          SCALED_HEIGHT
        );
      }

      function gameLoop() {
        loadImage();
        moveHero();
        requestAnimationFrame(gameLoop);
      }

      gameLoop();

    return (
            <React.Fragment>
        <AppAppBar />
        <Loader />
            <canvas ref={canvasRef} width="1500" height={"790"}/>
        <AppFooter />
          </React.Fragment>
    );
}


export default withRoot(Town);