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
    const Anh1 = O1.querySelector("img");
    const Anh2 = O2.querySelector("img");
    // So hình
    if (!Anh1 || !Anh2) {
        return;
    }
    //
    if (Anh1.src !== Anh2.src) {
        console.log("Hinh khác nhau");
        return;
    }
    const DuongDi = TimDuong(O1, O2);
    if (DuongDi === null) {
        console.log("Không có đường đi hợp lệ");
        return;
    }

    console.log("Đường hợp lệ:", DuongDi);

    // Xóa hai ô khi tìm được đường đi
    KhiChonDung(O1, O2);
    OConLai();
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
    const Cot = CSSBanCo.gridTemplateColumns
    .trim()
    .split(/\s+/)
    .length;
    const Hang = CSSBanCo.gridTemplateRows
    .trim()
    .split(/\s+/)
    .length;
    console.log("Số Hàng: ", Hang);
    console.log("Số cột: ", Cot);
    return { Hang, Cot};
}
console.log("Kích thước bàn cờ:", LayKichThuocBan());
// BFS tìm đường đi
function LayViTri(O) {
    const ViTriO = Array.from(OTroChoi).indexOf(O);
    const { Hang, Cot} = LayKichThuocBan();
    return {
        Hang: Math.floor(ViTriO/ Cot), Cot: ViTriO %Cot
    };
}
function ODangCon(O) {
    return getComputedStyle(O).visibility !== "hidden"
    && getComputedStyle(O).display !== "none";
}
function TimDuong (O1, O2) {
    const { Hang, Cot } = LayKichThuocBan();
    const ViTri1 = LayViTri(O1);
    const ViTri2 = LayViTri(O2);
    const Huong  = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ];
    const HangDoi = [ {
        Hang: ViTri1.Hang,
        Cot: ViTri1.Cot,
        HuongCu: -1,
        SoLanRe: 0,
        DuongDi: [[ViTri1.Hang, ViTri1.Cot]] //Đường đi của ô
    }];
    const ODaKiemTra = new Set();
    while(HangDoi.length > 0) {
        const Nut = HangDoi.shift();
        for ( let i=0; i< Huong.length; i++ ) {
            const Hangnew = Nut.Hang + Huong[i][0];
            const Cotnew = Nut.Cot + Huong[i][1];

        // bổ sung không cho chạy ngoài
        if (
            Hangnew < 0 || Hangnew >= Hang || Cotnew < 0 || Cotnew >= Cot
        ) {
            continue
        }
        let SoLanRe = Nut.SoLanRe;
        if (
            Nut.HuongCu != -1 && Nut.HuongCu != i
        )
        {
            SoLanRe ++;

        }
        if (SoLanRe > 2) {
            continue
        }
        const Duongnew = [...Nut.DuongDi, [ Hangnew, Cotnew]];
        // Hiện đường đã đi
        if (
            Hangnew === ViTri2.Hang && Cotnew === ViTri2.Cot
        ) {
            return Duongnew;
        }
        const OKeTiep = OTroChoi[Hangnew *Cot + Cotnew];
        // Không đi xuyên ô
        if (ODangCon(OKeTiep)) {
            continue;
        }
        const Khoa = `${Hangnew}-${Cotnew}-${i}-${SoLanRe}`;
        if (ODaKiemTra.has(Khoa)) {
            continue
        }
        ODaKiemTra.add(Khoa);
        HangDoi.push ({
            Hang: Hangnew,
            Cot: Cotnew,
            HuongCu: i,
            SoLanRe: SoLanRe,
            DuongDi: Duongnew
        });
    }
}
return null;
}
