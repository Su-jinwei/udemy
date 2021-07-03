var firebaseConfig = {
    apiKey: "AIzaSyDu83A29VDar1GXx-7vK6BiDiOdwYU8f_Q",
    authDomain: "udemy-firebase-7d52a.firebaseapp.com",
    databaseURL: "https://udemy-firebase-7d52a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "udemy-firebase-7d52a",
    storageBucket: "udemy-firebase-7d52a.appspot.com",
    messagingSenderId: "936646010899",
    appId: "1:936646010899:web:b5e6b6d1bf043df61537e6"
};
firebase.initializeApp(firebaseConfig);

//先宣告會用到的id
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const send = document.getElementById("send");
const list = document.getElementById("list");
const history = document.getElementById("history");
const deleteALL = document.getElementById("delete");

//取到當前日期
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
console.log(month+ "-" + day + "-" + year)

//將資料傳到firebase

let bmi = firebase.database().ref('bmi');
send.addEventListener('click', function (e) {
    //計算bmi
    let h = parseInt(height.value) / 100;
    let w = parseInt(weight.value);
    let result = w / (h * h);
    result = result.toFixed(2);
    console.log(result);

    let status = "";
    let color = "";
    //判斷每一個結果 的狀態與顏色

    if (result <= 18.5) {
        status = "過輕";
        color = "#31baf9";
    } else if (18.5 < result && result <= 25) {
        status = "理想"
        color = "#86d73f";
    } else if (25 < result && result <= 30) {
        status = "過重";
        color = "#ff982d";
    }
    else if (30 < result && result <= 35) {
        status = "輕度肥胖";
        color = "#ff6c03"
    }
    else if (35 < result && result <= 40) {
        status = "中度肥胖";
        color = '#ff6c03';
    }
    else if (40 < result) {
        status = "重度肥胖"
        color = "#ff1200";
    };
    bmi.push({ 
        height: height.value, 
        weight: weight.value,
        bmiresult: result,
        status: status,
        color: color,
        time:month + "-" + day + "-" + year});
})

//顯示內容到網站
bmi.on('value',function(snapshot){
    let str2 = " ";
    let str = " ";
    let data = snapshot.val();
    for(let item in data){
        str+='<li class="listItem" >'
        +data[item].status
        +'<p>BMI'+data[item].bmiresult+'</p>'
        +'<p>身高'+data[item].height+'</p>'
        +'<p>體重'+data[item].weight+'</p>'
        +'<p>日期'+data[item].time+'</p>'
        '</li>';
    }
    list.innerHTML=str;
})
//刪除紀錄
// deleteALL.addEventListener('click',function(e){

// })
