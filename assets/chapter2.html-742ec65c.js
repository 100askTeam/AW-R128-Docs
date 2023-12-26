import{_ as i,r as p,o as n,c as h,a as t,b as a,d as e,w as c,e as o}from"./app-e85d5a28.js";const l={},d=o('<h1 id="r128-devkit-开发板" tabindex="-1"><a class="header-anchor" href="#r128-devkit-开发板" aria-hidden="true">#</a> R128 DevKit 开发板</h1><p>针对 R128 模组，百问科技推出了 R128 DevKit 开发板作为快速开发评估工具。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image1.png" alt="image1"></p><p>特性：</p><ul><li>板载 R128-S2-N16R16 模组</li><li>板载 2.4G RF 陶瓷天线</li><li>板载 USB Type C OTG</li><li>板载 UART 转 USB 芯片</li><li>板载 RESET，FEL 下载按键</li><li>板载 4 颗 WS2812 RGB LED</li><li>板载 PMU，支持对外供电 3.3V 1A</li><li>提供 GPIO 37 个，引出 3 路 MIC，2 路 LINEOUT</li><li>板厚 1.6MM，引出邮票孔</li></ul><h2 id="资源下载" tabindex="-1"><a class="header-anchor" href="#资源下载" aria-hidden="true">#</a> 资源下载</h2>',6),g={href:"https://oshwhub.com/gloomyghost/r128-module",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},R={href:"https://www.aw-ol.com/downloads?cat=22",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.wch.cn/downloads/CH341SER_EXE.html",target:"_blank",rel:"noopener noreferrer"},E=t("h2",{id:"购买链接",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#购买链接","aria-hidden":"true"},"#"),a(" 购买链接")],-1),S={href:"https://m.tb.cn/h.5T4uATe?tk=S079W0vCt6v",target:"_blank",rel:"noopener noreferrer"},D=o('<h2 id="原理图模块介绍" tabindex="-1"><a class="header-anchor" href="#原理图模块介绍" aria-hidden="true">#</a> 原理图模块介绍</h2><h3 id="r128-模组" tabindex="-1"><a class="header-anchor" href="#r128-模组" aria-hidden="true">#</a> R128 模组</h3><p>R128 模组使用 SMT 贴装于 开发板上，外挂陶瓷天线，其中的PA16，PA17脚复用为 UART 调试脚，已经在板上连接了 UART 转 USB 芯片。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image2.png" alt="image2"></p><h3 id="电源" tabindex="-1"><a class="header-anchor" href="#电源" aria-hidden="true">#</a> 电源</h3><p>电源使用 MT3520B 作为主 DCDC 芯片，输入 5V 电压输出 3V3 供 R128 使用，也可以提供给外设模块使用</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image3.png" alt="image3"></p><h3 id="usb-转-uart" tabindex="-1"><a class="header-anchor" href="#usb-转-uart" aria-hidden="true">#</a> USB 转 UART</h3><p>USB 转 UART 使用的是 WCH 的 CH340N，最大支持 2M 波特率。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image4.png" alt="image4"></p><h3 id="按键" tabindex="-1"><a class="header-anchor" href="#按键" aria-hidden="true">#</a> 按键</h3><p>板载按键 RESET 与 FEL 两个按键，RESET 按键能重置 R128 模组，FEL 按键能进入下载模式。其中 RESET 按键连接 R128 模组的 EN 脚上，FEL 按键连接到 R128 模组的 PA1 脚上。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image5.png" alt="image5"></p><h3 id="rgb-led" tabindex="-1"><a class="header-anchor" href="#rgb-led" aria-hidden="true">#</a> RGB LED</h3><p>R128 DevKit 包括4颗 WS2812 灯珠，支持七彩颜色，连接在 R128 模组的 PA13 脚上。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image6.png" alt="image6"></p><h2 id="烧录测试固件" tabindex="-1"><a class="header-anchor" href="#烧录测试固件" aria-hidden="true">#</a> 烧录测试固件</h2><h3 id="安装烧录软件" tabindex="-1"><a class="header-anchor" href="#安装烧录软件" aria-hidden="true">#</a> 安装烧录软件</h3>',18),x={href:"https://www.aw-ol.com/downloads?cat=5",target:"_blank",rel:"noopener noreferrer"},v=t("code",null,"AllwinnertechPhoeniSuitRelease20230905.zip",-1),q=o('<p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image7.png" alt="image7"></p><p>将下载的压缩包解压，提取到文件夹中</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image8.png" alt="image8"></p><p>在文件夹中找到需要的 Windows 版本，同样解压到文件夹中</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image9.png" alt="image9"></p><p>找到 <code>PhoenixSuit.exe</code> 双击打开即可</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image10.png" alt="image10"></p><p>打开后的软件如下所示</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image11.png" alt="image11"></p><h3 id="安装-usb-驱动" tabindex="-1"><a class="header-anchor" href="#安装-usb-驱动" aria-hidden="true">#</a> 安装 USB 驱动</h3><p>下载程序需要安装上 USB 驱动，驱动位于刚才安装的烧录软件 PhoenixSuit 的 Drivers 目录中：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image12.png" alt="image12"></p><p>在这里面可以找到两个驱动，安装 AW_Deiver</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image13.png" alt="image13"></p><p>运行 <code>InstallUSBDrv.exe</code> 即可开始安装</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image14.png" alt="image14"></p><p>安装过程中提示无法验证此驱动程序软件的发布者点击始终安装即可。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image15.png" alt="image15"></p><p>安装完成后，将 DevKit 通过 USB TypeC 线接入电脑，注意需要插入 OTG 口</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image16.png" alt="image16"></p><p>然后按住 FEL 按键，之后按一下 RESET 按键重置芯片，等待电脑连接后再松开 FEL 按键</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image17.png" alt="image17"></p><p>连接的 DevKit 可以在 设备管理器-通用串行总线控制器看到设备：<code>USB Device(VID_1f3a_PID_efe8)</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image18.png" alt="image18"></p>',24),T=t("p",null,[t("img",{src:"http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image19.png",alt:"image19"})],-1),B=t("h3",{id:"获取测试固件",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#获取测试固件","aria-hidden":"true"},"#"),a(" 获取测试固件")],-1),U={href:"https://www.aw-ol.com/downloads?cat=21",target:"_blank",rel:"noopener noreferrer"},K=o('<p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image20.png" alt="image20"></p><h2 id="烧录测试固件-1" tabindex="-1"><a class="header-anchor" href="#烧录测试固件-1" aria-hidden="true">#</a> 烧录测试固件</h2><p>打开 PhoneixSuit，选择一键刷机，点击浏览，选择下载的 <code>R128_DevKit_RGB.img</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image21.png" alt="image21"></p><p>这里会显示固件生成的时间</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image22.png" alt="image22"></p><p>配置烧录选项，选择全盘擦除升级</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image23.png" alt="image23"></p><p>然后将 DevKit 通过 USB TypeC 线接入电脑，插入 OTG 口</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image16.png" alt="image16"></p><p>然后按住 FEL 按键，之后按一下 RESET 按键重置芯片，等待电脑连接后再松开 FEL 按键</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image17.png" alt="image17"></p><p>软件提示开始烧写固件</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image24.png" alt="image24"></p><p>等待烧写完成即可</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image25.png" alt="image25"></p><p>提示固件烧写成功</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image26.png" alt="image26"></p><p>可以看到板载的 RGB LED 灯正常亮起</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter2/image27.png" alt="image27"></p>',20);function L(P,A){const r=p("ExternalLinkIcon"),s=p("RouterLink");return n(),h("div",null,[d,t("ul",null,[t("li",null,[a("硬件工程开源地址："),t("a",g,[a("https://oshwhub.com/gloomyghost/r128-module"),e(r)])]),t("li",null,[a("电路图："),t("a",m,[a("SCH_R128-DevKit_2023-09-05.pdf"),e(r)])]),t("li",null,[a("PCB："),t("a",_,[a("ProDocument_R128-DevKit_2023-09-05.epro"),e(r)])]),t("li",null,[a("GERBER："),t("a",u,[a("Gerber_R128-DevKit_2023-09-05.zip"),e(r)])]),t("li",null,[a("STL："),t("a",w,[a("DXF_R128-DevKit_2023-09-05.dxf"),e(r)])]),t("li",null,[a("3D STEP："),t("a",k,[a("3D_R128-DevKit_2023-09-05.step"),e(r)])]),t("li",null,[a("BOM："),t("a",f,[a("BOM_R128-DevKit_R128-DevKit_2023-09-05.xlsx"),e(r)])]),t("li",null,[a("点位图："),t("a",R,[a("PickAndPlace_R128-DevKit_2023-09-05.xlsx"),e(r)])]),t("li",null,[a("USB 转 UART 驱动下载："),t("a",b,[a("CH341SER.EXE"),e(r)])])]),E,t("ul",null,[t("li",null,[t("a",S,[a("百问科技淘宝店 - 全志R128 DevKit"),e(r)])])]),D,t("p",null,[a("前往 "),t("a",x,[a("全志在线-资料下载"),e(r)]),a(" 页面，选择下载 "),v]),q,t("p",null,[a("如果没找到这个设备，但是看到了一个未知设备，请尝试手动安装驱动，详见 "),e(s,{to:"/r128/prepare_dev_env/"},{default:c(()=>[a("开发环境搭建-Windows 驱动安装")]),_:1})]),T,B,t("p",null,[a("前往 "),t("a",U,[a("全志在线-资料下载"),e(r)]),a(" 页面找到 R128 固件，选择下载 R128_DevKit_RGB.img")]),K])}const G=i(l,[["render",L],["__file","chapter2.html.vue"]]);export{G as default};
