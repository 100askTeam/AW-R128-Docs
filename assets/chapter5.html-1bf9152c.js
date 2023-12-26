import{_ as n,o as s,c as a,e}from"./app-e85d5a28.js";const t={},p=e(`<h1 id="中断方式驱动旋转编码器" tabindex="-1"><a class="header-anchor" href="#中断方式驱动旋转编码器" aria-hidden="true">#</a> 中断方式驱动旋转编码器</h1><table><thead><tr><th style="text-align:left;">本文案例代码</th><th style="text-align:left;">下载地址</th></tr></thead><tbody><tr><td style="text-align:left;">中断方式驱动旋转编码器案例代码</td><td style="text-align:left;">https://www.aw-ol.com/downloads?cat=24</td></tr></tbody></table><p>旋转编码器是一种位置传感器，可将旋钮的角位置（旋转）转换为用于确定旋钮旋转方向的输出信号。</p><p>由于其坚固性和良好的数字控制；它们被用于许多应用中，包括机器人技术，CNC机器和打印机。</p><p>旋转编码器有两种类型-绝对式和增量式。绝对编码器为我们提供旋钮的精确位置（以度为单位），而增量编码器报告轴已移动了多少增量。</p><p>编码器内部是一个槽形磁盘，该磁盘连接到公共接地引脚C以及两个接触针A和B。旋转旋钮时，A和B根据旋转旋钮的方向以特定顺序与公共接地引脚C接触。</p><p>当它们接触公共接地时，它们会产生信号。当一个引脚先于另一引脚接触时，这些信号就会彼此错开90°。这称为<strong>正交编码</strong>。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image1.webp" alt=""></p><p>顺时针旋转旋钮时，首先连接A引脚，然后连接B引脚。逆时针旋转旋钮时，首先连接B引脚，然后连接A引脚。</p><p>通过跟踪每个引脚何时与地面连接或与地面断开，我们可以使用这些信号变化来确定旋钮的旋转方向。您可以通过在A更改状态时观察B的状态来做到这一点。</p><p>我们搭建电路，如下：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image2.png" alt=""></p><table><thead><tr><th style="text-align:left;">引脚</th><th style="text-align:left;">按键</th></tr></thead><tbody><tr><td style="text-align:left;">PA24</td><td style="text-align:left;">编码器 CLK</td></tr><tr><td style="text-align:left;">PA25</td><td style="text-align:left;">编码器 DT</td></tr><tr><td style="text-align:left;">PA29</td><td style="text-align:left;">编码器 SW（未使用）</td></tr></tbody></table><h2 id="载入方案" tabindex="-1"><a class="header-anchor" href="#载入方案" aria-hidden="true">#</a> 载入方案</h2><p>我们使用的开发板是 R128-Devkit，需要开发 C906 核心的应用程序，所以载入方案选择<code>r128s2_module_c906</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> envsetup.sh 
$ lunch_rtos <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image3.png" alt=""></p><h2 id="勾选-gpio-驱动" tabindex="-1"><a class="header-anchor" href="#勾选-gpio-驱动" aria-hidden="true">#</a> 勾选 GPIO 驱动</h2><p><code>mrtos_menuconfig</code> 找到下列驱动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Drivers Options  ---&gt;
    soc related device drivers  ---&gt;
            GPIO devices ---&gt;
                [*] enable GPIO driver
                [*] enbale GPIO hal APIs Test command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image4.png" alt=""></p><h2 id="编写程序" tabindex="-1"><a class="header-anchor" href="#编写程序" aria-hidden="true">#</a> 编写程序</h2><p>打开你喜欢的编辑器，修改文件：<code>lichee/rtos/projects/r128s2/module_c906/src/main.c</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image5.png" alt=""></p><h3 id="引入头文件" tabindex="-1"><a class="header-anchor" href="#引入头文件" aria-hidden="true">#</a> 引入头文件</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_gpio.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image6.png" alt=""></p><h3 id="使用-gpio-配置引脚" tabindex="-1"><a class="header-anchor" href="#使用-gpio-配置引脚" aria-hidden="true">#</a> 使用 GPIO 配置引脚</h3><h4 id="配置-gpio-的上下拉状态" tabindex="-1"><a class="header-anchor" href="#配置-gpio-的上下拉状态" aria-hidden="true">#</a> 配置 GPIO 的上下拉状态</h4><p>使用 <code>hal_gpio_set_pull(gpio_pin_t pin, gpio_pull_status_t pull);</code> 来设置。这里我们设置 <code>PA25</code> 引脚为默认上拉状态。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hal_gpio_set_pull</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_PULL_UP<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置-gpio-输入输出模式" tabindex="-1"><a class="header-anchor" href="#配置-gpio-输入输出模式" aria-hidden="true">#</a> 配置 GPIO 输入输出模式</h4><p>使用 <code>hal_gpio_set_direction(gpio_pin_t pin, gpio_direction_t direction);</code> 来设置 GPIO 的输入输出模式，这里配置为输入模式。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hal_gpio_set_direction</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_DIRECTION_INPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置-gpio-的-mux-功能" tabindex="-1"><a class="header-anchor" href="#配置-gpio-的-mux-功能" aria-hidden="true">#</a> 配置 GPIO 的 MUX 功能</h4><p>GPIO 通常有多种功能，需要配置 MUX 选择需要的功能，使用 <code>hal_gpio_pinmux_set_function(gpio_pin_t pin, gpio_muxsel_t function_index);</code> 来设置 GPIO 的复用功能，这里配置为GPIO 输入模式（<code>GPIO_MUXSEL_IN</code>）</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hal_gpio_pinmux_set_function</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_MUXSEL_IN<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取-gpio-的电平" tabindex="-1"><a class="header-anchor" href="#获取-gpio-的电平" aria-hidden="true">#</a> 获取 GPIO 的电平</h4><p>使用 <code>int hal_gpio_get_data(gpio_pin_t pin, gpio_data_t *data);</code> 来获取 GPIO 的电平</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">gpio_data_t</span> gpio_data<span class="token punctuation">;</span>
<span class="token function">hal_gpio_get_data</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gpio_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="申请配置中断" tabindex="-1"><a class="header-anchor" href="#申请配置中断" aria-hidden="true">#</a> 申请配置中断</h4><p>使用 <code>hal_gpio_to_irq</code> 方法来申请中断号。<code>hal_gpio_irq_request</code> 绑定中断服务，<code>hal_gpio_irq_enable</code> 启用中断。这里配置一个</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 存放中断号
uint32_t irq_clk;
// 申请中断号
ret = hal_gpio_to_irq(ENC_CLK, &amp;irq_clk);
if (ret &lt; 0){
    printf(&quot;gpio to irq error, irq num:%d error num: %d\\n&quot;, irq_clk, ret);
}

// 绑定中断处理函数
ret = hal_gpio_irq_request(irq_clk, gpio_irq_encode, IRQ_TYPE_EDGE_BOTH, NULL);
if (ret &lt; 0){
    printf(&quot;request irq error, irq num:%d error num: %d\\n&quot;, irq_clk, ret);
}

// 启用中断
ret = hal_gpio_irq_enable(irq_clk);
if (ret &lt; 0){
    printf(&quot;request irq error, error num: %d\\n&quot;, ret);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> 完整代码</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdint.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;interrupt.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;portmacro.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cli_console.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;aw_version.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_time.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_gpio.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;FreeRTOS.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;task.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;tinatest.h&quot;</span></span>

<span class="token keyword">extern</span> <span class="token keyword">int</span> <span class="token function">amp_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 定义旋转编码器的引脚</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">ENC_CLK</span> <span class="token expression"><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">ENC_DT</span> <span class="token expression"><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">ENC_SW</span> <span class="token expression"><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">29</span><span class="token punctuation">)</span></span></span>

<span class="token comment">// 相关全局变量存储</span>
<span class="token keyword">int</span> encode_counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> encode_current_clk<span class="token punctuation">;</span>
<span class="token keyword">int</span> encode_lask_clk<span class="token punctuation">;</span>
<span class="token keyword">int</span> current_dir <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// 编码器中断处理函数</span>
<span class="token keyword">static</span> <span class="token class-name">hal_irqreturn_t</span> <span class="token function">gpio_irq_encode</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 获取引脚的高低电平状态</span>
    <span class="token class-name">gpio_data_t</span> clk_value <span class="token operator">=</span> GPIO_DATA_LOW<span class="token punctuation">;</span>
    <span class="token class-name">gpio_data_t</span> dt_value <span class="token operator">=</span> GPIO_DATA_LOW<span class="token punctuation">;</span>
    <span class="token function">hal_gpio_get_data</span><span class="token punctuation">(</span>ENC_DT<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dt_value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_gpio_get_data</span><span class="token punctuation">(</span>ENC_CLK<span class="token punctuation">,</span> <span class="token operator">&amp;</span>clk_value<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断当前数据状态</span>
    encode_current_clk <span class="token operator">=</span> clk_value<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>encode_current_clk <span class="token operator">!=</span> encode_lask_clk <span class="token operator">&amp;&amp;</span> encode_current_clk <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 判断正反转</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dt_value <span class="token operator">!=</span> encode_current_clk<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 正转</span>
            encode_counter <span class="token operator">++</span><span class="token punctuation">;</span>
            current_dir <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 反转</span>
            encode_counter <span class="token operator">--</span><span class="token punctuation">;</span>
            current_dir <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Direction = %d, Counter = %d\\n&quot;</span><span class="token punctuation">,</span> current_dir<span class="token punctuation">,</span> encode_counter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 刷新当前状态</span>
    encode_lask_clk <span class="token operator">=</span> encode_current_clk<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">cpu0_app_entry</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// 初始化系统资源</span>
    <span class="token function">amp_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// A24 -&gt; CLK, A25 -&gt; DT. A29 -&gt; SW</span>
    <span class="token function">hal_gpio_set_pull</span><span class="token punctuation">(</span>ENC_CLK<span class="token punctuation">,</span> GPIO_PULL_DOWN_DISABLED<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_gpio_set_direction</span><span class="token punctuation">(</span>ENC_CLK<span class="token punctuation">,</span> GPIO_DIRECTION_INPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_gpio_pinmux_set_function</span><span class="token punctuation">(</span>ENC_CLK<span class="token punctuation">,</span> GPIO_MUXSEL_IN<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取初始编码器 CLK 状态</span>
    <span class="token class-name">gpio_data_t</span> clk_data<span class="token punctuation">;</span>
    <span class="token function">hal_gpio_get_data</span><span class="token punctuation">(</span>ENC_CLK<span class="token punctuation">,</span> <span class="token operator">&amp;</span>clk_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    encode_lask_clk <span class="token operator">=</span> clk_data<span class="token punctuation">;</span>

    <span class="token function">hal_gpio_set_pull</span><span class="token punctuation">(</span>ENC_DT<span class="token punctuation">,</span> GPIO_PULL_DOWN_DISABLED<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_gpio_set_direction</span><span class="token punctuation">(</span>ENC_DT<span class="token punctuation">,</span> GPIO_DIRECTION_INPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">hal_gpio_pinmux_set_function</span><span class="token punctuation">(</span>ENC_DT<span class="token punctuation">,</span> GPIO_MUXSEL_IN<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 存放 CLK，DT 中断号</span>
    <span class="token class-name">uint32_t</span> irq_clk<span class="token punctuation">,</span> irq_dt<span class="token punctuation">;</span>

    <span class="token comment">// 申请 ENC_CLK 为中断引脚，跳变触发</span>
    ret <span class="token operator">=</span> <span class="token function">hal_gpio_to_irq</span><span class="token punctuation">(</span>ENC_CLK<span class="token punctuation">,</span> <span class="token operator">&amp;</span>irq_clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;gpio to irq error, irq num:%d error num: %d\\n&quot;</span><span class="token punctuation">,</span> irq_clk<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 绑定中断处理函数</span>
    ret <span class="token operator">=</span> <span class="token function">hal_gpio_irq_request</span><span class="token punctuation">(</span>irq_clk<span class="token punctuation">,</span> gpio_irq_encode<span class="token punctuation">,</span> IRQ_TYPE_EDGE_BOTH<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;request irq error, irq num:%d error num: %d\\n&quot;</span><span class="token punctuation">,</span> irq_clk<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 启用中断</span>
    ret <span class="token operator">=</span> <span class="token function">hal_gpio_irq_enable</span><span class="token punctuation">(</span>irq_clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;request irq error, error num: %d\\n&quot;</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 申请 ENC_DT 为中断引脚，跳变触发</span>
    ret <span class="token operator">=</span> <span class="token function">hal_gpio_to_irq</span><span class="token punctuation">(</span>ENC_DT<span class="token punctuation">,</span> <span class="token operator">&amp;</span>irq_dt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;gpio to irq error, irq num:%d error num: %d\\n&quot;</span><span class="token punctuation">,</span> irq_dt<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 绑定中断处理函数</span>
    ret <span class="token operator">=</span> <span class="token function">hal_gpio_irq_request</span><span class="token punctuation">(</span>irq_dt<span class="token punctuation">,</span> gpio_irq_encode<span class="token punctuation">,</span> IRQ_TYPE_EDGE_BOTH<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;request irq error, irq num:%d error num: %d\\n&quot;</span><span class="token punctuation">,</span> irq_dt<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 启用中断</span>
    ret <span class="token operator">=</span> <span class="token function">hal_gpio_irq_enable</span><span class="token punctuation">(</span>irq_dt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;request irq error, error num: %d\\n&quot;</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">vTaskDelete</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><p>旋转旋转编码器即可看到计数变化</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter5/image7.png" alt=""></p>`,48),i=[p];function c(o,l){return s(),a("div",null,i)}const u=n(t,[["render",c],["__file","chapter5.html.vue"]]);export{u as default};