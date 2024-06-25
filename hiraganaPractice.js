const hiraganacharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "が", "ぎ", "ぐ", "げ", "ご", "さ", "し", "す", "せ", "そ", "ざ", "じ", "ず", "ぜ", "ぞ", "た", "ち", "つ", "て", "と", "だ", "ぢ", "づ", "で", "ど", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"];
const alphabetpair = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "ga", "gi", "gu", "ge", "go", "sa", "shi", "su", "se", "so", "za", "ji", "zu", "ze", "zo", "ta", "chi", "tsu", "te", "to", "da", "ji", "zu", "de", "do", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ba", "bi", "bu", "be", "bo", "pa", "pi", "pu", "pe", "po", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wo", "n"];
let qamount = 10;
const questions = [];
let qplace = 0;
const questionstates = []
let qright = 0
document.getElementById("userinput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("check").click();
        console.log("enter was pressed");
    }
});
document.getElementById("multichoiceinput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("check").click();
        console.log("enter was pressed");
    }
});

document.getElementById("questionamount").addEventListener("change", function(event){
    const x = document.getElementById("questionamount");
    if (x.value > 50) {
        x.value = 50;
    }
    if (x.value < 5) {
        x.value = 5;
    }
    qamount = x.value;
});
function start(){ 
    qplace = 0;
    qright = 0;
    const q = [];
    for (let i = 0; i<qamount; i++) {
        const x = Math.floor(Math.random() * hiraganacharacters.length);
        if (Math.floor(Math.random() * 2) == 0){
            questions[i]= [hiraganacharacters[x], alphabetpair[x]];
        } else {
            questions[i]= [alphabetpair[x], hiraganacharacters[x]];
        }
        questionstates[i] = "empty";
    }

    for (let i = 0; i < qamount; i++) {
        while (true) {
            const x = Math.floor(Math.random() * hiraganacharacters.length);
            if (!(q.includes(x))){
                q[i] = x;
                break
            }
        }
        console.log(q[i])
        if (Math.floor(Math.random() * 2) == 0){
            questions[i]= [hiraganacharacters[q[i]], alphabetpair[q[i]]];
        } else {
            questions[i]= [alphabetpair[q[i]], hiraganacharacters[q[i]]];
        }
        questionstates[i] = "empty";
        console.log(`${questions[i][0]}, `)
    }
    
    document.getElementById("sb").style.display = "none";
    document.getElementById("pb").style.display = "block";
    document.getElementById("rb").style.display = "none";
    document.getElementById("progress").max = qamount;
    document.getElementById("progress").value = 0;
    document.getElementById("question").innerText = `${qplace+1}. ${questions[qplace][0]}`;
    setinput(questions[qplace][1]);
}
function finish(){
    document.getElementById("pb").style.display = "none";
    document.getElementById("rb").style.display = "block";
    document.getElementById("score").innerText = `${qright}/${qamount}`
    let ac = "";
    console.log(questionstates)
    for (let i = 0; i < questionstates.length; i++) {
        const x = questionstates[i];
        ac = `${ac} <div id="answerstate${i+1}">${function(){if (questionstates[i] == "correct") {return "Correct";} else {return "Incorrect";}}()}: ${questions[i][0]} -> ${questions[i][1]}</div>`
    
    
    }
    console.log(ac);
    document.getElementById("answers").innerHTML = ac;
}
function setinput(ans){
    const a = alphabetpair;
    const b = hiraganacharacters;
    console.log(ans, (a.includes(ans)),qplace);
    const x = document.getElementById("textinput");
    const y = document.getElementById("multichoiceinput");
    
    if (a.includes(ans)) {
        x.style.display = "block";
        y.style.display = "none";
        document.getElementById("userinput").value = "";
    } else {
        x.style.display = "none";
        y.style.display = "block";
        const q = [];
        let p;
        let l;
        const lol = Math.floor(Math.random() * 4);
        for (let index = 0; index < 4; index++) {
            if (index != lol) {
                l = true;
                while (l) {
                    p = b[Math.floor(Math.random() * b.length)];
                    if (q.includes(p) || p == ans){l = true;} else {l = false;}
                }
            } else {
                p = ans;
            }
            q[index] = p;
            console.log(p, b[70],Math.floor(Math.random() * b.length),b[Math.floor(Math.random() * b.length)],b.length)
            document.getElementById(`label${index + 1}`).innerText = q[index];
            document.getElementById(`option${index + 1}`).value = q[index];
            document.getElementsByClassName("rin")[index].checked = false;
        }
        console.log(q)

    }
}

function check() {
    let userinput;
    console.log("check was pressed")
    const l = document.getElementById("errormessage");
    if (alphabetpair.includes(questions[qplace][1])){
        console.log("checked for text input");
        if (document.getElementById("userinput").value != ""){
            userinput = document.getElementById("userinput");
            l.style.display = "none";
        } else {
            console.log("big pp");
            l.innerText = " *Please Type Answer";
            l.style.display = "block";
            return;
        }
    } else {
        console.log("checked for radio input")
        if (function(){
            console.log("passed through function");
            for (let i = 0; i < 4; i++) {
                const radin = document.getElementsByClassName("rin")[i];
                if (radin.checked === true) {console.log(i,"true"); return (true);}
                console.log(i,"false")
            }
            return (false);
            }()){
            userinput = document.querySelector("input.rin:checked");
            console.log("assigned to rin");
            l.style.display = "none";
        } else {
            console.log("smol pp");
            l.innerText = " *Please Choose Answer";
            l.style.display = "block";
            return;
        }
    }
    console.log(`selected: ${userinput.value}`);
    document.getElementById("check").disabled = false;
    if (userinput.value.toLowerCase() == questions[qplace][1]) {
        document.getElementById("pb").style.backgroundColor = "lightgreen";
        console.log("correct");
        qright++;
        questionstates[qplace] = "correct";
    } else {
        document.getElementById("pb").style.backgroundColor = "rgb(255, 111, 111)";
        console.log("incorrect");
        questionstates[qplace] = "incorrect";
    }
    document.getElementById("check").disabled = true;
    document.getElementById("next").disabled = false;
    document.getElementById("userinput").disabled = true;
    for (let index = 0; index < document.getElementsByName("mc").length; index++) {
        const i = document.getElementsByName("mc")[index];
        i.disabled = true;
    }
}

function next(){
    let labelElement = document.getElementById("question");
    if (qplace < qamount-1){
        qplace ++;
    } else {
        finish()
    }
    labelElement.innerText = `${qplace+1}. ${questions[qplace][0]}`;
    setinput(questions[qplace][1]);

    document.getElementById("check").disabled = false;
    document.getElementById("next").disabled = true;
    document.getElementById("userinput").disabled = false;
    for (let index = 0; index < document.getElementsByName("mc").length; index++) {
        const i = document.getElementsByName("mc")[index];
        i.disabled = false;
    }
    for (const i in document.getElementsByName("mc")) {
        i.disabled = false;
    }
    document.getElementById("pb").style.backgroundColor = "lightgrey";
    document.getElementById("progress").value = qplace;;
}
function goback() {
    document.getElementById("sb").style.display = "block";
    document.getElementById("pb").style.display = "none";
    document.getElementById("rb").style.display = "none";
}