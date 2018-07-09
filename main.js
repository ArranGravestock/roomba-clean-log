"use strict";

const readInput = (url = '') => {
    return fetch(url)
    .then(response => response.text())
}

const formatData = (data) => {
    var dataArray = data.split("\r\n")
    var dataObj = {
        room: {
            hoover: {x: dataArray[1].charAt(0), y: dataArray[1].charAt(2)},
            dirt: []
        },
        x: dataArray[0].charAt(0),
        y: dataArray[0].charAt(2),
        directions: dataArray[dataArray.length-1]
    }

    for(var i = 2; i < dataArray.length-1; i++) {
        dataObj.room.dirt[i-2] = {x: dataArray[i].charAt(0), y: dataArray[i].charAt(2) }
    }

    return dataObj
}

const calculateMoveSet = (world, directions) => {
    //do not alter the original data, keep functions pure
    let x = world.room.hoover.x, y = world.room.hoover.y;

    let moveSet = {};

    for(let i = 0; i < directions.length; i++) {
        switch(directions.charAt(i)){
            case 'N':
                if(y < world.y) {
                    y++;
                }
                break;
            case 'E':
                if(x < world.x) {
                    x++;
                }
                break;
            case 'S':
                if(y > 0) {
                    y--;
                }
                break;
            case 'W':
                if(x > 0) {
                    x--;
                }
                break;
        }
        moveSet[i] = {x: x, y: y}
    }

    return moveSet
}

const calculateDirtCollected = (dirt, moves) => {

    let dirtCollected = 0;
    const movesLength = Object.keys(moves).length-1;

    //const dirt = new Set(world.room.dirt)

    for(var i = 0; i < dirt.length; i++) {
        for(var j = 0; j < movesLength; j++) {
            if(dirt[i].x == moves[j].x && dirt[i].y == moves[j].y && !dirt[i].collected) {
                dirt[i].collected = true
                dirtCollected++;
            }
        }
    }

    //set doesn't work... :(
    // if(dirt.has({x: x, y: y}) {
    //     dirtCollected++;
    // }

    return dirtCollected;
}

//better with async/await
readInput('./input.txt')
.then(data => formatData(data))
.then(data => {
        const moveSet = calculateMoveSet(data, data.directions)
        const lastPos = moveSet[Object.keys(moveSet).length-1]
        console.log(`${lastPos.x} ${lastPos.y}`)

        const dirtPos = data.room.dirt
        return {dirtPos, moveSet}
    }
)
.then(obj => {
    var dirt = calculateDirtCollected(obj.dirtPos, obj.moveSet)
    console.log(dirt)
})
