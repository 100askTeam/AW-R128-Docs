import{_ as a,o as n,c as s,e}from"./app-e85d5a28.js";const t={},p=e(`<h1 id="pmu-电源管理" tabindex="-1"><a class="header-anchor" href="#pmu-电源管理" aria-hidden="true">#</a> PMU 电源管理</h1><h2 id="pmu-功能简介" tabindex="-1"><a class="header-anchor" href="#pmu-功能简介" aria-hidden="true">#</a> PMU 功能简介</h2><p>目前已支持的PMU 为：AXP2585。</p><p>该PMU 主要用于电池管理以及充电管理，主要有以下功能：</p><ul><li>读取电池电量、电池温度。</li><li>设置充电时的充电电流，截止充电电压、充电超时等。</li><li>自动根据连接PC 或者适配器设置USB 输入的最大限流。</li><li>电池温度过高时自动触发停充。</li><li>检测USB 线的接入和拔出。</li><li>PMU 芯片过温保护。</li></ul><h2 id="pmu-配置介绍" tabindex="-1"><a class="header-anchor" href="#pmu-配置介绍" aria-hidden="true">#</a> PMU 配置介绍</h2><h3 id="sys-config-fex-配置说明" tabindex="-1"><a class="header-anchor" href="#sys-config-fex-配置说明" aria-hidden="true">#</a> <code>sys_config.fex</code> 配置说明</h3><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">pmu</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">pmu_irq_pin</span>      <span class="token punctuation">=</span> <span class="token value attr-value">port:PA14&lt;14&gt;&lt;0&gt;&lt;default&gt;&lt;default&gt;</span>
<span class="token key attr-name">pmu_irq_wakeup</span>   <span class="token punctuation">=</span> <span class="token value attr-value">2</span>
<span class="token key attr-name">pmu_hot_shutdown</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">pmu_bat_unused</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_usbad_vol</span> <span class="token punctuation">=</span> <span class="token value attr-value">4600</span>
<span class="token key attr-name">pmu_usbad_cur</span> <span class="token punctuation">=</span> <span class="token value attr-value">1500</span>
<span class="token key attr-name">pmu_usbpc_vol</span> <span class="token punctuation">=</span> <span class="token value attr-value">4600</span>
<span class="token key attr-name">pmu_usbpc_cur</span> <span class="token punctuation">=</span> <span class="token value attr-value">500</span>
<span class="token key attr-name">pmu_chg_ic_temp</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_battery_rdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
<span class="token key attr-name">pmu_battery_cap</span> <span class="token punctuation">=</span> <span class="token value attr-value">3568</span>
<span class="token key attr-name">pmu_runtime_chgcur</span> <span class="token punctuation">=</span> <span class="token value attr-value">900</span>
<span class="token key attr-name">pmu_suspend_chgcur</span> <span class="token punctuation">=</span> <span class="token value attr-value">1200</span>
<span class="token key attr-name">pmu_shutdown_chgcur</span> <span class="token punctuation">=</span> <span class="token value attr-value">1200</span>
<span class="token key attr-name">pmu_init_chgvol</span> <span class="token punctuation">=</span> <span class="token value attr-value">4200</span>
<span class="token key attr-name">pmu_init_chg_pretime</span> <span class="token punctuation">=</span> <span class="token value attr-value">50</span>
<span class="token key attr-name">pmu_init_chg_csttime</span> <span class="token punctuation">=</span> <span class="token value attr-value">1200</span>
<span class="token key attr-name">pmu_chgled_type</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_init_bc_en</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">pmu_bat_temp_enable</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_charge_ltf</span> <span class="token punctuation">=</span> <span class="token value attr-value">2261</span>
<span class="token key attr-name">pmu_bat_charge_htf</span> <span class="token punctuation">=</span> <span class="token value attr-value">388</span>
<span class="token key attr-name">pmu_bat_shutdown_ltf</span> <span class="token punctuation">=</span> <span class="token value attr-value">3200</span>
<span class="token key attr-name">pmu_bat_shutdown_htf</span> <span class="token punctuation">=</span> <span class="token value attr-value">237</span>
<span class="token key attr-name">pmu_bat_para[0]</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_para[1]</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_para[2]</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_para[3]</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_para[4]</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_para[5]</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">pmu_bat_para[6]</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">pmu_bat_para[7]</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">pmu_bat_para[8]</span> <span class="token punctuation">=</span> <span class="token value attr-value">2</span>
<span class="token key attr-name">pmu_bat_para[9]</span> <span class="token punctuation">=</span> <span class="token value attr-value">4</span>
<span class="token key attr-name">pmu_bat_para[10]</span> <span class="token punctuation">=</span> <span class="token value attr-value">5</span>
<span class="token key attr-name">pmu_bat_para[11]</span> <span class="token punctuation">=</span> <span class="token value attr-value">12</span>
<span class="token key attr-name">pmu_bat_para[12]</span> <span class="token punctuation">=</span> <span class="token value attr-value">19</span>
<span class="token key attr-name">pmu_bat_para[13]</span> <span class="token punctuation">=</span> <span class="token value attr-value">32</span>
<span class="token key attr-name">pmu_bat_para[14]</span> <span class="token punctuation">=</span> <span class="token value attr-value">41</span>
<span class="token key attr-name">pmu_bat_para[15]</span> <span class="token punctuation">=</span> <span class="token value attr-value">45</span>
<span class="token key attr-name">pmu_bat_para[16]</span> <span class="token punctuation">=</span> <span class="token value attr-value">48</span>
<span class="token key attr-name">pmu_bat_para[17]</span> <span class="token punctuation">=</span> <span class="token value attr-value">51</span>
<span class="token key attr-name">pmu_bat_para[18]</span> <span class="token punctuation">=</span> <span class="token value attr-value">54</span>
<span class="token key attr-name">pmu_bat_para[19]</span> <span class="token punctuation">=</span> <span class="token value attr-value">59</span>
<span class="token key attr-name">pmu_bat_para[20]</span> <span class="token punctuation">=</span> <span class="token value attr-value">63</span>
<span class="token key attr-name">pmu_bat_para[21]</span> <span class="token punctuation">=</span> <span class="token value attr-value">68</span>
<span class="token key attr-name">pmu_bat_para[22]</span> <span class="token punctuation">=</span> <span class="token value attr-value">71</span>
<span class="token key attr-name">pmu_bat_para[23]</span> <span class="token punctuation">=</span> <span class="token value attr-value">74</span>
<span class="token key attr-name">pmu_bat_para[24]</span> <span class="token punctuation">=</span> <span class="token value attr-value">78</span>
<span class="token key attr-name">pmu_bat_para[25]</span> <span class="token punctuation">=</span> <span class="token value attr-value">81</span>
<span class="token key attr-name">pmu_bat_para[26]</span> <span class="token punctuation">=</span> <span class="token value attr-value">82</span>
<span class="token key attr-name">pmu_bat_para[27]</span> <span class="token punctuation">=</span> <span class="token value attr-value">84</span>
<span class="token key attr-name">pmu_bat_para[28]</span> <span class="token punctuation">=</span> <span class="token value attr-value">88</span>
<span class="token key attr-name">pmu_bat_para[29]</span> <span class="token punctuation">=</span> <span class="token value attr-value">92</span>
<span class="token key attr-name">pmu_bat_para[30]</span> <span class="token punctuation">=</span> <span class="token value attr-value">96</span>
<span class="token key attr-name">pmu_bat_para[31]</span> <span class="token punctuation">=</span> <span class="token value attr-value">100</span>
<span class="token key attr-name">pmu_bat_temp_para[0]</span> <span class="token punctuation">=</span> <span class="token value attr-value">7466</span>
<span class="token key attr-name">pmu_bat_temp_para[1]</span> <span class="token punctuation">=</span> <span class="token value attr-value">4480</span>
<span class="token key attr-name">pmu_bat_temp_para[2]</span> <span class="token punctuation">=</span> <span class="token value attr-value">3518</span>
<span class="token key attr-name">pmu_bat_temp_para[3]</span> <span class="token punctuation">=</span> <span class="token value attr-value">2786</span>
<span class="token key attr-name">pmu_bat_temp_para[4]</span> <span class="token punctuation">=</span> <span class="token value attr-value">2223</span>
<span class="token key attr-name">pmu_bat_temp_para[5]</span> <span class="token punctuation">=</span> <span class="token value attr-value">1788</span>
<span class="token key attr-name">pmu_bat_temp_para[6]</span> <span class="token punctuation">=</span> <span class="token value attr-value">1448</span>
<span class="token key attr-name">pmu_bat_temp_para[7]</span> <span class="token punctuation">=</span> <span class="token value attr-value">969</span>
<span class="token key attr-name">pmu_bat_temp_para[8]</span> <span class="token punctuation">=</span> <span class="token value attr-value">664</span>
<span class="token key attr-name">pmu_bat_temp_para[9]</span> <span class="token punctuation">=</span> <span class="token value attr-value">466</span>
<span class="token key attr-name">pmu_bat_temp_para[10]</span> <span class="token punctuation">=</span> <span class="token value attr-value">393</span>
<span class="token key attr-name">pmu_bat_temp_para[11]</span> <span class="token punctuation">=</span> <span class="token value attr-value">333</span>
<span class="token key attr-name">pmu_bat_temp_para[12]</span> <span class="token punctuation">=</span> <span class="token value attr-value">283</span>
<span class="token key attr-name">pmu_bat_temp_para[13]</span> <span class="token punctuation">=</span> <span class="token value attr-value">242</span>
<span class="token key attr-name">pmu_bat_temp_para[14]</span> <span class="token punctuation">=</span> <span class="token value attr-value">179</span>
<span class="token key attr-name">pmu_bat_temp_para[15]</span> <span class="token punctuation">=</span> <span class="token value attr-value">134</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置含义：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>pmu_irq_pin
	AXP芯片IRQ引脚连接的IO，用于触发中断

pmu_irq_wakeup
	Press irq wakeup or not when sleep or power down<span class="token punctuation">.</span>
    <span class="token number">0</span><span class="token operator">:</span> not wakeup
    <span class="token number">1</span><span class="token operator">:</span> wakeup
    
pmu_hot_shutdown
    when PMU over temperature protect or not<span class="token punctuation">.</span>
    <span class="token number">0</span><span class="token operator">:</span> disable
    <span class="token number">1</span><span class="token operator">:</span> enable

pmu_bat_unused
    unused bat
    <span class="token number">0</span><span class="token operator">:</span> disable
    <span class="token number">1</span><span class="token operator">:</span> enable

pmu_usbpc_vol <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	usb pc输入电压限制值，单位为mV
	
pmu_usbpc_cur <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	usb pc输入电流限制值，单位为mA
	
pmu_usbad_vol <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	usb adaptor输入电压限制值<span class="token punctuation">(</span>vimdpm<span class="token punctuation">)</span>，单位为mV
	
pmu_usbad_cur <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	usb adaptor输入电流限制值，单位为mA
	
pmu_chg_ic_temp <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
    <span class="token number">1</span><span class="token operator">:</span> TS current source always on
    <span class="token number">0</span><span class="token operator">:</span> TS current source off
    
pmu_battery_rdc <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池内阻，单位为mΩ
	
pmu_battery_cap <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池容量，单位为mAh
	
pmu_runtime_chgcur <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	运行时constant充电电流限制，单位为mA
	
pmu_suspend_chgcur <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	休眠时constant充电电流限制，单位为mA
	
pmu_shutdown_chgcur <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	关机时constant充电电流限制，单位为mA
	
pmu_terminal_chgcur <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	截止电流，停止充电的标志位之一，单位为mA
	
pmu_init_chgvol <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池满充电压，单位为mV
	
pmu_init_chg_pretime <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	当电池电压低于REG <span class="token number">0x8C</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>时，属于pre charge阶段。
	如果此阶段时间超过pmu_init_chg_pretime，视为超时，停止充电。
	
pmu_init_chg_csttime <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	当电池电压高于REG <span class="token number">0x8C</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>且低于截止电压<span class="token punctuation">(</span>REG <span class="token number">0X8C</span><span class="token punctuation">[</span><span class="token number">7</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>时，属于恒流充电阶段。
	如果此阶段时间超过pmu_init_chg_csttime，视为超时，停止充电。
	
pmu_chgled_type <span class="token operator">&lt;</span>bool<span class="token operator">&gt;</span>
    <span class="token number">0</span><span class="token operator">:</span> Enable CHGLED pin funciton
    <span class="token number">1</span><span class="token operator">:</span> Disable CHGLED pin funciton
    
pmu_init_bc_en <span class="token operator">&lt;</span>bool<span class="token operator">&gt;</span>
    <span class="token number">0</span><span class="token operator">:</span> Enable BC1<span class="token punctuation">.</span><span class="token number">2</span>
    <span class="token number">1</span><span class="token operator">:</span> Disable BC1<span class="token punctuation">.</span><span class="token number">2</span>
        
pmu_bat_temp_enable <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	设置电池温度检测、ntc是否使能
        
pmu_bat_charge_ltf <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
    触发电池低温停充的TS pin电压阈值，单位：mV
    默认：<span class="token number">1105</span>mV
    范围：<span class="token number">0</span>‑<span class="token number">8160</span>mV
        
pmu_bat_charge_htf <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
    触发电池高温停充的TS pin电压阈值，单位：mV
    默认：<span class="token number">121</span>mV
    范围：<span class="token number">0</span>‑<span class="token number">510</span>mV
        
pmu_bat_shutdown_ltf <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	非充电模式下，触发电池低温中断的TS pin电压阈值，单位：mV
	默认：<span class="token number">1381</span>mV
        
pmu_bat_shutdown_htf <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	默认：<span class="token number">89</span>mV
	范围：<span class="token number">0</span>‑<span class="token number">510</span>mV
        
pmu_bat_para1 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
pmu_bat_para2 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
pmu_bat_para32 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池曲线参数
	电池参数根据使用的电池不同，通过仪器测量出来
        
pmu_bat_temp_para1 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包‑<span class="token number">25</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para2 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包‑<span class="token number">15</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para3 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包‑<span class="token number">10</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para4 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包‑<span class="token number">5</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para5 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">0</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para6 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">5</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para7 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">10</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para8 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">20</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para9 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">30</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para10 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">40</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para11 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">45</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para12 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">50</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para13 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">55</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para14 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">60</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para15 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">70</span>度对应的TS pin电压，单位：mV
        
pmu_bat_temp_para16 <span class="token operator">&lt;</span>u32<span class="token operator">&gt;</span>
	电池包<span class="token number">80</span>度对应的TS pin电压，单位：mV

不同电池包的温敏电阻特性不一样，根据电池包的TS温敏电阻手册，找到pmu_bat_temp_para<span class="token punctuation">[</span><span class="token number">1</span>‑<span class="token number">16</span><span class="token punctuation">]</span>对应温度点的电阻阻值，将阻值除以<span class="token number">20</span>得到的电压数值（单位：mV），将电压数值填进pmu_bat_temp_para<span class="token punctuation">[</span><span class="token number">1</span>‑<span class="token number">16</span><span class="token punctuation">]</span>的节点中即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rtos-menuconfig-配置说明" tabindex="-1"><a class="header-anchor" href="#rtos-menuconfig-配置说明" aria-hidden="true">#</a> rtos menuconfig 配置说明</h3><p>AXP 是依赖于I2C 进行通过的，所以首先就需要确认I2C 驱动是已经被选上的。</p><ul><li>使能I2C 驱动</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
    ‑&gt; soc related device drivers
        ‑&gt; TWI Devices
            [*] enable twi driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使能PMU 驱动</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
	‑&gt; soc related device drivers
		[*] POWER Devices
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>选择AXP2585</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; Drivers Options
	‑&gt; soc related device drivers
		‑&gt; POWER Devices
			[*] enable power driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pmu-源码结构" tabindex="-1"><a class="header-anchor" href="#pmu-源码结构" aria-hidden="true">#</a> PMU 源码结构</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>lichee/rtos‑hal/hal/source/power/
├── axp2585.c
├── axp2585.h
├── axp.c
├── axp_twi.c
├── ffs.h
├── Kconfig
├── Makefile
├── sun20iw2p1
│ ├── core.c
└── type.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>axp2585.c: AXP2585 驱动。</li><li>axp.c: AXP 框架API 接口。</li><li>axp_twi.c: 初始化以及I2C 接口。</li><li>sun20iw2p1: R128 配置以及总初始化接口。</li></ul><h2 id="pmu-常用功能" tabindex="-1"><a class="header-anchor" href="#pmu-常用功能" aria-hidden="true">#</a> PMU 常用功能</h2><h3 id="驱动初始化" tabindex="-1"><a class="header-anchor" href="#驱动初始化" aria-hidden="true">#</a> 驱动初始化</h3><p>若 <code>mrtos_menuconfig</code> 中已经选上了该设备，并且 <code>sys_config.fex</code> 中也配置完成，那么系统加载时就已经自动将 PMU 驱动加载完成，无需软件工程师再进行初始化。</p><p>初始化成功的 log 可如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>axp2585 chip version C !
axp2585 chip id detect 0x49 !
current limit not set: usb adapter type
axp2585 init finished !
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若是没有打印上述的打印 log 信息，可能是 PMU 驱动加载失败了，可以从 <code>sys_config.fex</code> 配置中确认是否有配置漏配置了，或者是从 I2C 方向去排查，确认I2C 通信是正常的。</p><h3 id="axp-接口使用" tabindex="-1"><a class="header-anchor" href="#axp-接口使用" aria-hidden="true">#</a> AXP 接口使用</h3><p>PMU 驱动有一个统一的驱动入口，初始化和一些功能接口，都是由AXP 驱动统一管理的。具体请参照 <a href="/sdk_module/pmu">PMU</a>章节的说明。</p><h3 id="电源管理应用healthd" tabindex="-1"><a class="header-anchor" href="#电源管理应用healthd" aria-hidden="true">#</a> 电源管理应用healthd</h3><p>healthd 是一个电源管理的应用，主要功能为：检测电池电量、设置充电电流、电量变低警报、电压过低关机、电池温度过高过度保护等等。</p><p>应用配置方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>‑&gt; System components
	‑&gt; aw components
		[*] healthd for axp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用源码路径为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>lichee/rtos/components/aw/healthd/healthd.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="healthd-用法" tabindex="-1"><a class="header-anchor" href="#healthd-用法" aria-hidden="true">#</a> healthd 用法</h4><h5 id="开启应用" tabindex="-1"><a class="header-anchor" href="#开启应用" aria-hidden="true">#</a> 开启应用</h5><p>应用在默认SDK 中并不会启动，在系统启动之后，需要手动输入：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>healthd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就开启了电池管理应用了。开启了之后，就会启动了电量变低警报、电压过低关机、电池温度过高过度保护的功能。</p><h5 id="获取电池电量" tabindex="-1"><a class="header-anchor" href="#获取电池电量" aria-hidden="true">#</a> 获取电池电量</h5><p>运行命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>healthd_get_capacity
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="设置充电电流" tabindex="-1"><a class="header-anchor" href="#设置充电电流" aria-hidden="true">#</a> 设置充电电流</h5><p>运行命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>healthd_set_chgcur 1500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令的后缀为充电电流大小，单位为mA，范围为0~3072mA。</p>`,47),l=[p];function i(u,c){return n(),s("div",null,l)}const o=a(t,[["render",i],["__file","chapter1.html.vue"]]);export{o as default};
