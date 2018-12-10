/**
 *
 * android native 集成
 * 1.添加aar文件，并加入libs的目录到gradle
 * 2.在gradle里面添加fb的sdk路径
 * 3.加入broadcast receiver和fbappid到androidMenifest.xml
 *
 *
 * ios 集成
 * 1.加入三个framework
 * 2.info.plist 加入fbappid和对应 url types
 *
 */
let LIVE_STATUS = {
    UNKNOWN: 0,
    INITIALIZING: 1,
    RUNNING: 2,
    PAUSED: 3,
    STOPPED: 4,
    COMPLETED: 5,
};
cc.Class({
    extends: cc.Component,

    properties: {
        ball_prefab: cc.Prefab,
        ball_node: cc.Node,
        start_tips: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.live_status = LIVE_STATUS.INITIALIZING;
        this.set_physics_enable();
        this.node.on(cc.Node.EventType.TOUCH_START, this._on_touch_start, this);
        this._switch_status(this.live_status);

        fb.liveStream.useMic = true;
        fb.liveStream.useCamera = true;
        this._register_live_callback();
    },

    start () {

    },

    _register_live_callback(){
        fb.liveStream.on("onStatusChanged", this._switch_status.bind(this), this.node);
        fb.liveStream.on("onError", (code) => {
            cc.error("some error ", code)
        }, this.node);
    },

    _get_status(){
        let name = "start";
        switch (this.live_status) {
            case LIVE_STATUS.INITIALIZING:
                name = "start";
                break;
            case LIVE_STATUS.RUNNING:
                name = "pause";
                break;
            case LIVE_STATUS.PAUSED:
                name = "resume";
                break;
            case   LIVE_STATUS.STOPPED:
                name = "start";
                break;
            default:
                break;
        }
        return name;
    },
    _switch_status(code){
        this.live_status = code;
        this.start_tips.string = this._get_status();
    },

    _on_touch_start: function (event) {
        let ws = cc.director.getWinSize();
        let location = event.getLocation();
        let ball = cc.instantiate(this.ball_prefab);
        ball.position = cc.v2(location.x - ws.width / 2, location.y - ws.height / 2);
        ball.parent = this.node;
    },

    set_physics_enable: function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        // this.show_debug_node();
    },

    show_debug_node: function () {
        if (!CC_BUILD) {
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_pairBit |
                cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit;
        }
    },

    btn_click(event){
        this._event_click(this._get_status());
    },

    stop_click(){
        this._event_click("stop");
    },

    home_click(){
        cc.director.loadScene("facebook");
    },

    _event_click(name){
        fb.liveStream[`${name}Live`]();
    }
    // update (dt) {},
});
