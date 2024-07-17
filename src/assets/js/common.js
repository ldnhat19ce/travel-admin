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

// var formdata = new FormData();
// formdata.append("Account", "PVNERP");
// formdata.append("Password", "n*8uyti9%i");
// formdata.append("client_id", "eip.web");
// formdata.append("LoginType", "1");

// var requestOptions = {
//    method: 'POST',
//    headers: myHeaders,
//    body: formdata,
//    redirect: 'follow',
//    mode: 'cors',
//    accept: 'application/json'
// };

// fetch("https://eip-dev.pec.com.tw/api/Account/GetToken", requestOptions)
//    .then(response => console.log(response))
//    .then(result => console.log(result))
//    .catch(error => console.log('error', error));

// var data = JSON.stringify({
//     "apiName": "afl",
//     "url": "api/Lov/Get_Lov_Attendance_Year",
//     "data": {
//       "emp_no": "PVNERP"
//     }
//   });

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;

//   xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });

//   xhr.open("POST", "https://afltp-dev.pec.com.tw/api/Send");
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgxMzZBMzcxQjRGRDkyRTI1QjMyMDhBNzJGMThGMjFGMTQ5OTcwMzJSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6ImdUYWpjYlQ5a3VKYk1naW5MeGp5SHhTWmNESSJ9.eyJuYmYiOjE3MjExMzc5ODMsImV4cCI6MTcyMTE2Njc4MywiaXNzIjoiaHR0cHM6Ly9laXBhdXRoLWRldi5wZWMuY29tLnR3IiwiY2xpZW50X2lkIjoiRWlwQXV0aENsaWVudCIsInN1YiI6IlBWTkVSUCIsImF1dGhfdGltZSI6MTcyMTEzNzk4MywiaWRwIjoibG9jYWwiLCJlbXBfbm8iOiJQVk5FUlAiLCJvcmdfaWQiOiJQRUMiLCJyb2xlIjoiIiwianRpIjoiRDVCQjkyM0FFQkI0QTAwNkEwNERGMzNFNEY5NTQwODIiLCJpYXQiOjE3MjExMzc5ODMsInNjb3BlIjpbImVpcGF1dGhhcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.L6qc7KsfBeQCipKl2zOP37OD3PrhWelOCXFG2wDxX1xNVyeGBK8uK7qBQcAJZO9Gc9Mw1_9Fz9Ez4iqgKkJDtBN-sNi978Z9O0FVIoLMvqd3GnRzhcu9aJlNeNfNGOhbm_j-ZDeo20qA96BGs2C5VSUJbouQRVhoXLZ_fPjxRXhuvEp7DNAVW6hz_Hd6SCNCaHTgE-ZAb0MXsSoY0x-Tp-pU8Cm_JMkTJL-y8x9Tq5AKs0fN39AdaEzJOkiNpO9oenpqmtVjjuYgZWY9H5iVjzoVg-xXOgb6zr1zXxo58P1-eJTujdP-vk2qS2kOPNZMSF3ixocte7rzwxDfrKndAA");

//   xhr.send(data);


// const myHeaders = new Headers();
// myHeaders.append("Cookie", "(.*)");

// const formdata = new FormData();
// formdata.append("Account", "PVNERP");
// formdata.append("Password", "n*8uyti9%i");
// formdata.append("client_id", "eip.web");
// formdata.append("LoginType", "1");

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: formdata,
//   redirect: "follow",
//   mode: 'cors'
// };

// fetch("https://eip-dev.pec.com.tw/api/Account/GetToken", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
