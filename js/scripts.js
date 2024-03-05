function moveScreen(direction) {

}

function roachCollision(hero, roach) {
    if ((hero.left < roach.left && hero.right >= roach.left ||
        hero.left >= roach.left && hero.right <= roach.right ||
        hero.left <= roach.right && hero.right > roach.right) &&
        (hero.top < roach.top && hero.bottom >= roach.top ||
        hero.top >= roach.top && hero.bottom <= roach.bottom ||
        hero.top <= roach.bottom && hero.bottom > roach.bottom)) {
        return 1
    }

    return 0
}

function checkCollision(object) {
    var hero = document.getElementById('hero').getBoundingClientRect();

    if ((hero.left < object.left && hero.right >= object.left ||
        hero.left >= object.left && hero.right <= object.right ||
        hero.left <= object.right && hero.right > object.right) &&
        (hero.top < object.top && hero.bottom >= object.top ||
        hero.top >= object.top && hero.bottom <= object.bottom ||
        hero.top <= object.bottom && hero.bottom > object.bottom)) {
        if (move == 'down') {
            prevPosOnObj = 1
            return 'top'
        } else if (move == 'up') {
            prevPosOnObj = 0
            return 'bottom'
        } else {
            if (move == 'left') {
                prevPosOnObj = 0
                return 'left'
            }
            prevPosOnObj = 0
            return 'right'
        }
    }

  return 0
}

async function renderPage() {
    var hero = await document.getElementById('hero')
    var minicar = await document.getElementById('minicar')
    var dimaEyes = await document.getElementById('dima_eyes')
    var janeEyes = await document.getElementById('jane_eyes')
    var roach1 = await document.getElementById('roach1')
    var roach2 = await document.getElementById('roach2')
    var roach3 = await document.getElementById('roach3')
    var roach4 = await document.getElementById('roach4')
    var roach5 = await document.getElementById('roach5')
    var minicarRect = minicar.getBoundingClientRect()
    var dimaEyesRect = dimaEyes.getBoundingClientRect()
    var janeEyesRect = janeEyes.getBoundingClientRect()
    var roach1Rect = roach1.getBoundingClientRect()
    var roach2Rect = roach2.getBoundingClientRect()
    var roach3Rect = roach3.getBoundingClientRect()
    var roach4Rect = roach4.getBoundingClientRect()
    var roach5Rect = roach5.getBoundingClientRect()
    var chrum = new Audio('audio/chrum.mp3')

    if (pressedKeys.has('a')){
        objects.player.x -= step; // движение влево
        hero.src = './img/dima_left.png';
        hero.style.height = '335px';
        objects.player.img = 'left';
        move = 'left'
    }
    if (pressedKeys.has('d')){
        objects.player.x += step; // движение вправо
        hero.src = './img/dima_right.png';
        hero.style.height = '335px';
        objects.player.img = 'right';
        move = 'right'
    }
    if (pressedKeys.has('s')){
        hero.src = './img/dima_down.png';
        hero.style.height = '200px';
        objects.player.img = 'down';
        move = 'down'
    } else if(hero.style.height = '200px'){
        hero.src = './img/dima_right.png';
        hero.style.height = '335px';
    }

    var heroRect = hero.getBoundingClientRect()
    var collision1 = checkCollision(minicarRect)
    var collision2 = checkCollision(dimaEyesRect)
    var collision3 = checkCollision(janeEyesRect)
    var collision = 0

    if (collision1) {
        collision = {'collision': collision1, 'obj': minicarRect}
    } else if (collision2) {
        collision = {'collision': collision2, 'obj': dimaEyesRect}
    } else {
        collision = {'collision': collision3, 'obj': janeEyesRect}
    }

    if (!keyDown) {
        move = 'down'
    }

    // проверяем коллизию с тараканами
    if (roachCollision(heroRect, roach1Rect) && roach1.style.display != 'none') {
        roach1.style.display = 'none'
        chrum.play()
        roachCounter += 1
    } else if (roachCollision(heroRect, roach2Rect) && roach2.style.display != 'none') {
        roach2.style.display = 'none'
        chrum.play()
        roachCounter += 1
    } else if (roachCollision(heroRect, roach3Rect) && roach3.style.display != 'none') {
        roach3.style.display = 'none'
        chrum.play()
        roachCounter += 1
    } else if (roachCollision(heroRect, roach4Rect) && roach4.style.display != 'none') {
        roach4.style.display = 'none'
        chrum.play()
        roachCounter += 1
    } else if (roachCollision(heroRect, roach5Rect) && roach5.style.display != 'none') {
        roach5.style.display = 'none'
        chrum.play()
        roachCounter += 1
    }

    if (roachCounter == 5) {
        var endGIF = document.getElementById('end')
        hero.style.display = 'none'
        minicar.style.display = 'none'
        dima_eyes.style.display = 'none'
        jane_eyes.style.display = 'none'
        endGIF.style.display = 'block'
        ostPlay.pause()
        roachCounter = 0
        let endAudio = new Audio('audio/Kazakhstan.mp3')
        endAudio.play()
    }

    // проверяем изменились ли координаты объектов

    // перемещаем объекты, у которых изменились координаты
    if (objects.player.landed) {
        if (collision.collision == 'bottom') {
            objects.player.y = collision.obj.bottom + 1
        } else if (collision.collision == 'left') {
            objects.player.x = collision.obj.right + 1
        } else if (collision.collision == 'right') {
            objects.player.x = collision.obj.left - heroRect.width - 1
        } else if (collision.collision == 'top') {
            g = 0
            prevObj = collision.obj
            objects.player.y = collision.obj.top - heroRect.height - 1
        } else {
            // если коллизий нет, но на предыдущем шаге стояли на предмете
            if (!(heroRect.left < prevObj.left && heroRect.right >= prevObj.left ||
                heroRect.left >= prevObj.left && heroRect.right <= prevObj.right ||
                heroRect.left <= prevObj.right && heroRect.right > prevObj.right)) {
                prevPosOnObj = 0
                g = 1
            }
        }

        if (g) {
            if (heroRect.bottom < screenHeight - 1) {
                objects.player.y += 15
            }
        }
        // проверка не провалились ли под землю
        if (heroRect.bottom >= window.innerHeight) {
            objects.player.y = window.innerHeight - heroRect.height - 1
        }

        hero.style.left = objects.player.x + 'px'
        hero.style.top = objects.player.y + 'px'
    } else if (objects.aeroplane.x <= 650) {
        objects.player.landed = 1
    }
    keyDown = 0

    minicar.style.left = objects.minicar.x + 'px'
    minicar.style.top = screenHeight - minicarRect.height + 'px'

    dimaEyes.style.left = objects.dimaEyes.x + 'px'
    dimaEyes.style.top = objects.dimaEyes.y + 'px'

    janeEyes.style.left = objects.janeEyes.x + 'px'
    janeEyes.style.top = objects.janeEyes.y + 'px'

    roach1.style.left = objects.roach1.x + 'px'
    roach1.style.top = screenHeight - roach1Rect.height + 'px'

    roach2.style.left = objects.janeEyes.x + 200 + 'px'
    roach2.style.top = objects.janeEyes.y - roach2Rect.height + 'px'

    roach3.style.left = objects.dimaEyes.x + 50 + 'px'
    roach3.style.top = objects.dimaEyes.y - roach3Rect.height + 'px'

    roach4.style.left = objects.minicar.x + 450 + 'px'
    roach4.style.top = minicarRect.top - roach4Rect.height + 'px'

    roach5.style.left = objects.roach5.x + 'px'
    roach5.style.top = screenHeight - roach5Rect.height + 'px'
}

