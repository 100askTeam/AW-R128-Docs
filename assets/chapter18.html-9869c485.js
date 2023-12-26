import{_ as n,o as s,c as a,e}from"./app-e85d5a28.js";const i={},t=e(`<h1 id="mmc" tabindex="-1"><a class="header-anchor" href="#mmc" aria-hidden="true">#</a> MMC</h1><h2 id="mmc-特性" tabindex="-1"><a class="header-anchor" href="#mmc-特性" aria-hidden="true">#</a> MMC 特性</h2><ul><li>Compatible with Secure Digital Memory (SD mem-version 2.0)</li><li>Compatible with Secure Digital I/O (SDIO-version 3.0)</li><li>Compatible with embedded MultiMediaCard (eMMC-version 5.0)</li><li>Supports Card insertion and removal interrupt</li><li>Supports hardware CRC generation and error detection</li><li>Supports programmable baud rate</li><li>Supports SDIO interrupts in 1-bit and 4-bit modes</li><li>Supports block size of 1 to 65535 bytes</li><li>Supports descriptor-based internal DMA controller</li><li>Internal 1024-Bytes RX FIFO and 1024-Bytes TX FIFO</li><li>Supports 1-bit, 4-bit SD and SDIO data bus width</li><li>Supports 1-bit, 4-bit eMMC data bus width</li></ul><h2 id="模块介绍" tabindex="-1"><a class="header-anchor" href="#模块介绍" aria-hidden="true">#</a> 模块介绍</h2><p>RTOS 提供了MMC 子系统来实现对各种SD/SDIO 设备访问，MMC 子系统由上到下可以分为三层，MMC/SD card 层，MMC/SD core 层以及MMC/SD host 层，它们之间的层次关系如下所示。</p><p>MMC/SD card 层负主要是按照RTOS 块设备驱动程序的框架实现一个卡的块设备驱动。负责块设备请求的处理，以及请求队列的管理。MMC/SD core 层负责通信协议的处理，包括SD/SDIO，为上一层提供具体读写接口，同时为下一层提供host 端接口。MMC/SD host 是实现对SD/MMC 控制器相关的操作，直接操作硬件，也是主要实现部分。</p><p><img src="http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter18/image1.jpg" alt="image1"></p><h2 id="模块配置" tabindex="-1"><a class="header-anchor" href="#模块配置" aria-hidden="true">#</a> 模块配置</h2><p>其 menuconfig 的配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Kernel Setup ---&gt;
    Drivers Setup ---&gt;
        SoC HAL Drivers ---&gt;
            SDMMC devices ---&gt;
                [*] enable SDMMC drivers    
                -*-   enable SD
                [*]   enable SDIO
                [ ]   enable mmc
                [ ]   enable emmc
                [ ]   enable detect card
                [*]   enable dma transmission
                [*]   enable sdio irq
                [*]   enable SD Card test case.
                (64)  SD Card Align DMA Buffer Size(Kbyte).
                (0)   sdc card detect pin present value
                [*]   support SDMMC filesystem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码结构" tabindex="-1"><a class="header-anchor" href="#源码结构" aria-hidden="true">#</a> 源码结构</h2><p>MMC 模块源码结构如下所示：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token punctuation">.</span>
├── cmd
│   ├── cmd_sd<span class="token punctuation">.</span>c
│   └── Kconfig
├── core<span class="token punctuation">.</span>c
├── _core<span class="token punctuation">.</span>h
├── hal
│   └── hal_ccm<span class="token punctuation">.</span>c
├── hal_sdhost<span class="token punctuation">.</span>c
├── hal_sdpin<span class="token punctuation">.</span>c
├── Kconfig
├── Makefile
├── mmc<span class="token punctuation">.</span>c
├── _mmc<span class="token punctuation">.</span>h
├── osal
│   ├── Makefile
│   └── os
│       ├── FreeRTOS
│       │   ├── Makefile
│       │   ├── os_debug<span class="token punctuation">.</span>c
│       │   ├── os_debug<span class="token punctuation">.</span>h
│       │   ├── os_mutex<span class="token punctuation">.</span>c
│       │   ├── os_queue<span class="token punctuation">.</span>c
│       │   ├── os_semaphore<span class="token punctuation">.</span>c
│       │   ├── os_thread<span class="token punctuation">.</span>c
│       │   ├── os_timer<span class="token punctuation">.</span>c
│       │   └── os_util<span class="token punctuation">.</span>h
│       ├── Kconfig
│       └── Makefile
├── platform
│   └── mmc_sun20iw2p1<span class="token punctuation">.</span>h
├── platform_mmc<span class="token punctuation">.</span>h
├── quirks<span class="token punctuation">.</span>c
├── sd<span class="token punctuation">.</span>c
├── _sd_define<span class="token punctuation">.</span>h
├── _sd<span class="token punctuation">.</span>h
├── _sdhost<span class="token punctuation">.</span>h
├── sdio<span class="token punctuation">.</span>c
├── _sdio<span class="token punctuation">.</span>h
├── sdio_irq<span class="token punctuation">.</span>c
└── test<span class="token punctuation">.</span>c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块接口说明" tabindex="-1"><a class="header-anchor" href="#模块接口说明" aria-hidden="true">#</a> 模块接口说明</h2><h3 id="sdmmc-接口" tabindex="-1"><a class="header-anchor" href="#sdmmc-接口" aria-hidden="true">#</a> SDMMC 接口</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/**
 * @brief read SD card.
 * @param card:
 *        @arg card-&gt;card handler.
 * @param buf:
 *        @arg buf-&gt;for store readed data.
 * @param sblk:
 *        @arg sblk-&gt;start block num.
 * @param nblk:
 *        @arg nblk-&gt;number of blocks.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_block_read</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">uint64_t</span> sblk<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> nblk<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief write SD card.
 * @param card:
 *        @arg card-&gt;card handler.
 * @param buf:
 *        @arg buf-&gt;data will be write.
 * @param sblk:
 *        @arg sblk-&gt;start block num.
 * @param nblk:
 *        @arg nblk-&gt;number of blocks.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_block_write</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">uint64_t</span> sblk<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> nblk<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief scan or rescan SD card.
 * @param card:
 *        @arg card-&gt;card handler.
 * @param sdc_id:
 *        @arg sdc_id-&gt;SDC ID which card on.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_rescan</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> sdc_id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief deinit SD card.
 * @param card:
 *        @arg card-&gt;card handler.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_card_deinit</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief malloc for card_info.
 * @param card_id:
 *        @arg card ID.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_card_create</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> card_id<span class="token punctuation">,</span> SDCard_InitTypeDef <span class="token operator">*</span>param<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief free for card_info.
 * @param card_id:
 *        @arg card ID.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_card_delete</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> card_id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief get pointer of mmc_card.
 * @param card_id:
 *        @arg card ID.
 * @retval  pointer of mmc_card if success or NULL if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">mmc_card</span><span class="token operator">*</span> <span class="token function">mmc_card_open</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> card_id<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * @brief close mmc_card.
 * @param card_id:
 *        @arg card ID.
 * @retval  0 if success or other if failed.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_card_close</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> card_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">mmc_card_info</span><span class="token operator">*</span> <span class="token function">mmc_card_save</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> card_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">extern</span> <span class="token class-name">int32_t</span> <span class="token function">mmc_card_restore</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card_info</span> <span class="token operator">*</span>s_card_info<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sdio-接口" tabindex="-1"><a class="header-anchor" href="#sdio-接口" aria-hidden="true">#</a> SDIO 接口</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token class-name">sdio_t</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *  sdio_readb - read a single byte from a SDIO function
 *  @card: SDIO to access
 *  @addr: address to read
 *  @err_ret: optional status value from transfer
 *
 *  Reads a single byte from the address space of a given SDIO
 *  function. If there is a problem reading the address, 0xff
 *  is returned and @err_ret will contain the error code.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">uint8_t</span>
<span class="token function">sdio_readb</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> func_num<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> addr<span class="token punctuation">,</span>
           <span class="token class-name">int32_t</span> <span class="token operator">*</span>err_ret<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *  sdio_writeb - write a single byte to a SDIO function
 *  @card: SDIO to access
 *  @b: byte to write
 *  @addr: address to write to
 *  @err_ret: optional status value from transfer
 *
 *  Writes a single byte to the address space of a given SDIO
 *  function. @err_ret will contain the status of the actual
 *  transfer.
 */</span>
<span class="token keyword">extern</span> <span class="token keyword">void</span>
<span class="token function">sdio_writeb</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> func_num<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token class-name">uint8_t</span> b<span class="token punctuation">,</span>
            <span class="token class-name">uint32_t</span> addr<span class="token punctuation">,</span> <span class="token class-name">int32_t</span>  <span class="token operator">*</span>err_ret<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *  sdio_readw - read a 16 bit integer from a SDIO function
 *  @func: SDIO function to access
 *  @addr: address to read
 *  @err_ret: optional status value from transfer
 *
 *  Reads a 16 bit integer from the address space of a given SDIO
 *  function. If there is a problem reading the address, 0xffff
 *  is returned and @err_ret will contain the error code.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">uint16_t</span> <span class="token function">sdio_readw</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> addr<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>err_ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/**
 *  sdio_writew - write a 16 bit integer to a SDIO function
 *  @func: SDIO function to access
 *  @b: integer to write
 *  @addr: address to write to
 *  @err_ret: optional status value from transfer
 *
 *  Writes a 16 bit integer to the address space of a given SDIO
 *  function. @err_ret will contain the status of the actual
 *  transfer.
 */</span>
<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">sdio_writew</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">,</span> <span class="token class-name">uint16_t</span> b<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> addr<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>err_ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/**
 *  sdio_readl - read a 32 bit integer from a SDIO function
 *  @func: SDIO function to access
 *  @addr: address to read
 *  @err_ret: optional status value from transfer
 *
 *  Reads a 32 bit integer from the address space of a given SDIO
 *  function. If there is a problem reading the address,
 *  0xffffffff is returned and @err_ret will contain the error
 *  code.
 */</span>
<span class="token keyword">extern</span> <span class="token class-name">uint32_t</span> <span class="token function">sdio_readl</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> addr<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>err_ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/**
 *  sdio_writel - write a 32 bit integer to a SDIO function
 *  @func: SDIO function to access
 *  @b: integer to write
 *  @addr: address to write to
 *  @err_ret: optional status value from transfer
 *
 *  Writes a 32 bit integer to the address space of a given SDIO
 *  function. @err_ret will contain the status of the actual
 *  transfer.
 */</span>
<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">sdio_writel</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> b<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> addr<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>err_ret<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *  memcpy_fromio - read a chunk of memory from a SDIO function
 *  @dst: buffer to store the data
 *  @addr: address to begin reading from
 *  @count: number of bytes to read
 *
 *  Reads from the address space of a given SDIO function. Return
 *  value indicates if the transfer succeeded or not.
 */</span>
<span class="token keyword">extern</span> <span class="token keyword">int</span>
<span class="token function">sdio_memcpy_fromio</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> func_num<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>dst<span class="token punctuation">,</span>
                   <span class="token keyword">unsigned</span> <span class="token keyword">int</span> addr<span class="token punctuation">,</span> <span class="token keyword">int</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *  memcpy_toio - write a chunk of memory to a SDIO function
 *  @addr: address to start writing to
 *  @src: buffer that contains the data to write
 *  @count: number of bytes to write
 *
 *  Writes to the address space of a given SDIO function. Return
 *  value indicates if the transfer succeeded or not.
 */</span>
<span class="token keyword">extern</span> <span class="token keyword">int</span>
<span class="token function">sdio_memcpy_toio</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">mmc_card</span> <span class="token operator">*</span>card<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> func_num<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> addr<span class="token punctuation">,</span>
                 <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>src<span class="token punctuation">,</span> <span class="token keyword">int</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *    sdio_claim_irq - claim the IRQ for a SDIO function
 *    @card: SDIO card
 *    @func_num: function num
 *    @handler: IRQ handler callback
 *
 *    Claim and activate the IRQ for the given SDIO function. The provided
 *    handler will be called when that IRQ is asserted.  The host is always
 *    claimed already when the handler is called so the handler must not
 *    call sdio_claim_host() nor sdio_release_host().
 */</span>
<span class="token comment">//extern int sdio_claim_irq(struct mmc_card *card, unsigned int func_num,</span>
<span class="token comment">//                          sdio_irq_handler_t *handler);</span>
<span class="token keyword">extern</span> <span class="token keyword">int</span> <span class="token function">sdio_claim_irq</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">,</span> <span class="token class-name">sdio_irq_handler_t</span> <span class="token operator">*</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *    sdio_release_irq - release the IRQ for a SDIO function
 *    @card: SDIO card
 *    @func_num: function num
 *
 *    Disable and release the IRQ for the given SDIO function.
 */</span>
<span class="token comment">//extern int sdio_release_irq(struct mmc_card *card, unsigned int func_num);</span>
<span class="token keyword">extern</span> <span class="token keyword">int</span> <span class="token function">sdio_release_irq</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 *  sdio_align_size - pads a transfer size to a more optimal value
 *  @func: SDIO function
 *  @sz: original transfer size
 *
 *  Pads the original data size with a number of extra bytes in
 *  order to avoid controller bugs and/or performance hits
 *  (e.g. some controllers revert to PIO for certain sizes).
 *
 *  If possible, it will also adjust the size so that it can be
 *  handled in just a single request.
 *
 *  Returns the improved size, which might be unmodified.
 */</span>
<span class="token comment">//unsigned int sdio_align_size(struct mmc_card *card, unsigned int sz);</span>
<span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token function">sdio_align_size</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">sdio_func</span> <span class="token operator">*</span>func<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> sz<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),c=[t];function l(d,r){return s(),a("div",null,c)}const p=n(i,[["render",l],["__file","chapter18.html.vue"]]);export{p as default};
