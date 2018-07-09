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

const calculateHooverPosition = (world, directions) => {

    //do not alter the original data, keep functions pure
    let x = world.room.hoover.x, y = world.room.hoover.y;
    const dirt = world.room.dirt
    let dirtCollected = 0;

    //const dirt = new Set(world.room.dirt)

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

        //not really efficient but it works...
        //breaks (S)OLID principle, possible better route calculate move set as separate function
        for(var j = 0; j < dirt.length; j++) {
            if(dirt[j].x == x && dirt[j].y == y && !dirt[j].collected) {
                dirt[j].collected = true
                dirtCollected++;
            }
        }

        //set doesn't work... :(
        // if(dirt.has({x: x, y: y}) {
        //     dirtCollected++;
        // }
    }

    return {dirtCollected, x, y}
}

readInput('./input.txt')
.then(data => formatData(data))
.then(data => calculateHooverPosition(data, data.directions))
.then(data => console.log(`${data.x} ${data.y}\n ${data.dirtCollected}`))