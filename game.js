const OTroChoi = document.querySelectorAll(".ô");
console.log(OTroChoi);

const HienDiem = document.querySelector(".Gia-tri");
const HienXu = document.querySelector(".Khung-Xu");
const ThoiGian = document.getElementById("ĐẾM-NGƯỢC");
const ThanhThoiGian = document.querySelector(".time-fill");

console.log("Số ô: ", OTroChoi.length);
console.log("Hiển thị điểm: ",HienDiem );
console.log("Hiện số xu tích lũy: ", HienXu);
console.log("Thời gian : ", ThoiGian);
console.log("Thời gian còn lại: ", ThanhThoiGian);

let Diem =0;
let ThoiGianConLai = 600;
let OChon = null;
let Game = true;
let BoDem;
let DaBatDau = false;
// OTroChoi.forEach(function(O) {
//     O.addEventListener("click", function() {
//         if(OChon ==null) {
//             OChon=O;
//             O.style.border = "3px solid red";
//             console.log();
//         }
//         else {
//             console.log();
//             OChon.style.border="";
//             OChon=null;
//         }
//     });
// });
let O2= null;
OTroChoi.forEach(function(O) {
    O.addEventListener("click", function(){
        if (Game === false) {
            return;
        }
        if(DaBatDau === false) {
            DaBatDau = true;
            DemNguoc();
        }
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
            SoAnh(OChon, O2);
            OChon.style.border ="";
            O2.style.border ="";
            OChon = null;
            O2 = null;

        }

        }); 
    });
// Cộng điểm khi chọn đúng
function KhiChonDung (O1, O2) {
    O1.style.visibility = "hidden";
    O2.style.visibility ="hidden";
    Diem = Diem +10;
    HienDiem.textContent = Diem;
  
}
function OConLai() {
    let SoOConLai = 0;
    OTroChoi.forEach(function(O){
        if(O.style.visibility !=="hidden") {
            SoOConLai ++;

        }

    });
    console.log("Số ô còn lại: ", SoOConLai);
    if(SoOConLai === 0) {
        Game = false;
        clearInterval(BoDem);
        alert("End Game");

    }
}
// Cộng điểm và đếm số ô còn lại
function SoAnh(O1, O2) {
    let Anh1 = O1.querySelector("img").src;
    let Anh2 = O2.querySelector("img").src;
    // So hình
    if (Anh1 === Anh2) {
        KhiChonDung (O1, O2);
        OConLai();
    }
    else {
        console.log("Khác nhau");
        }
    }
    // Thời gian
    function DemNguoc() {
        ThoiGian.textContent = ThoiGianConLai;
       BoDem = setInterval(function(){ 
        if(ThoiGianConLai > 0 && Game === true ) {
            ThoiGianConLai = ThoiGianConLai -1;
            ThoiGian.textContent = ThoiGianConLai;
            let PhanTram = (ThoiGianConLai/600)*100;
            ThanhThoiGian.style.width = PhanTram + "%";

        }
        if(ThoiGianConLai === 0) {
            clearInterval(BoDem);
            Game = false;
            console.log("Hết thời gian");
            alert("Đã hết thời gian <Thua cuộc> ");

        }
        }, 1000);

    }
    // Khi hết giờ thì không được chơi nữa 36 37
    // Bổ sug BoDem 
    // Dừng đếm khi thời gian về 0 và => false game
    // Thông báo khi hết thời gian  113 
    // Thanh thời gian chia cho hợp với thời gian - công thức: Thời gian hiện tại / 600 và nhân 100 
const BanCo = document.querySelector(".Bàn-cờ");
function LayKichThuocBan() {
    const CSSBanCo = getComputedStyle(BanCo);
    const Cot = CSSBanCo.gridTemplateColumns.split("").filter(Boolean).length;
    const Hang = CSSBanCo.gridTemplateRows.split("").filter(Boolean).length;
    return { Hang , Cot};
}




    