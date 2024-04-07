const cells = document.querySelectorAll('.rowa , .rowb , .rowc , .rowd , .rowe , .rowf , .rowg, .rowh');
const pieces = document.querySelectorAll('.white-piece, .black-piece')

cells.forEach(cell => {
    cell.setAttribute('ondrop', 'drop(event, )');
    cell.setAttribute('ondragover', 'allowDrop(event)');
    cell.addEventListener('click', function() {
        
        if(selectedPiece == cell.id && cell.id)
        {
            cell.style = "background-color: white;"
            selectedPiece =  ""
        }
        else if(!isEmpty(cell.id) && !selectedPiece)
        {
            selectedPiece = cell.id;
            cell.style = "background-color: gray;"
            selectedSquare = cell;
        }

        if(selectedPiece && selectedPiece!=cell.id)
        {
            if(validMove() && isEmpty(cell.id))
            {
                moveOnTable(selectedPiece, cell.id);
                selectedPiece = "";
                selectedSquare.style = "background-color: white;";
            }
        }
    });
});

pieces.forEach(piece => {
    piece.setAttribute('draggable', true);
    piece.setAttribute('ondragstart', 'drag(event)');
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
        ev.preventDefault();
        var movedPiece = ev.dataTransfer.getData("text/plain");
        var targetId = ev.currentTarget.id;
        var targetCell = document.getElementById(targetId);
        if(targetCell.childElementCount || !validMove(movedPiece))
            return;
        move(document.getElementById(movedPiece).parentElement.id, ev.target.id)
        ev.target.appendChild(document.getElementById(movedPiece));
        
        
    }

//  1 - pion
// 2 - tura
// 3 - cal
// 4 - nebun
// 5 - regina
// 6 - rege

//a-h linia
//1-8 coloana

var table = [
    [-2,-3,-4,-5,-6,-4,-3,-2],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1],
    [ 2, 3, 4, 5, 6, 4, 3, 2]
];

console.log(table)

var selectedPiece = "";
var selectedSquare;

function validMove(piece)
{
    return true;
}

cells.forEach(function(cell) {
    
});

function isEmpty(cell)
{
    if(table[8-cell[1]][7-indexOf(cell[0])])
        return false;
    return true;
        
}

function indexOf(pos)
{
    switch(pos)
    {               
        case 'a': return 7-0;
        case 'b': return 7-1;
        case 'c': return 7-2;
        case 'd': return 7-3;
        case 'e': return 7-4;
        case 'f': return 7-5;
        case 'g': return 7-6;
        case 'h': return 7-7;
    }
}

function whatPieceItIs(piece)
{
    switch(Math.abs(piece))
    {
        case 1:
            return 'pion';
            break;
        case 2:
            return 'tura'
            break;
        case 3:
            return 'cal'
            break;
        case 4:
            return 'nebun'
            break;
        case 5:
            return 'regina'
            break;
        case 6:
            return 'rege'
            break;
        default:
            return 'Out of range';
            break;
    }
}

function whatColorItIs(piece)
{
    if(piece>0)
        return 'alb'
    else
        return 'negru'
}

function moveOnTable(startpos, finalpos)
{
    var piece = document.getElementById(startpos).querySelector('img');
    piece.parentNode.removeChild(piece);
    var destination = document.getElementById(finalpos);
    destination.appendChild(piece);
    table[8-finalpos[1]][7-indexOf(finalpos[0])] = table[8-startpos[1]][7-indexOf(startpos[0])];
    table[8-startpos[1]][7-indexOf(startpos[0])] = 0;
}

function move(startpos, finalpos)
{
    table[8-finalpos[1]][7-indexOf(finalpos[0])] = table[8-startpos[1]][7-indexOf(startpos[0])];
    table[8-startpos[1]][7-indexOf(startpos[0])] = 0;
    console.log(table);
}