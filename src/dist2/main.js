// 'use strict';
//
// window.addEventListener('load', function () {
//     var carousels = document.querySelectorAll('.carousel');
//
//     for (var i = 0; i < carousels.length; i++) {
//         carousel(carousels[i]);
//     }
// });
//
// function carousel(root) {
//     var figure = root.querySelector('figure'),
//         nav = root.querySelector('nav'),
//         images = figure.children,
//         n = images.length,
//         gap = root.dataset.gap || 0,
//         bfc = 'bfc' in root.dataset,
//         theta = 2 * Math.PI / n,
//         currImage = 0;
//
//     setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
//     window.addEventListener('resize', function () {
//         setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
//     });
//
//     setupNavigation();
//
//     function setupCarousel(n, s) {
//         var apothem = s / (2 * Math.tan(Math.PI / n));
//
//         figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';
//
//         for (var i = 0; i < n; i++) {
//             images[i].style.padding = gap + 'px';
//         }
//         for (i = 1; i < n; i++) {
//             images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
//             images[i].style.transform = 'rotateY(' + (i * theta) + 'rad)';
//             window.plus = 1;
//         }
//         if (bfc){
//             for (i = 0; i < n; i++) {
//                 images[i].style.backfaceVisibility = 'hidden';
//             }
//         }
//
//         rotateCarousel(currImage);
//     }
//
//     function setupNavigation() {
//         nav.addEventListener('click', onClick, true);
//         figure.addEventListener('click',onClick,true);
//
//         function onClick(e) {
//             e.stopPropagation();
//
//             var t = e.target;
//             if (t.tagName.toUpperCase() != 'BUTTON' && t.tagName.toUpperCase() != 'IMG') return;
//
//             if(t.tagName.toUpperCase() == 'BUTTON'){
//                 if (t.classList.contains('next')) {
//                     currImage++;
//                 } else if(t.classList.contains('remove')){
//                     removeImage(currImage);
//                 }else if(t.classList.contains('add')){
//                     addImage();
//                 }else{
//                     currImage--;
//                 }
//             }else if(t.tagName.toUpperCase() == 'IMG'){
//                 currImage = Array.from(figure.children).indexOf(t);
//             }
//
//             rotateCarousel(currImage);
//         }
//     }
//
//     function addImage() {
//         var c = document.getElementsByTagName('figure')[0];
//         c.children[0]
//         var imge = document.createElement('img');
//         imge.src='img/1.jpg';
//         c.appendChild(imge);
//         refresh();
//     }
//
//     function refresh() {
//         var carousels = document.querySelectorAll('.carousel');
//         carousel(carousels[0]);
//     }
//
//     function removeImage(currImage) {
//         var fig = document.getElementsByTagName('figure')[0];
//         for (var c in fig.children) {
//             if (currImage == c) {
//                 fig.removeChild(fig.children[c]);
//                 break;
//             }
//         }
//         if(fig.children.length > 0){
//             refresh();
//         }
//         window.plus = 0;
//     }
//
//
//     function rotateCarousel(imageIndex) {
//         figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';
//     }
// }
window.addEventListener('load',function (ev) {
    init(window.Storage.property,window.axios);
})

function init(Storage,axios) {
    //处理数据部分
     var datas = Storage.findAllBookMark();

    //处理UI部分
    var root = document.querySelectorAll('.carousel')[0];
    var figure = root.querySelector('figure');

    var nav = root.querySelector('nav');

    //绑定的按钮事件
    var clickHandler = function (e) {
        e.preventDefault();
        if(e.target.tagName.toUpperCase() != 'BUTTON'){
            return;
        }

        //如果点的是添加
        if(e.target.classList.contains('add')){

        }else if(e.target.classList.contains('next')){
            currImage++;
        }else{
            currImage--;
        }
        rotateCarousel(currImage);
    }

    //向页面添加书签
    var addElementTo = function (obj) {
        var oFrg = document.createDocumentFragment();
        var img = document.createElement('img');
        img.src = obj.src;
        oFrg.appendChild(img);
        figure.appendChild(img);
    }

    //整体旋转
    function rotateCarousel(imageIndex) {
        figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';
    }
    var iamges = [];
    var gap,n,bfc ,theta,currImage;
    var initView = function () {
        console.log("初始化视图")
        nav = root.querySelector('nav');//获取按钮
        images = figure.children;//获取所有图片
            n = images.length,//获取图片长度
            gap = root.dataset.gap || 0,
            bfc = 'bfc' in root.dataset,
            theta = 2 * Math.PI / n,
            currImage = 0;//当前最前面的图片是（有待修改）
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    }

    function setupCarousel(n, s) {
        var apothem = s / (2 * Math.tan(Math.PI / n));

        figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';

        for (var i = 0; i < n; i++) {
            images[i].style.padding = gap + 'px';
        }

        for (i = 1; i < n; i++) {
            images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
            images[i].style.transform = 'rotateY(' + (i * theta) + 'rad)';
        }

        if (bfc){
            for (i = 0; i < n; i++) {
                images[i].style.backfaceVisibility = 'hidden';
            }
        }

        rotateCarousel(currImage);
    }

    nav.addEventListener('click',clickHandler,true);
    window.addEventListener('resize', function () {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });

    //从服务器端配置文件中获取
    axios.get('test.json').then(function (value) {

        }).catch(function (reason) {
            alert(reason);
    });

    var array = [
        {name:'ddd',src:'img/1.jpg'},
        {name:'ddd',src:'img/2.jpg'},
        {name:'ddd',src:'img/3.jpg'},
        {name:'ddd',src:'img/4.jpg'},
        {name:'ddd',src:'img/5.jpg'},
        ];
    for(var i in datas){
        addElementTo(datas[i]);
    }
    initView();
}