async function flyAeroplane() {
    var aeroplane = await document.getElementById('aeroplane')

    if (objects.aeroplane.x > -500) {
        objects.aeroplane.x -= 7
        aeroplane.style.left = objects.aeroplane.x + 'px'
    }
    aeroplane.style.top = objects.aeroplane.y + 'px'
}

function eating(object) {

}

function start() {
    var startButton = document.getElementById('start')
    startButton.parentNode.removeChild(startButton);
    document.getElementById('logo-container').style.display = 'none'

    let hero = document.getElementById('hero');
    let heroRect = hero.getBoundingClientRect();

    renderPage();
    setInterval(flyAeroplane, 30);
    setInterval(renderPage, speed);

    // Создание аудиоэлементов
    var aeroplaneAudio = new Audio('audio/aeroplane.mp3');
    var ost = [new Audio(allAudio[0]), new Audio(allAudio[1]), new Audio(allAudio[2])]

    // Воспроизведение первого аудио
    aeroplaneAudio.play();

    // OST, которое запускается после окончания шума самолёта
    aeroplaneAudio.onended = function() {
      let randomNumber = Math.floor(Math.random() * 3)
      ostPlay = ost[randomNumber]
      ost[randomNumber].play();
    };

    document.addEventListener('keyup', function(event) {
      if (event.key === 'a' || event.key === 'ф') {
        pressedKeys.delete('a')
      } else if(event.key === 'd' || event.key === 'в') {
        pressedKeys.delete('d')
      } else if(event.key === 's' || event.key === 'ы') {
        pressedKeys.delete('s')
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'a' || event.key === 'ф') {
        pressedKeys.add('a')
        keyDown = 1
      } else if (event.key === 'd' || event.key === 'в') {
        pressedKeys.add('d')
        keyDown = 1
      } else if (event.key === 'w' || event.key === 'ц') {
        objects.player.y -= step; // движение вверх
        move = 'up'
        keyDown = 1
      } else if (event.key === 's' || event.key === 'ы') {
        pressedKeys.add('s')
        objects.player.y += step * 30; // движение вниз
        move = 'down'
        keyDown = 1
      } else if (event.key == ' ') {
        jumpAudio.pause()
        jumpAudio.play()
        objects.player.y -= step * 40; // прыжок вверх
        move = 'up'
        keyDown = 1
        g = 1
      } else if (event.key == 'Shift') {
        if (objects.player.img == 'left') {
            objects.player.x -= 250; // буст влево
            move = 'left'
            keyDown = 1
        } else {
            objects.player.x += 250; // буст вправо
            move = 'right'
            keyDown = 1
        }
      }
    });
}
