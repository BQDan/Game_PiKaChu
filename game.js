const OTroChoi = document.querySelectorAll(".ô");
console.log(OTroChoi);

const HienDiem = document.querySelector(".Gia-tri");
const HienXu = document.querySelector(".Khung-Xu");
const ThoiGian = document.getElementById("dem-nguoc");
const ThanhThoiGian = document.querySelector(".time-fill");

console.log("Số ô: ", OTroChoi.length);
console.log("Hiển thị điểm: ",HienDiem );
console.log("Hiện số xu tích lũy: ", HienXu);
console.log("Thời gian : ", ThoiGian);
console.log("Thời gian còn lại: ", ThanhThoiGian);

let Diem =0;
let xu =0;
let ThoiGianConLai = 600;
let OChon = null;
let Game = true;
OTroChoi.forEach(function(O) {
    O.addEventListener("click", function() {
        if(OChon ==null) {
            OChon=O;
            O.style.border = "3px solid red";
            console.log();
        }
        else {
            console.log();
            OChon.style.border="";
            OChon=null;
        }
    });
});
let O2= null;
OTroChoi.forEach(function(O) {
    O.addEventListener("click", function(){
        if(OChon==null) {
            OChon=O;
            O.style.border="3px solid red";
            console.log();
        }
        else if (O2==null && O !==OChon ){
            O2 =O;
            O.style.border="3px solid red";
            console.log("Chọn được Ô 2");
            let Anh1 = OChon.querySelector("img").src;
            let Anh2 = O2.querySelector("img").src;
            // kiểm 2 hình
            if(Anh1 === Anh2){
                console.log("Giống nhau");
            }
            else {
                console.log("Khác nhau");

            }
            OChon.style.border ="";
            O2.style.border ="";
            OChon = null;
            O2 = null;

        }

        });
    });
