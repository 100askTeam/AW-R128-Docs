import{_ as o,r as s,o as h,c,a,b as t,d as e,w as n,e as p}from"./app-e85d5a28.js";const d={},l=p('<h1 id="r128-evt-开发套件" tabindex="-1"><a class="header-anchor" href="#r128-evt-开发套件" aria-hidden="true">#</a> R128 EVT 开发套件</h1><p>针对 R128 模组，百问科技推出了 R128 EVT 开发套件作为快速开发评估工具。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image1.jpg" alt="image1"></p><p>特性：</p><ul><li>板载 R128-S2-N16R16 模组</li><li>板载 USB Type C OTG</li><li>板载 UART 转 USB 芯片</li><li>板载 RESET，FEL 下载按键</li><li>板载 PMU，支持 USB 5V 供电和 DC 5~12V 供电</li><li>板载 4 寸 86 面板屏</li><li>板载 4 寸 FT5136 电容式触摸屏</li><li>板载 DVP 摄像头接口</li><li>板载双 MIC</li><li>板载功放，支持 AEC 回音消除</li><li>板载 SD Card 卡槽</li><li>板载 ADC 按键</li><li>IPEX 天线</li></ul><h2 id="资源下载" tabindex="-1"><a class="header-anchor" href="#资源下载" aria-hidden="true">#</a> 资源下载</h2>',6),g={href:"https://oshwhub.com/gloomyghost/r128-module",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.wch.cn/downloads/CH341SER_EXE.html",target:"_blank",rel:"noopener noreferrer"},E=a("h2",{id:"购买链接",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#购买链接","aria-hidden":"true"},"#"),t(" 购买链接")],-1),q={href:"https://m.tb.cn/h.5T4uATe?tk=S079W0vCt6v",target:"_blank",rel:"noopener noreferrer"},x=p('<h2 id="原理图模块介绍" tabindex="-1"><a class="header-anchor" href="#原理图模块介绍" aria-hidden="true">#</a> 原理图模块介绍</h2><h3 id="硬件框图" tabindex="-1"><a class="header-anchor" href="#硬件框图" aria-hidden="true">#</a> 硬件框图</h3><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image2.png" alt="image2"></p><h3 id="pcb框图" tabindex="-1"><a class="header-anchor" href="#pcb框图" aria-hidden="true">#</a> PCB框图</h3><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image3.png" alt="image3"></p><h3 id="电源" tabindex="-1"><a class="header-anchor" href="#电源" aria-hidden="true">#</a> 电源</h3><p>EVT 支持 USB 供电与 DC 12V 直流供电，通过一个滑动开关控制电源。并且板载 5V 转 3.3V 电源芯片，为外设和 R128 提供最高 2A 的电流。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image4.png" alt="image4"></p><h3 id="r128-模组" tabindex="-1"><a class="header-anchor" href="#r128-模组" aria-hidden="true">#</a> R128 模组</h3><p>R128 模组使用 SMT 贴装于 开发板上，外挂陶瓷天线，其中的PA16，PA17脚复用为 UART 调试脚，已经在板上连接了 UART 转 USB 芯片。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image5.png" alt="image5"></p><h3 id="系统按键与-io-复用" tabindex="-1"><a class="header-anchor" href="#系统按键与-io-复用" aria-hidden="true">#</a> 系统按键与 IO 复用</h3><p>EVT 板载 2 颗按键，控制 R128 芯片 RESET 与 FEL 烧录功能。</p><p>IO 复用如图所示，其中 SD 卡与摄像头 CSI 是共用 IO 状态，使用时需要注意。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image6.png" alt="image6"></p><h3 id="lcd-接口" tabindex="-1"><a class="header-anchor" href="#lcd-接口" aria-hidden="true">#</a> LCD 接口</h3><p>EVT 板载 40 Pin LCD 接口，使用的协议是 intel 8080，其中支持电容式触摸屏。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image7.png" alt="image7"></p><h3 id="usb-转-uart" tabindex="-1"><a class="header-anchor" href="#usb-转-uart" aria-hidden="true">#</a> USB 转 UART</h3><p>EVT 板载两个 USB Type-C 连接器，板载 CH340N USB 转 UART 接口芯片，方便开发使用。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image8.png" alt="image8"></p><h3 id="麦克风与扬声器" tabindex="-1"><a class="header-anchor" href="#麦克风与扬声器" aria-hidden="true">#</a> 麦克风与扬声器</h3><p>开发板板载两颗模拟硅麦。并且板载功放电路与 AEC 回音消除电路。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image9.png" alt="image9"></p><h3 id="csi-摄像头" tabindex="-1"><a class="header-anchor" href="#csi-摄像头" aria-hidden="true">#</a> CSI 摄像头</h3><p>EVT 支持 DVP 摄像头，型号 GC0308。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image10.png" alt="image10"></p><h3 id="tf-card" tabindex="-1"><a class="header-anchor" href="#tf-card" aria-hidden="true">#</a> TF Card</h3><p>EVT 支持 SD 卡，支持最高 SDXC 规格</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image11.png" alt="image11"></p><h3 id="adc-按键" tabindex="-1"><a class="header-anchor" href="#adc-按键" aria-hidden="true">#</a> ADC 按键</h3><p>EVT 板载 ADC 按键，连接到 R128 模组的 PB1 引脚上</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image12.png" alt="image12"></p><h2 id="烧录测试固件" tabindex="-1"><a class="header-anchor" href="#烧录测试固件" aria-hidden="true">#</a> 烧录测试固件</h2><h3 id="安装烧录软件" tabindex="-1"><a class="header-anchor" href="#安装烧录软件" aria-hidden="true">#</a> 安装烧录软件</h3>',35),R={href:"https://www.aw-ol.com/downloads?cat=5",target:"_blank",rel:"noopener noreferrer"},S=a("code",null,"AllwinnertechPhoeniSuitRelease20230905.zip",-1),V=p('<p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image13.png" alt="image13"></p><p>将下载的压缩包解压，提取到文件夹中</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image14.png" alt="image14"></p><p>在文件夹中找到需要的 Windows 版本，同样解压到文件夹中</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image15.png" alt="image15"></p><p>找到 <code>PhoenixSuit.exe</code> 双击打开即可</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image16.png" alt="image16"></p><p>打开后的软件如下所示</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image17.png" alt="image17"></p><h3 id="安装-usb-驱动" tabindex="-1"><a class="header-anchor" href="#安装-usb-驱动" aria-hidden="true">#</a> 安装 USB 驱动</h3><p>下载程序需要安装上 USB 驱动，驱动位于刚才安装的烧录软件 PhoenixSuit 的 Drivers 目录中：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image18.png" alt="image18"></p><p>在这里面可以找到两个驱动，安装 AW_Deiver</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image19.png" alt="image19"></p><p>运行 <code>InstallUSBDrv.exe</code> 即可开始安装</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image20.png" alt="image20"></p><p>安装过程中提示无法验证此驱动程序软件的发布者点击始终安装即可。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image21.png" alt="image21"></p><p>安装完成后，将 DevKit 通过 USB TypeC 线接入电脑，注意需要插入 OTG 口</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image22.png" alt="image22"></p><p>然后按住 FEL 按键，之后按一下 RESET 按键重置芯片，等待电脑连接后再松开 FEL 按键</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image23.png" alt="image23"></p><p>连接的 EVT 可以在 设备管理器-通用串行总线控制器看到设备：<code>USB Device(VID_1f3a_PID_efe8)</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image24.png" alt="image24"></p>',24),C=a("p",null,[a("img",{src:"http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image25.png",alt:"image25"})],-1),v=a("h3",{id:"获取测试固件",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#获取测试固件","aria-hidden":"true"},"#"),t(" 获取测试固件")],-1),D={href:"https://www.aw-ol.com/downloads?cat=21",target:"_blank",rel:"noopener noreferrer"},B=p(`<p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image26.png" alt="image26"></p><p>下载之后，将固件 rtos_freertos_r128s2_evt_uart0_16mnor.img 解压缩出来。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image27.png" alt="image27"></p><h2 id="烧录测试固件-1" tabindex="-1"><a class="header-anchor" href="#烧录测试固件-1" aria-hidden="true">#</a> 烧录测试固件</h2><p>打开 PhoneixSuit，选择一键刷机，点击浏览，选择下载的 <code>rtos_freertos_r128s2_evt_uart0_16mnor.img</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image28.png" alt="image28"></p><p>配置烧录选项，选择全盘擦除升级</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image29.png" alt="image29"></p><p>然后将 EVT 通过 USB TypeC 线接入电脑，插入 OTG 口</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image22.png" alt="image22"></p><p>然后按住 FEL 按键，之后按一下 RESET 按键重置芯片，等待电脑连接后再松开 FEL 按键</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image23.png" alt="image23"></p><p>软件提示开始烧写固件，并且进入烧录状态，等待烧写完成即可</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image30.png" alt="image30"></p><p>提示固件烧写成功</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image31.png" alt="image31"></p><p>可以看到屏幕点亮显示 LOGO</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image32.jpg" alt="image32"></p><h2 id="r128-evt-外设测试" tabindex="-1"><a class="header-anchor" href="#r128-evt-外设测试" aria-hidden="true">#</a> R128 EVT 外设测试</h2><h3 id="uart-控制台测试" tabindex="-1"><a class="header-anchor" href="#uart-控制台测试" aria-hidden="true">#</a> UART 控制台测试</h3><p>烧录之后，可以使用 USB Type-C 数据线连接 EVT 开发板</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image33.png" alt="image33"></p><p>然后配置为对应的 COM 口，波特率设置为 115200</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image34.png" alt="image34"></p><p>即可访问控制台</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image35.png" alt="image35"></p><h3 id="显示屏测试" tabindex="-1"><a class="header-anchor" href="#显示屏测试" aria-hidden="true">#</a> 显示屏测试</h3><p>正常测试固件启动会显示 LOGO 图</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image36.png" alt="image36"></p><p>可以使用以下命令测试显示屏</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>disp <span class="token parameter variable">-c</span> <span class="token number">0</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时屏幕将显示 ColorBar</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image37.png" alt="image37"></p><h3 id="摄像头测试" tabindex="-1"><a class="header-anchor" href="#摄像头测试" aria-hidden="true">#</a> 摄像头测试</h3><p>前往 全志在线-资料下载 页面找到 R128 固件，选择下载 R128EVT测试固件 ，烧录 摄像头测试固件.img</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image38.png" alt="image38"></p><p>如图接入摄像头</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image39.png" alt="image39"></p><p>运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>camera_preview csi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示屏会显示摄像头拍到的画面</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image40.png" alt="image40"></p><h3 id="tf-card-测试" tabindex="-1"><a class="header-anchor" href="#tf-card-测试" aria-hidden="true">#</a> TF Card 测试</h3><p>前往 全志在线-资料下载 页面找到 R128 固件，选择下载 R128EVT测试固件 ，烧录 R128EVT SD卡测试固件.img</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image41.png" alt="image41"></p><p>然后烧录启动后插入 TF 卡，注意请先把 SD 卡格式化为 FAT32 格式。请注意测试 SD 卡时请断开摄像头连接。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image42.png" alt="image42"></p><p>可以在 LOG 中查看到 SD 卡正常挂载。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter3/image43.png" alt="image43"></p>`,49);function U(A,P){const r=s("ExternalLinkIcon"),i=s("RouterLink");return h(),c("div",null,[l,a("ul",null,[a("li",null,[t("硬件工程开源地址："),a("a",g,[t("https://oshwhub.com/gloomyghost/r128-module"),e(r)])]),a("li",null,[t("电路图："),a("a",m,[t("SCH_R128_EVT_2023-10-20.pdf"),e(r)])]),a("li",null,[t("PCB："),a("a",u,[t("ProDocument_R128-EVT_2023-10-20.epro"),e(r)])]),a("li",null,[t("GERBER："),a("a",k,[t("Gerber_R128_EVT_2023-10-20.zip"),e(r)])]),a("li",null,[t("STL："),a("a",_,[t("DXF_R128_EVT_2023-10-20.dxf"),e(r)])]),a("li",null,[t("3D STEP："),a("a",w,[t("3D_R128_EVT_2023-10-20.zip"),e(r)])]),a("li",null,[t("BOM："),a("a",f,[t("BOM_R128-EVT_R128_EVT_2023-10-20.xlsx"),e(r)])]),a("li",null,[t("点位图："),a("a",b,[t("PickAndPlace_R128_EVT_2023-10-20.xlsx"),e(r)])]),a("li",null,[t("USB 转 UART 驱动下载："),a("a",T,[t("CH341SER.EXE"),e(r)])])]),E,a("ul",null,[a("li",null,[a("a",q,[t("百问科技淘宝店 - 全志R128 EVT"),e(r)])])]),x,a("p",null,[t("前往 "),a("a",R,[t("全志在线-资料下载"),e(r)]),t(" 页面，选择下载 "),S]),V,a("p",null,[t("如果没找到这个设备，但是看到了一个未知设备，请尝试手动安装驱动，详见 "),e(i,{to:"/r128/prepare_dev_env/"},{default:n(()=>[t("开发环境搭建-Windows 驱动安装")]),_:1})]),C,v,a("p",null,[t("前往 "),a("a",D,[t("全志在线-资料下载"),e(r)]),t(" 页面找到 R128 固件，选择下载 chapter2")]),B])}const O=o(d,[["render",U],["__file","chapter3.html.vue"]]);export{O as default};
