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

let PLACEMENT_IDS = {
    ANDROID: {
        BANNER: "1982508651779400_1982511068445825",
        INTERSTITIAL: '1982508651779400_1982509301779335',
        REWARDEDVIDEO: 'YOUR_PLACEMENT_ID'
    },
    IOS: {
        BANNER: "IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID",
        INTERSTITIAL: 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID',
        REWARDEDVIDEO: 'YOUR_PLACEMENT_ID'
    }
};
cc.Class({
    extends: cc.Component,

    properties: {
        ball_prefab: cc.Prefab,
        ball_node: cc.Node,
        banner_tips: cc.Label,
        interstitial_tips: cc.Label,
        status_tips: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.set_physics_enable();
        this.node.on(cc.Node.EventType.TOUCH_START, this._on_touch_start, this);
        this.placementId = PLACEMENT_IDS.ANDROID;

        cc.log("plat form is ",cc.sys.platform,cc.sys.IPAD);
        if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) {
            this.placementId = PLACEMENT_IDS.IOS;
        }
    },

    start () {

    },

    _switch_status(){
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

    banner_click(event){
        let banner = new cc.Ads.Banner(this.placementId.BANNER,cc.Ads.BANNER_POSITION.ALIGN_PARENT_BOTTOM);
        this.banner = banner;
        banner.on("onAdLoaded", () => {
            cc.log("banner onAdLoaded");
            this.status_tips.string = "banner loaded";
        }, this.node);

        banner.on("onError", (eCode) => {
            cc.log("banner onError");
            this.status_tips.string = "banner onError";
        }, this.node);

        banner.on("onAdClicked", () => {
            cc.log("banner onAdClicked");
            this.status_tips.string = "banner onAdClicked";
        }, this.node);

        // banner.loadAd().then(() => {
        //     cc.log("banner show-------");
        // }).catch((e) => {
        //     this.status_tips.string = "banner reject";
        //     cc.log("banner reject");
        // });

        banner.show().then(() => {
            cc.log("banner show-------");
        }).catch((e) => {
            cc.log("banner reject ", e);
        });
    },

    banner_destroy(){
        this.banner.destroy();
    },

    home_click(){
        cc.director.loadScene("facebook");
    },

    interstital_click(){
        this.interstital = new cc.Ads.Interstitial(this.placementId.INTERSTITIAL);
        // this.interstital = new cc.Ads.Interstitial("1982508651779400_1982509301779335");
        this.interstital.on("onInterstitialDisplayed", () => {
            cc.log("interstital onInterstitialDisplayed");
            this.status_tips.string = "onInterstitialDisplayed";
        });

        this.interstital.on("onInterstitialDismissed", () => {
            cc.log("interstital onInterstitialDismissed");
            this.status_tips.string = "onInterstitialDismissed";
        });

        this.interstital.on("onAdClicked", () => {
            cc.log("interstital onAdClicked");
            this.status_tips.string = "onAdClicked";
        });

        this.interstital.on("onError",(error)=>{
            this.status_tips.string = "onError";
        });

        this.interstital.loadAd().then(() => {
            return this.interstital.show();
        }).catch((e) => {
            cc.log("interstital catch", e);
        });
    },

    reward_video_click(){
        //2041389089521027_2049823662010903
        this.reward_video = new cc.Ads.RewardedVideo(this.placementId.REWARDEDVIDEO);

        this.reward_video.on("onRewardedVideoCompleted", () => {
            cc.log("rewardedvideo onRewardedVideoCompleted");
            this.status_tips.string = "onRewardedVideoCompleted";
        });

        this.reward_video.on("onRewardedVideoClosed", () => {
            cc.log("rewardedvideo onRewardedVideoClosed");
            this.status_tips.string = "onRewardedVideoClosed";
        });

        this.reward_video.on("onAdClicked", () => {
            cc.log("rewardedvideo onAdClicked");
            this.status_tips.string = "onAdClicked";
        });

        this.reward_video.on("onError", (e) => {
            cc.log("rewardedvideo onError", e);
            this.status_tips.string = "onError" + e;
        });

        this.reward_video.loadAd().then(() => {
            this.reward_video.show();
        }).catch((e) => {
            cc.log("rewardedvideo catch", e);
        })

        // this.reward_video.show().then(() => {
        //     cc.log("rewardedvideo show");
        // }).catch((e) => {
        //     cc.log("rewardedvideo catch", e);
        // })
    }
    // update (dt) {},
});
