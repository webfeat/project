  var webPage = require('webpage');
            var page = webPage.create();
            page.zoomFactor = 1;
            
            page.viewportSize =  { width: 1920, height: 1080 };
            page.open('http://www.baidu.com', function start(status,ddd) {
                console.log(status);
                page.render('src/dist3/img/0fcf43f3-db66-4aca-a255-08a0a8a7d43e' + '.jpeg', {format: 'jpeg', quality: '1000'});
                phantom.exit();
            });