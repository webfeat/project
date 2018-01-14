(function () {
    var menu = document.getElementById('menu');
    menu.addEventListener('click',function (e) {
        if(e.target.nodeName === 'LI'){
            var domList = document.getElementsByClassName('active');
            if(domList.length <= 0){
                e.target.className = 'active';
                return;
            }
            for (var dom of domList){
                if(dom !== e.target) {
                    dom.className = '';
                    e.target.className = 'active'
                }else{
                    dom.className == 'active'?dom.className = '':dom.className = 'active';
                }
            }
        }
    })
})()