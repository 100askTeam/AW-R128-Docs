import{_ as i,r as o,o as l,c,a as n,b as s,d as e,e as t}from"./app-e85d5a28.js";const r={},p=n("h1",{id:"nwatch-diy智能手表",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nwatch-diy智能手表","aria-hidden":"true"},"#"),s(" NWatch（DIY智能手表）")],-1),d={href:"https://item.taobao.com/item.htm?id=736154682975",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/ZakKemble/NWatch",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.zakkemble.net/diy-digital-wristwatch",target:"_blank",rel:"noopener noreferrer"},h={href:"https://item.taobao.com/item.htm?id=736154682975",target:"_blank",rel:"noopener noreferrer"},v=n("strong",null,"视频教程",-1),b={href:"https://www.bilibili.com/video/BV1oC4y1w7AH?p=26",target:"_blank",rel:"noopener noreferrer"},k=n("h2",{id:"运行效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#运行效果","aria-hidden":"true"},"#"),s(" 运行效果")],-1),_={href:"https://bbs.aw-ol.com/topic/4413/%E7%A7%BB%E6%A4%8Dnwatch%E5%88%B0r128-devkit/3",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,[n("img",{src:"https://forums.100ask.net/uploads/default/optimized/2X/1/1f6b489b0b2918a08f6818cfd7f957dd686e93fb_2_1035x582.jpeg",alt:""})],-1),f=n("h2",{id:"硬件准备",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#硬件准备","aria-hidden":"true"},"#"),s(" 硬件准备")],-1),S={href:"https://item.taobao.com/item.htm?id=736154682975",target:"_blank",rel:"noopener noreferrer"},E={href:"https://item.taobao.com/item.htm?id=736154682975",target:"_blank",rel:"noopener noreferrer"},w=n("li",null,"0.96寸OLED（SSD1306）",-1),D=n("li",null,"EC11旋转编码器模块",-1),A=n("li",null,"红外接收模块+红外遥控器",-1),x=n("li",null,"无源蜂鸣器模块",-1),I=n("li",null,"DHT11温湿度模块",-1),R=n("h2",{id:"源码获取",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#源码获取","aria-hidden":"true"},"#"),s(" 源码获取")],-1),y=n("p",null,"仓库源码：",-1),U={href:"https://gitee.com/weidongshan/100ask_r128_demos/tree/master/nwatch",target:"_blank",rel:"noopener noreferrer"},K={href:"https://github.com/100askTeam/100ask_r128_demos/tree/master/nwatch",target:"_blank",rel:"noopener noreferrer"},P=n("h2",{id:"固件获取",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#固件获取","aria-hidden":"true"},"#"),s(" 固件获取")],-1),O={href:"https://item.taobao.com/item.htm?id=736154682975",target:"_blank",rel:"noopener noreferrer"},N=n("code",null,"nwatch_100ask 3",-1),C=n("a",{href:"#%E6%A8%A1%E5%9D%97%E6%8E%A5%E7%BA%BF"},"模块接线",-1),M=n("p",null,"Releases获取：",-1),T={href:"https://gitee.com/weidongshan/100ask_r128_demos/releases/tag/v0.0.1",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/100askTeam/100ask_r128_demos/releases/tag/v0.0.1",target:"_blank",rel:"noopener noreferrer"},L=t(`<h2 id="二次开发" tabindex="-1"><a class="header-anchor" href="#二次开发" aria-hidden="true">#</a> 二次开发</h2><h3 id="修改-sys-config-fex" tabindex="-1"><a class="header-anchor" href="#修改-sys-config-fex" aria-hidden="true">#</a> 修改 sys_config.fex</h3><p>打开 <code>R128-S2-SDK/board/r128s2/pro/configs/sys_config.fex</code> ，进行如下的修改：</p><p>IIC引脚配置:</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">twi1</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">twi1_sck</span>        <span class="token punctuation">=</span> <span class="token value attr-value">port:PB00&lt;3&gt;&lt;1&gt;&lt;default&gt;&lt;default&gt;</span>
<span class="token key attr-name">twi1_sda</span>        <span class="token punctuation">=</span> <span class="token value attr-value">port:PB01&lt;3&gt;&lt;1&gt;&lt;default&gt;&lt;default&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PWM配置：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">pwm6</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">pwm_used</span>        <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">pwm_positive</span>    <span class="token punctuation">=</span> <span class="token value attr-value">port:PA26&lt;4&gt;&lt;0&gt;&lt;2&gt;&lt;default&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加100ask-r128-demos" tabindex="-1"><a class="header-anchor" href="#添加100ask-r128-demos" aria-hidden="true">#</a> 添加100ask_r128_demos</h3><p>从git仓库获取源码：</p>`,9),V={href:"https://gitee.com/weidongshan/100ask_r128_demos/tree/master/nwatch",target:"_blank",rel:"noopener noreferrer"},W={href:"https://github.com/100askTeam/100ask_r128_demos/tree/master/nwatch",target:"_blank",rel:"noopener noreferrer"},G=t(`<ol><li>clone仓库或者下载仓库压缩包到本地，并将仓库目录放在sdk的这个目录下面：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>R128-S2-SDK/lichee/rtos-components/thirdparty/100ask_r128_demos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>一定要确保文件夹名称是 <code>100ask_r128_demos</code></p></blockquote><ol start="2"><li>打开文件 <code>R128-S2-SDK/lichee/rtos-components/thirdparty/Makefile</code> 进行编辑，在文件的最后面或最前一行加入下面的内容：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>obj-<span class="token variable"><span class="token variable">$(</span>CONFIG_COMPONENTS_100ASK_R128_DEMOS<span class="token variable">)</span></span> <span class="token operator">+=</span> 100ask_r128_demos/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>打开文件 <code>R128-S2-SDK/lichee/rtos-components/thirdparty/Kconfig</code> 进行编辑，在文件的最后或最前一行加入下面的内容：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> components/common/thirdparty/100ask_r128_demos/Kconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置menuconfig" tabindex="-1"><a class="header-anchor" href="#配置menuconfig" aria-hidden="true">#</a> 配置menuconfig</h3><ol><li>执行 <strong>mrtos_menuconfig</strong> 进入到下面所示的位置进行配置：</li></ol><p>选择载入 r128s2_module_c906 方案，并进入 menuconfig：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> envsetup.sh 
$ lunch_rtos <span class="token number">1</span>
$ mrtos_menuconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开IIC：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>System components  ---<span class="token operator">&gt;</span>
    Drivers Options  ---<span class="token operator">&gt;</span>
        soc related device drivers  ---<span class="token operator">&gt;</span>
        	TWI Devices  ---<span class="token operator">&gt;</span>
                -*- <span class="token builtin class-name">enable</span> twi driver
                <span class="token punctuation">[</span> <span class="token punctuation">]</span>   <span class="token builtin class-name">enable</span> twi hal APIs <span class="token builtin class-name">test</span> <span class="token builtin class-name">command</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开PWM：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>System components  ---<span class="token operator">&gt;</span>
    Drivers Options  ---<span class="token operator">&gt;</span>
        soc related device drivers  ---<span class="token operator">&gt;</span>
            PWM devices ---<span class="token operator">&gt;</span>
                <span class="token punctuation">[</span>*<span class="token punctuation">]</span> <span class="token builtin class-name">enable</span> pwm driver
                <span class="token punctuation">[</span> <span class="token punctuation">]</span>   <span class="token builtin class-name">enable</span> pwm hal APIs <span class="token builtin class-name">test</span> <span class="token builtin class-name">command</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开GPIO及其中断：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>System components  ---<span class="token operator">&gt;</span>
    Drivers Options  ---<span class="token operator">&gt;</span>
        soc related device drivers  ---<span class="token operator">&gt;</span>
            GPIO devices ---<span class="token operator">&gt;</span>
                <span class="token punctuation">[</span>*<span class="token punctuation">]</span> <span class="token builtin class-name">enable</span> GPIO driver
                <span class="token punctuation">[</span> <span class="token punctuation">]</span>   <span class="token builtin class-name">enable</span> gpio hal APIs <span class="token builtin class-name">test</span> <span class="token builtin class-name">command</span>
                <span class="token punctuation">[</span> <span class="token punctuation">]</span> <span class="token builtin class-name">enable</span> gpio chip aw9523
                <span class="token punctuation">[</span>*<span class="token punctuation">]</span> <span class="token builtin class-name">enable</span> amp gpio irq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置 100ask_r128_demos：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>System components  ---<span class="token operator">&gt;</span>
    thirdparty components  ---<span class="token operator">&gt;</span>
        USE 100ask_r128_demos  ---<span class="token operator">&gt;</span>
            --- USE 100ask_r128_demos
            <span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER  ---<span class="token operator">&gt;</span>
            	<span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_IIC_OLED  ---<span class="token operator">&gt;</span>
            	<span class="token punctuation">[</span> <span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_SPI_LCD  ----
            	<span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_PASSIVE_BUZZER  ---<span class="token operator">&gt;</span>
            	<span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_ROTARY_ENCODER  ----
            	<span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_IR_RECEIVER  ---<span class="token operator">&gt;</span>
            	<span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_SPI_FLASH  ---<span class="token operator">&gt;</span> 
            	<span class="token punctuation">[</span>*<span class="token punctuation">]</span>   USE USE_100ASK_MODULE_DRIVER_DHT11  ----
            <span class="token punctuation">[</span> <span class="token punctuation">]</span>   100ask lvgl desktop
            <span class="token punctuation">[</span>*<span class="token punctuation">]</span>   NWatch demo
            <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开机启动" tabindex="-1"><a class="header-anchor" href="#开机启动" aria-hidden="true">#</a> 开机启动</h3><p>如果省略这一步，那么在开机之后，在串口终端输入命令然后按回车运行 NWatch 任务： <code>nwatch_100ask 3</code></p><p>如果需要开机自启动 NWatch 任务，按照如下步骤操作：</p><ol><li>打开 <code>R128-S2-SDK/lichee/rtos/projects/r128s2/pro_c906/src/main.c</code> ，文件</li><li>在 <strong>main函数</strong> 中如下位置添加如下代码：</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">cpu0_app_entry</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_NWATCH_100ASK</span></span>
    <span class="token keyword">int</span> argc <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
		<span class="token string">&quot;nwatch_100ask&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">nwatch_100ask_main</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
    <span class="token function">vTaskDelete</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，编译、打包： <strong>mrtos &amp;&amp; pack</strong></p><p>编译出来的镜像存放位置：<code>R128-S2-SDK/out/r128s2/pro/rtos_freertos_r128s2_pro_uart0_16Mnor.img</code></p><p>通过烧写工具将其烧写到开发板上，下一步，对各个模块进行接线。</p><h2 id="模块接线" tabindex="-1"><a class="header-anchor" href="#模块接线" aria-hidden="true">#</a> 模块接线</h2><p>IIC OLED模块接线：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>SCK ------- PB00
SDA ------- PB01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>EC11旋转编码器接线：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>S1   -------  PA24
S2   -------  PA25
KEY  -------  PA29
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>蜂鸣器模块接线：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>BEEP DATA PIN ------- PA26
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>红外接收模块接线：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>IR DATA PIN   -------   PA10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>DHT11模块：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DHT11 DATA PIN   -------   PA6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="技术交流" tabindex="-1"><a class="header-anchor" href="#技术交流" aria-hidden="true">#</a> 技术交流</h2>`,39),H={href:"https://bbs.aw-ol.com/recent?cid%5B%5D=2",target:"_blank",rel:"noopener noreferrer"},q={href:"https://forums.100ask.net",target:"_blank",rel:"noopener noreferrer"};function Z(F,$){const a=o("ExternalLinkIcon");return l(),c("div",null,[p,n("p",null,[s("本项目基于"),n("a",d,[s("DShanMCU-R128s2-DevKit"),e(a)]),s("开发，用意是提供一个综合的示例进行学习参考。")]),n("p",null,[s("本项目基于ZakKemble的开源项目-NWatch，GitHub仓库地址："),n("a",u,[s("https://github.com/ZakKemble/NWatch"),e(a)]),s("，原作者博客地址："),n("a",m,[s("https://blog.zakkemble.net/diy-digital-wristwatch"),e(a)])]),n("blockquote",null,[n("p",null,[s("与原作者的NWatch不一样的是，将其移植到"),n("a",h,[s("DShanMCU-R128s2-DevKit开发板"),e(a)]),s("上，同时相比于原作者添加了一些功能，比如恢复出厂设置功能，后续有时间会慢慢增加更多的功能。")])]),n("blockquote",null,[n("p",null,[s("本章节"),v,s("："),n("a",b,[s("https://www.bilibili.com/video/BV1oC4y1w7AH?p=26"),e(a)])])]),k,n("p",null,[n("a",_,[s("点击这里观看视频。"),e(a)])]),g,f,n("ul",null,[n("li",null,[n("a",S,[s("DShanMCU-R128s2-DevKit开发板"),e(a)]),s("："),n("a",E,[s("https://item.taobao.com/item.htm?id=736154682975"),e(a)])]),w,D,A,x,I]),R,y,n("ul",null,[n("li",null,[s("Gitee："),n("a",U,[s("https://gitee.com/weidongshan/100ask_r128_demos/tree/master/nwatch"),e(a)])]),n("li",null,[s("GitHub："),n("a",K,[s("https://github.com/100askTeam/100ask_r128_demos/tree/master/nwatch"),e(a)])])]),P,n("p",null,[s("如果你不想自己编译或者不需要二次开发，那么可以从这里获取固件，烧写固件到"),n("a",O,[s("DShanMCU-R128s2-DevKit"),e(a)]),s("后开机会自动启动NWatch任务，如果没有自动启动在串口终端输入命令然后按回车即可： "),N,s("。模块接线请阅读"),C,s("小节。")]),M,n("ul",null,[n("li",null,[s("Gitee："),n("a",T,[s("https://gitee.com/weidongshan/100ask_r128_demos/releases/tag/v0.0.1"),e(a)])]),n("li",null,[s("GitHub："),n("a",B,[s("https://github.com/100askTeam/100ask_r128_demos/releases/tag/v0.0.1"),e(a)])])]),L,n("ul",null,[n("li",null,[s("Gitee："),n("a",V,[s("https://gitee.com/weidongshan/100ask_r128_demos/tree/master/nwatch"),e(a)])]),n("li",null,[s("GitHub："),n("a",W,[s("https://github.com/100askTeam/100ask_r128_demos/tree/master/nwatch"),e(a)])])]),G,n("ul",null,[n("li",null,[s("Allwinne: "),n("a",H,[s("https://bbs.aw-ol.com"),e(a)])]),n("li",null,[s("100ASK: "),n("a",q,[s("https://forums.100ask.net"),e(a)])])])])}const z=i(r,[["render",Z],["__file","chapter2.html.vue"]]);export{z as default};
