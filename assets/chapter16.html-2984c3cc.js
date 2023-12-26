import{_ as n,o as s,c as a,e as t}from"./app-e85d5a28.js";const e={},p=t(`<h1 id="trng" tabindex="-1"><a class="header-anchor" href="#trng" aria-hidden="true">#</a> TRNG</h1><p>TRNG是真随机数发生器，随机源是8 路独立的环形振荡器，由模拟器件电源噪声产生频率抖动，用低频始终重采样，然后进行弹性抽取和熵提取处理，最终输出128bit真随机数。</p><h2 id="模块配置" tabindex="-1"><a class="header-anchor" href="#模块配置" aria-hidden="true">#</a> 模块配置</h2><p>其 menuconfig 的配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Kernel Setup ---&gt;
    Drivers Setup ---&gt;
        SoC HAL Drivers ---&gt;
            TRNG devices ---&gt;
                [*] enable trng driver
                [*] enbale trng hal APIs Test command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码结构" tabindex="-1"><a class="header-anchor" href="#源码结构" aria-hidden="true">#</a> 源码结构</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>drv_trng.c
drv_trng.h
hal_trng.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块接口说明" tabindex="-1"><a class="header-anchor" href="#模块接口说明" aria-hidden="true">#</a> 模块接口说明</h2><p>头文件</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sunxi_hal_trng.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="返回值枚举" tabindex="-1"><a class="header-anchor" href="#返回值枚举" aria-hidden="true">#</a> 返回值枚举</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">enum</span>
<span class="token punctuation">{</span>
    HAL_TRNG_STATUS_OK      <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>    <span class="token comment">/* success */</span>
    HAL_TRNG_STATUS_ERROR   <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>   <span class="token comment">/* general error */</span>
    HAL_TRNG_STATUS_BUSY    <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span>   <span class="token comment">/* device or resource busy */</span>
    HAL_TRNG_STATUS_TIMEOUT <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span>   <span class="token comment">/* wait timeout */</span>
    HAL_TRNG_STATUS_INVALID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">4</span>    <span class="token comment">/* invalid argument */</span>
<span class="token punctuation">}</span> HAL_TRNG_Status<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取随机数" tabindex="-1"><a class="header-anchor" href="#获取随机数" aria-hidden="true">#</a> 获取随机数</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>HAL_TRNG_Status <span class="token function">HAL_TRNG_Extract</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> type<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> random<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>type：随机数生成熵提取模式（0：crc，1：xor）</li><li>random：存放生成的随机数</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h2 id="模块使用范例" tabindex="-1"><a class="header-anchor" href="#模块使用范例" aria-hidden="true">#</a> 模块使用范例</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_log.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_cmd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sunxi_hal_trng.h&gt;</span></span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">cmd_test_trng</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> random<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">!=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parameter number Error!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Usage: hal_trng &lt;crc|xor&gt;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;crc&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">HAL_TRNG_Extract</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> random<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">strcmp</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;xor&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token function">HAL_TRNG_Extract</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> random<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parameter Error!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Usage: hal_trng &lt;crc|xor&gt;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ret <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;trng extract failed: %d\\n&quot;</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;trng result: 0x%08x 0x%08x 0x%08x 0x%08x\\n&quot;</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> random<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">FINSH_FUNCTION_EXPORT_CMD</span><span class="token punctuation">(</span>cmd_test_trng<span class="token punctuation">,</span> hal_trng<span class="token punctuation">,</span> trng hal APIs tests<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","chapter16.html.vue"]]);export{r as default};