const screenWidth = window.innerWidth; // получить ширину экрана
const screenHeight = window.innerHeight; // получить высоту экрана
const step = 10; // шаг передвижения картинки
var move = 'right'
var keyDown = 0
// флаг свободного падения, показывает стоим ли мы на предмете (если стоим, то флаг будет 0, так как нам не требуется падение)
var g = 1
// находился ли игрок в предыдущей позиции на объекте
var prevPosOnObj = 0
var prevObj = 0
var roachCounter = 0
var ostPlay = 0
var jumpAudio = new Audio('audio/jump.mp3')
var speed = 50
var allAudio = ['audio/chulochki.mp3', 'audio/hotline.mp3', 'audio/krug.mp3']

objects = {
    'player': {
        'x': 650,
        'y': 0,
        'img': 'left',
        'landed': 0,
    },
    'minicar': {
        'x': screenWidth / 2 - 150,
        'y': 0,
    },
    'dimaEyes': {
        'x': 0,
        'y': screenHeight / 2 - 50,
    },
    'janeEyes': {
        'x': screenWidth / 2,
        'y': 50,
    },
    'roach1': {
        'x': screenWidth / 20,
        'y': 0,
    },
    'roach2': {
        'x': 0,
        'y': 0,
    },
    'roach3': {
        'x': 0,
        'y': 0,
    },
    'roach4': {
        'x': 0,
        'y': 0,
    },
    'roach5': {
        'x': screenWidth - screenWidth / 20,
        'y': 0,
    },
    'aeroplane': {
        'x': screenWidth,
        'y': 0,
    }
}
