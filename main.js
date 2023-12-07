let expand = false;

document.addEventListener('DOMContentLoaded', function () {
    var expandingElement = document.getElementById('condition');

    document.getElementById("condition").addEventListener('click', function () {
        if(expand){
            document.getElementById('detail').style.height = '0vh';
            document.getElementById("condition").innerHTML = '条件を設定する';
            expand = false;
        }else{
            document.getElementById('detail').style.height = '37.5vh';
            document.getElementById("condition").innerHTML = '閉じる';
            expand = true;
        }
    });
});


function addNewShowClassDetail(textContent, linkUrl) {
    var newShowClassDetail = document.createElement('div');
    newShowClassDetail.classList.add('showClass-detail');

    var newShowClassDetailShow = document.createElement('div');
    newShowClassDetailShow.classList.add('showClass-detail-show');
    newShowClassDetailShow.textContent = textContent;

    // クリックされたらリンクにアクセスするイベントリスナーを追加
    newShowClassDetailShow.addEventListener('click', function() {
        window.location.href = linkUrl;
    });

    newShowClassDetail.appendChild(newShowClassDetailShow);
    var showClass = document.querySelector('.showClass');
    showClass.appendChild(newShowClassDetail);
}

document.getElementById("detail-class").addEventListener("click", function(){
    document.getElementById('footer-class').style.bottom = '0';
    document.getElementById('footer-class').style.display = 'block';
    document.getElementById("cover").style.display = "block";
    document.getElementById("cover").style.opacity = "1"
})

document.getElementById("detail-soq").addEventListener("click", function(){
    document.getElementById('footer-soq').style.bottom = '0';
    document.getElementById('footer-soq').style.display = 'block';
    document.getElementById("cover").style.display = "block";
    document.getElementById("cover").style.opacity = "1"
})

document.getElementById("detail-date").addEventListener("click", function(){
    document.getElementById("footer-date").style.bottom = "0";
    document.getElementById("footer-date").style.display = "block";
    document.getElementById("cover").style.display = "block";
    document.getElementById("cover").style.opacity = "1"
})

document.getElementById("detail-period").addEventListener("click", function(){
    document.getElementById("footer-period").style.bottom = "0";
    document.getElementById("footer-period").style.display = "block";
    document.getElementById("cover").style.display = "block";
    document.getElementById("cover").style.opacity = "1"
})

document.getElementById("detail-year").addEventListener("click", function(){
    document.getElementById("footer-year").style.bottom = "0";
    document.getElementById("footer-year").style.display = "block";
    document.getElementById("cover").style.display = "block";
    document.getElementById("cover").style.opacity = "1"
})

document.getElementById("cover").addEventListener("click", function(){
    document.getElementById("cover").style.display = "none";
    document.getElementById("cover").style.opacity = "0";
    document.getElementById('footer-class').style.bottom = '-50vh';
    document.getElementById('footer-soq').style.bottom = '-50vh';
    document.getElementById("footer-date").style.bottom = "-50vh";
    document.getElementById("footer-period").style.bottom = "-50vh";
    document.getElementById("footer-year").style.bottom = "-50vh";
})


document.querySelectorAll('.footer-class div').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
    });
});

document.querySelectorAll('.footer-soq div').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
    });
});

document.querySelectorAll('.footer-date div').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
    });
});

document.querySelectorAll('.footer-period div').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
    });
});

document.querySelectorAll('.footer-year div').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
    });
});

function search(){
    let class_ = Array.from(document.querySelectorAll('.footer-class div.checked')).map(item => item.id);
    let soq    = Array.from(document.querySelectorAll('.footer-soq div.checked')).map(item => item.id);
    let date   = Array.from(document.querySelectorAll('.footer-date div.checked')).map(item => item.id);
    let period = Array.from(document.querySelectorAll('.footer-period div.checked')).map(item => item.id);
    let year   = Array.from(document.querySelectorAll('.footer-year div.checked')).map(item => item.id);

    let str_class_ = "";
    if(class_.length == 0) class_ = ["共通", "教育学部", "経済学部", "システム工学部","観光学部", "社会インフォマティクス学環", "教育学研究科：教職開発専攻","経済学研究科","システム工学研究科","観光学研究科：観光地域マネジメント専攻","観光学研究科：前期課程","観光学研究科：後期課程"];
    str_class_ = class_.join(",");
    
    let str_soq = "";
    if(soq.length == 0) soq = ["前期","1Q","2Q","後期","3Q","4Q","通年"]
    str_soq = soq.join(",");
    
    let str_date = "";
    if(date.length == 0) date = ["日", "月", "火", "水", "木", "金", "土"]
    str_date = date.join(",");

    let str_period = "";
    if(period.length == 0) period = ["1","2","3","4","5","6"]
    str_period = period.join(",");

    let str_year = "";
    if(year.length == 0) year = ["1","2","3","4"]
    str_year = year.join(",");

    let keyword = document.getElementById("keyword").value;

    let urlquery = "class_=" + str_class_ + "&soq=" + str_soq + "&date=" + str_date + "&period=" + str_period + "&year=" + str_year + "&keyword=" + keyword;

    console.log(urlquery)
    return urlquery
}

document.getElementById("push").addEventListener("click", function(){
    alert("push A")
    const elementsToRemove = document.querySelectorAll('.showClass-detail');

    // 取得した要素を一つずつ削除
    elementsToRemove.forEach(element => {
        element.remove();
    });

    const apiUrl = 'https://syllabus-search-light.onrender.com/api/data?' + search();

    alert(apiUrl)

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        results = data["results"];
        let loop = (results.length,20);
        let urls = []
        for(let i = 0; i < loop; i++){
            console.log(results[i])
            addNewShowClassDetail(results[i]["title"],results[i]["link"])
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
})