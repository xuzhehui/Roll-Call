var progressValue,
    timer,
    timerOut,
    timerEnd,
    delayTime,
    i,
    j = -1,
    k,
    l,
    box,
    ms = 20,
    times = 0,
    lastTime = 0,
    returnBack,
    temp,
    len,
    len1,
    needUpDate,
    newHistory = [],
    arrHistory = new Array(+qs('.iptSum').value);
var container = document.createElement('div');
container.className = 'container';
qs('.main').appendChild(container);


function isEquals(array1, array2){
    var i = 0,
        len1 = array1.length,
        len2 = array2.length,
        result = 1;
    if(len1 !== len2){
        return 0;
    }else{
        for(; i < len1; i++){
            result = result && (array1[i] === array2[i]);
        }
        return result;
    }
}


function qs(selector){
    return document.querySelector(selector);
}


function qsa(selector){
    return document.querySelectorAll(selector);
}


qs('.btn.start').onclick = function(){
    console.log(newHistory);
    console.log(newHistory.length);
    needUpDate = !isEquals(arrHistory,newHistory);
    console.log(isEquals(arrHistory,newHistory));
    progressValue = 0;
    qs('.loading').classList.remove('hidden');
    timer = setInterval(function(){
        if(progressValue < 100){
            progressValue += Math.ceil(Math.random()*5);
            progressValue = Math.min(100,progressValue);
            qs('.progress').style.width = progressValue + '%';
            qs('.loading-text').innerText = progressValue;
        }else{
            clearInterval(timer);
            delayTime = setTimeout(function(){
                clearTimeout(delayTime);
                qs('.progress').style.width = 0 + '%';
                qs('.loading-text').innerText = 0;
                qs('.loading').classList.add('hidden');
                qs('.main').classList.remove('hidden');
                if(needUpDate ){
                    console.log(container);
                    container.innerText = '';
                    console.log(container);
                    newHistory = arrHistory;
                    len = newHistory.length;
                    console.log(newHistory.length,arrHistory.length);
                    for(var i = 0, arrLen = len;i < arrLen;i++){
                        var ele = document.createElement('div');
                        ele.innerText =newHistory[i] || i+1;
                        ele.classList.add('box');
                        container.appendChild(ele);
                    }
                }
            },500);
        }
    },50)
};


qs('.btn.setting').onclick = function(){
    qs('.dialog').classList.remove('hidden');
};


qs('.btn.sure').onclick = function(){
    temp = qs('.iptHistory').value.replace(/\s/g,'');
    arrHistory = temp ? temp.split(',').map(function(list){
        return +list;
    }):new Array(+qs('.iptSum').value);
    console.log(arrHistory);
    qs('.dialog').classList.add('hidden');
};


qs('.btn.exit').onclick = function(){
    qs('.lottery').parentNode.remove(qs('.lottery'))
};


qs('.btn.back').onclick = function(){
    returnBack = 1;
    j = j == -1? 0:j;
    qsa('.box')[j].classList.remove('boxRun');
    qsa('.box')[lastTime].classList.remove('boxEnd');
    j = -1;
    qs('.main').classList.add('hidden');
};


qs('.btn.startMain').onclick = function(){
    qsa('.box')[lastTime].classList.remove('boxEnd');
    returnBack = 0;
    ms = 20;
    times = 0;
    j = -1;
    newHistory = arrHistory;
    len = newHistory.length;
    run();
};


qs('.btn.congratulate').onclick = function(){
    console.log(arrHistory);
    console.log(arrHistory.length);
    arrHistory = [];
    console.log(arrHistory);
    len1 = qsa('.box').length;
    console.log(len1);
    for(l = 0; l < len1;l++){
        arrHistory[l] = +qsa('.box')[l].innerText;
    }
    console.log(arrHistory);
    arrHistory =  arrHistory.filter(function(list){  //返回值是一个新的数组，不改变原数组
        return list !== +qs('.iptCongratulate').value;
    });
    container.innerText = '';
    len = arrHistory.length;
    for(i = 0 ; i < len; i++){
        ele = document.createElement('div');
        ele.innerText =arrHistory[i];
        ele.classList.add('box');
        container.appendChild(ele);
    }
    console.log(arrHistory);
};


qs('.btn.regret').onclick = function(){
    arrHistory.push(+qs('.iptRegret').value);
    len = arrHistory.length;
    box = document.createElement('div');
    box.classList.add('box');
    box.innerText = +qs('.iptRegret').value;
    container.appendChild(box);
    console.log(arrHistory);
    console.log(arrHistory.length);
};


function run(){
    if(ms < 1200){
        timerOut = setTimeout(function(){
            clearTimeout(timerOut);
            if(returnBack){
                return 1;
            }
            times++;
            if(j < len - 1){
                for(k = 0;k < len; k++){
                    qsa('.box')[k].classList.remove('boxRun');
                }
                j++;
                qsa('.box')[j].classList.add('boxRun');
            }else{
                for(k = 0;k < len; k++){
                    qsa('.box')[k].classList.remove('boxRun');
                }
                j = 0;
                qsa('.box')[j].classList.add('boxRun');
            }
            run();
        },ms);
    }
    if(times >=30 && times < 60){
        ms += Math.floor(Math.random()*5);
    }
    if(times >= 60 && times < 85){
        ms += Math.floor(Math.random()*10);
    }
    if(times >= 85 ){
        ms += Math.floor(Math.random()*120);
    }
    if(ms >= 1100){
        timerEnd = setTimeout(function(){
            clearTimeout(timerEnd);
            ms = 20;
            times = 0;
            lastTime = j;
            qsa('.box')[j].classList.add('boxEnd');
        },ms);
        ms = 1200;
    }
}