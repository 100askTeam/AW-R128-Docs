import{_ as n,o as s,c as a,e}from"./app-e85d5a28.js";const t={},p=e(`<h1 id="ccu" tabindex="-1"><a class="header-anchor" href="#ccu" aria-hidden="true">#</a> CCU</h1><p>介绍 RTOS 中CCU 驱动的接口及使用方法，为 CCU 的使用者提供参考。</p><h2 id="模块介绍" tabindex="-1"><a class="header-anchor" href="#模块介绍" aria-hidden="true">#</a> 模块介绍</h2><p>CCU 驱动主要实现设备驱动的底层细节，并为上层提供一套标准的API 接口以供使用。</p><h2 id="模块配置" tabindex="-1"><a class="header-anchor" href="#模块配置" aria-hidden="true">#</a> 模块配置</h2><p>其menuconfig 的配置如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Kernel Setup ---<span class="token operator">&gt;</span>
    Drivers Setup ---<span class="token operator">&gt;</span>
        SoC HAL Drivers ---<span class="token operator">&gt;</span>
            CCMU devices ---<span class="token operator">&gt;</span>
                <span class="token punctuation">[</span>*<span class="token punctuation">]</span> <span class="token builtin class-name">enable</span> ccmu-ng driver
                <span class="token punctuation">[</span>*<span class="token punctuation">]</span> enbale ccmu-ng hal APIs Test <span class="token builtin class-name">command</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码结构" tabindex="-1"><a class="header-anchor" href="#源码结构" aria-hidden="true">#</a> 源码结构</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token punctuation">.</span>
│  common_ccmu<span class="token punctuation">.</span>h
│  hal_clk<span class="token punctuation">.</span>c
│  hal_reset<span class="token punctuation">.</span>c
│  Kconfig
│  Makefile
│  platform_ccmu<span class="token punctuation">.</span>h
│  platform_rst<span class="token punctuation">.</span>h
│
├─sunxi
│  │  clk<span class="token punctuation">.</span>c
│  │  clk<span class="token punctuation">.</span>h
│  │  clk_factors<span class="token punctuation">.</span>c
│  │  clk_factors<span class="token punctuation">.</span>h
│  │  clk_periph<span class="token punctuation">.</span>c
│  │  clk_periph<span class="token punctuation">.</span>h
│  │  Makefile
│  │  platform_clk<span class="token punctuation">.</span>h
│  │
│  └─sun8iw21p1             # sun8iw21p1平台实现<span class="token punctuation">(</span>老平台，目前使用ng驱动<span class="token punctuation">)</span>
│          clk_sun8iw21<span class="token punctuation">.</span>c
│          clk_sun8iw21<span class="token punctuation">.</span>h
│          Makefile
│
└─sunxi<span class="token operator">-</span>ng                  # sunxi<span class="token operator">-</span>ng 驱动实现
        ccu<span class="token operator">-</span>sun20iw2<span class="token operator">-</span>aon<span class="token punctuation">.</span>c
        ccu<span class="token operator">-</span>sun20iw2<span class="token operator">-</span>aon<span class="token punctuation">.</span>h
        ccu<span class="token operator">-</span>sun20iw2<span class="token operator">-</span>r<span class="token punctuation">.</span>c
        ccu<span class="token operator">-</span>sun20iw2<span class="token operator">-</span>r<span class="token punctuation">.</span>h
        ccu<span class="token operator">-</span>sun20iw2<span class="token punctuation">.</span>c
        ccu<span class="token operator">-</span>sun20iw2<span class="token punctuation">.</span>h
        ccu<span class="token punctuation">.</span>c
        ccu<span class="token punctuation">.</span>h
        ccu_common<span class="token punctuation">.</span>c
        ccu_common<span class="token punctuation">.</span>h
        ccu_div<span class="token punctuation">.</span>c
        ccu_div<span class="token punctuation">.</span>h
        ccu_frac<span class="token punctuation">.</span>c
        ccu_frac<span class="token punctuation">.</span>h
        ccu_gate<span class="token punctuation">.</span>c
        ccu_gate<span class="token punctuation">.</span>h
        ccu_mp<span class="token punctuation">.</span>c
        ccu_mp<span class="token punctuation">.</span>h
        ccu_mult<span class="token punctuation">.</span>c
        ccu_mult<span class="token punctuation">.</span>h
        ccu_mux<span class="token punctuation">.</span>c
        ccu_mux<span class="token punctuation">.</span>h
        ccu_nk<span class="token punctuation">.</span>c
        ccu_nk<span class="token punctuation">.</span>h
        ccu_nkm<span class="token punctuation">.</span>c
        ccu_nkm<span class="token punctuation">.</span>h
        ccu_nkmp<span class="token punctuation">.</span>c
        ccu_nkmp<span class="token punctuation">.</span>h
        ccu_nm<span class="token punctuation">.</span>c
        ccu_nm<span class="token punctuation">.</span>h
        ccu_phase<span class="token punctuation">.</span>c
        ccu_phase<span class="token punctuation">.</span>h
        ccu_reset<span class="token punctuation">.</span>c
        ccu_reset<span class="token punctuation">.</span>h
        ccu_sdm<span class="token punctuation">.</span>c
        ccu_sdm<span class="token punctuation">.</span>h
        clk<span class="token operator">-</span>divider<span class="token punctuation">.</span>c
        clk<span class="token operator">-</span>fixed<span class="token operator">-</span>factor<span class="token punctuation">.</span>c
        clk<span class="token operator">-</span>fixed<span class="token operator">-</span>rate<span class="token punctuation">.</span>c
        clk<span class="token operator">-</span>fixed<span class="token operator">-</span>rate<span class="token punctuation">.</span>h
        clk<span class="token punctuation">.</span>c
        clk<span class="token punctuation">.</span>h
        Makefile
        rst<span class="token operator">-</span>sun20iw2<span class="token operator">-</span>aon<span class="token punctuation">.</span>h
        rst<span class="token operator">-</span>sun20iw2<span class="token operator">-</span>r<span class="token punctuation">.</span>h
        rst<span class="token operator">-</span>sun20iw2<span class="token punctuation">.</span>h
        type<span class="token punctuation">.</span>h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块接口说明" tabindex="-1"><a class="header-anchor" href="#模块接口说明" aria-hidden="true">#</a> 模块接口说明</h2><p>头文件</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_clk.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_reset.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;ccmu/common_ccmu.h&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="返回值定义枚举" tabindex="-1"><a class="header-anchor" href="#返回值定义枚举" aria-hidden="true">#</a> 返回值定义枚举</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">enum</span>
<span class="token punctuation">{</span>

    HAL_CLK_STATUS_DISABLED <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ENABLED <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_FACTOR_REFUSED <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">11</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_NEED_DISABLED  <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_PARENT_DISABLED  <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_ENABLED_FAILED  <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">8</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_ROUND_FAILED <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">7</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_SET_RATE_REFUSED <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROR_CLK_NOT_FOUND  <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_ERROT_CLK_UNDEFINED  <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">,</span>
    HAL_CLK_STATUS_UNINITIALIZED <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span>        <span class="token comment">/**&lt; Uninitialized clock driver. */</span>
    HAL_CLK_STATUS_INVALID_PARAMETER <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span>    <span class="token comment">/**&lt; Invalid parameter. */</span>
    HAL_CLK_STATUS_ERROR <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>                <span class="token comment">/**&lt; Unknown error. */</span>
    HAL_CLK_STATUS_OK <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>                    <span class="token comment">/**&lt; Successful. */</span>
<span class="token punctuation">}</span> <span class="token class-name">hal_clk_status_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="时钟类型定义枚举" tabindex="-1"><a class="header-anchor" href="#时钟类型定义枚举" aria-hidden="true">#</a> 时钟类型定义枚举</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">enum</span>
<span class="token punctuation">{</span>
    HAL_SUNXI_FIXED_CCU <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
    HAL_SUNXI_RTC_CCU<span class="token punctuation">,</span>
    HAL_SUNXI_CCU<span class="token punctuation">,</span>
    HAL_SUNXI_AON_CCU<span class="token punctuation">,</span>
    HAL_SUNXI_R_CCU<span class="token punctuation">,</span>
    HAL_SUNXI_DSP<span class="token punctuation">,</span>
    HAL_SUNXI_CCU_NUMBER<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token class-name">hal_clk_type_t</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化ccu驱动" tabindex="-1"><a class="header-anchor" href="#初始化ccu驱动" aria-hidden="true">#</a> 初始化CCU驱动</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">hal_clock_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>无</li></ul><p>返回值：</p><ul><li>无</li></ul><h3 id="判断指定时钟是否已经打开" tabindex="-1"><a class="header-anchor" href="#判断指定时钟是否已经打开" aria-hidden="true">#</a> 判断指定时钟是否已经打开</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_status_t</span> <span class="token function">hal_clock_is_enabled</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：clk id</li></ul><p>返回值：</p><ul><li>HAL_CLK_STATUS_ENABLED：打开</li><li>HAL_CLK_STATUS_DISABLED：关闭</li></ul><h3 id="获得指定的时钟句柄" tabindex="-1"><a class="header-anchor" href="#获得指定的时钟句柄" aria-hidden="true">#</a> 获得指定的时钟句柄</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_t</span> <span class="token function">hal_clock_get</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_type_t</span> type<span class="token punctuation">,</span> <span class="token class-name">hal_clk_id_t</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>type：时钟类型</li><li>id：时钟id</li></ul><p>返回值：</p><ul><li>时钟句柄 hal_clk_t</li></ul><h3 id="释放指定时钟句柄" tabindex="-1"><a class="header-anchor" href="#释放指定时钟句柄" aria-hidden="true">#</a> 释放指定时钟句柄</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_status_t</span> <span class="token function">hal_clock_put</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：要操作的时钟句柄</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="打开指定时钟" tabindex="-1"><a class="header-anchor" href="#打开指定时钟" aria-hidden="true">#</a> 打开指定时钟</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_status_t</span> <span class="token function">hal_clock_enable</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="关闭指定时钟" tabindex="-1"><a class="header-anchor" href="#关闭指定时钟" aria-hidden="true">#</a> 关闭指定时钟</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_status_t</span> <span class="token function">hal_clock_disable</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="重新计算指定时钟的频率" tabindex="-1"><a class="header-anchor" href="#重新计算指定时钟的频率" aria-hidden="true">#</a> 重新计算指定时钟的频率</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>u32 <span class="token function">hal_clk_recalc_rate</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="设置一个跟指定频率最接近的时钟频" tabindex="-1"><a class="header-anchor" href="#设置一个跟指定频率最接近的时钟频" aria-hidden="true">#</a> 设置一个跟指定频率最接近的时钟频</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>u32 <span class="token function">hal_clk_round_rate</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">,</span> u32 rate<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li><li>rate：频率</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="获取指定时钟频率" tabindex="-1"><a class="header-anchor" href="#获取指定时钟频率" aria-hidden="true">#</a> 获取指定时钟频率</h3><blockquote><p>可能非实时</p></blockquote><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>u32 <span class="token function">hal_clk_get_rate</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="设置指定时钟的频" tabindex="-1"><a class="header-anchor" href="#设置指定时钟的频" aria-hidden="true">#</a> 设置指定时钟的频</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_status_t</span> <span class="token function">hal_clk_set_rate</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">,</span>  u32 rate<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li><li>rate：频率</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="设置指定时钟的父时钟" tabindex="-1"><a class="header-anchor" href="#设置指定时钟的父时钟" aria-hidden="true">#</a> 设置指定时钟的父时钟</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_status_t</span> <span class="token function">hal_clk_set_parent</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">,</span> <span class="token class-name">hal_clk_t</span> parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li><li>parent：父时钟id</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h3 id="获取指定时钟的父时钟" tabindex="-1"><a class="header-anchor" href="#获取指定时钟的父时钟" aria-hidden="true">#</a> 获取指定时钟的父时钟</h3><p>函数原型</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token class-name">hal_clk_t</span> <span class="token function">hal_clk_get_parent</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数：</p><ul><li>clk：时钟id</li></ul><p>返回值：</p><ul><li>0：成功</li><li>负数：失败</li></ul><h2 id="模块使用范例" tabindex="-1"><a class="header-anchor" href="#模块使用范例" aria-hidden="true">#</a> 模块使用范例</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_log.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_cmd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_clk.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;hal_reset.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;ccmu/common_ccmu.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;../../source/ccmu/sunxi-ng/ccu-sun20iw2-aon.h&quot;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">CLK_RTC_NUMBER</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CLK_RTC_NUMBER</span> <span class="token expression"><span class="token number">0</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token keyword">int</span> clk_number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    CLK_SRC_NUMBER<span class="token punctuation">,</span>
    CLK_RTC_NUMBER<span class="token punctuation">,</span>
    CLK_NUMBER<span class="token punctuation">,</span>
    CLK_AON_NUMBER<span class="token punctuation">,</span>
    CLK_R_NUMBER<span class="token punctuation">,</span>
    <span class="token number">0</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> reset_number<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    RST_BUS_NUMBER<span class="token punctuation">,</span>
    RST_R_BUS_NUMBER<span class="token punctuation">,</span>
    <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">char</span> <span class="token operator">*</span>strict_clks<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;pll-ddr0&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;riscv&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;pll-cpux&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;pll-periph0-parent&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;riscv-axi&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;apb1&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;fanout-27m&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;fix-losc&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;rc-16m&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;ext-32k&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;rc-hf&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;pclk-spc-1&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;pclk-spc-2&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;pclk-spc&quot;</span><span class="token punctuation">,</span>
    <span class="token constant">NULL</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">char</span> <span class="token operator">*</span>clk_type_name<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;HAL_SUNXI_FIXED_CCU&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;HAL_SUNXI_RTC_CCU&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;HAL_SUNXI_CCU&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;HAL_SUNXI_AON_CCU&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;HAL_SUNXI_R_CCU&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">is_strict_clk</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> strict_clks<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strcmp</span><span class="token punctuation">(</span>clk<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> strict_clks<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">is_dcxo_clk</span><span class="token punctuation">(</span><span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">strncmp</span><span class="token punctuation">(</span>clk<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> <span class="token string">&quot;dcxo&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">cmd_test_ng_ccmu</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">,</span> j<span class="token punctuation">;</span>

    <span class="token class-name">hal_clk_type_t</span> clk_type<span class="token punctuation">;</span>
    <span class="token class-name">hal_clk_id_t</span>   clk_id<span class="token punctuation">;</span>
    <span class="token class-name">hal_clk_t</span> clk<span class="token punctuation">,</span> p_clk<span class="token punctuation">;</span>
    u32  old_rate<span class="token punctuation">;</span>

    <span class="token class-name">hal_reset_type_t</span> reset_type<span class="token punctuation">;</span>
    <span class="token class-name">hal_reset_id_t</span>  reset_id<span class="token punctuation">;</span>
    <span class="token class-name">hal_clk_status_t</span> clk_status<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">reset_control</span> <span class="token operator">*</span>reset<span class="token punctuation">;</span>
    <span class="token keyword">int</span> reset_status<span class="token punctuation">;</span>
    u32 new_rate<span class="token punctuation">;</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;clock\\t\\t\\t\\t\\t type\\t\\t\\t\\t\\t parent\\t\\t\\t\\t\\t rate\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> HAL_SUNXI_FIXED_CCU<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> HAL_SUNXI_CCU_NUMBER<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        clk_type <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> clk_number<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            clk_id <span class="token operator">=</span> j<span class="token punctuation">;</span>
            clk <span class="token operator">=</span> <span class="token function">hal_clock_get</span><span class="token punctuation">(</span>clk_type<span class="token punctuation">,</span> clk_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>clk<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;fail to get clk\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            p_clk <span class="token operator">=</span> <span class="token function">hal_clk_get_parent</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span><span class="token punctuation">;</span>

            old_rate <span class="token operator">=</span> <span class="token function">hal_clk_get_rate</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p_clk<span class="token punctuation">)</span>
                <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-20s\\t\\t\\t %-20s\\t\\t\\t %-15s\\t\\t\\t %d\\n&quot;</span><span class="token punctuation">,</span> clk<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> clk_type_name<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> p_clk<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> old_rate<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-20s\\t\\t\\t %-20s\\t\\t\\t NULL\\t\\t\\t\\t\\t %d\\n&quot;</span><span class="token punctuation">,</span> clk<span class="token operator">-&gt;</span>name<span class="token punctuation">,</span> clk_type_name<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> old_rate<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> HAL_SUNXI_RESET<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> HAL_SUNXI_RESET_NUMBER<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        reset_type <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> reset_number<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            reset_id <span class="token operator">=</span> j<span class="token punctuation">;</span>

            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;reset: get reset control, type:%d, id: %d\\n&quot;</span><span class="token punctuation">,</span> reset_type<span class="token punctuation">,</span> reset_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            reset <span class="token operator">=</span> <span class="token function">hal_reset_control_get</span><span class="token punctuation">(</span>reset_type<span class="token punctuation">,</span> reset_id<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;reset: control deassert\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">hal_reset_control_deassert</span><span class="token punctuation">(</span>reset<span class="token punctuation">)</span><span class="token punctuation">;</span>

            reset_status <span class="token operator">=</span> <span class="token function">hal_reset_control_status</span><span class="token punctuation">(</span>reset<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;reset status: %s&quot;</span><span class="token punctuation">,</span> reset_status <span class="token operator">?</span> <span class="token string">&quot;assert&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;deassert&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;reset: put reset control, type:%d, id: %d\\n&quot;</span><span class="token punctuation">,</span> reset_type<span class="token punctuation">,</span> reset_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">hal_reset_control_put</span><span class="token punctuation">(</span>reset<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">FINSH_FUNCTION_EXPORT_CMD</span><span class="token punctuation">(</span>cmd_test_ng_ccmu<span class="token punctuation">,</span> hal_ccmu<span class="token punctuation">,</span> sunxi <span class="token operator">-</span> ng ccmu hal APIs tests<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,103),c=[p];function l(i,o){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","chapter3.html.vue"]]);export{r as default};
