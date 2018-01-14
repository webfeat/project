module.exports = class BookMark{

    constructor(){
        this.uid = "";
        this.url = "";
        this.preWatch = "";
        this.imageSrc = "";
    }

    setUrl(url){
        this.url = url;
    }

    getUr(){
        return this.url;
    }

    getImageSrc(){
        return this.imageSrc;
    }

    setImageSrc(imageSrc){
        this.imageSrc = imageSrc;
    }
}