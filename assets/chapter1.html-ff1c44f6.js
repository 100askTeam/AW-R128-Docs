import{_ as r,r as o,o as i,c as t,a as e,b as s,d as a,e as c}from"./app-e85d5a28.js";const l={},d=e("h1",{id:"添加自己的方案",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#添加自己的方案","aria-hidden":"true"},"#"),s(" 添加自己的方案")],-1),p=e("p",null,"R128平台通过执行 lunch_rtos 载入（切换）方案，那么如何添加自己的方案呢？本文带你解决这个问题。",-1),v=e("p",null,[s("在这里我们以添加自己的RGB方案为例，命名为 "),e("code",null,"r128-devkit-100ask-rgb"),s("。")],-1),m={href:"https://gitee.com/weidongshan/100ask_r128_demos/tree/master/other/RGB_LCD",target:"_blank",rel:"noopener noreferrer"},_={href:"https://gitee.com/weidongshan/100ask_r128_demos/tree/master/other/RGB_LCD",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/100askTeam/100ask_r128_demos/tree/master/other/RGB_LCD",target:"_blank",rel:"noopener noreferrer"},h=e("strong",null,"视频教程",-1),b={href:"https://www.bilibili.com/video/BV1oC4y1w7AH?p=21",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="添加板级配置" tabindex="-1"><a class="header-anchor" href="#添加板级配置" aria-hidden="true">#</a> 添加板级配置</h2><p>在 <code>SDK/board</code> 目录下添加自己的板子配置，我们以r128s2芯片为例。</p><p>进入到 <code>SDK/board/r128s2</code> 目录下，将上面仓库中提供的 <code>r128-devkit-100ask-rgb</code> 方案下的 <strong>board/r128s2/</strong> 下的目录复制过来；或者复制相近的配置目录，比如 devkit 配置，并命名为你的方案名称，这里是：<code>r128-devkit-100ask-rgb</code>。</p><h2 id="添加soc方案工程" tabindex="-1"><a class="header-anchor" href="#添加soc方案工程" aria-hidden="true">#</a> 添加SOC方案工程</h2><p>进入到 <code>SDK/lichee/rtos/projects</code> 目录，将上面仓库中提供的 <code>r128-devkit-100ask-rgb</code> 方案下的 <strong>lichee/rtos/projects/r128s2/</strong> 下的两个目录复制过来；或者复制相近的方案目录，比如 r128s2 方案，并命名为你的方案名称，这里是：<code>r128-devkit-100ask-rgb-c906</code> 和 <code>r128-devkit-100ask-rgb-m33</code> 。<strong>注意两个要成对出现（C906和M33）</strong>。</p><blockquote><p>projects 目录下的每一个子目录代表一个SoC 类别，每个 SoC 类别下面存放对应的方案，每个方案都有 m33 与c906 目录，在这些目录下面实现各处理器上第一个任务，选择不同的 project 编译出来的 bin 具有不同功能。每个 project 有独立的 FreeRTOSConfig 配置。</p></blockquote><p>打开 <code>SDK/lichee/rtos/projects/Kconfig</code> 文件，在第一个choice的最后添加你的方案，如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>choice

<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.

config PROJECT_R128S2_DEVKIT_100ASK_RGB_C906
    bool <span class="token string">&quot;r128s2 Devkit 100ASK RGB c906 system&quot;</span>
	<span class="token keyword">select</span> PROJECT_R128S2
    ---help---
        r128s2 pro c906 system

config PROJECT_R128S2_DEVKIT_100ASK_RGB_M33
    bool <span class="token string">&quot;r128s2 Devkit 100ASK RGB m33 system&quot;</span>
	<span class="token keyword">select</span> PROJECT_R128S2
    ---help---
        r128s2 pro m33 system
        
endchoice

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开 <code>SDK/lichee/rtos/projects/r128s2/Makefile</code> 文件，添加编译包含，如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>obj-<span class="token variable"><span class="token variable">$(</span>CONFIG_PROJECT_R128S2_DEVKIT_100ASK_RGB_C906<span class="token variable">)</span></span> <span class="token operator">+=</span> devkit_100ask_rgb_c906/
obj-<span class="token variable"><span class="token variable">$(</span>CONFIG_PROJECT_R128S2_DEVKIT_100ASK_RGB_M33<span class="token variable">)</span></span> <span class="token operator">+=</span> devkit_100ask_rgb_m33/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><p>到这里方案已经创建完成，重新按照下面的命令执行即可看到新的方案：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> envsetup.sh  <span class="token comment"># 重新加载环境变量</span>
lunch_rtos          <span class="token comment"># 选择新添加的方案</span>
mrtos_menuconfig    <span class="token comment"># 配置menuconfig</span>
m <span class="token parameter variable">-j8</span>               <span class="token comment"># 编译</span>
p                   <span class="token comment"># 打包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function g(f,R){const n=o("ExternalLinkIcon");return i(),t("div",null,[d,p,v,e("p",null,[s("建议用百问网提供的 "),e("a",m,[s("r128-devkit-100ask-rgb"),a(n)]),s(" 方案进行实验，仓库地址:")]),e("ul",null,[e("li",null,[s("Gitee： "),e("a",_,[s("https://gitee.com/weidongshan/100ask_r128_demos/tree/master/other/RGB_LCD"),a(n)])]),e("li",null,[s("GitHub："),e("a",u,[s("https://github.com/100askTeam/100ask_r128_demos/tree/master/other/RGB_LCD"),a(n)])])]),e("blockquote",null,[e("p",null,[s("本章节"),h,s("："),e("a",b,[s("https://www.bilibili.com/video/BV1oC4y1w7AH?p=21"),a(n)])])]),k])}const S=r(l,[["render",g],["__file","chapter1.html.vue"]]);export{S as default};