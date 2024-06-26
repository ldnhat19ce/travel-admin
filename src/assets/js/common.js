$(function () {
    //Get the button
    let myBtn = document.getElementById("btn-back-to-top");

    window.onscroll = function () {
        scrollFunction();
        if (myBtn !== null && myBtn !== undefined) {
            myBtn.addEventListener("click", backToTop);
        }
    };

    function scrollFunction() {
        if (myBtn !== null && myBtn !== undefined) {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                myBtn.style.display = "block";
            } else {
                myBtn.style.display = "none";
            }
        } else {
            myBtn = document.getElementById("btn-back-to-top");
        }
    }

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});


