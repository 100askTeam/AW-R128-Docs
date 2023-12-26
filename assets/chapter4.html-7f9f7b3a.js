import{_ as t,o as i,c as e,e as d}from"./app-e85d5a28.js";const a={},s=d(`<h1 id="烧写固件" tabindex="-1"><a class="header-anchor" href="#烧写固件" aria-hidden="true">#</a> 烧写固件</h1><p>编译系统源码后，打包后生成的系统文件称之为固件。固件一般为<code>.img</code>格式。把固件下载到开发板或者产品上的过程称之为<strong>烧写固件</strong>。</p><h2 id="烧录模式" tabindex="-1"><a class="header-anchor" href="#烧录模式" aria-hidden="true">#</a> 烧录模式</h2><p>R128 有两种烧录模式，分别为 USB 烧录与UART烧录。烧录模式以芯片 RST 时 PA1，PA2 引脚高低电平控制。</p><blockquote><p>R128 Module 默认配置为 USB 烧录，PA2 已经在模组通过下拉电阻下拉。</p></blockquote><table><thead><tr><th>PA1</th><th>PA2</th><th>模式</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>非法模式</td></tr><tr><td>1</td><td>0</td><td>正常启动</td></tr><tr><td>0</td><td>1</td><td>UART 下载</td></tr><tr><td>0</td><td>0</td><td>USB 下载</td></tr></tbody></table><h2 id="usb-烧写" tabindex="-1"><a class="header-anchor" href="#usb-烧写" aria-hidden="true">#</a> USB 烧写</h2><p>R128 支持使用 USB 烧写系统。对于 Windows 用户可以使用 PhoenixSuit 进行烧写。是最常用的烧写工具，通过数据线将PC和开发板连接，把固件烧到开发板上。PhoenixSuit 支持分区烧写，适用于开发和小规模生产使用。</p><h3 id="phoenixsuit-windows" tabindex="-1"><a class="header-anchor" href="#phoenixsuit-windows" aria-hidden="true">#</a> PhoenixSuit - Windows</h3><ul><li><p>打开PhoenixSuit</p></li><li><p>点击浏览，选择固件</p></li><li><p>点击全盘擦除升级</p></li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image1.png" alt="image1"></p><ul><li>使用 USB 数据线连接 USB OTG （USB转串口也可以连接，用于烧录查错）</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image2.jpg" alt="image2"></p><ul><li>按住 <code>FEL</code> 键，然后点击 <code>RESET</code> 键重置开发板</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image3.jpg" alt="image3"></p><ul><li><code>RESET</code> 点击后 PhoenixSuit 会自动进入烧录模式，开始下载</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image4.png" alt="image4"></p><ul><li>烧录完成</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image5.png" alt="image5"></p><h4 id="phoenixsuit-单独分区烧录" tabindex="-1"><a class="header-anchor" href="#phoenixsuit-单独分区烧录" aria-hidden="true">#</a> PhoenixSuit 单独分区烧录</h4><p>在开发的时候，会遇到只需要烧录单独分区的情况，例如只修改了 RV 核心的固件，不需要全盘下载。就可以选择单独分区烧录功能。</p><ul><li>选择单或多分区下载，PhoenixSuit 会解析固件并生成分区表</li><li>选择需要下载的核心的固件</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image6.png" alt="image6"></p><h3 id="phoenixsuit-linux" tabindex="-1"><a class="header-anchor" href="#phoenixsuit-linux" aria-hidden="true">#</a> PhoenixSuit - Linux</h3><p>Linux 版本 PhoenixSuit 支持的发行版本包括 Ubuntu、Fedora、Redhat 及 CentOS 等几个常见的发行版本。目前驱动已经可以支持 4.11.0 版本以上内核，建议安装内核版本号大于4.11.0 的 Linux 发行版本。</p><h4 id="安装-phoenixsuit-linux" tabindex="-1"><a class="header-anchor" href="#安装-phoenixsuit-linux" aria-hidden="true">#</a> 安装 PhoenixSuit - Linux</h4><ul><li>下载 PhoenixSuit 到 Linux 中，解压</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image7.png" alt="image7"></p><ul><li>安装依赖 dkms，对于 Ubuntu 可以用 <code>sudo apt install dkms dctrl_tools</code> 来安装</li></ul><p>!<img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image8.png" alt="image8"></p><ul><li>打开终端，输入 <code>sudo ./PhoenixSuit.run</code> 来运行安装程序。</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image9.png" alt="image9"></p><ul><li>使用 USB 数据线连接 USB OTG （USB转串口也可以连接，用于烧录查错）</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image2.jpg" alt="image3"></p><ul><li>按住 <code>FEL</code> 键，然后点击 <code>RESET</code> 键重置开发板使其进入下载模式</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image3.jpg" alt="image2"></p><ul><li>安装完成后可以用 <code>lsusb</code> 查看 USB 设备，找到 <code>ID 1f3a:efe8</code>，找到即安装完成。</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image10.png" alt="image10"></p><h4 id="烧录" tabindex="-1"><a class="header-anchor" href="#烧录" aria-hidden="true">#</a> 烧录</h4><ul><li>使用命令 <code>sudo ./PhoenixSuit rtos_xxx_uart0_16Mnor.img </code> 下载烧录 <code>rtos_xxx_uart0_16Mnor.img</code></li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image11.png" alt="image11"></p><ul><li>显示 <code>Clos image OK!</code> 时，按住 <code>FEL</code> 引脚，点击 <code>RESET</code> 键使芯片进入下载模式</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image3.jpg" alt="image"></p><ul><li>开始烧录</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image12.png" alt="image12"></p><ul><li>烧录完成</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image13.png" alt="image13"></p><h4 id="虚拟机-linux-烧录" tabindex="-1"><a class="header-anchor" href="#虚拟机-linux-烧录" aria-hidden="true">#</a> 虚拟机 Linux 烧录</h4><ul><li>如果使用的是虚拟机连接开发板烧录，先运行 <code>sudo ./PhoenixSuit rtos_xxx_uart0_16Mnor.img </code> 下载烧录 <code>rtos_xxx_uart0_16Mnor.img</code>，先进入下载模式。</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image11.png" alt="image11"></p><ul><li>选择设备-USB，选择 Onda 设备连接虚拟机</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image14.png" alt="image14"></p><ul><li>开始烧录，但是运行到 <code>Dev Plugout The Device Path is /dev/aw_efex0</code> 会卡住</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image15.png" alt="image15"></p><ul><li>此时需要重新到 设备-USB 重新连接 USB 设备，这是因为芯片烧录时需要重置USB，导致USB编号变化，虚拟机不会自动连接。</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image16.png" alt="image16"></p><ul><li>开始下载</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image13.png" alt="image13"></p><ul><li>如果长时间没有重新连接 USB 设备，PhoenixSuit 会超时自动退出，报错如下</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image17.png" alt="image17"></p><ul><li>如果刚才长时间没有重新连接，超时后连接上 USB 设备，重新运行<code>sudo ./PhoenixSuit rtos_xxx_uart0_16Mnor.img </code>下载命令。会出现 <code>Errpr!!!: PnpFesIn Error!</code> 这是因为烧录启动时的 USB 模式不匹配导致的，之前的操作导致USB进入了 <code>FFFF</code> 模式。此时需要按住 <code>FEL</code> 引脚，点击 <code>RESET</code> 键使芯片进入下载模式重新下载（下载模式会显示 <code>02B3</code>）</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image18.png" alt="image18"></p><h3 id="phoenixsuit-macos" tabindex="-1"><a class="header-anchor" href="#phoenixsuit-macos" aria-hidden="true">#</a> PhoenixSuit - MacOS</h3><ul><li>下载解压 <code>PhoneixSuit_MacOS.zip</code></li><li>在 Mac 电脑中进入终端，将目录切到工具目录下</li><li>执行命令 <code>chmod 777 ./phoenixsuit</code> 赋予运行权限</li><li>使用命令 <code>./phoenixsuit rtos_xxx_uart0_16Mnor.img </code> 下载烧录 <code>rtos_xxx_uart0_16Mnor.img</code></li><li>设备重新到 boot 的时候会自动进行烧写</li><li>烧写成功，设备重启</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image19.png" alt="image19"></p><h3 id="usb-烧写的流程" tabindex="-1"><a class="header-anchor" href="#usb-烧写的流程" aria-hidden="true">#</a> USB 烧写的流程</h3><p>R128 系统的烧写流程如下：</p><ul><li>片内引导 BROM 初始化芯片，识别到 PA1，PA2 脚为 USB 烧录模式，初始化 USB</li><li>上位机通过 USB 烧写 BOOT0 到 SRAM 中，并运行 BOOT0</li><li>BOOT0 初始化 PSRAM，返回完成信号等待上位机下载 BOOT1（U-Boot）</li><li>上位机收到信号，下载 BOOT1（U-Boot）到 PSRAM 中，并引导运行 BOOT1（U-Boot）</li><li>BOOT1（U-Boot） 初始化系统资源，初始化内部 SPI NOR，USB2.0 等资源，等待上位机下载</li><li>上位机下发固件，进入烧写模式，烧写固件</li></ul><h4 id="usb-烧录-log" tabindex="-1"><a class="header-anchor" href="#usb-烧录-log" aria-hidden="true">#</a> USB 烧录 log</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[0]fes begin commit:61c5f1c6
[2]set pll end
[3]board init ok
[5]fake dram ok
[7]heap: 0x40a0000 size:0xe000
[9]lpsram init
[11]lspsram init aps64
[13]lspsram dqs:0x011b01b0
[18]psram chip APS64 init ok!, freq 1920000000
[22]Init psram controller ok
[24]hpsram init
[26]DRAM DQS gate is PD mode.
[29]DRAM BOOT DRIVE INFO 001: V2.00
[32]DRAM CLK = 800 MHZ
[34]dram_tpr11 = 0x0 , dram_tpr12 =0x0
[38]dram_tpr9 = 0x2222
[68]DRAM simple test OK.
[70]DRAM SIZE =8 MB
[82]fes1 done


U-Boot 2018.05-g024e8cd (Jul 04 2023 - 03:57:33 +0000) Allwinner Technology

[01.080]CPU:   Allwinner Family
[01.083]Model: sun20iw2
[01.086]DRAM:  8 MiB
[01.096]Relocation Offset is: 00799000
[01.131]secure enable bit: 0
[01.135]CPU=384 MHz,PLL6=192 Mhz,AHB=192 Mhz, APB1=96Mhz  MBus=4125Mhz
[01.142]sunxi flash type@0 not support fast burn key
[01.146]flash init start
[01.149]workmode = 16,storage type = 0
try card 0
set card number 0
get card number 0
[01.157][mmc]: mmc driver ver uboot2018:2021-07-19 14:09:00
[01.166][mmc]: get sdc_type fail and use default host:tm1.
[01.209][mmc]: can&#39;t find node &quot;mmc0&quot;,will add new node
[01.214][mmc]: fdt err returned &lt;no error&gt;
[01.218][mmc]: Using default timing para
[01.221][mmc]: SUNXI SDMMC Controller Version:0x50310
[01.235][mmc]: mmc 0 cmd timeout 100 status 100
[01.240][mmc]: smc 0 err, cmd 8,  RTO
[01.243][mmc]: mmc 0 close bus gating and reset
[01.248][mmc]: mmc 0 cmd timeout 100 status 100
[01.253][mmc]: smc 0 err, cmd 55,  RTO
[01.256][mmc]: mmc 0 close bus gating and reset
[01.265][mmc]: mmc 0 cmd timeout 100 status 100
[01.269][mmc]: smc 0 err, cmd 1,  RTO
[01.272][mmc]: mmc 0 close bus gating and reset
[01.277][mmc]: Card did not respond to voltage select!
[01.282][mmc]: mmc_init: -95, time 56
[01.285][mmc]: mmc_init: mmc init fail, err -95
MMC init failed
try emmc fail
spi sunxi_slave-&gt;max_hz:50000000
sr3:0x68 --&gt; 0x68
SF: Detected w25q128 with flag 0x301 with page size 256 Bytes, erase size 4 KiB, total 16 MiB
not boot mode, unlock all
[01.360]Loading Environment from SUNXI_FLASH... OK
[01.369]try to burn key
[01.372]out of usb burn from boot: not need burn key
Hit any key to stop autoboot:  0
sunxi work mode=0x10
run usb efex
delay time 2500
weak:otg_phy_config
usb init ok
set address 0xe
set address 0xe ok
SUNXI_EFEX_ERASE_TAG
erase_flag = 0x12
origin_erase_flag = 0x1
FEX_CMD_fes_verify_status
FEX_CMD_fes_verify last err=0
the 0 mbr table is ok
*************MBR DUMP***************
total mbr part 9

part[0] name      :env
part[0] classname :DISK
part[0] addrlo    :0x20
part[0] lenlo     :0x8
part[0] user_type :32768
part[0] keydata   :0
part[0] ro        :0

part[1] name      :env-redund
part[1] classname :DISK
part[1] addrlo    :0x28
part[1] lenlo     :0x8
part[1] user_type :32768
part[1] keydata   :0
part[1] ro        :0

part[2] name      :arm-lpsram
part[2] classname :DISK
part[2] addrlo    :0x30
part[2] lenlo     :0x960
part[2] user_type :32768
part[2] keydata   :0
part[2] ro        :0

part[3] name      :rv-lpsram
part[3] classname :DISK
part[3] addrlo    :0x990
part[3] lenlo     :0xfa0
part[3] user_type :32768
part[3] keydata   :0
part[3] ro        :0

part[4] name      :dsp-hpsram
part[4] classname :DISK
part[4] addrlo    :0x1930
part[4] lenlo     :0x640
part[4] user_type :32768
part[4] keydata   :0
part[4] ro        :0

part[5] name      :rtos-xip
part[5] classname :DISK
part[5] addrlo    :0x1f70
part[5] lenlo     :0x1388
part[5] user_type :32768
part[5] keydata   :0
part[5] ro        :0

part[6] name      :arm-b
part[6] classname :DISK
part[6] addrlo    :0x32f8
part[6] lenlo     :0x960
part[6] user_type :32768
part[6] keydata   :0
part[6] ro        :0

part[7] name      :config
part[7] classname :DISK
part[7] addrlo    :0x3c58
part[7] lenlo     :0x20
part[7] user_type :32768
part[7] keydata   :0
part[7] ro        :0

part[8] name      :UDISK
part[8] classname :DISK
part[8] addrlo    :0x3c78
part[8] lenlo     :0x0
part[8] user_type :33024
part[8] keydata   :0
part[8] ro        :0

need erase flash: 18
The Chip Erase size is: 16M ...
SUNXI_EFEX_MBR_TAG
mbr size = 0x4000
write primary GPT success
spinor: skip backup GPT
[43.156]update partition map
FEX_CMD_fes_verify_status
FEX_CMD_fes_verify last err=0
FEX_CMD_fes_verify_value, start 0x20, size high 0x0:low 0x1000
FEX_CMD_fes_verify_value 0x8c999e79
FEX_CMD_fes_verify_value, start 0x28, size high 0x0:low 0x1000
FEX_CMD_fes_verify_value 0x8c999e79
FEX_CMD_fes_verify_value, start 0x30, size high 0x0:low 0x121e48
FEX_CMD_fes_verify_value 0xe3775740
FEX_CMD_fes_verify_value, start 0x1930, size high 0x0:low 0x7a168
FEX_CMD_fes_verify_value 0x3b80dabd
FEX_CMD_fes_verify_value, start 0x1f70, size high 0x0:low 0x23c230
FEX_CMD_fes_verify_value 0x8bdd937b
FEX_CMD_fes_verify_value, start 0x32f8, size high 0x0:low 0xe8338
FEX_CMD_fes_verify_value 0x3e12775c
FEX_CMD_fes_verify_value, start 0x3c58, size high 0x0:low 0x3c00
FEX_CMD_fes_verify_value 0xe5de21c
flash sectors: 0x8000
FEX_CMD_fes_verify_value, start 0x3c78, size high 0x0:low 0x7e5400
FEX_CMD_fes_verify_value 0x4536d51f
bootfile_mode=4
SUNXI_EFEX_BOOT1_TAG
boot1 size = 0x8000, max size = 0x80000
uboot size = 0x124000
storage type = 3
skip toc1
FEX_CMD_fes_verify_status
FEX_CMD_fes_verify last err=0
bootfile_mode=4
SUNXI_EFEX_BOOT0_TAG
boot0 size = 0xc080
storage type = 3
burn first boot0 ok!
burn boot0 redund ok!
FEX_CMD_fes_verify_status
FEX_CMD_fes_verify last err=0
sunxi_efex_next_action=2
exit usb
next work 2
SUNXI_UPDATE_NEXT_ACTION_REBOOT
free spi flash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="uart-烧写" tabindex="-1"><a class="header-anchor" href="#uart-烧写" aria-hidden="true">#</a> UART 烧写</h2><p>R128 支持使用 UART 烧写系统。</p><p>请注意：R128 Module 在硬件上下拉了 PA2 引脚，默认配置为USB下载模式。如果希望使用 UART 下载需要摘除 PA2 下拉电阻，或者外部上拉 PA2 到 3V3</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image20.png" alt="image20"></p><p>PA2 下拉电阻为 47K，可以直接上拉 PA2 到 3V3 进入UART下载模式</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image21.png" alt="image21"></p><h3 id="uart-下载设置" tabindex="-1"><a class="header-anchor" href="#uart-下载设置" aria-hidden="true">#</a> UART 下载设置</h3><ul><li>打开 <code>PhoenixMC</code> 点击 <code>刷新</code> ，注意在下载过程中请断开各类串口监视器，不能占用串口，否则刷新找不到对应串口。</li><li>配置串口波特率，一般选择 1500000 即可</li></ul><p>如果选择太高的波特率会导致通讯错误，板载的 CH340C 仅支持最大2000000波特率</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image22.png" alt="image22"></p><ul><li>点击 <code>刷新</code> 选择对应的串口</li><li>点击调试进入调试界面</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image23.png" alt="image23"></p><p>如果出现 <code>Open uart error!</code> 则表示没有关闭串口助手或者选择错了串口。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image24.png" alt="image24"></p><ul><li>配置 Flash 长度，例如 R128 内置 16M NOR Flash，这里就填入 <code>0x1000000</code> 也就是 16M 长度</li><li>烧写前先擦除 Flash</li><li>点击写入</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image25.png" alt="image25"></p><ul><li>选择 16M 固件，注意这个固件后缀名是 <code>.bin</code> ，不是 USB 烧写的 <code>.img</code> 文件</li></ul><blockquote><p>注意：USB 烧写使用的是专有格式，需要 PhoenixSuit 解析并烧录，UART 烧写使用的是通用格式，为内置 SPI NOR 的镜像文件。</p></blockquote><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image26.png" alt="image26"></p><ul><li>提示文件较小，点击确定即可</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image27.png" alt="image27"></p><ul><li>开始烧写</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image28.png" alt="image28"></p><ul><li>烧写完成，下载结束</li></ul><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part2/chapter4/image29.png" alt="image29"></p><h3 id="uart-mboot-通讯协议" tabindex="-1"><a class="header-anchor" href="#uart-mboot-通讯协议" aria-hidden="true">#</a> UART mBoot 通讯协议</h3><table><thead><tr><th>Host</th><th>Main-CMD</th><th>Sub-CMD</th><th>CMD Value</th><th>Description</th><th>Remarks</th></tr></thead><tbody><tr><td>PC</td><td>0x00</td><td>0x00</td><td>0x00</td><td>Read 1 byte</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x01</td><td>0x01</td><td>Write 1 byte</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x02</td><td>0x02</td><td>Read 2 bytes</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x03</td><td>0x03</td><td>Write 2 bytes</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x04</td><td>0x04</td><td>Read 4 bytes</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x05</td><td>0x05</td><td>Write 4 bytes</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x06</td><td>0x06</td><td>Read 8 bytes</td><td></td></tr><tr><td>PC</td><td>0x00</td><td>0x07</td><td>0x07</td><td>Write 8 bytes</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x00</td><td>0x08</td><td>Read n bytes</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x01</td><td>0x09</td><td>Write n bytes</td><td></td></tr><tr><td>PC</td><td>0x02</td><td>0x00</td><td>0x10</td><td></td><td>Change the UART transmission condition</td></tr><tr><td>PC</td><td>0x02</td><td>0x01</td><td>0x11</td><td></td><td>Enable/Disable JTAG</td></tr><tr><td>PC</td><td>0x02</td><td>0x02</td><td>0x12</td><td></td><td>reboot</td></tr><tr><td>PC</td><td>0x02</td><td>0x03</td><td>0x13</td><td>Set PC pointer</td><td></td></tr><tr><td>PC</td><td>0x02</td><td>0x04</td><td>0x14</td><td></td><td>Enable/disable MCU transmission and validation</td></tr><tr><td>PC</td><td>0x02</td><td>0x05</td><td>0x15</td><td></td><td>Obtain baud rate list</td></tr><tr><td>PC</td><td>0x02</td><td>0x06</td><td>0x16</td><td></td><td>Modify the buffer</td></tr><tr><td>PC</td><td>0x00</td><td>0x00</td><td>0x18</td><td>Obtain flash information</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x01</td><td>0x19</td><td>Chip erase</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x02</td><td>0x1A</td><td>Read n sectors</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x03</td><td>0x1B</td><td>Write n sectors</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x04</td><td>0x1C</td><td>Obtain flash information</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x05</td><td>0x1D</td><td>Chip erase</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x06</td><td>0x1E</td><td>Read n sectors</td><td></td></tr><tr><td>PC</td><td>0x01</td><td>0x07</td><td>0x1F</td><td>Write n sectors</td><td></td></tr><tr><td>MCU</td><td>0x00</td><td>0x00</td><td></td><td></td><td>Send message to PC</td></tr></tbody></table><h2 id="烧录速度对比" tabindex="-1"><a class="header-anchor" href="#烧录速度对比" aria-hidden="true">#</a> 烧录速度对比</h2><table><thead><tr><th>烧录方式</th><th>擦除速度</th><th>烧录速度</th></tr></thead><tbody><tr><td>USB</td><td>30s</td><td>38s</td></tr><tr><td>UART （1500000）</td><td>60s</td><td>205s</td></tr><tr><td>UART （115200）</td><td>60s</td><td>1466s</td></tr></tbody></table>`,99),n=[s];function r(l,c){return i(),e("div",null,n)}const u=t(a,[["render",r],["__file","chapter4.html.vue"]]);export{u as default};
