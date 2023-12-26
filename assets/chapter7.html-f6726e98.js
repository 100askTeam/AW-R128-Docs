import{_ as n,o as a,c as s,e as t}from"./app-e85d5a28.js";const e={},p=t(`<h1 id="获取真随机数" tabindex="-1"><a class="header-anchor" href="#获取真随机数" aria-hidden="true">#</a> 获取真随机数</h1><table><thead><tr><th style="text-align:left;">本文案例代码</th><th style="text-align:left;">下载地址</th></tr></thead><tbody><tr><td style="text-align:left;">获取真随机数案例代码</td><td style="text-align:left;">https://www.aw-ol.com/downloads?cat=24</td></tr></tbody></table><p>R128 内置了TRNG，一个真随机数发生器，随机源是 8 路独立的环形振荡器，由模拟器件电源噪声产生频率抖动，用低频始终重采样，然后进行弹性抽取和熵提取处理，最终输出128bit真随机数。</p><h2 id="载入方案" tabindex="-1"><a class="header-anchor" href="#载入方案" aria-hidden="true">#</a> 载入方案</h2><p>我们使用的开发板是 R128-Devkit，需要开发 C906 核心的应用程序，所以载入方案选择<code>r128s2_module_c906</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">source</span> envsetup.sh 
$ lunch_rtos <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter7/image1.png" alt=""></p><h2 id="设置-trng驱动" tabindex="-1"><a class="header-anchor" href="#设置-trng驱动" aria-hidden="true">#</a> 设置 TRNG驱动</h2><p>运行 <code>mrtos_menuconfig</code> 进入配置页面。前往下列地址找到 <code>TRNG Devices</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Drivers Options  ---&gt;
    soc related device drivers  ---&gt;
            TRNG Devices ---&gt;
            -*- enable trng driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter7/image2.png" alt=""></p><h2 id="编写程序" tabindex="-1"><a class="header-anchor" href="#编写程序" aria-hidden="true">#</a> 编写程序</h2><p>打开你喜欢的编辑器，修改文件：<code>lichee/rtos/projects/r128s2/module_c906/src/main.c</code></p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter7/image3.png" alt=""></p><h3 id="引入头文件" tabindex="-1"><a class="header-anchor" href="#引入头文件" aria-hidden="true">#</a> 引入头文件</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sunxi_hal_trng.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter7/image4.png" alt=""></p><h2 id="初始化-trng-读取数据模块" tabindex="-1"><a class="header-anchor" href="#初始化-trng-读取数据模块" aria-hidden="true">#</a> 初始化 TRNG 读取数据模块</h2><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter7/image5.png" alt=""></p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">uint32_t</span> random<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">HAL_TRNG_Extract</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> random<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 读取 CRC 模式</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;trng CRC result: 0x%08x 0x%08x 0x%08x 0x%08x\\n&quot;</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">HAL_TRNG_Extract</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> random<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 读取 XOR 模式</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;trng XOR result: 0x%08x 0x%08x 0x%08x 0x%08x\\n&quot;</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><p>编译固件后烧录，可以看到随机数输出。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/demo/part1/chapter7/image6.png" alt=""></p>`,23),c=[p];function o(i,r){return a(),s("div",null,c)}const u=n(e,[["render",o],["__file","chapter7.html.vue"]]);export{u as default};