import{_ as e,o as i,c as a,e as d}from"./app-e85d5a28.js";const n={},s=d(`<h1 id="内存泄露调试案例" tabindex="-1"><a class="header-anchor" href="#内存泄露调试案例" aria-hidden="true">#</a> 内存泄露调试案例</h1><h2 id="问题背景" tabindex="-1"><a class="header-anchor" href="#问题背景" aria-hidden="true">#</a> 问题背景</h2><p>硬件：R128 软件：FreeRTOS + rtplayer_test(Cedarx)+ AudioSystem</p><h2 id="问题复现" tabindex="-1"><a class="header-anchor" href="#问题复现" aria-hidden="true">#</a> 问题复现</h2><p>复现步骤：</p><ol><li>rtplayer_test /data/boot.mp3</li><li>串口输入&quot;l&quot;, 循环播放</li><li>串口输入&quot;b&quot; , 播放器后台执行</li></ol><h2 id="具体表现" tabindex="-1"><a class="header-anchor" href="#具体表现" aria-hidden="true">#</a> 具体表现</h2><p>rtplayer_test 循环播放老化音频十几分钟后，音乐停止播放，报错如下：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part4/chapter1/image1.jpg" alt="image1"></p><h2 id="问题分析" tabindex="-1"><a class="header-anchor" href="#问题分析" aria-hidden="true">#</a> 问题分析</h2><ol><li>根据上面报错的log,播放停止时，系统内存不足；在老化过程中出现的内存不足，一般是某处存在内存泄漏</li><li>reboot重启，重新执行老化播放流程，串口执行free命令，观察内存的剩余情况：</li></ol><p>首次播放时的内存：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>c906&gt;free
==&gt; Round [1] &lt;==
Total Heap Size :  1907128 Bytes    ( 1862 KB)
           Free :   547632 Bytes    (  534 KB)
       Min Free :   536208 Bytes    (  523 KB)


      List Task MIN Free Stack(unit: word)
Task          State  Priority  Stack      #
************************************************
Name            State   Pri     HWM     Idx     StkCur          StkBot
adb-shell       X       4       394     44      0x87233a0       0x8722650
AudioDecode     R       4       3872    49      0x874d2c0       0x87459c0
IDLE            R       0       52      2       0x863dfe0       0x863de40
tcpip           B       3       470     12      0x8677ae0       0x8676c30
Demux           B       6       3126    47      0x87333a0       0x872b960
usb-hardware-sc B       6       8018    14      0x871a3a0       0x870a630
adbd-input      B       5       900     24      0x876eb90       0x876cec0
amp-admin       B       6       4002    11      0x8675ab0       0x866dda0
AudioMT2pb      B       4       3882    52      0x8779be0       0x8772050
AudioRender     B       6       3350    50      0x8756950       0x874ed30
amp-ser2        B       6       4006    8       0x865d830       0x8655b00
amp-ser3        B       6       4006    9       0x8665910       0x865dbe0
amp-ser4        B       6       4006    10      0x866d9f0       0x8665cc0
hub-main-thread B       6       8082    13      0x870a2b0       0x86fa620
adbd-shell-ser- B       4       906     45      0x8726330       0x8724660
XPlayer         B       4       3912    48      0x8744e10       0x873d220
AudioMT2        B       4       1907    18      0x873cb00       0x8738e10
RTplayerThread  B       4       3989    51      0x876a630       0x8762980
CLI             B       6       3772    15      0x8722060       0x871a640
Tmr Svc         B       6       374     3       0x863f070       0x863e320
amp-send-task   B       6       930     4       0x8642db0       0x8641070
amp-recv-task   B       6       924     5       0x8644e90       0x8643150
adbd-output     B       5       843     25      0x8770cd0       0x876f060
adb-event       B       5       894     46      0x872a300       0x87286d0
amp-ser0        B       6       4006    6       0x864d670       0x8645940
amp-ser1        B       6       4006    7       0x8655750       0x864da20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>播放几次后的内存情况：</p><div class="language-language line-numbers-mode" data-ext="language"><pre class="language-language"><code>c906&gt;free
==&gt; Round [1] &lt;==
Total Heap Size :  1907128 Bytes    ( 1862 KB)
           Free :   456992 Bytes    (  446 KB)
       Min Free :   453440 Bytes    (  442 KB)


      List Task MIN Free Stack(unit: word)
Task          State  Priority  Stack      #
************************************************
Name            State   Pri     HWM     Idx     StkCur          StkBot
adb-shell       X       4       394     44      0x87235b0       0x8722650
AudioDecode     R       4       3872    49      0x874d5e0       0x87459c0
IDLE            R       0       52      2       0x863dfe0       0x863de40
tcpip           B       3       458     12      0x8677ae0       0x8676c30
usb-hardware-sc B       6       8018    14      0x871a3a0       0x870a630
adbd-input      B       5       900     24      0x876eb90       0x876cec0
amp-admin       B       6       4002    11      0x8675ab0       0x866dda0
AudioMT2pb      B       4       3882    52      0x8779be0       0x8772050
AudioRender     B       6       3350    50      0x8756950       0x874ed30
CLI             B       6       3772    15      0x8722060       0x871a640
Tmr Svc         B       6       374     3       0x863f070       0x863e320
amp-ser0        B       6       4006    6       0x864d670       0x8645940
amp-ser1        B       6       4006    7       0x8655750       0x864da20
amp-ser2        B       6       4006    8       0x865d830       0x8655b00
amp-ser3        B       6       4006    9       0x8665910       0x865dbe0
amp-ser4        B       6       4006    10      0x866d9f0       0x8665cc0
hub-main-thread B       6       8082    13      0x870a2b0       0x86fa620
XPlayer         B       4       3912    48      0x8744e10       0x873d220
AudioMT2        B       4       1907    18      0x873cb00       0x8738e10
adbd-output     B       5       843     25      0x8770cd0       0x876f060
amp-recv-task   B       6       924     5       0x8644e90       0x8643150
Demux           B       6       3126    47      0x8733150       0x872b960
amp-send-task   B       6       924     4       0x8642db0       0x8641070
adb-event       B       5       890     46      0x872a2a0       0x87286d0
adbd-shell-ser- B       4       906     45      0x8726330       0x8724660
RTplayerThread  B       4       3989    51      0x876a630       0x8762980
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>观察Free项的剩余内存，可发现在老化播放过程中，内存不断减少，存在泄漏。</p><h3 id="泄漏点定位" tabindex="-1"><a class="header-anchor" href="#泄漏点定位" aria-hidden="true">#</a> 泄漏点定位</h3><p>可借助memleak工具，定位内存泄漏处。mrtos menuconfig选上memleak</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-&gt; System components                                                                    
 -&gt; aw components                                                                         
  -&gt; Memleak Components Support   
    [*] Tina RTOS Memleak                    # 使能内存泄露分析工具
    (16)  Tina RTOS Memleak Backtrace Level  # 内存泄露分析栈回溯层数                 
    [ ]   Tina RTOS Double Free Check                                                     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>memleak用法如下</p><div class="language-language line-numbers-mode" data-ext="language"><pre class="language-language"><code>作用：内存泄露分析
用法：memleak 1 使能内存泄露分析，记录所有内存块申请、释放信息
memleak 0 关闭内存泄露分析，删除所有内存块的申请、释放信息
memleak 1 thread_name1 thread_name2 使能内存泄露分析，记录指定任务的内存块申请、释放信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>串口执行memleak 1</p><p>音频老化测试（参考复现步骤），音频播放几次后，执行rtpc q 命令退出播放</p><p>串口执行memleak 0</p><p>关闭内存泄露检测时，会打印可疑的内存泄露点及其回溯信息;</p><p>有两个地方：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    007: ptr = 0x08760960, size = 0x00000f00, thread = AudioRender
        backtrace : 0x08336AEE
        backtrace : 0x08336B46
        backtrace : 0x08396D52
        backtrace : 0x084B025E
        backtrace : 0x08446856
        backtrace : 0x084496C6
    008: ptr = 0x0875f990, size = 0x00000f00, thread = AudioRender
        backtrace : 0x08336AEE
        backtrace : 0x08336B46
        backtrace : 0x0839757E
        backtrace : 0x084B025E
        backtrace : 0x08446856
        backtrace : 0x084496C6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>callstack 回溯</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pvPortMalloc at /workspace/freertos/r128/test_0624_rtplayer/rtos-dev/lichee/rtos/kernel/FreeRTOS-orig/Source/portable/MemMang/heap_4.c:658
pvPortCalloc at /workspace/freertos/r128/test_0624_rtplayer/rtos-dev/lichee/rtos/kernel/FreeRTOS-orig/Source/portable/MemMang/heap_4.c:577
softvol_ap_update_mode at /workspace/freertos/r128/test_0624_rtplayer/rtos-dev/lichee/rtos/components/common/aw/AudioSystem/audio_plugin/softvolume.c:250
_AudioTrackStart at //workspace/rtos-r128/lichee/rtos/components/common/aw/AudioSystem/AudioTrack.c:163
RTSoundDeviceStart at /workspace/codec_lib/cedarx_rtos/temp/rtos_cedarx/cedarx/rtos_out/libcore/playback/src/rtosSoundControl.c:766
startSoundDevice at /workspace/codec_lib/cedarx_rtos/temp/rtos_cedarx/cedarx/rtos_out/libcore/playback/src/audioRenderComponent.c:800
 (inlined by) doRender at /workspace/codec_lib/cedarx_rtos/temp/rtos_cedarx/cedarx/rtos_out/libcore/playback/src/audioRenderComponent.c:942
 (inlined by) doRender at /workspace/codec_lib/cedarx_rtos/temp/rtos_cedarx/cedarx/rtos_out/libcore/playback/src/audioRenderComponent.c:898
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过回溯信息，发现在<code>resample_ap_update_mode</code>处产生了内存泄漏。</p><h2 id="根本原因" tabindex="-1"><a class="header-anchor" href="#根本原因" aria-hidden="true">#</a> 根本原因</h2><p>播放器老化过程中，只调用<code>AudioTrackCreate</code>一次，循环播放时会多次调用<code>_AudioTrackStart</code>，最后退出播放才调用<code>AudioTrackDestroy</code>销毁；所以<code>softvol_ap_update_mode</code>这里，老化过程会多次调用到，会有多次分配，但只在退出时<code>AudioTrackDestroy</code>里才销毁。</p><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h2><p>只在<code>AudioTrackCreateWithStream</code>时创建一次，<code>AudioTrackDestroy</code>，测试10小时左右未出现内存泄漏</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part4/chapter1/image2.jpg" alt="image2"></p>`,35),r=[s];function l(c,t){return i(),a("div",null,r)}const u=e(n,[["render",l],["__file","chapter1.html.vue"]]);export{u as default};
