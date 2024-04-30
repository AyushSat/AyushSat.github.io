async function run(){


    // let containers = document.getElementsByClassName("data");
    // let maxHeight = 0;
    // for(let i = 0;i<containers.length;i++){
    //     console.log( containers[i].clientHeight);
    //     if(containers[i].clientHeight > maxHeight){
    //         maxHeight = containers[i].clientHeight;
    //     }
    // }

    // for(let i = 0;i<containers.length;i++){
    //     containers[i].style.height = maxHeight + "px";
    // }


    let index = -1;
    let reducing = false;
    let timeFull = 0;
    function positionTyper(){
        let positions = document.getElementById("positions");
        let jobs = ["Full Stack Web Developer", "iOS Developer",  "Game Developer", "STEM Teacher", "UI/UX Designer", "Entrepreneur", "Video Producer"];
    
        if(positions.innerText == ""){
            //if the text is empty, then increment which position you are looking at
            index = (index + 1)%jobs.length;
            positions.innerText += jobs[index].charAt(0);
            reducing = false;
        }else{
            if(reducing){
                positions.innerText = positions.innerText.substring(0, positions.innerText.length - 1);
                //positions.innerText = "";
            }else{
                if(positions.innerText.length == jobs[index].length){
                    //
                    if(timeFull>25){
                        reducing = true;
                        timeFull = 0;
                    }else{
                        timeFull++;
                    }
                }else{
                    positions.innerText += jobs[index].charAt(positions.innerText.length);
                }
            }
        }
    }
    setInterval(positionTyper, 80);
}

function scrollChecker(){
    if(window.pageYOffset < 50){
        document.getElementById("header").classList.remove("headerBackground");
    }else{
        document.getElementById("header").classList.add("headerBackground");
    }
}

document.getElementById("darkLight").addEventListener('click', () => {
    if(document.getElementById("cssLink").getAttribute("href") == "./light.css"){
        document.getElementById("cssLink").setAttribute("href", "./dark.css");
        document.getElementById("darkThemeImg").setAttribute("src", "./images/darkThemeInverted.png");
        document.getElementById("financeTrackerImg").setAttribute("src", "./images/darkModeFinanceTracker.png");
    }else{
        document.getElementById("cssLink").setAttribute("href", "./light.css");
        document.getElementById("darkThemeImg").setAttribute("src", "./images/darktheme.png");
        document.getElementById("financeTrackerImg").setAttribute("src", "./images/lightModeFinanceTracker.png");

    }

});


window.onload = run;
window.onscroll = scrollChecker;
