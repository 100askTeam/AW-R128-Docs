import{_ as e,o as i,c as n,e as d}from"./app-e85d5a28.js";const s={},a=d(`<h1 id="usb-外设功能配置" tabindex="-1"><a class="header-anchor" href="#usb-外设功能配置" aria-hidden="true">#</a> USB 外设功能配置</h1><h2 id="usb-功能简介" tabindex="-1"><a class="header-anchor" href="#usb-功能简介" aria-hidden="true">#</a> USB 功能简介</h2><p>USB 功能模块包括了USB Host，USB Device 和OTG 功能。</p><p>USB Host 目前已经支持上的功能有：Mass Storage，UVC。</p><p>USB Device 目前已经支持上的功能有：ADB，UAC。</p><p>OTG 主要用作Host 与Device 的切换，如当板子通过 USB 线连接到 USB 主机 (PC) 上时， 此时 OTG 是加载成 USB Device；若当前板子是通过 OTG 线连接一个USB 设备，此时 OTG 则加载 成 USB Host。</p><h2 id="usb-外设特性" tabindex="-1"><a class="header-anchor" href="#usb-外设特性" aria-hidden="true">#</a> USB 外设特性</h2><ul><li>Complies with USB 2.0 Specification</li><li>Supports High-Speed (HS, 480-Mbps), Full-Speed (FS, 12-Mbps), and Low-Speed (LS, 1.5-Mbps) in Host mode</li><li>Supports High-Speed (HS, 480 Mbps), Full-Speed (FS, 12 Mbps) in Device mode</li><li>Supports the UTMI+ Level 3 interface. The 8-bit bidirectional data buses are used</li><li>Supports bi-directional endpoint0 for Control transfer</li><li>Supports up to 8 User-Configurable Endpoints for Bulk, Isochronous and Interrupt bi-directional transfers (Endpoint1, Endpoint2, Endpoint3, Endpoint4)</li><li>Supports up to (4KB+64Bytes) FIFO for EPs (Including EP0)</li><li>Supports High-Bandwidth Isochronous &amp; Interrupt transfers</li><li>Automated splitting/combining of packets for Bulk transfers</li><li>Supports point-to-point and point-to-multipoint transfer in both Host and Peripheral mode</li><li>Includes automatic ping capabilities</li><li>Soft connect/disconnect function</li><li>Performs all transaction scheduling in hardware</li><li>Power Optimization and Power Management capabilities</li><li>Includes interface to an external Normal DMA controller for every Eps</li></ul><h2 id="usb-配置介绍" tabindex="-1"><a class="header-anchor" href="#usb-配置介绍" aria-hidden="true">#</a> USB 配置介绍</h2><h3 id="sys-config-fex-配置说明" tabindex="-1"><a class="header-anchor" href="#sys-config-fex-配置说明" aria-hidden="true">#</a> <code>sys_config.fex</code> 配置说明</h3><p>sys_config.fex 中主要是对 OTG 功能进行配置，各个配置的含义可如下所示：</p><table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody><tr><td>[usbc0]</td><td>控制器0的配置。</td></tr><tr><td>usb_used:</td><td>USB使能标志。置1，表示系统中USB模块可用,置0,则表示系统USB禁用。</td></tr><tr><td>usb_port_type</td><td>USB端口的使用情况。 0: device only;1: host only;2: OTG;usb_detect_type: USB</td></tr><tr><td>usb_detect_mode</td><td>USB端口的检查方式。0: 线程轮询;1: id中断触发</td></tr><tr><td>usb_id_gpio</td><td>USB ID pin脚配置。具体请参考gpio配置说明。</td></tr><tr><td>usb_det_vbus_gpio</td><td>USB DET_VBUS pin脚配置。具体请参考gpio配置说明。</td></tr><tr><td>usb_drv_vbus_gpio</td><td>USB DRY_VBUS pin脚配置。具体请参考gpio配置说明。</td></tr><tr><td>usb_drv_vbus_type</td><td>vbus设置方式。0: 无; 1: gpio; 2: axp。</td></tr><tr><td>usb_det_vbus_gpio</td><td>&quot;axp_ctrl&quot;,表示axp 提供。</td></tr><tr><td>usbh_driver_level</td><td>usb驱动能力等级</td></tr><tr><td>usbh_irq_flag</td><td>usb中断标志</td></tr></tbody></table><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>;--------------------------------
;---       USB0控制标志
;--------------------------------
[usbc0]
usb_used                = 1
usb_port_type           = 2
usb_detect_type         = 1
usb_detect_mode         = 0
usb_id_gpio             = port:PB04&lt;0&gt;&lt;0&gt;&lt;default&gt;&lt;default&gt;
usb_det_vbus_gpio       = port:PA24&lt;0&gt;&lt;0&gt;&lt;default&gt;&lt;default&gt;
usb_drv_vbus_gpio       = port:PA29&lt;1&gt;&lt;0&gt;&lt;default&gt;&lt;default&gt;
usb_drv_vbus_type       = 1
usbh_driver_level       = 5
usbh_irq_flag           = 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rtos-menuconfig-配置说明" tabindex="-1"><a class="header-anchor" href="#rtos-menuconfig-配置说明" aria-hidden="true">#</a> rtos menuconfig 配置说明</h3><ul><li>使能USB 驱动</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            [*] USB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使能OTG</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            [*] USB_MANAGER
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使能USB Host</li></ul><p>使能完USB Host 之后，还需要选择：OHCI 与EHCI（一共有0 和1 两组，对于R128 来说，只需要使能USB0）。另外，还要选择功能驱动（Mass Storage，UVC），不然只是使能USB Host 则无法正常运行USB Host 的功能。</p><p>USB Host 控制器驱动配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>USB Host
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            [*] USB_HOST

OHCI
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB HOST
                [*] USB_OHCI_0

EHCI
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB HOST
                [*] USB_EHCI_0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使能USB Device</li></ul><p>USB Device 除了UDC 的使能之外，也需要选择对应的功能驱动Gadget 以及功能驱动对应的上层应用。</p><p>USB Device 控制器驱动配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>USB Device
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            [*] USB_DEVICE

USB Device使能dma通信
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB DEVICE
                [*] UDC_USE_DMA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usb-源码结构" tabindex="-1"><a class="header-anchor" href="#usb-源码结构" aria-hidden="true">#</a> USB 源码结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>lichee/rtos‑hal/hal/source/usb
├── common/
├── core/
├── gadget/
│ ├── function/
├── hid/
│ ├── Class/
│ ├── Client/
│ │ ├── KeyBoard/
│ │ └── Mouse/
│ ├── Include/
├── host/
├── include/
├── manager/
├── platform/
├── storage/
│ ├── Class/
│ ├── Disk/
│ ├── include/
│ └── Misc/
├── udc/
└── uvc/
├── Class/
├── drv_webcam/
│ ├── dev_cfg/
│ └── webcam_core/
├── Include/
├── Misc/
└── Webcam/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>common: USB 驱动初始化公用文件。</li><li>core: USB Host 驱动框架层文件。</li><li>gadget: USB Deivce 功能驱动gadget 驱动总入口文件，function 则是各个功能驱动的驱动文件。</li><li>hid: USB Host HID 协议及驱动文件。</li><li>host: USB Host 硬件控制器驱动。</li><li>include: USB 公用头文件。</li><li>manager: USB OTG 驱动。</li><li>platform: 不同平台的配置文件。</li><li>storage: USB Host Mass Storage 协议及驱动文件。</li><li>udc: USB Deivce 硬件控制器驱动。</li><li>uvc: USB Host UVC 协议及驱动文件。</li></ul><p>详细说明请见：<a href="/sdk_module/usb">HAL USB</a></p><h2 id="usb-常用功能说明" tabindex="-1"><a class="header-anchor" href="#usb-常用功能说明" aria-hidden="true">#</a> USB 常用功能说明</h2><h3 id="配置otg-功能" tabindex="-1"><a class="header-anchor" href="#配置otg-功能" aria-hidden="true">#</a> 配置OTG 功能</h3><p>OTG 功能下，需要根据USB ID 脚去进行Device/Host 模式的切换；如果需要支持NULL 模式（既不加载Device 也不加载Host 驱动）, 那么还需要VBUS 状态检测引脚。</p><p>涉及到的主要改动点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>在sys_config.fex，修改如下配置：
usb_port_type配置为2,即OTG模式。
usb_id_gpio配置对应的USB ID引脚。
usb_det_vbus_gpio, 需要根据实际情况进行配置:

1.如果需要检测VBUS状态，则按下面情况进行配置：
配置成对应的gpio即可。

2.如果不需要检测VBUS状态(缺少NULL模式)
那么直接填写USB ID的gpio配置(也就是VBUS与ID状态一致)。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>USB OTG 驱动，会根据ID 和VBUS 的状态，自动切换成对应的模式。ID 和VBUS 的对应关系如下表：</p><table><thead><tr><th>ID</th><th>VBUS</th><th>模式</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>Host</td></tr><tr><td>1</td><td>0</td><td>Null</td></tr><tr><td>0</td><td>1</td><td>Host</td></tr><tr><td>1</td><td>1</td><td>Device</td></tr></tbody></table><ul><li>ID 脚一般情况下为高电平，只有接入OTG 线时会拉低;</li><li>VBUS 为1 表示micro USB 口有接入外部电源;</li><li>一般不会出现ID 为0，VBUS 为1 的情况。这表示接入OTG 线，但是还检测到VBUS;</li><li>如果没有VBUS 检测，ID 只有0 和1 的两种情况, 也就是说要么加载device 驱动，要么加载host 驱动; 这会带来一些影响：usb 相关时钟一直被打开，导致有一定功耗，以及硬件射频。</li></ul><h3 id="usb-gadget-功能配置" tabindex="-1"><a class="header-anchor" href="#usb-gadget-功能配置" aria-hidden="true">#</a> USB Gadget 功能配置</h3><p>USB Gadget 支持众多功能，它们的配置方法比较类似，只需要在mrtos_menuconfig 中选上对应的Gadget 功能驱动即可在系统初始化时自动加载。与Linux 不一样的是，RTOS 的gadget 功能配置全部hardcode 在功能驱动里，无需像Linux 一样需要在应用层手动进行gadget 配置。</p><p>另外，目前RTOS 的USB 驱动还不支持composite gadget，因此只能支持加载单一的gadget 功能驱动，无法同时多个功能。</p><h4 id="adb-功能" tabindex="-1"><a class="header-anchor" href="#adb-功能" aria-hidden="true">#</a> ADB 功能</h4><p>adb 的全称为Android Debug Bridge，就是起到调试桥的作用。通过ADB，可以直接在PC 上通过命令行控制小机端的控制台；也可以通过ADB 进行文件传输。</p><p>menuconfig 驱动相关配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB DEVICE
                [*] DRIVERS_USB_GADGET_ADB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>menuconfig ADBD 应用相关配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; System components
    ‑&gt; aw components
        ‑&gt; USB Components Support
            ‑&gt; USB Gadget Support
                [*] adbd service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在RTOS 的USB 框架中，一旦加载了adb gadget，就会自动启用adbd 服务，直接连上PC 就可以使用了。</p><p>adb 正常启动的相关log：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[usb0] insmod device driver!
adbd version:AW‑V1.1.6, compiled on: Apr 11 2023 10:33:24
adbd service init successful
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PC 运行效果图如下图所示：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part5/chapter2/image1.png" alt="image1"></p><h4 id="uac-功能" tabindex="-1"><a class="header-anchor" href="#uac-功能" aria-hidden="true">#</a> UAC 功能</h4><p>UAC 全称为USB Audio Class，USB 音频类。</p><p>通过UAC，可以实现实时获取音频设备的音频数据，并且通过UAC 实现操控设备音量，采样率，等参数。UAC 实现对外接音频操作，从用户功能来说，主要包括USB 麦克风、USB 声卡和其它音频设备的功能控制和接口标准。</p><p>menuconfig 驱动相关配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB DEVICE
                [*] DRIVERS_USB_GADGET_UAC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>menuconfig UACD 应用相关配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; System components
    ‑&gt; aw components
        ‑&gt; USB Components Support
            ‑&gt; USB Gadget Support
                [*] uacd service

‑&gt; System components
    ‑&gt; aw components
        ‑&gt; USB Components Support
            ‑&gt; USB Gadget Support
                ‑&gt; uacd audio function
                    [*] AudioSystem local audio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>uacd 正常启动的相关log：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[usb0] insmod device driver!
uacd version:AW‑V0.5, compiled on: Apr 27 2023 10:44:02
[UACD‑INFO][u_audio_init] line:167 stream=1, rate=48000, ch=2, bits=16, audio_buf_size=192
[UACD‑INFO][u_audio_init] line:167 stream=0, rate=16000, ch=2, bits=16, audio_buf_size=64
[UACD‑INFO][u_audio_stop_capture] line:320
[UACD‑INFO][u_audio_stop_playback] line:457
[UACD‑INFO][u_audio_stop_capture] line:320
[UACD‑INFO][u_audio_stop_playback] line:457
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动成功之后，能够在PC 端看到新增了一个音频输入和输出的设备，如下图：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part5/chapter2/image2.png" alt="image2"></p><h3 id="usb-host-功能配置" tabindex="-1"><a class="header-anchor" href="#usb-host-功能配置" aria-hidden="true">#</a> USB Host 功能配置</h3><p>接入OTG 线后，成功切换成 USB Host 的log 可参考如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ehci‑usb0] insmod host driver!
calibration finish, val:0x19, usbc_no:0
ehci insmod status = 1
[usbh core]: add gen_dev SW USB2.0 &#39;Enhanced&#39; Host Controller (EHCI) Driver
[D(rv.)] devops: register dev(sunxi_timer) ok
USB 0.0 started, EHCI 1.00
[usbh core]: adding sub dev (config #1, interface 0)
usb match id suceessfull
[hub]: usb hub probe
[hub]: 1 port detected
[usbh hub]: local power source is good
[E(rv.)] pm device sunxi_ehci0(00000000082AE1D0) has already registered
[ohci‑usb0] insmod host driver!
calibration finish, val:0x19, usbc_no:0
[usbh core]: add gen_dev SW USB2.0 &#39;Open&#39; Host Controller (OHCI) Driver
[usbh core]: adding sub dev (config #1, interface 0)
usb match id suceessfull
[hub]: usb hub probe
[hub]: 1 port detected
[usbh hub]: local power source is good
[D(rv.)] devops: register dev(sunxi_ohci0) ok
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="u-盘功能" tabindex="-1"><a class="header-anchor" href="#u-盘功能" aria-hidden="true">#</a> U 盘功能</h4><p>选上以下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Mass Storage
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB HOST
                [*] Mass Storage support
                [*] USB CD support	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待U 盘挂载成功，可以发现根目录下多了一个usb_msc 的文件夹，这个即是U 盘挂载的文件夹。可以通过该文件夹与U 盘进行读取/传输文件。</p><ul><li>目前R128 只支持fat32 文件系统的U 盘，其他文件系统U 盘会挂载失败。</li><li>只支持挂载单分区的U 盘，如果U 盘被分解成了多个分区的话，只能挂载上第一个分区。</li></ul><p>接入U 盘后，系统开始识别U 盘。成功识别到U 盘的log 信息如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ehci_irq: highspeed device connect
port debounce 0...
port debounce 0...
port debounce 25...
port debounce 50...
port debounce 75...
hub_port_init: udev address = 0
[hub_port_init]: new high speed USB device address 0
usb hub set new address(2)
[usbh core]: adding sub dev (config #1, interface 0)
usb match id suceessfull
mscDevProbe begin
[msc]: GetMaxLUN successful, max lun is 0
begin mscLunAdd
disk, send last lun msg.........
mscLun‑&gt;LunNo=0
mscLun‑&gt;mscDev‑&gt;MaxLun=1
BlkDev‑&gt;last_lun=1
Wrn: short transfer, urb_state(0), want_len(192), real_len(70)
Wrn: short transfer, urb_state(0), want_len(192), real_len(24)
‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑Disk Information‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑
WriteProtect = 0
MediaPresent = 1
WCE = 0
RCD = 0
capacity = 29532M, sector number = 60481536
sector_size = 512
DevNo = 0
ClassName =
DevName = SCSI_DISK_000
‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑
hub_port = 1
cnt = 0
Classname = DISK
DevName = SCSI_DISK_000
DeviceName = SCSI_DISK_000
Vender = TOSHIBA USB FLASH DRIVE PMAP
Product = USB FLASH DRIVE PMAP
Serial = PMAP
HubPortNo = 1
DeviceType = 2
DiskRead: block(0, 1) is adjacence max capacity(39ae000), can&#39;t use special write
mount usb mass storage successull!!
..............................................................................
[USB Disk]: Register new device, class = [DISK], dev = [SCSI_DISK_000]
..............................................................................
end mscLunAdd
mscDevScanThread end...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过ls 查看usb_msc，可以看到U 盘里的文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>c906&gt;ls
dev data usb_msc

c906&gt;ls usb_msc
System Volume Information 3.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="usb-摄像头" tabindex="-1"><a class="header-anchor" href="#usb-摄像头" aria-hidden="true">#</a> USB 摄像头</h3><p>选上以下配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>UVC
‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; USB Drivers
            ‑&gt; USB HOST
                [*] USB_CAMERA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接上USB 摄像头后，成功识别出摄像头后会出现以下log:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ehci_irq: highspeed device connect
port debounce 0...
port debounce 0...
port debounce 25...
port debounce 50...
port debounce 75...
hub_port_init: udev address = 0
[hub_port_init]: new high speed USB device address 0
usb hub set new address(3)
[hub] :skipped 1 descriptor after configuration
skipped 6 descriptors after interface
skipped 1 descriptor after endpoint
skipped 26 descriptors after interface
num_ep:0
skipped 1 descriptor after endpoint
skipped 4 descriptors after interface
num_ep:0
num_ep:0
skipped 2 descriptors after interface
skipped 1 descriptor after endpoint
[usbh core]: adding sub dev (config #1, interface 0)
usb match id suceessfull
UVCDevProbe begin
Probing generic UVC device
device quirks 0x0
Found format MJPEG.
‑ 1920x1080 (30.0 fps)
‑ 1280x720 (30.0 fps)
‑ 640x480 (30.0 fps)
‑ 640x360 (30.0 fps)
‑ 352x288 (30.0 fps)
‑ 320x240 (30.0 fps)
‑ 320x180 (30.0 fps)
‑ 176x144 (30.0 fps)
‑ 160x120 (30.0 fps)
‑ 1920x1080(30.0 fps)
Found format YUV 4:2:2 (YUYV).
‑ 1920x1080 (5.0 fps)
‑ 1280x720 (10.0 fps)
‑ 640x480 (30.0 fps)
‑ 640x360 (30.0 fps)
‑ 352x288 (30.0 fps)
‑ 320x240 (30.0 fps)
‑ 320x180 (30.0 fps)
‑ 176x144 (30.0 fps)
‑ 160x120 (30.0 fps)
‑ 1920x1080 (5.0 fps)
Found UVC 1.00 device USB 2.0 Camera (0c45:6366)
num_altsetting=7
UVC device initialized.
DRV_WEBCAM_MInit
webcam plug in message...
[usbh core]: adding sub dev (config #1, interface 1)
[usbh core]: adding sub dev (config #1, interface 2)
[usbh core]: adding sub dev (config #1, interface 3)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过log 信息能够看到，在识别出USB 摄像头后，会打印出该摄像头支持的格式以及分辨率。</p><p>接着通过uvc 测试命令，对UVC 功能进行测试：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>usb uvc_test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试命令调用完成之后，会在/data 目录下生成5 张名为/data/source_frame_x.jpg 的图片。通过adb pull 将图片拉到PC 端，然后在PC 端打开图片即可看到USB 摄像头拍下的照片。</p><h2 id="usb-调试方法" tabindex="-1"><a class="header-anchor" href="#usb-调试方法" aria-hidden="true">#</a> USB 调试方法</h2><h3 id="usb-otg-功能调试" tabindex="-1"><a class="header-anchor" href="#usb-otg-功能调试" aria-hidden="true">#</a> USB OTG 功能调试</h3><p>除了OTG 的自动切换功能，还可以进行手动的切换，需要使用到USB 命令。</p><p>USB Device/Host 的手动切换方法：</p><p>输入usb ‑h 能够看见usb 的全部命令。</p><ul><li>USB Device 的相关命令</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>usb udc {‑i|‑r} [&lt;port&gt;]
‑i：指的是指定需要进行切换的USB口。目前R128芯片只有USB0是支持Device模式的。
‑r：指的是remove，注销当前的Device模式。

比如说将USB0切换成Device模式，则运行：
usb udc ‑i 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>USB Host 的相关命令</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>usb hci {‑i|‑r} [&lt;port&gt;]
‑i：指的是指定需要进行切换的USB口。
‑r：指的是remove，注销当前的Host模式。

比如说将USB0切换成Host模式，则运行：
usb hci ‑i 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usb-相关工具" tabindex="-1"><a class="header-anchor" href="#usb-相关工具" aria-hidden="true">#</a> USB 相关工具</h2><h3 id="adb" tabindex="-1"><a class="header-anchor" href="#adb" aria-hidden="true">#</a> ADB</h3><p>ADB 功能是从Android 移植过来的，设备端会运行adbd 服务，而Host 端(一般为PC) 通过adb工具进行调试，如adb shell, adb push/pull 等。</p><h3 id="adb-功能说明" tabindex="-1"><a class="header-anchor" href="#adb-功能说明" aria-hidden="true">#</a> ADB 功能说明</h3><h4 id="adb-shell-功能" tabindex="-1"><a class="header-anchor" href="#adb-shell-功能" aria-hidden="true">#</a> adb shell 功能</h4><p>PC端执行adb shell,可进入控制台。</p><p>PC端执行adb shell + command, 例如adb shell ls /可以直接将结果输出到终端。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part5/chapter2/image3.png" alt="image3"></p><h4 id="adb-push-pull-功能" tabindex="-1"><a class="header-anchor" href="#adb-push-pull-功能" aria-hidden="true">#</a> adb push/pull 功能</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>推送文件到小机端：
adb push test.bin /data

从小机端拉取文件：
adb pull /data/test.bin .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part5/chapter2/image4.png" alt="image4"></p><h4 id="adb-网络连接" tabindex="-1"><a class="header-anchor" href="#adb-网络连接" aria-hidden="true">#</a> adb 网络连接</h4><p>如果需要用此功能，需要额外进行menuconfig 的配置，配置方法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; System components
    ‑&gt; aw components
        ‑&gt; USB Components Support
            ‑&gt; USB Gadget Support
                [*] adb local transport
                (5555) adb local transport port
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>adb local transport port 是用于配置端口号的，用于在adb 网络连接时匹配端口的，默认为5555。</p><blockquote><p>在进行网络adb 连接之前，需要保证PC 和小机端在同一个局域网中，并且可以ping 通。</p></blockquote><p>小机端运行ifconfig，查看当前小机端的IP，假设IP为192.168.1.101。</p><p>则PC端执行adb connect 192.168.1.101建立连接，然后就可以开始执行adb shell等命令了。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part5/chapter2/image5.png" alt="image5"></p>`,113),l=[a];function r(t,v){return i(),n("div",null,l)}const u=e(s,[["render",r],["__file","chapter2.html.vue"]]);export{u as default};
