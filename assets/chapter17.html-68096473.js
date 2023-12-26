import{_ as i,r as p,o as l,c,a as s,b as n,d as t,e as a}from"./app-e85d5a28.js";const o={},d=a(`<h1 id="dbi-驱动-tft-lcd-屏" tabindex="-1"><a class="header-anchor" href="#dbi-驱动-tft-lcd-屏" aria-hidden="true">#</a> DBI 驱动 TFT LCD 屏</h1><p>R128 平台提供了 SPI DBI 的 SPI TFT 接口，具有如下特点：</p><ul><li>Supports DBI Type C 3 Line/4 Line Interface Mode</li><li>Supports 2 Data Lane Interface Mode</li><li>Supports data source from CPU or DMA</li><li>Supports RGB111/444/565/666/888 video format</li><li>Maximum resolution of RGB666 240 x 320@30Hz with single data lane</li><li>Maximum resolution of RGB888 240 x 320@60Hz or 320 x 480@30Hz with dual data lane</li><li>Supports tearing effect</li><li>Supports software flexible control video frame rate</li></ul><p>同时，提供了SPILCD驱动框架以供 SPI 屏幕使用。</p><p>本次使用的是 Dshan_Display Module，如下图：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image1.png" alt=""></p><p>引脚配置如下：</p><table><thead><tr><th style="text-align:left;">R128 Devkit</th><th style="text-align:left;">TFT 模块</th></tr></thead><tbody><tr><td style="text-align:left;">PA12</td><td style="text-align:left;">CS</td></tr><tr><td style="text-align:left;">PA13</td><td style="text-align:left;">SCK</td></tr><tr><td style="text-align:left;">PA18</td><td style="text-align:left;">MOSI</td></tr><tr><td style="text-align:left;">PA9</td><td style="text-align:left;">PWM</td></tr><tr><td style="text-align:left;">PA20</td><td style="text-align:left;">RESET</td></tr><tr><td style="text-align:left;">PA19</td><td style="text-align:left;">RS</td></tr><tr><td style="text-align:left;">3V3</td><td style="text-align:left;">3.3V</td></tr><tr><td style="text-align:left;">GND</td><td style="text-align:left;">GND</td></tr></tbody></table><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image2.png" alt=""></p><h2 id="载入方案" tabindex="-1"><a class="header-anchor" href="#载入方案" aria-hidden="true">#</a> 载入方案</h2><p>我们使用的开发板是 R128-Devkit，需要开发 C906 核心的应用程序，所以载入方案选择 <code>r128s2_module_c906</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> envsetup.sh 
$ lunch_rtos <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image3.png" alt=""></p><h2 id="设置-dbi-驱动" tabindex="-1"><a class="header-anchor" href="#设置-dbi-驱动" aria-hidden="true">#</a> 设置 DBI 驱动</h2><p>屏幕使用的是DBI驱动，所以需要勾选DBI驱动，运行 <code>mrtos_menuconfig</code> 进入配置页面。前往下列地址找到 <code>DBI Devices</code></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>Drivers Options  <span class="token operator">--</span><span class="token operator">-&gt;</span>
    soc related device drivers  <span class="token operator">--</span><span class="token operator">-&gt;</span>
        DBI Devices <span class="token operator">--</span><span class="token operator">-&gt;</span>
        <span class="token operator">-</span><span class="token operator">*</span><span class="token operator">-</span> enable dbi driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image4.png" alt=""></p><h3 id="配置-spi-引脚" tabindex="-1"><a class="header-anchor" href="#配置-spi-引脚" aria-hidden="true">#</a> 配置 SPI 引脚</h3><p>打开你喜欢的编辑器，修改文件：<code>board/r128s2/module/configs/sys_config.fex</code>，在这里我们不需要用到 SPI HOLD与SPI WP引脚，注释掉即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>;----------------------------------------------------------------------------------
;SPI controller configuration
;----------------------------------------------------------------------------------
;Please config spi in dts
[spi1]
spi1_used       = 1
spi1_cs_number  = 1
spi1_cs_bitmap  = 1
spi1_cs0        = port:PA12&lt;6&gt;&lt;0&gt;&lt;3&gt;&lt;default&gt;
spi1_sclk       = port:PA13&lt;6&gt;&lt;0&gt;&lt;3&gt;&lt;default&gt;
spi1_mosi       = port:PA18&lt;6&gt;&lt;0&gt;&lt;3&gt;&lt;default&gt;
spi1_miso       = port:PA21&lt;6&gt;&lt;0&gt;&lt;3&gt;&lt;default&gt;
spi1_hold       = port:PA19&lt;6&gt;&lt;0&gt;&lt;3&gt;&lt;default&gt;
;spi1_wp         = port:PA20&lt;6&gt;&lt;0&gt;&lt;2&gt;&lt;default&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image5.png" alt=""></p><h2 id="设置-pwm-驱动" tabindex="-1"><a class="header-anchor" href="#设置-pwm-驱动" aria-hidden="true">#</a> 设置 PWM 驱动</h2><p>屏幕背光使用的是PWM驱动，所以需要勾选PWM驱动，运行 <code>mrtos_menuconfig</code> 进入配置页面。前往下列地址找到 <code>PWM Devices</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Drivers Options  ---&gt;
    soc related device drivers  ---&gt;
        PWM Devices ---&gt;
        -*- enable pwm driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image6.png" alt=""></p><h3 id="配置-pwm-引脚" tabindex="-1"><a class="header-anchor" href="#配置-pwm-引脚" aria-hidden="true">#</a> 配置 PWM 引脚</h3><p>打开你喜欢的编辑器，修改文件：<code>board/r128s2/module/configs/sys_config.fex</code>，增加 PWM1 节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[pwm1]
pwm_used        = 1
pwm_positive    = port:PA9&lt;4&gt;&lt;0&gt;&lt;3&gt;&lt;default&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image7.png" alt=""></p><h2 id="设置-spi-lcd-驱动" tabindex="-1"><a class="header-anchor" href="#设置-spi-lcd-驱动" aria-hidden="true">#</a> 设置 SPI LCD 驱动</h2><p>SPI LCD 由专门的驱动管理。运行 <code>mrtos_menuconfig</code> 进入配置页面。前往下列地址找到 <code>SPILCD Devices</code> ，注意同时勾选 <code>spilcd hal APIs test</code> 方便测试使用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Drivers Options  ---&gt;
    soc related device drivers  ---&gt;
        [*] DISP Driver Support(spi_lcd)
        [*]   spilcd hal APIs test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image8.png" alt=""></p><h3 id="选择驱动的显示屏" tabindex="-1"><a class="header-anchor" href="#选择驱动的显示屏" aria-hidden="true">#</a> 选择驱动的显示屏</h3>`,34),r=s("code",null,"LCD_FB panels select",-1),u={href:"https://r128.docs.aw-ol.com/sdk_base/spilcd/",target:"_blank",rel:"noopener noreferrer"},v=a(`<p>进入 <code>LCD_FB panels select</code> 选项</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image9.png" alt=""></p><p>选择并勾选 <code>[*] LCD support JLT35031C panel</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image10.png" alt=""></p><h3 id="配置-spi-lcd-引脚" tabindex="-1"><a class="header-anchor" href="#配置-spi-lcd-引脚" aria-hidden="true">#</a> 配置 SPI LCD 引脚</h3><p>打开你喜欢的编辑器，修改文件：<code>board/r128s2/module/configs/sys_config.fex</code></p><blockquote><p>FEX 解析器不支持行尾注释，直接复制需要删除行尾的注释</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>;----------------------------------------------------------------------------------
;lcd_fb0 configuration
;----------------------------------------------------------------------------------
[lcd_fb0]
;使用显示屏
lcd_used            = 1              
;模型：spilcd
lcd_model_name      = &quot;spilcd&quot;       
;屏幕驱动：jlt35031c
lcd_driver_name     = &quot;jlt35031c&quot;    
;屏幕宽分辨率
lcd_x               = 320            
;屏幕高分辨率
lcd_y               = 480            
;屏幕物理宽度
lcd_width           = 49             
;屏幕物理高度
lcd_height          = 74             
;SPI 驱动频率 60MHz
lcd_data_speed      = 60             
;lcd使用pwm背光
lcd_pwm_used        = 1              
;lcd使用pwm背光通道1
lcd_pwm_ch          = 1              
;lcd使用pwm背光频率5000Hz
lcd_pwm_freq        = 5000           
;lcd使用pwm背光相位0
lcd_pwm_pol         = 0              
;lcd使用spi接口，0-spi, 1-dbi
lcd_if              = 1              
;以下内容详见 SPILCD 文档
lcd_pixel_fmt       = 10             
lcd_dbi_fmt         = 2              
lcd_dbi_clk_mode    = 0              
lcd_dbi_te          = 0              
fb_buffer_num       = 2              
lcd_dbi_if          = 2              
lcd_rgb_order       = 0              
lcd_fps             = 60             
lcd_spi_bus_num     = 1              
lcd_frm             = 2              
lcd_gamma_en        = 1              
lcd_backlight       = 100            

lcd_power_num       = 0              
lcd_gpio_regu_num   = 0              
lcd_bl_percent_num  = 0              

;复位脚
lcd_gpio_0          = port:PA20&lt;1&gt;&lt;0&gt;&lt;2&gt;&lt;0&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image11.png" alt=""></p><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><p>以上配置完成后，编译打包烧录，上电后屏幕背光亮起，屏幕为黑色。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image12.png" alt=""></p><p>并且可以在 LOG 中看到 <code>[LCD_FB] lcd_fb_probe,line:103:</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image13.png" alt=""></p><p>然后可以用 <code>test_spilcd</code> 测试屏幕，日志如下</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image14.png" alt=""></p><p>执行命令之后屏幕会变为蓝色。</p>`,17),m={href:"https://r128.docs.aw-ol.com/sdk_base/spilcd/#_20",target:"_blank",rel:"noopener noreferrer"},k=a(`<p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter17/image15.png" alt=""></p><p><code>test_spilcd</code> 代码如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdint.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_cache.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_mem.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_log.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_cmd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_lcd_fb.h&gt;</span></span>

<span class="token keyword">static</span> <span class="token class-name">uint32_t</span> width<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint32_t</span> height<span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">long</span> <span class="token keyword">int</span> screensize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">char</span> <span class="token operator">*</span>fbsmem_start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">lcdfb_fb_init</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> yoffset<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">fb_info</span> <span class="token operator">*</span>p_info<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    p_info<span class="token operator">-&gt;</span>screen_base <span class="token operator">=</span> fbsmem_start<span class="token punctuation">;</span>
    p_info<span class="token operator">-&gt;</span>var<span class="token punctuation">.</span>xres <span class="token operator">=</span> width<span class="token punctuation">;</span>
    p_info<span class="token operator">-&gt;</span>var<span class="token punctuation">.</span>yres <span class="token operator">=</span> height<span class="token punctuation">;</span>
    p_info<span class="token operator">-&gt;</span>var<span class="token punctuation">.</span>xoffset <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    p_info<span class="token operator">-&gt;</span>var<span class="token punctuation">.</span>yoffset <span class="token operator">=</span> yoffset<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">show_rgb</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> sel<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> ret <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">fb_info</span> fb_info<span class="token punctuation">;</span>
    <span class="token keyword">int</span> bpp <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> color<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0xff</span><span class="token punctuation">,</span><span class="token number">0x0</span><span class="token punctuation">,</span><span class="token number">0xff</span><span class="token punctuation">,</span><span class="token number">0x0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    width <span class="token operator">=</span> <span class="token function">bsp_disp_get_screen_width</span><span class="token punctuation">(</span>sel<span class="token punctuation">)</span><span class="token punctuation">;</span>
    height <span class="token operator">=</span> <span class="token function">bsp_disp_get_screen_height</span><span class="token punctuation">(</span>sel<span class="token punctuation">)</span><span class="token punctuation">;</span>

    screensize <span class="token operator">=</span> width <span class="token operator">*</span> bpp <span class="token operator">*</span> height<span class="token punctuation">;</span>
    fbsmem_start <span class="token operator">=</span> <span class="token function">hal_malloc_coherent</span><span class="token punctuation">(</span>screensize<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;width = %d, height = %d, screensize = %d, fbsmem_start = %x\\n&quot;</span><span class="token punctuation">,</span>
            width<span class="token punctuation">,</span> height<span class="token punctuation">,</span> screensize<span class="token punctuation">,</span> fbsmem_start<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">memset</span><span class="token punctuation">(</span>fbsmem_start<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> screensize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> screensize <span class="token operator">/</span> bpp<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span>fbsmem_start<span class="token operator">+</span>i<span class="token operator">*</span>bpp<span class="token punctuation">,</span> color<span class="token punctuation">,</span> bpp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>fb_info<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">fb_info</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">lcdfb_fb_init</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>fb_info<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_dcache_clean</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span><span class="token punctuation">)</span>fbsmem_start<span class="token punctuation">,</span> screensize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">bsp_disp_lcd_set_layer</span><span class="token punctuation">(</span>sel<span class="token punctuation">,</span> <span class="token operator">&amp;</span>fb_info<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">hal_free_coherent</span><span class="token punctuation">(</span>fbsmem_start<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">cmd_test_spilcd</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">uint8_t</span> ret<span class="token punctuation">;</span>

    <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;Run spilcd hal layer test case\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    ret <span class="token operator">=</span> <span class="token function">show_rgb</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">hal_log_info</span><span class="token punctuation">(</span><span class="token string">&quot;spilcd test finish\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">FINSH_FUNCTION_EXPORT_CMD</span><span class="token punctuation">(</span>cmd_test_spilcd<span class="token punctuation">,</span> test_spilcd<span class="token punctuation">,</span> spilcd hal APIs tests<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function b(h,g){const e=p("ExternalLinkIcon");return l(),c("div",null,[d,s("p",null,[n("在 SPILCD 驱动选择界面可以看到 "),r,n(" 选择 SPI 屏幕的驱动，"),s("strong",null,[n("本文只注重于 SPI LCD 的使用，驱动编写请查看《"),s("a",u,[n("SPI LCD 显示驱动"),t(e)]),n("》")])]),v,s("ul",null,[s("li",null,[n("SPI 屏幕颜色说明：<"),s("a",m,[n("SPI LCD 显示驱动 - SPI LCD 颜色相关问题"),t(e)]),n(">")])]),k])}const f=i(o,[["render",b],["__file","chapter17.html.vue"]]);export{f as default};
