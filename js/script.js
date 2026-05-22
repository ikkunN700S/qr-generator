// 初期設定
let logoUrl = "";

// QRCodeStylingのインスタンスを作成
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "https://example.com",
    image: "",
    dotsOptions: {
        color: "#000000",
        type: "square"
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    cornersSquareOptions: {
        type: "square"
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10 // ロゴとQRコードの隙間
    }
});

// 初期QRコードを画面に描画
qrCode.append(document.getElementById("qr-code-container"));

// QRコードを更新する関数
function updateQR() {
    const data = document.getElementById("qrData").value;
    const dotsColor = document.getElementById("dotsColor").value;
    const bgColor = document.getElementById("bgColor").value;
    const dotsType = document.getElementById("dotsType").value;
    const cornersType = document.getElementById("cornersType").value;

    qrCode.update({
        data: data || " ", // 空っぽだとエラーになるためスペースを入れる
        image: logoUrl,
        dotsOptions: {
            color: dotsColor,
            type: dotsType
        },
        backgroundOptions: {
            color: bgColor,
        },
        cornersSquareOptions: {
            type: cornersType
        }
    });
}

// 各種入力欄の変更を監視してリアルタイムに更新
document.getElementById("qrData").addEventListener("input", updateQR);
document.getElementById("dotsColor").addEventListener("input", updateQR);
document.getElementById("bgColor").addEventListener("input", updateQR);
document.getElementById("dotsType").addEventListener("change", updateQR);
document.getElementById("cornersType").addEventListener("change", updateQR);

// ロゴ画像のアップロード処理
document.getElementById("logoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoUrl = e.target.result;
            updateQR();
        };
        reader.readAsDataURL(file);
    }
});

// ロゴ画像のクリア処理
document.getElementById("clearLogo").addEventListener("click", function() {
    document.getElementById("logoInput").value = "";
    logoUrl = "";
    updateQR();
});

// ダウンロードボタンの処理
document.getElementById("downloadBtn").addEventListener("click", function() {
    qrCode.download({ name: "my-custom-qrcode", extension: "png" });
});