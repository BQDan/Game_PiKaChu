const OTroChoi = document.querySelectorAll(".ô");
// Bố cục
const BoCucLevel = [
    { Hang: 4, Cot: 6, SoAnh: 4, ThoiGian: 180 },
    { Hang: 6, Cot: 6, SoAnh: 5, ThoiGian: 240 },
    { Hang: 8, Cot: 6, SoAnh: 6, ThoiGian: 360 },
    { Hang: 8, Cot: 7, SoAnh: 7, ThoiGian: 420 },
    { Hang: 8, Cot: 8, SoAnh: 8, ThoiGian: 480 },
    { Hang: 8, Cot: 8, SoAnh: 8, ThoiGian: 600 }
];
let Level = 1;
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
        if(O.style.display !== "none" && O.style.visibility !== "hidden") {
            SoOConLai ++;
        }
    });
    console.log("Số ô còn lại: ", SoOConLai);
    if(SoOConLai === 0) {
        Game = false;
        clearInterval(BoDem);
        //Xong để sang level
        if (Level < BoCucLevel.length) {
            alert("Chúc mừng! Sang Level " + (Level + 1));
            Level ++;
            BatDauLevel();
        } else {
            alert("Chúc mừng bạn đã hoàn thành tất cả level!");
        }

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
    // BFS
    const DuongDi = TimDuong(O1, O2);
    if (DuongDi === null) {
        console.log("Không có đường đi hợp lệ");
        return;
    }

    console.log("Đường hợp lệ:", DuongDi);

    // Xóa hai ô khi tìm được đường đi
    // KhiChonDung(O1, O2);
    // OConLai();
    // Hiện đường xong rồi xóa ô
    
    VeDuong (DuongDi);


    setTimeout (function(){
        DuongNoi.innerHTML ="";
        KhiChonDung(O1, O2);
        OConLai();

    }, 300);
    
    // vẽ đường
    //VeDuong (DuongDi);
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
    const CauHinh = BoCucLevel [Level -1];
    return  {
        Hang: CauHinh.Hang, Cot: CauHinh.Cot
    };

}
console.log("Kích thước bàn cờ:", LayKichThuocBan());
// BFS tìm đường đi
function LayViTri(O) {
    const ViTriO = Array.from(OTroChoi).indexOf(O);
    const {Cot} = LayKichThuocBan();
    return {
        Hang: Math.floor(ViTriO / Cot), 
        Cot: ViTriO % Cot
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
const DuongNoi = document.getElementById("DuongNoi");
function VeDuong(DuongDi) {
    DuongNoi.innerHTML ="";
    let ToaDo = "";
    DuongDi.forEach(function(ViTri){
        const [Hang, Cot] = ViTri;
        const O = OTroChoi [Hang*LayKichThuocBan().Cot +Cot];
        const Hinh = O.getBoundingClientRect();
        const SVG = DuongNoi.getBoundingClientRect();
        ToaDo += `${Hinh.left + Hinh.width / 2 - SVG.left},${Hinh.top + Hinh.height / 2 - SVG.top} `;

    });
    DuongNoi.innerHTML = `<polyline points="${ToaDo}" />`;
}
// tạo bố cục hình level
function TaoHinhLevel() {
    const CauHinh = BoCucLevel[Level - 1];
    const SoCap = CauHinh.Hang * CauHinh.Cot / 2;
    const DanhSachAnh = [];

    //  Lấy hình cần dùng 
    for (let i = 1; i <= CauHinh.SoAnh; i++) {
        DanhSachAnh.push("TaiNguyen/AnhGame/a" + i + ".png");
    }
    // Tạo cặp
    const CacCap = [];

    for (let i = 0; i < SoCap; i++) {
        CacCap.push(DanhSachAnh[i % DanhSachAnh.length]);
        CacCap.push(DanhSachAnh[i % DanhSachAnh.length]);
    }
    // Random hình 
    for (let i = CacCap.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [CacCap[i], CacCap[j]] = [CacCap[j], CacCap[i]];
    }

    //  Gắn hình vào ô
    for (let i = 0; i < CacCap.length; i++) {
        OTroChoi[i].querySelector("img").src = CacCap[i];
    }
}

function BatDauLevel () {
        const CauHinh = BoCucLevel[Level - 1];
        document.querySelector(".Game-title").textContent = "LEVEL" + Level;
        BanCo.style.gridTemplateColumns =  `repeat(${CauHinh.Cot}, 1fr)`;
        // Ẩn ô còn lại
        OTroChoi.forEach(function(O) {
            O.style.display = "none";
            O.style.visibility = "visible";
            O.style.border = "";
        });
        // Hiện ô cần chơi
        for (let i=0; i<CauHinh.Hang * CauHinh.Cot; i++ ) {
            OTroChoi[i].style.display ="";
        }
        TaoHinhLevel ();
        // Đặt thời gian về với thời gian của màn chơi
        ThoiGianConLai = CauHinh.ThoiGian;
        ThoiGian.textContent = ThoiGianConLai;
        ThanhThoiGian.style.width = "100%";
        // Hiện 
        clearInterval(BoDem);
        OChon = null;
        O2 = null;
        DaBatDau = false;
        Game = true;
    }
    BatDauLevel();
    // chọn màn để chơi
    document.querySelectorAll("[data-level]").forEach(function(Nut) {
    Nut.addEventListener("click", function() {
        Level = Number(Nut.dataset.level);
        BatDauLevel();
    });
});
document.getElementById("NutLuatChoi").addEventListener("click", function() {
    alert (
        "Chọn hai ô có hình giống nhau. Hai ô phải nối được với nhau bằng đường đi hợp lệ, tối đa 2 lần rẽ. Mỗi cặp ghép đúng được cộng 10 điểm. Ghép hết các ô để hoàn thành màn chơi và chuyển sang level tiếp theo. Nếu hết thời gian mà chưa hoàn thành thì bạn thua cuộc"
    );
});
document.getElementById("HelpMe").addEventListener("click", function() {
    alert (
        "Không khả dụng"
    );
});