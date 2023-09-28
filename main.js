//pega o ID canvas do HTML
let canvas = document.getElementById("canvas");

//pegamos o contexto do desenho, esse é o metodo que retorna o tipo da animação, usar o paramento "2d" significa que o objeto que será renderizado será bidimensional
let contexto = canvas.getContext("2d");

//variável que vai indentificar se estamos desenhando
let desenhando = false;

let tipoPincel = "lapis"; // Pincel padrão é o lápis

let tipoPincelSelect = document.getElementById("tipoPincel");

tipoPincelSelect.addEventListener("change", function() {
    tipoPincel = tipoPincelSelect.value;
});

let espessuraInput = document.getElementById("espessura");

// Define a espessura inicial do pincel
contexto.lineWidth = espessuraInput.value;

// Adiciona um ouvinte de evento para o evento de alteração de espessura
espessuraInput.addEventListener("input", function() {
    // Atualiza a espessura do pincel quando o usuário ajusta a barra deslizante
    contexto.lineWidth = espessuraInput.value;
});

//pegamos o input da paleta de cor do HTML
let corInput = document.getElementById("cor");

// Define a cor inicial do contexto de desenho
contexto.strokeStyle = corInput.value;

// adiciona um ouvinte de evento para o evento de alteração de cor
corInput.addEventListener("change", function() {
    // atualiza a cor do contexto de desenho quando o usuário escolhe uma nova cor
    contexto.strokeStyle = corInput.value;
});


canvas.addEventListener("mousedown", function(event){
    //vamos usar o metodo addEventListner para ouvir nosso mouse, ele irá indentificar quando clicarmos
    desenhando = true;
    //desenhando se torna verdade
    contexto.beginPath();
    //a variavel contexto junto com o metodo beginPath() indica que algo novo será criado
    contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    //nesse metodo, vamos dizer como o contexto irá funcionar, o clientX vai fornecer as cordenadas horizontais do mouse e o offsetLeft irá converter esse valor em pixel (px), a mesma coisa acontece com o clientY na vertical.
})

// canvas.addEventListener("mousemove", function(event){
//     //função que indentifica quando movemos o mouse
//     if (desenhando) {
//         //esse if vai indentificar se estamos clicando enquanto movemos o mouse
//         contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
//         //o lineTo vai juntar as codenadas e indentificar alinha que estamos traçando enquanto clicamos e movemos o mouse
//         contexto.stroke();
//     }
// })

canvas.addEventListener("mousemove", function(event){
    //função que identifica quando movemos o mouse
    if (desenhando) {
        // Verifica o tipo de pincel atual
        if (tipoPincel === "lapis") {
            contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            contexto.stroke();
        } else if (tipoPincel === "borracha") {
            // Use o tipo de pincel borracha para apagar
            contexto.clearRect(event.clientX - canvas.offsetLeft - contexto.lineWidth / 2, event.clientY - canvas.offsetTop - contexto.lineWidth / 2, contexto.lineWidth, contexto.lineWidth);
        } 
    }
});

canvas.addEventListener("mouseup", function(event){
    //essa função indentifica quando não estamos mais clicando no mouse
    desenhando = false;
})