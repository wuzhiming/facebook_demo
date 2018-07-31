# facebook_demo
a demo for CocosCreator integrate Facebook  SDK.
# 已完成功能
## Facebook Live Stream
 - CocosCreator 根据用户配置自动集成 SDK
 - CocosCreator 编译、运行带有 Facebook Live Stream SDK 的 apk , ipa(Live Stream 无法在ios的模拟器中运行)   
 - 直播 start pause stop 功能集成
 
## Facebook Audience Network
 - CocosCreator 根据用户配置自动集成 SDK
 - CocosCreator 编译、运行 带有 Audience Network 的apk。`ipa直接运行将在下一个版本支持`
 - banner interstital rewardedvideo 功能集成
 
 
# CocosCreator 集成方法 
## Facebook Live Stream
 1. 打开 CocosCreator 并打开需要集成的游戏工程。
 2. CocosCreator 启动后，依次选择 项目--> 项目设置 --> 服务，并勾选 Facebook 服务
 3. 填写 AppID，并勾选 Facebook 直播 SDK，然后保存
 4. 项目 --> 构建发布 --> 选择发布平台（ Android 或者 iOS ），选择构建模板（建议使用 default 模板），点击构建，即可完成项目的构建和对应平台SDK的集成
 5. 点击编译，等待其编译完成，点击运行即可在对应平台运行（Android 请保持手机与电脑的连接，iOS只能在模拟器运行）
 6. 推荐使用 Xcode 和 Android Studio 编译和运行对应平台的工程以获得最佳体验（工程的路径：you_game_path/build//jsb-default/frameworks/runtime-src）Android 请使用 Android Studio 打开该路径下的 proj.android-studio 目录，ios请打开 proj.ios_mac目录
 7. 启动 demo，运行 live 场景，点击 start 即可进行录制，点击 stop 即可停止录制
 
 ## Facebook Audience Network

 1. 打开 CocosCreator 并打开需要集成的游戏工程。
 2. CocosCreator 启动后，依次选择 项目--> 项目设置 --> 服务，并勾选 Facebook 服务
 3. 勾选 Facebook Audience Network，然后保存
 4. 项目 --> 构建发布 --> 选择发布平台（ Android 或者 iOS ），选择构建模板（建议使用 default 模板），点击构建，即可完成项目的构建和对应平台SDK的集成
 5. 点击编译，等待其编译完成，点击运行即可在对应平台运行（Android 请保持手机与电脑的连接，`iOS编译将在下一个版本支持`）
 6. 推荐使用 Xcode 和 Android Studio 编译和运行对应平台的工程以获得最佳体验（工程的路径：you_game_path/build//jsb-default/frameworks/runtime-src）Android 请使用 Android Studio 打开该路径下的 proj.android-studio 目录，ios请打开 proj.ios_mac目录
 7. 启动 demo，运行 an 场景，点击 对应种类的标签按钮即可查看对应的广告
 