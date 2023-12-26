import{_ as n,o as s,c as a,e}from"./app-e85d5a28.js";const p={},t=e(`<h1 id="usb" tabindex="-1"><a class="header-anchor" href="#usb" aria-hidden="true">#</a> USB</h1><p>USB 驱动主要实现设备驱动的底层细节，并为上层提供一套标准的 API 接口以供使用。USB模块主要特性如下：</p><ul><li>Complies with USB 2.0 Specification</li><li>Supports High-Speed (HS, 480-Mbps), Full-Speed (FS, 12-Mbps), and Low-Speed (LS, 1.5-Mbps) in Host mode</li><li>Supports High-Speed (HS, 480 Mbps), Full-Speed (FS, 12 Mbps) in Device mode</li><li>Supports the UTMI+ Level 3 interface. The 8-bit bidirectional data buses are used</li><li>Supports bi-directional endpoint0 for Control transfer</li><li>Supports up to 8 User-Configurable Endpoints for Bulk, Isochronous and Interrupt bi-directional transfers (Endpoint1, Endpoint2, Endpoint3, Endpoint4)</li><li>Supports up to (4KB+64Bytes) FIFO for EPs (Including EP0)</li><li>Supports High-Bandwidth Isochronous &amp; Interrupt transfers</li><li>Automated splitting/combining of packets for Bulk transfers</li><li>Supports point-to-point and point-to-multipoint transfer in both Host and Peripheral mode</li><li>Includes automatic ping capabilities</li><li>Soft connect/disconnect function</li><li>Performs all transaction scheduling in hardware</li><li>Power Optimization and Power Management capabilities</li><li>Includes interface to an external Normal DMA controller for every Eps</li></ul><h2 id="模块配置" tabindex="-1"><a class="header-anchor" href="#模块配置" aria-hidden="true">#</a> 模块配置</h2><blockquote><p>R128 仅有一个 USB，HAL 驱动支持两个及以上 USB 外设，故部分配置为空。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Kernel Setup ---&gt;
    Drivers Setup ---&gt;
        SoC HAL Drivers ---&gt;
            USB devices ---&gt;
                [*] enable USB driver
                [*] USB HOST  ---&gt;
                    [*]   Support usb host ehci0 # USB0 配置
                    [*]   Support usb host ohci0
                    [ ]   Support usb host ehci1 # USB1 配置
                    [ ]   Support usb host ohci1 
                    [*]     Mass Storage support
                    [*]       USB CD support
                    [ ]     Carplay host support
                    [ ]     UVC support
                    [ ]     HID support
                [*] USB DEVICE  ---&gt;
                    [ ]   enable dma for udc driver
                    [*]   Support usb gadget driver
                        usb gadget driver (adb gadget driver)  ---&gt;
                            (X) adb gadget driver
                            ( ) mtp gadget driver
                            ( ) uac gadget driver
                            ( ) ncm gadget driver
                            ( ) msc gadget driver
                [*] USB MANAGER
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码结构" tabindex="-1"><a class="header-anchor" href="#源码结构" aria-hidden="true">#</a> 源码结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── Kconfig
├── Makefile
├── common               # 公共操作
│   ├── Makefile
│   ├── list_head_ext.c
│   ├── list_head_ext.h
│   ├── usb_init.c
│   ├── usb_init.h
│   ├── usb_phy.c
│   └── usb_phy.h
├── core                 # USB 核心驱动
│   ├── Makefile
│   ├── urb.c
│   ├── urb.h
│   ├── usb_core_base.c
│   ├── usb_core_base.h
│   ├── usb_core_config.c
│   ├── usb_core_config.h
│   ├── usb_core_init.c
│   ├── usb_core_init.h
│   ├── usb_core_interface.c
│   ├── usb_core_interface.h
│   ├── usb_driver_init.c
│   ├── usb_driver_init.h
│   ├── usb_gen_hcd.c
│   ├── usb_gen_hcd.h
│   ├── usb_gen_hcd_rh.c
│   ├── usb_gen_hcd_rh.h
│   ├── usb_gen_hub.c
│   ├── usb_gen_hub.h
│   ├── usb_gen_hub_base.c
│   ├── usb_gen_hub_base.h
│   ├── usb_msg.c
│   ├── usb_msg.h
│   ├── usb_msg_base.c
│   ├── usb_msg_base.h
│   ├── usb_virt_bus.c
│   └── usb_virt_bus.h
├── gadget             # gadget 相关实现
│   ├── Makefile
│   ├── function
│   │   ├── adb.c
│   │   ├── msc
│   │   │   ├── msc.c
│   │   │   ├── scsi.c
│   │   │   ├── scsi.h
│   │   │   ├── usb_slave_msc.c
│   │   │   └── usb_slave_msc.h
│   │   ├── mtp.c
│   │   └── uac.c
│   ├── gadget.c
│   ├── gadget.h
│   └── gadget_hal.c
├── hid                # hid 相关实现
│   ├── Class   
│   │   ├── Hid.c
│   │   ├── HidProtocol.c
│   │   ├── HidProtocol.h
│   │   ├── HidTransport.c
│   │   ├── HidTransport.h
│   │   └── Makefile
│   ├── Client        
│   │   ├── KeyBoard
│   │   │   ├── KeyBoard.c
│   │   │   ├── KeyBoard.h
│   │   │   └── Makefile
│   │   ├── Makefile
│   │   ├── Mouse
│   │   │   ├── Makefile
│   │   │   ├── UsbMouse.c
│   │   │   ├── UsbMouse.h
│   │   │   ├── UsbMouse_DriftControl.c
│   │   │   └── UsbMouse_DriftControl.h
│   │   └── misc_lib.c
│   ├── Include
│   │   ├── Hid.h
│   │   ├── HidFunDrv.h
│   │   ├── HidSpec.h
│   │   ├── Hid_i.h
│   │   └── misc_lib.h
│   └── Makefile
├── host               # Host 驱动
│   ├── Makefile
│   ├── ehci-hcd.c
│   ├── ehci-hub.c
│   ├── ehci-mem.c
│   ├── ehci-q.c
│   ├── ehci-sched.c
│   ├── ehci-sunxi.c
│   ├── ehci-timer.c
│   ├── ehci.h
│   ├── hci_hal.c
│   ├── ohci-hcd.c
│   ├── ohci-hub.c
│   ├── ohci-mem.c
│   ├── ohci-q.c
│   ├── ohci-sunxi.c
│   ├── ohci.h
│   ├── sunxi-hci.c
│   └── sunxi-hci.h
├── include
│   ├── audio.h
│   ├── bitops.h
│   ├── ch11.h
│   ├── ch9.h
│   ├── ehci_def.h
│   ├── endian.h
│   ├── error.h
│   ├── hcd.h
│   ├── mod_devicetable.h
│   ├── mod_usbhost.h
│   ├── storage.h
│   ├── usb.h
│   ├── usb_list.h
│   ├── usb_melis.h
│   ├── usb_os_platform.h
│   └── usb_rtos.h
├── manager           # usb 管理类
│   ├── Makefile
│   ├── sunxi_usb_board.h
│   ├── usb_hw_scan.c
│   ├── usb_hw_scan.h
│   ├── usb_manager.c
│   ├── usb_manager_common.h
│   ├── usb_msg_center.c
│   └── usb_msg_center.h
├── platform          # 芯片平台寄存器定义
│   ├── sun20iw2
│   │   ├── Makefile
│   │   ├── usb_sun20iw2.c
│   │   └── usb_sun20iw2.h
.   .   .
.   .   .
.   .   .
├── storage           # 存储器相关实现
│   ├── Class
│   │   ├── Makefile
│   │   ├── mscProtocol.c
│   │   ├── mscProtocol.h
│   │   ├── mscTransport.c
│   │   ├── mscTransport.h
│   │   ├── mscTransport_i.c
│   │   ├── msc_common.h
│   │   └── usb_msc.c
│   ├── Disk
│   │   ├── BlkDev.c
│   │   ├── BlkDev.h
│   │   ├── CD.c
│   │   ├── CD.h
│   │   ├── Disk.c
│   │   ├── LunMgr.c
│   │   ├── LunMgr_i.h
│   │   ├── Makefile
│   │   └── Scsi2.c
│   ├── Kconfig
│   ├── Makefile
│   ├── Misc
│   │   ├── Makefile
│   │   ├── usbh_buff_manager.c
│   │   ├── usbh_disk_info.c
│   │   └── usbh_disk_remove_time.c
│   └── include
│       ├── LunMgr.h
│       ├── Scsi2.h
│       ├── usb_msc.h
│       ├── usb_msc_i.h
│       ├── usbh_buff_manager.h
│       ├── usbh_disk_info.h
│       └── usbh_disk_remove_time.h
├── udc               # UDC 实现
│   ├── Makefile
│   ├── udc.c
│   ├── udc.h
│   ├── udc_hal.c
│   ├── udc_platform.h
│   ├── usb_dma.c
│   └── usb_dma.h
└── uvc                # UVC 实现
    ├── Class
    │   ├── Makefile
    │   ├── uvc.c
    │   ├── uvc_driver.c
    │   ├── uvc_driver.h
    │   ├── uvc_v4l2.c
    │   ├── uvc_video.c
    │   └── uvc_video.h
    ├── Include
    │   ├── UVC.h
    │   ├── assessibility.h
    │   ├── uvcvideo.h
    │   ├── video.h
    │   └── videodev2.h
    ├── Makefile
    ├── Misc
    │   ├── Makefile
    │   └── assessibility.c
    ├── Webcam
    │   ├── Makefile
    │   ├── usbWebcam.c
    │   ├── usbWebcam.h
    │   ├── usbWebcam_proc.c
    │   └── usbWebcam_proc.h
    └── drv_webcam
        ├── Makefile
        ├── dev_cfg
        │   ├── webcam_dev.c
        │   └── webcam_dev_i.h
        ├── drv_webcam.c
        ├── drv_webcam.h
        ├── drv_webcam_i.h
        ├── fb.h
        └── webcam_core
            ├── dev_webcam.c
            ├── dev_webcam_i.h
            ├── webcam_linklist_manager.c
            └── webcam_linklist_manager.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块接口说明" tabindex="-1"><a class="header-anchor" href="#模块接口说明" aria-hidden="true">#</a> 模块接口说明</h2><p>头文件</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sunxi_hal_usb.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;usb_os_platform.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="udc-回调事件结构体" tabindex="-1"><a class="header-anchor" href="#udc-回调事件结构体" aria-hidden="true">#</a> UDC 回调事件结构体</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">enum</span> <span class="token punctuation">{</span>
    UDC_EVENT_RX_STANDARD_REQUEST <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
    UDC_EVENT_RX_CLASS_REQUEST <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
    UDC_EVENT_RX_DATA <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>
    UDC_EVENT_TX_COMPLETE <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token class-name">udc_callback_event_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>### UDC 错误返回枚举</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">enum</span> <span class="token punctuation">{</span>
    UDC_ERRNO_SUCCESS <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    UDC_ERRNO_CMD_NOT_SUPPORTED <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
    UDC_ERRNO_CMD_INVALID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span>
    UDC_ERRNO_BUF_NULL <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span>
    UDC_ERRNO_BUF_FULL <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">,</span>
    UDC_ERRNO_EP_INVALID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span>
    UDC_ERRNO_RX_NOT_READY <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">,</span>
    UDC_ERRNO_TX_BUSY <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">7</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token class-name">udc_errno_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="usb-驱动初始化" tabindex="-1"><a class="header-anchor" href="#usb-驱动初始化" aria-hidden="true">#</a> USB 驱动初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">sunxi_usb_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-host-初始化" tabindex="-1"><a class="header-anchor" href="#usb-host-初始化" aria-hidden="true">#</a> USB HOST 初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_core_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-host-去初始化" tabindex="-1"><a class="header-anchor" href="#usb-host-去初始化" aria-hidden="true">#</a> USB HOST 去初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_core_exit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-host-加载所有主机驱动-除了0" tabindex="-1"><a class="header-anchor" href="#usb-host-加载所有主机驱动-除了0" aria-hidden="true">#</a> USB HOST 加载所有主机驱动（除了0）</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_hci_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-host-去加载所有主机驱动-除了0" tabindex="-1"><a class="header-anchor" href="#usb-host-去加载所有主机驱动-除了0" aria-hidden="true">#</a> USB HOST 去加载所有主机驱动（除了0）</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_hci_deinit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-host-加载指定主机驱动" tabindex="-1"><a class="header-anchor" href="#usb-host-加载指定主机驱动" aria-hidden="true">#</a> USB HOST 加载指定主机驱动</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_hcd_init</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-host-去加载指定主机驱动" tabindex="-1"><a class="header-anchor" href="#usb-host-去加载指定主机驱动" aria-hidden="true">#</a> USB HOST 去加载指定主机驱动</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_hcd_deinit</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-host-phy-区域显示" tabindex="-1"><a class="header-anchor" href="#usb-host-phy-区域显示" aria-hidden="true">#</a> USB HOST PHY 区域显示</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_hci_phy_range_show</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-host-phy-配置区域" tabindex="-1"><a class="header-anchor" href="#usb-host-phy-配置区域" aria-hidden="true">#</a> USB HOST PHY 配置区域</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_hci_phy_range_set</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li><li>val：配置的值</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-host-显示驱动能力" tabindex="-1"><a class="header-anchor" href="#usb-host-显示驱动能力" aria-hidden="true">#</a> USB HOST 显示驱动能力</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_hci_driverlevel_show</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-host-配置驱动能力" tabindex="-1"><a class="header-anchor" href="#usb-host-配置驱动能力" aria-hidden="true">#</a> USB HOST 配置驱动能力</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_hci_driverlevel_adjust</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">,</span> <span class="token keyword">int</span> driverlevel<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li><li>driverlevel：配置的驱动能力</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-host-眼图测试" tabindex="-1"><a class="header-anchor" href="#usb-host-眼图测试" aria-hidden="true">#</a> USB HOST 眼图测试</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_hci_ed_test</span><span class="token punctuation">(</span><span class="token keyword">int</span> hci_num<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>hci_num：指定主机驱动</li><li>buf：传输的数据</li><li>count：数据长度</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-初始化" tabindex="-1"><a class="header-anchor" href="#usb-udc-初始化" aria-hidden="true">#</a> USB UDC 初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">int32_t</span> <span class="token function">hal_udc_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-udc-去初始化" tabindex="-1"><a class="header-anchor" href="#usb-udc-去初始化" aria-hidden="true">#</a> USB UDC 去初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">int32_t</span> <span class="token function">hal_udc_deinit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-udc-ep-读操作" tabindex="-1"><a class="header-anchor" href="#usb-udc-ep-读操作" aria-hidden="true">#</a> USB UDC EP 读操作</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">int32_t</span> <span class="token function">hal_udc_ep_read</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> ep_addr<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_addr：ep地址</li><li>buf：读取的数据指针</li><li>len：读取长度</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-udc-ep-写操作" tabindex="-1"><a class="header-anchor" href="#usb-udc-ep-写操作" aria-hidden="true">#</a> USB UDC EP 写操作</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">int32_t</span> <span class="token function">hal_udc_ep_write</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> ep_addr<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf <span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_addr：ep地址</li><li>buf：读取的数据指针</li><li>len：读取长度</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-udc-初始化设备描述符" tabindex="-1"><a class="header-anchor" href="#usb-udc-初始化设备描述符" aria-hidden="true">#</a> USB UDC 初始化设备描述符</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_device_desc_init</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>device_desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>device_desc：设备描述符数据</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-配置描述符初始化" tabindex="-1"><a class="header-anchor" href="#usb-udc-配置描述符初始化" aria-hidden="true">#</a> USB UDC 配置描述符初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_config_desc_init</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>config_desc<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>config_desc：配置描述符指针</li><li>len：长度</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-字符串描述符初始化" tabindex="-1"><a class="header-anchor" href="#usb-udc-字符串描述符初始化" aria-hidden="true">#</a> USB UDC 字符串描述符初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_string_desc_init</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>string_desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>string_desc：配置字符串描述符的指针</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-注册回调函数" tabindex="-1"><a class="header-anchor" href="#usb-udc-注册回调函数" aria-hidden="true">#</a> USB UDC 注册回调函数</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_register_callback</span><span class="token punctuation">(</span><span class="token class-name">udc_callback_t</span> user_callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>user_callback：回调函数</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-禁用-ep" tabindex="-1"><a class="header-anchor" href="#usb-udc-禁用-ep" aria-hidden="true">#</a> USB UDC 禁用 EP</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_ep_disable</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> ep_addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_addr：地址</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-启用-ep" tabindex="-1"><a class="header-anchor" href="#usb-udc-启用-ep" aria-hidden="true">#</a> USB UDC 启用 EP</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_ep_enable</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> ep_addr<span class="token punctuation">,</span> <span class="token class-name">uint16_t</span> maxpacket<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> ts_type<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_addr：地址</li><li>maxpacket：最大包大小</li><li>ts_type：模式</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-设置-ep-发送-接收-buffer" tabindex="-1"><a class="header-anchor" href="#usb-udc-设置-ep-发送-接收-buffer" aria-hidden="true">#</a> USB UDC 设置 EP 发送/接收 buffer</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_ep_set_buf</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> ep_addr<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_addr：地址</li><li>buf：buf的指针</li><li>len：buf的长度</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-显示驱动能力" tabindex="-1"><a class="header-anchor" href="#usb-udc-显示驱动能力" aria-hidden="true">#</a> USB UDC 显示驱动能力</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_driverlevel_show</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-调整驱动能力" tabindex="-1"><a class="header-anchor" href="#usb-udc-调整驱动能力" aria-hidden="true">#</a> USB UDC 调整驱动能力</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_driverlevel_adjust</span><span class="token punctuation">(</span><span class="token keyword">int</span> driverlevel<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>driverlevel：驱动能力</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-显示范围" tabindex="-1"><a class="header-anchor" href="#usb-udc-显示范围" aria-hidden="true">#</a> USB UDC 显示范围</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_phy_range_show</span><span class="token punctuation">(</span><span class="token keyword">int</span> usbc_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>usbc_num：usb控制器号</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-配置范围" tabindex="-1"><a class="header-anchor" href="#usb-udc-配置范围" aria-hidden="true">#</a> USB UDC 配置范围</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_phy_range_set</span><span class="token punctuation">(</span><span class="token keyword">int</span> usbc_num<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>usbc_num：usb控制器号</li><li>val：值</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-udc-眼图测试" tabindex="-1"><a class="header-anchor" href="#usb-udc-眼图测试" aria-hidden="true">#</a> USB UDC 眼图测试</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_udc_ed_test</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>buf：测试使用的buf</li><li>count：数量</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-manager-初始化" tabindex="-1"><a class="header-anchor" href="#usb-manager-初始化" aria-hidden="true">#</a> USB Manager 初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_manager_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-manager-去初始化" tabindex="-1"><a class="header-anchor" href="#usb-manager-去初始化" aria-hidden="true">#</a> USB Manager 去初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_usb_manager_deinit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-初始化" tabindex="-1"><a class="header-anchor" href="#usb-gadget-初始化" aria-hidden="true">#</a> USB Gadget 初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">hal_gadget_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-去初始化" tabindex="-1"><a class="header-anchor" href="#usb-gadget-去初始化" aria-hidden="true">#</a> USB Gadget 去初始化</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_gadget_exit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="usb-gadget-启用功能" tabindex="-1"><a class="header-anchor" href="#usb-gadget-启用功能" aria-hidden="true">#</a> USB Gadget 启用功能</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">usb_gadget_function_enable</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>name：功能名</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-禁用功能" tabindex="-1"><a class="header-anchor" href="#usb-gadget-禁用功能" aria-hidden="true">#</a> USB Gadget 禁用功能</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">usb_gadget_function_disable</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>name：功能名</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-读取" tabindex="-1"><a class="header-anchor" href="#usb-gadget-读取" aria-hidden="true">#</a> USB Gadget 读取</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">usb_gadget_function_read</span><span class="token punctuation">(</span><span class="token keyword">int</span> ep_idx<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_idx：端点号</li><li>buf：buf指针</li><li>size：buf的大小</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-限时读取" tabindex="-1"><a class="header-anchor" href="#usb-gadget-限时读取" aria-hidden="true">#</a> USB Gadget 限时读取</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">usb_gadget_function_read_timeout</span><span class="token punctuation">(</span><span class="token keyword">int</span> ep_idx<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">,</span> <span class="token keyword">int</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_idx：端点号</li><li>buf：buf指针</li><li>size：buf的大小</li><li>ms：超时时间</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-写数据" tabindex="-1"><a class="header-anchor" href="#usb-gadget-写数据" aria-hidden="true">#</a> USB Gadget 写数据</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">usb_gadget_function_write</span><span class="token punctuation">(</span><span class="token keyword">int</span> ep_idx<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>ep_idx：端点号</li><li>buf：buf指针</li><li>size：buf的大小</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="usb-gadget-写字符串" tabindex="-1"><a class="header-anchor" href="#usb-gadget-写字符串" aria-hidden="true">#</a> USB Gadget 写字符串</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">usb_gadget_function_string_set</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>name<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>str<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> idx<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>name：名称</li><li>str：字符串指针</li><li>idx：端点号</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h2 id="模块使用范例" tabindex="-1"><a class="header-anchor" href="#模块使用范例" aria-hidden="true">#</a> 模块使用范例</h2><h3 id="测试用例公共头文件" tabindex="-1"><a class="header-anchor" href="#测试用例公共头文件" aria-hidden="true">#</a> 测试用例公共头文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>usb_test.h
#ifndef USB_TEST_H
#define USB_TEST_H

#include &lt;sunxi_hal_usb.h&gt;
#include &lt;usb_os_platform.h&gt;

#ifdef __cplusplus
extern &quot;C&quot; {
#endif

int usb_test_cmd_hci(int argc, const char **argv);
int usb_test_cmd_udc(int argc, const char **argv);
int usb_test_cmd_phy_range(int argc, const char **argv);
int usb_test_cmd_ed_test(int argc, const char **argv);
int usb_test_cmd_debug(int argc, const char **argv);
int usb_test_cmd_uvc(int argc, const char **argv);


int usb_test_is_otg(int port);
int usb_test_get_port(const char *buf, int *port);
void usb_test_show_help(void);

unsigned char usb_core_is_enabled(void);
unsigned char sunxi_ehci_status_get(void);

#ifdef __cplusplus
}
#endif

#endif // USB_TEST_H
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hci-测试实现实现" tabindex="-1"><a class="header-anchor" href="#hci-测试实现实现" aria-hidden="true">#</a> HCI 测试实现实现</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb_test.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">usb_test_cmd_hci</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> c<span class="token punctuation">;</span>
    <span class="token keyword">int</span> hci_num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// insmod/rmmod indicate host driver</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_get_port</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// insmod/rmmod all host driver</span>
        port <span class="token operator">=</span> <span class="token number">0xffff</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>c <span class="token operator">=</span> <span class="token function">getopt</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token keyword">const</span> <span class="token operator">*</span><span class="token punctuation">)</span>argv<span class="token punctuation">,</span> <span class="token string">&quot;ir&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token char">&#39;i&#39;</span><span class="token operator">:</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_UDC</span></span>
            <span class="token comment">/*otg mode rmmod device driver before insmod hci*/</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;[usb0] rmmod device driver!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">hal_gadget_exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">usb_core_is_enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token function">hal_usb_core_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>port <span class="token operator">==</span> <span class="token number">0xffff</span><span class="token punctuation">)</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>hci_num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> hci_num <span class="token operator">&lt;</span> USB_MAX_CONTROLLER_COUNT<span class="token punctuation">;</span> hci_num<span class="token operator">++</span><span class="token punctuation">)</span>
                    <span class="token function">hal_usb_hcd_init</span><span class="token punctuation">(</span>hci_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token function">hal_usb_hcd_init</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token char">&#39;r&#39;</span><span class="token operator">:</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>port <span class="token operator">==</span> <span class="token number">0xffff</span><span class="token punctuation">)</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>hci_num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> hci_num <span class="token operator">&lt;</span> USB_MAX_CONTROLLER_COUNT<span class="token punctuation">;</span> hci_num<span class="token operator">++</span><span class="token punctuation">)</span>
                    <span class="token function">hal_usb_hcd_deinit</span><span class="token punctuation">(</span>hci_num<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token function">hal_usb_hcd_deinit</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_core_is_enabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">sunxi_ehci_status_get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token function">hal_usb_core_exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: insmod/rmmod error!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">usb_test_show_help</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">usb_test_cmd_debug</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> enable <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    enable <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enable <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> enable <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">hal_usb_hcd_debug_set</span><span class="token punctuation">(</span>enable<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;USB debug %s!\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">hal_usb_hcd_debug_get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&quot;open&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;close&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msg-测试用例实现" tabindex="-1"><a class="header-anchor" href="#msg-测试用例实现" aria-hidden="true">#</a> MSG 测试用例实现</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;inttypes.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;ch9.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;storage.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb_os_platform.h&quot;</span></span>


<span class="token keyword">struct</span> <span class="token class-name">usb_msg_dev</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint8_t</span> max_lun<span class="token punctuation">;</span>
    <span class="token class-name">uint8_t</span> cbw<span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">usb_device_descriptor</span> demo_device_desc <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span>bLength <span class="token operator">=</span> USB_DT_DEVICE_SIZE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDescriptorType <span class="token operator">=</span> USB_DT_DEVICE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bcdUSB <span class="token operator">=</span> <span class="token number">0x0200</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDeviceClass <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDeviceSubClass <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDeviceProtocol <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bMaxPacketSize0 <span class="token operator">=</span> <span class="token number">64</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>idVendor <span class="token operator">=</span> <span class="token number">0x18d1</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>idProduct <span class="token operator">=</span> <span class="token number">0x0001</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bcdDevice <span class="token operator">=</span> <span class="token number">0x0001</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>iManufacturer <span class="token operator">=</span> <span class="token number">0x01</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>iProduct <span class="token operator">=</span> <span class="token number">0x02</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>iSerialNumber <span class="token operator">=</span> <span class="token number">0x03</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bNumConfigurations <span class="token operator">=</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">usb_config_descriptor</span> demo_config_desc <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span>bLength <span class="token operator">=</span> USB_DT_CONFIG_SIZE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDescriptorType <span class="token operator">=</span> USB_DT_CONFIG<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>wTotalLength <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token comment">/* FIXME */</span>
    <span class="token punctuation">.</span>bNumInterfaces <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bConfigurationValue <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>iConfiguration <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bmAttributes <span class="token operator">=</span> <span class="token number">0x80</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bMaxPower <span class="token operator">=</span> <span class="token number">0x64</span> <span class="token comment">/* 200mA */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">usb_interface_descriptor</span> demo_intf_desc <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span>bLength <span class="token operator">=</span> USB_DT_INTERFACE_SIZE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDescriptorType <span class="token operator">=</span> USB_DT_INTERFACE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bInterfaceNumber <span class="token operator">=</span> <span class="token number">0x0</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bAlternateSetting <span class="token operator">=</span> <span class="token number">0x0</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bNumEndpoints <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bInterfaceClass <span class="token operator">=</span> <span class="token number">0x08</span><span class="token punctuation">,</span> <span class="token comment">/* Mass Storage class */</span>
    <span class="token punctuation">.</span>bInterfaceSubClass <span class="token operator">=</span> <span class="token number">0x06</span><span class="token punctuation">,</span> <span class="token comment">/* SCSI Transparent Subclass */</span>
    <span class="token punctuation">.</span>bInterfaceProtocol <span class="token operator">=</span> <span class="token number">0x50</span><span class="token punctuation">,</span> <span class="token comment">/* Bulk-Only Protocol */</span>
    <span class="token punctuation">.</span>iInterface <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">usb_endpoint_descriptor</span> demo_ep_bulk_out <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span>bLength <span class="token operator">=</span> USB_DT_ENDPOINT_SIZE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDescriptorType <span class="token operator">=</span> USB_DT_ENDPOINT<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bEndpointAddress <span class="token operator">=</span> <span class="token number">0x1</span> <span class="token operator">|</span> USB_DIR_OUT<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bmAttributes <span class="token operator">=</span> USB_ENDPOINT_XFER_BULK<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>wMaxPacketSize <span class="token operator">=</span> <span class="token number">0x0200</span><span class="token punctuation">,</span> <span class="token comment">/* 512 Bytes */</span>
    <span class="token punctuation">.</span>bInterval <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">usb_endpoint_descriptor</span> demo_ep_bulk_in <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span>bLength <span class="token operator">=</span> USB_DT_ENDPOINT_SIZE<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bDescriptorType <span class="token operator">=</span> USB_DT_ENDPOINT<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bEndpointAddress <span class="token operator">=</span> <span class="token number">0x1</span> <span class="token operator">|</span> USB_DIR_IN<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>bmAttributes <span class="token operator">=</span> USB_ENDPOINT_XFER_BULK<span class="token punctuation">,</span>
    <span class="token punctuation">.</span>wMaxPacketSize <span class="token operator">=</span> <span class="token number">0x0200</span><span class="token punctuation">,</span> <span class="token comment">/* 512 Bytes */</span>
    <span class="token punctuation">.</span>bInterval <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/*
 * String descriptors
 */</span>
<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint16_t</span> g_str_lang_id<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0x0304</span><span class="token punctuation">,</span> <span class="token number">0x0409</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint16_t</span> g_str_manufacturer<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0x030e</span><span class="token punctuation">,</span> <span class="token char">&#39;G&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;o&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;o&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;l&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint16_t</span> g_str_product<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0x0308</span><span class="token punctuation">,</span> <span class="token char">&#39;M&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;s&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint16_t</span> g_str_serialnumber<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token number">0x0314</span><span class="token punctuation">,</span> <span class="token char">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;8&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;4&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;1&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">usb_msg_dev</span> g_msg_dev <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span>max_lun <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token operator">*</span>g_config_desc <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">usb_msg_desc_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> config_desc_len<span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">;</span>

    config_desc_len <span class="token operator">=</span> demo_config_desc<span class="token punctuation">.</span>bLength <span class="token operator">+</span> demo_intf_desc<span class="token punctuation">.</span>bLength
            <span class="token operator">+</span> demo_ep_bulk_out<span class="token punctuation">.</span>bLength <span class="token operator">+</span> demo_ep_bulk_in<span class="token punctuation">.</span>bLength<span class="token punctuation">;</span>

    g_config_desc <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span>config_desc_len<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* compose configuation, interface and endpoint descriptors */</span>
    buf <span class="token operator">=</span> g_config_desc<span class="token punctuation">;</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>demo_config_desc<span class="token punctuation">,</span> demo_config_desc<span class="token punctuation">.</span>bLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    buf <span class="token operator">+=</span> demo_config_desc<span class="token punctuation">.</span>bLength<span class="token punctuation">;</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>demo_intf_desc<span class="token punctuation">,</span> demo_intf_desc<span class="token punctuation">.</span>bLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    buf <span class="token operator">+=</span> demo_intf_desc<span class="token punctuation">.</span>bLength<span class="token punctuation">;</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>demo_ep_bulk_out<span class="token punctuation">,</span> demo_ep_bulk_out<span class="token punctuation">.</span>bLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    buf <span class="token operator">+=</span> demo_ep_bulk_out<span class="token punctuation">.</span>bLength<span class="token punctuation">;</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>demo_ep_bulk_in<span class="token punctuation">,</span> demo_ep_bulk_in<span class="token punctuation">.</span>bLength<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">hal_udc_device_desc_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>demo_device_desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_udc_config_desc_init</span><span class="token punctuation">(</span>g_config_desc<span class="token punctuation">,</span> config_desc_len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* FIXME: string descriptors must be initialized in the following order now */</span>
    <span class="token function">hal_udc_string_desc_init</span><span class="token punctuation">(</span>g_str_lang_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_udc_string_desc_init</span><span class="token punctuation">(</span>g_str_manufacturer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_udc_string_desc_init</span><span class="token punctuation">(</span>g_str_product<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_udc_string_desc_init</span><span class="token punctuation">(</span>g_str_serialnumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">usb_msg_ep_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;usb demo ep init...\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* init bulk-in ep */</span>
    <span class="token function">hal_udc_ep_enable</span><span class="token punctuation">(</span>demo_ep_bulk_in<span class="token punctuation">.</span>bEndpointAddress<span class="token punctuation">,</span>
            demo_ep_bulk_in<span class="token punctuation">.</span>wMaxPacketSize<span class="token punctuation">,</span>
            demo_ep_bulk_in<span class="token punctuation">.</span>bmAttributes <span class="token operator">&amp;</span> USB_ENDPOINT_XFERTYPE_MASK<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* initialise bulk-out ep buf in order to get the first CBW */</span>
    <span class="token function">hal_udc_ep_set_buf</span><span class="token punctuation">(</span>demo_ep_bulk_out<span class="token punctuation">.</span>bEndpointAddress<span class="token punctuation">,</span>
            g_msg_dev<span class="token punctuation">.</span>cbw<span class="token punctuation">,</span>
            <span class="token keyword">sizeof</span><span class="token punctuation">(</span>g_msg_dev<span class="token punctuation">.</span>cbw<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* init bulk-out ep */</span>
    <span class="token function">hal_udc_ep_enable</span><span class="token punctuation">(</span>demo_ep_bulk_out<span class="token punctuation">.</span>bEndpointAddress<span class="token punctuation">,</span>
            demo_ep_bulk_out<span class="token punctuation">.</span>wMaxPacketSize<span class="token punctuation">,</span>
            demo_ep_bulk_out<span class="token punctuation">.</span>bmAttributes <span class="token operator">&amp;</span> USB_ENDPOINT_XFERTYPE_MASK<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">udc_errno_t</span> <span class="token function">usb_msg_class_request_handler</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">usb_ctrlrequest</span> <span class="token operator">*</span>crq<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">udc_errno_t</span> ret <span class="token operator">=</span> UDC_ERRNO_SUCCESS<span class="token punctuation">;</span>

    <span class="token keyword">switch</span><span class="token punctuation">(</span>crq<span class="token operator">-&gt;</span>bRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> US_BULK_RESET_REQUEST<span class="token operator">:</span>
        <span class="token comment">/* TODO */</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> US_BULK_GET_MAX_LUN<span class="token operator">:</span>
        <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;get MAX_LUN\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>crq<span class="token operator">-&gt;</span>bRequestType <span class="token operator">!=</span>
                <span class="token punctuation">(</span>USB_DIR_IN <span class="token operator">|</span> USB_TYPE_CLASS <span class="token operator">|</span> USB_RECIP_INTERFACE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ret <span class="token operator">=</span> UDC_ERRNO_CMD_INVALID<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/* FIXME: a fake response for demo */</span>
        <span class="token function">hal_udc_ep_write</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>g_msg_dev<span class="token punctuation">.</span>max_lun<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>g_msg_dev<span class="token punctuation">.</span>max_lun<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        ret <span class="token operator">=</span> UDC_ERRNO_CMD_INVALID<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">udc_errno_t</span> <span class="token function">usb_msg_standard_request_handler</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">usb_ctrlrequest</span> <span class="token operator">*</span>crq<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">udc_errno_t</span> ret <span class="token operator">=</span> UDC_ERRNO_SUCCESS<span class="token punctuation">;</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span>crq<span class="token operator">-&gt;</span>bRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> USB_REQ_SET_CONFIGURATION<span class="token operator">:</span>
        <span class="token comment">/* FIXME: usb msg driver should be independent of demo code */</span>
        <span class="token function">usb_msg_ep_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        ret <span class="token operator">=</span> UDC_ERRNO_CMD_INVALID<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">udc_errno_t</span> <span class="token function">usb_msg_scsi_cmd_handler</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">bulk_cb_wrap</span> <span class="token operator">*</span>cbw<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">udc_errno_t</span> ret <span class="token operator">=</span> UDC_ERRNO_SUCCESS<span class="token punctuation">;</span>
    <span class="token class-name">uint8_t</span> opcode <span class="token operator">=</span> cbw<span class="token operator">-&gt;</span>CDB<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">uint8_t</span> fake_rsp<span class="token punctuation">[</span><span class="token number">36</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x80</span><span class="token punctuation">,</span> <span class="token number">0x02</span><span class="token punctuation">,</span> <span class="token number">0x02</span><span class="token punctuation">,</span> <span class="token number">0x1F</span><span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x00</span><span class="token punctuation">,</span>
            <span class="token number">0x00</span><span class="token punctuation">,</span> <span class="token number">0x54</span><span class="token punctuation">,</span> <span class="token number">0x69</span><span class="token punctuation">,</span> <span class="token number">0x6e</span><span class="token punctuation">,</span> <span class="token number">0x61</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span>
            <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span>
            <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span>
            <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">,</span> <span class="token number">0x20</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;scsi cmd opcode: 0x%x\\n&quot;</span><span class="token punctuation">,</span> opcode<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span>opcode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0x12</span><span class="token operator">:</span> <span class="token comment">/* INQUIRY */</span>
        <span class="token comment">/* FIXME: a fake response for demo */</span>
        <span class="token function">hal_udc_ep_write</span><span class="token punctuation">(</span>demo_ep_bulk_in<span class="token punctuation">.</span>bEndpointAddress<span class="token punctuation">,</span> fake_rsp<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>fake_rsp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
        ret <span class="token operator">=</span> UDC_ERRNO_CMD_INVALID<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">udc_errno_t</span> <span class="token function">usb_msg_callback</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> ep_addr<span class="token punctuation">,</span> <span class="token class-name">udc_callback_event_t</span> event<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>data<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> len<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">uint8_t</span> ep_idx<span class="token punctuation">;</span>
    <span class="token class-name">uint8_t</span> is_in<span class="token punctuation">;</span>
    <span class="token class-name">udc_errno_t</span> ret <span class="token operator">=</span> UDC_ERRNO_SUCCESS<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">usb_ctrlrequest</span> <span class="token operator">*</span>crq<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">bulk_cb_wrap</span> <span class="token operator">*</span>cbw<span class="token punctuation">;</span>

    <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;usb_msg_callback event: %&quot;</span>PRIu32<span class="token string">&quot;, len: %&quot;</span>PRIu32<span class="token string">&quot;\\n&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>

    ep_idx <span class="token operator">=</span> ep_addr <span class="token operator">&amp;</span> <span class="token number">0x7f</span><span class="token punctuation">;</span>
    is_in <span class="token operator">=</span> ep_addr <span class="token operator">&amp;</span> USB_DIR_IN<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>ep_idx <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* handle ep0 */</span>
        crq <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">usb_ctrlrequest</span> <span class="token operator">*</span><span class="token punctuation">)</span>data<span class="token punctuation">;</span>

        <span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> UDC_EVENT_RX_STANDARD_REQUEST<span class="token operator">:</span>
            ret <span class="token operator">=</span> <span class="token function">usb_msg_standard_request_handler</span><span class="token punctuation">(</span>crq<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> UDC_EVENT_RX_CLASS_REQUEST<span class="token operator">:</span>
            ret <span class="token operator">=</span> <span class="token function">usb_msg_class_request_handler</span><span class="token punctuation">(</span>crq<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            ret <span class="token operator">=</span> UDC_ERRNO_CMD_NOT_SUPPORTED<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">/* handle ep1~4 */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>is_in<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">/* TODO: maybe useless? */</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            cbw <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">bulk_cb_wrap</span> <span class="token operator">*</span><span class="token punctuation">)</span>data<span class="token punctuation">;</span>

            <span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> UDC_EVENT_RX_DATA<span class="token operator">:</span>
                <span class="token function">usb_msg_scsi_cmd_handler</span><span class="token punctuation">(</span>cbw<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token operator">:</span>
                ret <span class="token operator">=</span> UDC_ERRNO_CMD_NOT_SUPPORTED<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="phy-驱动测试实现" tabindex="-1"><a class="header-anchor" href="#phy-驱动测试实现" aria-hidden="true">#</a> PHY 驱动测试实现</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb_test.h&quot;</span></span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">__usb_ed_test</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*otg mode*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_UDC</span></span>
        <span class="token function">hal_udc_ed_test</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: udc config not find!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_HCI</span></span>
        <span class="token function">hal_hci_ed_test</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: hci config not find!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">__phy_range_set</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*otg mode*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_UDC</span></span>
        <span class="token function">hal_udc_phy_range_set</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: udc config not find!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_HCI</span></span>
        <span class="token function">hal_hci_phy_range_set</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: hci config not find!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">__phy_range_show</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*otg mode*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_UDC</span></span>
        <span class="token function">hal_udc_phy_range_show</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: udc config not find!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_HCI</span></span>
        <span class="token function">hal_hci_phy_range_show</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: hci config not find!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">int</span> <span class="token function">usb_test_cmd_ed_test</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">4</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_get_port</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token function">__usb_ed_test</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">usb_test_cmd_phy_range</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> c<span class="token punctuation">;</span>
    <span class="token keyword">int</span> val<span class="token punctuation">;</span>
    <span class="token keyword">int</span> port<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_get_port</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\nOTG%d phy range\\n&quot;</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\nEHCI%d phy range\\n&quot;</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>c <span class="token operator">=</span> <span class="token function">getopt</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token keyword">const</span> <span class="token operator">*</span><span class="token punctuation">)</span>argv<span class="token punctuation">,</span> <span class="token string">&quot;sg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token char">&#39;s&#39;</span><span class="token operator">:</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">)</span>
                val <span class="token operator">=</span> <span class="token function">strtol</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

            <span class="token function">__phy_range_set</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token char">&#39;g&#39;</span><span class="token operator">:</span>
            <span class="token function">__phy_range_show</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: phy_range cmd error!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">usb_test_show_help</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="usb-udc-测试用例实现" tabindex="-1"><a class="header-anchor" href="#usb-udc-测试用例实现" aria-hidden="true">#</a> USB UDC 测试用例实现</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb_test.h&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">usb_test_cmd_udc</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> c<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>c <span class="token operator">=</span> <span class="token function">getopt</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token keyword">const</span> <span class="token operator">*</span><span class="token punctuation">)</span>argv<span class="token punctuation">,</span> <span class="token string">&quot;ir&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token char">&#39;i&#39;</span><span class="token operator">:</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_HAL_TEST_HCI</span></span>
            <span class="token comment">// rmmod host driver before insmod otg</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">/*hci mode*/</span>
                <span class="token function">hal_usb_hcd_deinit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;[usb0] insmod device driver!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">hal_gadget_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token char">&#39;r&#39;</span><span class="token operator">:</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;[usb0] rmmod device driver!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">hal_gadget_exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;err: insmod/rmmod error!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">usb_test_show_help</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="usb-uvc-测试用例实现" tabindex="-1"><a class="header-anchor" href="#usb-uvc-测试用例实现" aria-hidden="true">#</a> USB UVC 测试用例实现</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/ioctl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb_test.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;uvcvideo.h&quot;</span></span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">save_frame_to_file</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>str<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>start<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    FILE <span class="token operator">*</span>fp <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

    fp <span class="token operator">=</span> <span class="token function">fopen</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;wb+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//save more frames</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; Open %s error\\n&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">fwrite</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> length<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> fp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">fclose</span><span class="token punctuation">(</span>fp<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; Write file fail (%s)\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">strerror</span><span class="token punctuation">(</span>errno<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fclose</span><span class="token punctuation">(</span>fp<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">usb_test_cmd_uvc</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> fd<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">v4l2_capability</span> cap<span class="token punctuation">;</span>      <span class="token comment">/* Query device capabilities */</span>
    <span class="token keyword">struct</span> <span class="token class-name">v4l2_streamparm</span> parms<span class="token punctuation">;</span>    <span class="token comment">/* set streaming parameters */</span>
    <span class="token keyword">struct</span> <span class="token class-name">v4l2_format</span> fmt<span class="token punctuation">;</span>          <span class="token comment">/* try a format */</span>
    <span class="token keyword">struct</span> <span class="token class-name">v4l2_requestbuffers</span> req<span class="token punctuation">;</span>  <span class="token comment">/* Initiate Memory Mapping or User Pointer I/O */</span>
    <span class="token keyword">struct</span> <span class="token class-name">v4l2_buffer</span> buf<span class="token punctuation">;</span>          <span class="token comment">/* Query the status of a buffer */</span>
    <span class="token keyword">enum</span> <span class="token class-name">v4l2_buf_type</span> type<span class="token punctuation">;</span>
    <span class="token keyword">int</span> n_buffers<span class="token punctuation">;</span>
    <span class="token keyword">char</span> source_data_path<span class="token punctuation">[</span><span class="token number">64</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> np<span class="token punctuation">;</span>

    <span class="token comment">/* 1.open /dev/videoX node */</span>
    fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&quot;/dev/video&quot;</span><span class="token punctuation">,</span> O_RDWR<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* 2.Query device capabilities */</span>
    <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cap<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>cap<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_QUERYCAP<span class="token punctuation">,</span> <span class="token operator">&amp;</span>cap<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; Query device capabilities fail!!!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; Querey device capabilities succeed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; cap.driver=%s\\n&quot;</span><span class="token punctuation">,</span> cap<span class="token punctuation">.</span>driver<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; cap.card=%s\\n&quot;</span><span class="token punctuation">,</span> cap<span class="token punctuation">.</span>card<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; cap.bus_info=%s\\n&quot;</span><span class="token punctuation">,</span> cap<span class="token punctuation">.</span>bus_info<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; cap.version=0x%08x\\n&quot;</span><span class="token punctuation">,</span> cap<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; cap.capabilities=0x%08x\\n&quot;</span><span class="token punctuation">,</span> cap<span class="token punctuation">.</span>capabilities<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 7.set streaming parameters */</span>
    <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>parms<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">v4l2_streamparm</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    parms<span class="token punctuation">.</span>type <span class="token operator">=</span> V4L2_BUF_TYPE_VIDEO_CAPTURE<span class="token punctuation">;</span>
    parms<span class="token punctuation">.</span>parm<span class="token punctuation">.</span>capture<span class="token punctuation">.</span>timeperframe<span class="token punctuation">.</span>numerator <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    parms<span class="token punctuation">.</span>parm<span class="token punctuation">.</span>capture<span class="token punctuation">.</span>timeperframe<span class="token punctuation">.</span>denominator <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_S_PARM<span class="token punctuation">,</span> <span class="token operator">&amp;</span>parms<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; Setting streaming parameters failed, numerator:%d denominator:%d\\n&quot;</span><span class="token punctuation">,</span>
               parms<span class="token punctuation">.</span>parm<span class="token punctuation">.</span>capture<span class="token punctuation">.</span>timeperframe<span class="token punctuation">.</span>numerator<span class="token punctuation">,</span>
               parms<span class="token punctuation">.</span>parm<span class="token punctuation">.</span>capture<span class="token punctuation">.</span>timeperframe<span class="token punctuation">.</span>denominator<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 9.set the data format */</span>
    <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>fmt<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">v4l2_format</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fmt<span class="token punctuation">.</span>type <span class="token operator">=</span> V4L2_BUF_TYPE_VIDEO_CAPTURE<span class="token punctuation">;</span>
    fmt<span class="token punctuation">.</span>fmt<span class="token punctuation">.</span>pix<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token number">1280</span><span class="token punctuation">;</span>
    fmt<span class="token punctuation">.</span>fmt<span class="token punctuation">.</span>pix<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">720</span><span class="token punctuation">;</span>
    fmt<span class="token punctuation">.</span>fmt<span class="token punctuation">.</span>pix<span class="token punctuation">.</span>pixelformat <span class="token operator">=</span> V4L2_PIX_FMT_MJPEG<span class="token punctuation">;</span>
    fmt<span class="token punctuation">.</span>fmt<span class="token punctuation">.</span>pix<span class="token punctuation">.</span>field <span class="token operator">=</span> V4L2_FIELD_INTERLACED<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_S_FMT<span class="token punctuation">,</span> <span class="token operator">&amp;</span>fmt<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; setting the data format failed!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 10.Initiate Memory Mapping or User Pointer I/O */</span>
    <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>req<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">v4l2_requestbuffers</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    req<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    req<span class="token punctuation">.</span>type <span class="token operator">=</span> V4L2_BUF_TYPE_VIDEO_CAPTURE<span class="token punctuation">;</span>
    req<span class="token punctuation">.</span>memory <span class="token operator">=</span> V4L2_MEMORY_MMAP<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_REQBUFS<span class="token punctuation">,</span> <span class="token operator">&amp;</span>req<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; VIDIOC_REQBUFS failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 11.Exchange a buffer with the driver */</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>n_buffers <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> n_buffers <span class="token operator">&lt;</span> req<span class="token punctuation">.</span>count<span class="token punctuation">;</span> n_buffers<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">v4l2_buffer</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        buf<span class="token punctuation">.</span>index <span class="token operator">=</span> n_buffers<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_QBUF<span class="token punctuation">,</span> <span class="token operator">&amp;</span>buf<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; VIDIOC_QBUF error\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* streamon */</span>
    type <span class="token operator">=</span> V4L2_BUF_TYPE_VIDEO_CAPTURE<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_STREAMON<span class="token punctuation">,</span> <span class="token operator">&amp;</span>type<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; VIDIOC_STREAMON error! %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">strerror</span><span class="token punctuation">(</span>errno<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; stream on succeed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    np <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>np <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; camera capture num is [%d]\\n&quot;</span><span class="token punctuation">,</span> np<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/* wait uvc frame */</span>
        <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">v4l2_buffer</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_DQBUF<span class="token punctuation">,</span> <span class="token operator">&amp;</span>buf<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; VIDIOC_DQBUF error\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">goto</span> EXIT<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;*****DQBUF[%d] FINISH*****\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">sprintf</span><span class="token punctuation">(</span>source_data_path<span class="token punctuation">,</span> <span class="token string">&quot;/data/source_frame_%d.jpg&quot;</span><span class="token punctuation">,</span> np<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">save_frame_to_file</span><span class="token punctuation">(</span>source_data_path<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span>buf<span class="token punctuation">.</span>mem_buf<span class="token punctuation">,</span> buf<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_QBUF<span class="token punctuation">,</span> <span class="token operator">&amp;</span>buf<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot; VIDIOC_QBUF error\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">goto</span> EXIT<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;************QBUF[%d] FINISH**************\\n\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

        np<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\\n Capture thread finish\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

EXIT<span class="token operator">:</span>
    type <span class="token operator">=</span> V4L2_BUF_TYPE_VIDEO_CAPTURE<span class="token punctuation">;</span>
    <span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_STREAMOFF<span class="token punctuation">,</span> <span class="token operator">&amp;</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>req<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">v4l2_requestbuffers</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    req<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    req<span class="token punctuation">.</span>type <span class="token operator">=</span> V4L2_BUF_TYPE_VIDEO_CAPTURE<span class="token punctuation">;</span>
    req<span class="token punctuation">.</span>memory <span class="token operator">=</span> V4L2_MEMORY_MMAP<span class="token punctuation">;</span>
    <span class="token function">ioctl</span><span class="token punctuation">(</span>fd<span class="token punctuation">,</span> VIDIOC_REQBUFS<span class="token punctuation">,</span> <span class="token operator">&amp;</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">close</span><span class="token punctuation">(</span>fd<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="usb-测试用例" tabindex="-1"><a class="header-anchor" href="#usb-测试用例" aria-hidden="true">#</a> USB 测试用例</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;usb_test.h&quot;</span></span>

<span class="token keyword">void</span> <span class="token function">usb_test_show_help</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\nUsage:\\n&quot;</span>\\
        <span class="token string">&quot;\\tusb hci {-i|-r} [&lt;port&gt;]\\n&quot;</span>\\
        <span class="token string">&quot;\\tusb udc {-i|-r} [&lt;port&gt;]\\n&quot;</span>\\
        <span class="token string">&quot;\\tusb phy_range {-s|-g} {&lt;port&gt;} [&lt;phyrange&gt;]\\n&quot;</span>\\
        <span class="token string">&quot;\\tusb ed_test {&lt;port&gt;} {&lt;type&gt;}\\n&quot;</span>\\
        <span class="token string">&quot;\\tusb debug {&lt;status&gt;}\\n&quot;</span>\\
        <span class="token string">&quot;\\tusb uvc_test\\n&quot;</span>\\
        <span class="token string">&quot;\\n\\t- - - - - - - - - - - - - - - - - - - - -\\n&quot;</span>\\
        <span class="token string">&quot;Meaning:\\n&quot;</span>\\
        <span class="token string">&quot;\\t-i:insmod, -r:rmmod, -s:set, -g:get\\n&quot;</span>\\
        <span class="token string">&quot;\\n&quot;</span>\\
        <span class="token string">&quot;\\tport     : [0-%d],port number\\n&quot;</span>\\
        <span class="token string">&quot;\\tphyrange : [0x0-0x1f],phy range\\n&quot;</span>\\
        <span class="token string">&quot;\\tstatus   : [0-disable,1-enable],hci debug status\\n&quot;</span>\\
        <span class="token string">&quot;\\ttype     : [test_j_state/test_k_state/test_se0_nak/test_pack]--hci &amp; otg\\n&quot;</span>\\
        <span class="token string">&quot;\\t           [test_not_operating/test_force_enable/test_mask]--hci only\\n&quot;</span>\\
        <span class="token string">&quot;\\n\\t==&gt;&gt; More information refer to spec &lt;&lt;==\\n&quot;</span><span class="token punctuation">,</span>
        USB_MAX_CONTROLLER_COUNT <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">usb_test_is_otg</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>CONFIG_HAL_TEST_HCI<span class="token punctuation">)</span></span></span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>port <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span><span class="token function">sunxi_ehci_status_get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0x1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">/*otg mode*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>port <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">usb_test_get_port</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>port<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token operator">*</span>port <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>port <span class="token operator">&gt;</span> USB_MAX_CONTROLLER_COUNT <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: port(%d) choose error! Port range [0-%d]\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>port<span class="token punctuation">,</span>
            USB_MAX_CONTROLLER_COUNT <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command_hci</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>CONFIG_HAL_TEST_HCI<span class="token punctuation">)</span></span></span>
    <span class="token keyword">return</span> <span class="token function">usb_test_cmd_hci</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: Can&#39;t find command config!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command_udc</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>CONFIG_HAL_TEST_UDC<span class="token punctuation">)</span></span></span>
    <span class="token keyword">return</span> <span class="token function">usb_test_cmd_udc</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: Can&#39;t find command config!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command_phy_range</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">usb_test_cmd_phy_range</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command_ed_test</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">usb_test_cmd_ed_test</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command_debug</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>CONFIG_HAL_TEST_HCI<span class="token punctuation">)</span></span></span>
    <span class="token keyword">return</span> <span class="token function">usb_test_cmd_debug</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: Can&#39;t find command config!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command_uvc</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>CONFIG_HAL_TEST_UVC<span class="token punctuation">)</span></span></span>
    <span class="token comment">// return usb_test_cmd_uvc(argc, argv);</span>
    <span class="token function">usb_test_cmd_uvc</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">/* -1 has other meaning in this case*/</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: Can&#39;t find command config!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">usb_test_command</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERR: command error\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">usb_test_show_help</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;hci&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">usb_test_command_hci</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;udc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">usb_test_command_udc</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;phy_range&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">usb_test_command_phy_range</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;ed_test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">usb_test_command_ed_test</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;debug&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">usb_test_command_debug</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;uvc_test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">usb_test_command_uvc</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token function">usb_test_show_help</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">FINSH_FUNCTION_EXPORT_CMD</span><span class="token punctuation">(</span>usb_test_command<span class="token punctuation">,</span> usb<span class="token punctuation">,</span> usb tests<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,296),c=[t];function o(i,l){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","chapter24.html.vue"]]);export{r as default};
