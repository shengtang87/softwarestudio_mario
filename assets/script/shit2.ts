const {ccclass, property} = cc._decorator;

@ccclass
export default class winner extends cc.Component {
    

    onLoad () {
    }

    start () {
        cc.director.preloadScene("testlevel", function () {
            console.log('Next scene preloaded');
        });
        this.scheduleOnce(function() {
            this.load();
        }, 3);
    }

    update () {
    }  


    load(){
        cc.director.loadScene('testlevel', () => cc.director.loadScene("chooselevel"));
    }


}
