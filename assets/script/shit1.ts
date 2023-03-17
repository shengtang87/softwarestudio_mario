const {ccclass, property} = cc._decorator;

@ccclass
export default class gameover extends cc.Component {
    

    onLoad () {
    }

    start () {
        cc.director.preloadScene("lv1", function () {
            console.log('Next scene preloaded');
        });
        this.scheduleOnce(function() {
            this.load();
        }, 3);
    }

    update () {
    }  


    load(){
        cc.director.loadScene('lv1', () => cc.director.loadScene("chooselevel"));
    }


}
