import{_ as n,r as d,o as t,c as a,a as r,b as i,d as s,w as l,e as c}from"./app-e85d5a28.js";const v={},o=c(`<h1 id="芯片简介" tabindex="-1"><a class="header-anchor" href="#芯片简介" aria-hidden="true">#</a> 芯片简介</h1><p>R128是一颗专为“音视频解码”而打造的全新高集成度 SoC，主要应用于智能物联和专用语音交互处理解决方案。</p><ul><li>单片集成 MCU+RISCV+DSP+CODEC+WIFI/BT+PMU，提供生态配套成熟、完善的用于系统、应用和网络连接开发的高效算力；</li><li>集成 8MB/16MB/32MB PSRAM，为音视频解码、大容量存储、扫码以及网络连接提供充裕的高容量、高带宽的内存支持；</li><li>拥有丰富的音频接口 IIS/PCM、OWA、DMIC、LINEOUT、MICIN 以及通用通讯接口 IIC、UART、SDIO、 SPI、ISO7816卡接口；同时支持 U 盘、SD卡、IR-TX/RX；</li><li>内置 LDO、GPADC、LEDC，简化系统方案设计，降低 BOM成本。</li></ul><h2 id="芯片应用场景" tabindex="-1"><a class="header-anchor" href="#芯片应用场景" aria-hidden="true">#</a> 芯片应用场景</h2><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part1/chapter1/image1.jpg" alt="image1"></p><h2 id="芯片实物图" tabindex="-1"><a class="header-anchor" href="#芯片实物图" aria-hidden="true">#</a> 芯片实物图</h2><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part1/chapter1/image2.png" alt="image2"></p><h2 id="芯片框图" tabindex="-1"><a class="header-anchor" href="#芯片框图" aria-hidden="true">#</a> 芯片框图</h2><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/quick-start/part1/chapter1/image3.png" alt="image3"></p><h2 id="芯片特性简介" tabindex="-1"><a class="header-anchor" href="#芯片特性简介" aria-hidden="true">#</a> 芯片特性简介</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- XuanTie 64 bit RISC V C 906 CPU , up to 480 MHz
- HiFi5 Audio DSP up to 400 MHz
- Arm M33 Star MCU , up to 192 MHz

- Memories

  - 1MB SRAM

  - SiP 8 MB/16 MB Flash

  - 8 MB H S PSRAM in R128 S 1
  - 8 MB LS PSRAM &amp; 8 MB HS PSRAM in R128 S2
  - 32 MB HS PSRAM in R128 S3
  - 2048 bit efuse

- Image and Graphics

  - Supports Graphic 2D accelerator with rotate, mixer, and 4 layers
  - Supports RGB output interface, up to 1024 x 768 @60 fps
  - Supports display engine

- Video Input

  - 8 bit parallel CSI interface
  - Supports both online and offline mode for JPEG encoder
  - Supports JPEG encoder, 1920 x 108 8

- Analog Audio Codec

  - 2 DAC channels 24 bit audio codec for R128 S1 and R128 S2
  - 1 DAC channel 24 bit for R128 S3
  - 3 ADC channels
  - Supports USB audio playback
  - Up to 119 dB SNR during DAC playback path (signal through DAC and lineout with A weighted filter)
  - Up to 98 dB SNR during ADC record path (signal through PGA and ADC with A weighted filter)

- One I2S/TDM/PCM external inte rface (I2S0

- Security Engine

  - Symmetrical algorithm: AES, DES, 3DES
  - Hash algorithm: MD5, SHA1, SHA224, SHA256, SHA384, SHA512, HMAC
  - Asymmetrical algorithm: RSA512/1024/2048bit
  - S upports TRNG

- External Peripherals

  - One USB 2.0 DRD
  - Up to 3 UART controllers (UART 0, UART1, UART2)
  - Up to 2 SPI controllers (SPI0, SPI1)
  - Up to 2 TWIs
  - One CIR RX and one CIR TX
  - Up to 8 PWM channels (PWM[ 7 0
  - Up to 7 GPADC input channels (R128 S1 &amp; R128 S2)/8 channels (R128 S3)
  - One LEDC used to control the external intelligent control LED lamp

- Package

  - QFN80, 0.35 mm pitch, 8 mm x 8 mm body

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不同版本芯片的区别" tabindex="-1"><a class="header-anchor" href="#不同版本芯片的区别" aria-hidden="true">#</a> 不同版本芯片的区别</h2><p>R128 共有R128-S1、R128-S2 和R128-S3 三个型号，各型号具体配置差异如下表：</p><table><thead><tr><th>Contents</th><th>R128-S1</th><th>R128-S2</th><th>R128-S3</th></tr></thead><tbody><tr><td>CPU</td><td>M33 + C906</td><td>M33 + C906</td><td>M33 + C906</td></tr><tr><td>DSP</td><td>HiFi5</td><td>HiFi5</td><td>HiFi5</td></tr><tr><td>PSRAM</td><td>8MB HS-PSRAM</td><td>8MB HS-PSRAM + 8MB LS-PSRAM</td><td>32MB HS-PSRAM</td></tr><tr><td>FLASH</td><td>8MB</td><td>16MB</td><td>/</td></tr><tr><td>DAC</td><td>2 Audio DAC<br>LINEOUTLP/N <br>LINEOUTRP/N</td><td>2 Audio DAC<br>LINEOUTLP/N <br>LINEOUTRP/N</td><td>1 Audio DAC<br>LINEOUTLP/N</td></tr><tr><td>GPADC Channels</td><td>7</td><td>7</td><td>8</td></tr><tr><td>Package</td><td><code>QFN80 8*8mm 0.35pitch</code></td><td><code>QFN80 8*8mm 0.35pitch</code></td><td><code>QFN80 8*8mm 0.35pitch</code></td></tr></tbody></table>`,14);function u(m,h){const e=d("RouterLink");return t(),a("div",null,[o,r("p",null,[i("请注意，R128-S1、R128-S2引脚封装是相同的，而 R128-S3 与R128-S1、R128-S2是不同的。具体请参照"),s(e,{to:"/r128/chip_info/"},{default:l(()=>[i("芯片参数")]),_:1}),i("章节")])])}const p=n(v,[["render",u],["__file","chapter1.html.vue"]]);export{p as default};
