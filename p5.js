let words, word, score, colors, idx, start;
let en_words;

function preload(){
    en_words=loadJSON('assets/words.json');
}
function setup(){
    createCanvas(windowWidth,windowHeight);
    word='';
    words=[];
    score=0;
    colors=['#5184d0','#d0545f','#61d064','#cfd051'];
    idx=0;
    frameRate(30);
    start = false;
    $('#timer').hide();
    $('#score').hide();
    $('#begin').click(()=>{
        start=true;
        $('#begin').hide();
        $('#title').hide();
        $('#intro').hide();
        $('#timer').show();
    });
}

function draw(){
    if(start){
        if(int(60-(frameCount/30))>-1) {
            $('#timer').html(int(60 - (frameCount / 30)));
        }
        else{

            $('#score').html(score);
            $('#score').show();
            word='';
            for(wrd of words){
                word+=wrd;
                word+="<br>";
            }
            $('#timer').html(word);
            $('#word').hide();
        }
    }
}
function keyPressed(){
    if(int(60-(frameCount/30))>-1) {
        if (keyCode === ENTER) {
            if (Object.values(en_words.words).indexOf(word.toLowerCase()) > -1
                && words.indexOf(word) === -1) {
                console.log('Valid Word!');
                words.push(word);
                console.log(word);
                word = '';
                score++;
                $('body').css("background-color",colors[idx]);
                if(idx<3) idx++; else idx=0;
            }else{
                console.log('Sorry, not a word...');
                word='';
            }
        } else if (keyCode === BACKSPACE) {
            word=word.substr(0,word.length-1);
        } else{
            word += key;
        }
        $('#word').html(word);
    }
}