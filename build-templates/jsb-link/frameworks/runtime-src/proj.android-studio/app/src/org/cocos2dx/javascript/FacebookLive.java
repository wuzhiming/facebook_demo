package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.Context;
import android.util.Log;

import com.facebook.livestreaming.LiveStreamCallback;
import com.facebook.livestreaming.LiveStreamConfig;
import com.facebook.livestreaming.LiveStreamError;
import com.facebook.livestreaming.LiveStreamManager;
import com.facebook.livestreaming.LiveStreamStatus;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

public class FacebookLive {
    private static final String TAG = "FacebookLive";
    private static LiveStreamConfig mLiveStreamConfig;
    private static Cocos2dxActivity act;

    public static void init(Cocos2dxActivity activity) {
        act = activity;
        mLiveStreamConfig = new LiveStreamConfig(new LiveStreamCallback() {
            @Override
            public void onLiveStreamError(LiveStreamError liveStreamError) {
                Log.d(TAG, "onLiveStreamError: "
                        + liveStreamError.getMessage() +
                        " live stream error code:" + liveStreamError.getCode());
            }

            @Override
            public void onLiveStreamStatusChange(final LiveStreamStatus liveStreamStatus) {
                Runnable runnable = new Runnable() {

                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("cc.live_demo.live_status_changed(" + liveStreamStatus.getCode() + ")");
                    }
                };

                act.runOnGLThread(runnable);

                Log.d(TAG, "onLiveStreamStatusChange: "
                        + liveStreamStatus.getMessage() +
                        " live stream error code:" + liveStreamStatus.getCode());

            }
        });
    }

    public static void startLive() {
        Log.d(TAG, "startLive");
        LiveStreamManager.getInstance().
                startLiveStreaming(act.getBaseContext(), mLiveStreamConfig);
    }

    public static void pauseLive() {
        Log.d(TAG, "pauseLive");
        LiveStreamManager.getInstance().
                pauseLiveStreaming(act.getBaseContext());
    }

    public static void resumeLive() {
        Log.d(TAG, "resumeLive");
        LiveStreamManager.getInstance().
                resumeLiveStreaming(act.getBaseContext());
    }

    public static void stopLive() {
        Log.d(TAG, "stopLive");
        LiveStreamManager.getInstance().stopLiveStreaming(act.getBaseContext());
    }
}
