import{_ as n,o as a,c as s,e as t}from"./app-e85d5a28.js";const e={},p=t(`<h1 id="按键输入" tabindex="-1"><a class="header-anchor" href="#按键输入" aria-hidden="true">#</a> 按键输入</h1><table><thead><tr><th style="text-align:left;">本文案例代码</th><th style="text-align:left;">下载地址</th></tr></thead><tbody><tr><td style="text-align:left;">按键输入案例代码</td><td style="text-align:left;">https://www.aw-ol.com/downloads?cat=24</td></tr></tbody></table><p>首先我们搭建电路，如下：</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image1.png" alt=""></p><table><thead><tr><th style="text-align:left;">引脚</th><th style="text-align:left;">按键</th></tr></thead><tbody><tr><td style="text-align:left;">PA25</td><td style="text-align:left;">按键1脚</td></tr><tr><td style="text-align:left;">GND</td><td style="text-align:left;">按键3脚</td></tr></tbody></table><h2 id="载入方案" tabindex="-1"><a class="header-anchor" href="#载入方案" aria-hidden="true">#</a> 载入方案</h2><p>我们使用的开发板是 R128-Devkit，需要开发 C906 核心的应用程序，所以载入方案选择<code>r128s2_module_c906</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> envsetup.sh 
$ lunch_rtos <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image2.png" alt=""></p><h2 id="勾选-gpio-驱动" tabindex="-1"><a class="header-anchor" href="#勾选-gpio-驱动" aria-hidden="true">#</a> 勾选 GPIO 驱动</h2><p><code>mrtos_menuconfig</code> 找到下列驱动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Drivers Options  ---&gt;
    soc related device drivers  ---&gt;
            GPIO devices ---&gt;
                [*] enable GPIO driver
                [*] enbale GPIO hal APIs Test command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image3.png" alt=""></p><h2 id="编写程序" tabindex="-1"><a class="header-anchor" href="#编写程序" aria-hidden="true">#</a> 编写程序</h2><p>打开你喜欢的编辑器，修改文件：<code>lichee/rtos/projects/r128s2/module_c906/src/main.c</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image4.png" alt=""></p><h3 id="引入头文件" tabindex="-1"><a class="header-anchor" href="#引入头文件" aria-hidden="true">#</a> 引入头文件</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_gpio.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image5.png" alt=""></p><h3 id="使用-gpio-配置引脚" tabindex="-1"><a class="header-anchor" href="#使用-gpio-配置引脚" aria-hidden="true">#</a> 使用 GPIO 配置引脚</h3><h4 id="配置-gpio-的上下拉状态" tabindex="-1"><a class="header-anchor" href="#配置-gpio-的上下拉状态" aria-hidden="true">#</a> 配置 GPIO 的上下拉状态</h4><p>使用 <code>hal_gpio_set_pull(gpio_pin_t pin, gpio_pull_status_t pull);</code> 来设置。这里我们设置 <code>PA25</code> 引脚为默认上拉状态。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hal_gpio_set_pull</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_PULL_UP<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置-gpio-输入输出模式" tabindex="-1"><a class="header-anchor" href="#配置-gpio-输入输出模式" aria-hidden="true">#</a> 配置 GPIO 输入输出模式</h4><p>使用 <code>hal_gpio_set_direction(gpio_pin_t pin, gpio_direction_t direction);</code> 来设置 GPIO 的输入输出模式，这里配置为输入模式。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hal_gpio_set_direction</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_DIRECTION_INPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置-gpio-的-mux-功能" tabindex="-1"><a class="header-anchor" href="#配置-gpio-的-mux-功能" aria-hidden="true">#</a> 配置 GPIO 的 MUX 功能</h4><p>GPIO 通常有多种功能，需要配置 MUX 选择需要的功能，使用 <code>hal_gpio_pinmux_set_function(gpio_pin_t pin, gpio_muxsel_t function_index);</code> 来设置 GPIO 的复用功能，这里配置为GPIO 输入模式（<code>GPIO_MUXSEL_IN</code>）</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">hal_gpio_pinmux_set_function</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_MUXSEL_IN<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取-gpio-的电平" tabindex="-1"><a class="header-anchor" href="#获取-gpio-的电平" aria-hidden="true">#</a> 获取 GPIO 的电平</h4><p>使用 <code>int hal_gpio_get_data(gpio_pin_t pin, gpio_data_t *data);</code> 来获取 GPIO 的电平，这里获取 A25 的电平状态。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">gpio_data_t</span> gpio_data<span class="token punctuation">;</span>
<span class="token function">hal_gpio_get_data</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gpio_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="完整的配置-gpio" tabindex="-1"><a class="header-anchor" href="#完整的配置-gpio" aria-hidden="true">#</a> 完整的配置 GPIO</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">gpio_data_t</span> gpio_data<span class="token punctuation">;</span>
<span class="token function">hal_gpio_set_pull</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_PULL_UP<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">hal_gpio_set_direction</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_DIRECTION_INPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">hal_gpio_pinmux_set_function</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> GPIO_MUXSEL_IN<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">hal_gpio_get_data</span><span class="token punctuation">(</span><span class="token function">GPIOA</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gpio_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>gpio_data <span class="token operator">==</span> GPIO_DATA_LOW<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Key Pressed!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image6.png" alt=""></p><p>按下按键，串口会输出 <code>Key Pressed!</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter2/image7.png" alt=""></p>`,37),i=[p];function c(o,l){return a(),s("div",null,i)}const u=n(e,[["render",c],["__file","chapter2.html.vue"]]);export{u as default};