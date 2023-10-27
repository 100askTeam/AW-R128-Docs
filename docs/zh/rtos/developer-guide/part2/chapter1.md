# Crypto Engine

## 模块介绍

CE 模块主要支持对称算法、非对称算法、摘要算法进行数据的加密和解密功能。

CE 模块主要支持的算法如下：

- AES 算法 ECB/CBC/CTR/CTS/OFB/CFB/CBC-MAC/XTS 等模式.
- HASH 算法 MD5/SHA1/SHA224/SHA256/SHA384/SHA512/HMAC-SHA1/HMAC-SHA256.
- 非对称算法 RSA512/1024/2048/3072/4096.

## 模块配置

其menuconfig 的配置如下：

```c
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            CE devices --->
                [*] enable ce driver
                [*] enbale ce hal APIs Test command
```

## 源码结构

CE 驱动位于 `source/drivers/hal/source/ce/` 目录下。

```c
hal/
├── source
│ ├── ce
│ │ ├── ce_common.c    # CE公用操作接口函数文件
│ │ ├── ce_common.h    # CE操作接口函数头文件
│ │ ├── hal_ce.c       # CE底层驱动文件
│ │ ├── hal_ce.h       # CE底层驱动头文件
│ │ ├── Makefile
│ │ └── platform.h     # 平台配置头文件
| ├── platform
│ └── ce_sun20iw2.h    # 具体的平台配置头文件
├── include/hal
  └── sunxi_hal_ce.h   # CE公用操作接口函数头文件
```

## 模块接口说明

头文件

```c
#include <sunxi_hal_ce.h>
```

### CE 初始化接口

CE 模块初始化，主要申请中断、clk 初始化等

函数原型：

```c
int sunxi_ce_init(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### CE 去初始化接口

CE 模块去初始化，主要注销中断等

函数原型：

```c
int sunxi_ce_uninit(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### AES 算法加解密接口

主要实现对 AES 算法进行加解密

函数原型：

```c
int do_aes_crypto(crypto_aes_req_ctx_t *req_ctx)
```

参数：

- req_ctx: 为 AES 算法上下文的结构体

返回值：

- 0：成功
- 负数：失败

```c
typedef struct {
    uint8_t *src_buffer;
    uint32_t src_length;
    uint8_t *dst_buffer;
    uint32_t dst_length;
    uint8_t *iv;
    uint8_t *iv_next;
    uint8_t *key;
    uint32_t key_length;
    __aligned(CACHELINE_LEN) uint8_t padding[AES_BLOCK_SIZE];
    uint32_t padding_len;
    uint32_t dir;           /*0--加密，1--解密*/
    uint32_t mode;          /*AES算法的模式*/
    uint32_t bitwidth;
} crypto_aes_req_ctx_t;
```

### HASH 算法运算接口

主要实现对HASH 算法进行运算

函数原型：

```c
int do_hash_crypto(crypto_hash_req_ctx_t *req_ctx)
```

参数：

- req_ctx: 为HASH 算法上下文的结构体

返回值：

- 0：成功
- 负数：失败

```c
typedef struct {
    uint8_t *src_buffer;
    uint32_t src_length;
    uint8_t *dst_buffer;
    uint32_t dst_length;
    __aligned(CACHELINE_LEN) uint8_t md[SHA_MAX_DIGEST_SIZE];
    uint32_t md_size;
    __aligned(CACHELINE_LEN) uint8_t padding[SHA512_BLOCK_SIZE * 2];
    uint32_t padding_len;
    uint32_t type;          /*hash算法的模式*/
    uint32_t dir;
    uint32_t padding_mode;  /*hash算法的填充模式*/
} crypto_hash_req_ctx_t;
```

### RSA 算法运算接口

主要实现对RSA 算法进行加解密

函数原型：

```c
int do_rsa_crypto(crypto_rsa_req_ctx_t *req_ctx)
```

参数：

- req_ctx: 为 RSA算法上下文的结构体

返回值：

- 0：成功
- 负数：失败

```c
typedef struct {
    uint8_t *key_n;    /*公钥模数*/
    uint32_t n_len;
    uint8_t *key_e;    /*公钥指数*/
    uint32_t e_len;
    uint8_t *key_d;    /*私钥*/
    uint32_t d_len;
    uint8_t *src_buffer;
    uint32_t src_length;
    uint8_t *dst_buffer;
    uint32_t dst_length;
    uint32_t dir;      /*0--加密，1--解密*/
    uint32_t type;     /*RSA算法的模式*/
    uint32_t bitwidth; /*RSA算法位宽*/
} crypto_rsa_req_ctx_t;
```

### RNG 算法运算接口

主要实现随机数的生成

函数原型：

```c
int do_rng_gen(crypto_rsa_req_ctx_t *req_ctx)
```

参数：

- req_ctx: 为 RNG 算法上下文的结构体

返回值：

- 0：成功
- 负数：失败

```c
typedef struct {
    uint8_t *rng_buf;
    uint32_t rng_len;
    uint32_t mode;
    uint8_t *key;
    uint32_t key_len;
} crypto_rng_req_ctx_t;
```

## 模块使用范例

由于测试用例较大，所以将其拆分进入一个头文件内，可以从这里下载：[test_ce.h](https://r128.docs.aw-ol.com/sdk_module/ce/sdk_module/assets/demo/ce/test_ce.h)

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>

#include <hal_cmd.h>
#include <hal_mem.h>
#include <sunxi_hal_ce.h>
#include "test_ce.h"

#define AES_MODE_ECB (0)
#define AES_MODE_CBC (1)
#define AES_MODE_CTR (2)
#define AES_MODE_CTS (3)
#define AES_MODE_OFB (4)
#define AES_MODE_CFB (5)

#define AES_DIR_ENCRYPT (0)
#define AES_DIR_DECRYPT (1)

#define HASH_METHOD_MD5 (16)
#define HASH_METHOD_SHA1 (17)
#define HASH_METHOD_SHA224 (18)
#define HASH_METHOD_SHA256 (19)
#define HASH_METHOD_SHA384 (20)
#define HASH_METHOD_SHA512 (21)

void ce_dump(char *str, unsigned char *data, int len, int align) {
  int i = 0;
  if (str) printf("\n%s: ", str);
  for (i = 0; i < len; i++) {
    if ((i % align) == 0) {
      printf("\n");
      printf("0x08%x: ", data + i * align);
    }
    printf("%02x ", *(data++));
  }
  printf("\n");
}

int aes_test(void) {
  int ret = -1;
  int i = 0;
  int j = 0;
  int m = 0;
  uint8_t *enc_buffer = 0;
  uint32_t enc_len = 0;
  uint32_t blk_num = 0;
  __aligned(CACHELINE_LEN) uint8_t iv_next[AES_BLOCK_SIZE] = {0};
  uint8_t *(*aes_enc[])[5] = {aes_ecb, aes_cbc, aes_ctr,
                              aes_cbc, aes_ofb, aes_cfb8};
  crypto_aes_req_ctx_t *aes_ctx = NULL;

  aes_ctx = (crypto_aes_req_ctx_t *)hal_malloc_align(
      sizeof(crypto_aes_req_ctx_t), max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (aes_ctx == NULL) {
    printf(" malloc data buffer fail\n");
    return -1;
  }
  memset(aes_ctx, 0x0, sizeof(crypto_aes_req_ctx_t));

  aes_ctx->dst_buffer =
      (u8 *)hal_malloc_align(512, max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (aes_ctx->dst_buffer == NULL) {
    printf(" malloc dest buffer fail\n");
    ret = -1;
    goto out;
  }

  for (m = AES_MODE_ECB; m < AES_MODE_CFB + 1; m++) {
    for (i = 0; i < sizeof(aes_key_len) / sizeof(aes_key_len[0]); i++) {
      for (j = 0; j < sizeof(aes_src) / sizeof(aes_src[0]); j++) {
        /* aes encrypt */
        aes_ctx->src_buffer = aes_src[j];
        aes_ctx->src_length = aes_src_len[j];
        aes_ctx->key = aes_key[i];
        aes_ctx->key_length = aes_key_len[i];
        if (m == AES_MODE_ECB)
          aes_ctx->iv = NULL;
        else
          aes_ctx->iv = aes_iv;
        if (m == AES_MODE_CTR) {
          memset(iv_next, 0, AES_BLOCK_SIZE);
          aes_ctx->iv_next = iv_next;
        } else
          aes_ctx->iv_next = NULL;
        if (m == AES_MODE_CFB)
          aes_ctx->bitwidth = 8;
        else
          aes_ctx->bitwidth = 0;
        aes_ctx->mode = m;
        aes_ctx->dir = AES_DIR_ENCRYPT;
        aes_ctx->dst_length = CE_ROUND_UP(aes_ctx->src_length, AES_BLOCK_SIZE);

        printf(
            "###############AES, mode: %d, ksize %d, src len %d, "
            "begin###############\n",
            m, aes_key_len[i], aes_src_len[j]);

        ret = do_aes_crypto(aes_ctx);
        if (ret < 0) {
          printf("aes encrypt fail %d\n", ret);
          goto out;
        }

        // for ecb/cbc/cts, enc data len should be 16 bytes aligned
        if (m == AES_MODE_ECB || m == AES_MODE_CBC || m == AES_MODE_CTS)
          enc_len = aes_ctx->dst_length;
        else
          enc_len = aes_src_len[j];

        // openssl enc do not support cts, so create enc data manually.
        if (m == AES_MODE_CTS) {
          enc_buffer = (uint8_t *)hal_malloc_align(
              enc_len, max(CE_ALIGN_SIZE, CACHELINE_LEN));
          if (enc_buffer == NULL) {
            printf("malloc ctr buffer fail\n");
            ret = -1;
            goto out;
          }

          blk_num = enc_len / AES_BLOCK_SIZE;
          if (blk_num > 1) {
            if (blk_num > 2)
              memcpy(enc_buffer, aes_enc[m - AES_MODE_ECB][i][j],
                     (blk_num - 2) * AES_BLOCK_SIZE);
            memcpy(enc_buffer + (blk_num - 2) * AES_BLOCK_SIZE,
                   aes_enc[m - AES_MODE_ECB][i][j] +
                       (blk_num - 1) * AES_BLOCK_SIZE,
                   AES_BLOCK_SIZE);
            memcpy(enc_buffer + (blk_num - 1) * AES_BLOCK_SIZE,
                   aes_enc[m - AES_MODE_ECB][i][j] +
                       (blk_num - 2) * AES_BLOCK_SIZE,
                   AES_BLOCK_SIZE);
          } else {
            memcpy(enc_buffer, aes_enc[m - AES_MODE_ECB][i][j], enc_len);
          }
        } else
          enc_buffer = aes_enc[m - AES_MODE_ECB][i][j];

        if (memcmp(aes_ctx->dst_buffer, enc_buffer, enc_len) != 0) {
          ce_dump("want data: ", enc_buffer, enc_len, 16);
          ce_dump("calc data: ", aes_ctx->dst_buffer, enc_len, 16);
          printf(
              "###############AES ENC, mode: %d, ksize %d, src len %d, "
              "fail###############\n",
              m, aes_key_len[i], aes_src_len[j]);
          ret = -1;
          goto out;
        }

        /* aes decrypt */
        memset(aes_ctx->dst_buffer, 0x0, aes_ctx->dst_length);
        aes_ctx->dir = AES_DIR_DECRYPT;
        aes_ctx->src_buffer = enc_buffer;
        aes_ctx->src_length = enc_len;

        ret = do_aes_crypto(aes_ctx);
        if (ret < 0) {
          printf("aes decrypt fail %d\n", ret);
          goto out;
        }

        if (memcmp(aes_ctx->dst_buffer, aes_src[j], aes_src_len[j]) != 0) {
          ce_dump("want data: ", aes_src[j], aes_src_len[j], 16);
          ce_dump("calc data: ", aes_ctx->dst_buffer, aes_src_len[j], 16);
          printf(
              "###############AES DEC, mode: %d, ksize %d, src len %d, "
              "fail###############\n",
              m, aes_key_len[i], aes_src_len[j]);
          ret = -1;
          goto out;
        }

        if (m == AES_MODE_CTS) {
          if (enc_buffer) hal_free_align(enc_buffer);
        }

        printf(
            "###############AES, mode: %d, ksize %d, src len %d, "
            "pass###############\n\n\n",
            m, aes_key_len[i], aes_src_len[j]);
      }
    }
  }

out:
  if (aes_ctx->dst_buffer != NULL) {
    hal_free_align(aes_ctx->dst_buffer);
  }
  if (m == AES_MODE_CTS) {
    if (enc_buffer) hal_free_align(enc_buffer);
  }

  hal_free_align(aes_ctx);

  return ret;
}

int hash_test(void) {
  int i = 0;
  int j = 0;
  uint8_t *dst_data = NULL;
  // uint32_t data_size = 512; SHA_MAX_DIGEST_SIZE
  uint32_t data_size = SHA_MAX_DIGEST_SIZE;
  uint32_t hash_length = 0;
  int ret = -1;
  uint8_t *(*hash_digest[]) = {hash_md5,    hash_sha1,   hash_sha224,
                               hash_sha256, hash_sha384, hash_sha512};
  crypto_hash_req_ctx_t *hash_ctx = NULL;

  hash_ctx = (crypto_hash_req_ctx_t *)hal_malloc_align(
      sizeof(crypto_hash_req_ctx_t), max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (hash_ctx == NULL) {
    printf(" malloc hash_ctx fail\n");
    ret = -1;
    goto out;
  }

  /*malloc dst buf*/
  dst_data =
      (u8 *)hal_malloc_align(data_size, max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (dst_data == NULL) {
    printf(" malloc dst buffer fail\n");
    ret = -1;
    goto out;
  }

  for (i = HASH_METHOD_MD5; i < HASH_METHOD_SHA512 + 1; i++) {
    for (j = 0; j < sizeof(hash_src_len) / sizeof(hash_src_len[0]); j++) {
      memset(hash_ctx, 0x0, sizeof(crypto_hash_req_ctx_t));
      hash_ctx->src_buffer = hash_src[j];
      hash_ctx->src_length = hash_src_len[j];
      memset(dst_data, 0x0, data_size);
      hash_ctx->dst_buffer = dst_data;
      hash_ctx->type = i;
      hash_ctx->md_size = 0;
      switch (i) {
        case HASH_METHOD_MD5:
          hash_ctx->dst_length = MD5_DIGEST_SIZE;
          hash_length = MD5_DIGEST_SIZE;
          break;
        case HASH_METHOD_SHA1:
          hash_ctx->dst_length = SHA1_DIGEST_SIZE;
          hash_length = SHA1_DIGEST_SIZE;
          break;
        case HASH_METHOD_SHA224:
          hash_ctx->dst_length = SHA256_DIGEST_SIZE;
          hash_length = SHA224_DIGEST_SIZE;
          break;
        case HASH_METHOD_SHA256:
          hash_ctx->dst_length = SHA256_DIGEST_SIZE;
          hash_length = SHA256_DIGEST_SIZE;
          break;
        case HASH_METHOD_SHA384:
          hash_ctx->dst_length = SHA512_DIGEST_SIZE;
          hash_length = SHA384_DIGEST_SIZE;
          break;
        case HASH_METHOD_SHA512:
          hash_ctx->dst_length = SHA512_DIGEST_SIZE;
          hash_length = SHA512_DIGEST_SIZE;
          break;
        default:
          break;
      }

      printf("############hash type: %d, src len: %d, begin#############\n", i,
             hash_src_len[j]);

      ret = do_hash_crypto(hash_ctx);
      if (ret < 0) {
        printf("do_hash_crypto fail\n");
        goto out;
      }

      if (memcmp(hash_ctx->dst_buffer, hash_digest[i - HASH_METHOD_MD5][j],
                 hash_length) == 0) {
        printf(
            "############hash type: %d, src len: %d, pass#############\n\n\n",
            i, hash_src_len[j]);
      } else {
        ce_dump("want digest: ", hash_digest[i - HASH_METHOD_MD5][j],
                hash_length, 16);
        ce_dump("calc digest: ", hash_ctx->dst_buffer, hash_length, 16);
        printf(
            "############hash type: %d, src len: %d, fail#############\n\n\n",
            i, hash_src_len[j]);
        ret = -1;
        goto out;
      }
    }
  }

out:
  if (hash_ctx != NULL) {
    hal_free_align(hash_ctx);
  }

  if (dst_data != NULL) {
    hal_free_align(dst_data);
  }

  return ret;
}

#ifndef CONFIG_ARCH_SUN20IW2
int rng_test(void) {
  int ret = 0;
  int i = 0;
  uint8_t *rng_buf = NULL;
  uint32_t rng_size[] = {16, 31, 32, 8100};
  __aligned(CACHELINE_LEN) uint8_t key[24] = {
      0xa1, 0xb7, 0x78, 0xf7, 0xbf, 0x2c, 0xfa, 0xad, 0x6a, 0x46, 0x79, 0xc2,
      0xd2, 0x9c, 0x45, 0x1f, 0x3f, 0xcb, 0xef, 0xa5, 0x4e, 0x0e, 0xc3, 0x51};
  uint32_t key_len = 24;
  crypto_rng_req_ctx_t *rng_ctx = NULL;

  rng_ctx = (crypto_rng_req_ctx_t *)hal_malloc_align(
      sizeof(crypto_rng_req_ctx_t), max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (rng_ctx == NULL) {
    printf(" malloc rng ctx fail\n");
    ret = -1;
    goto out;
  }

  /*malloc trng buf*/
  rng_buf = (u8 *)hal_malloc_align(8192, max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (rng_buf == NULL) {
    printf("malloc rng buffer fail\n");
    ret = -1;
    goto out;
  }

#ifndef CE_FPGA_TEST
  /* FPGA do not support TRNG, so enable CE_FPGA_TEST when do CE FPGA
   * verification */
  /*TRNG test*/
  for (i = 0; i < sizeof(rng_size) / sizeof(uint32_t); i++) {
    printf("############TRNG, len: %d, begin#############\n", rng_size[i]);
    memset(rng_buf, 0, 8192);
    rng_ctx->rng_buf = rng_buf;
    rng_ctx->rng_len = rng_size[i];
    rng_ctx->mode = 0x30; /*CE_METHOD_TRNG*/
    rng_ctx->key = NULL;
    rng_ctx->key_len = 0;
    ret = do_rng_gen(rng_ctx);
    if (ret < 0) {
      printf("############TRNG, len: %d, fail#############\n\n\n", rng_size[i]);
      goto out;
    }
#if 0
        if (rng_size[i] < 100)
            ce_dump("trng:", rng_buf, rng_size[i], 16);
#endif
    printf("############TRNG, len: %d, pass#############\n\n\n", rng_size[i]);
  }
#endif

  /*PRNG test*/
  for (i = 0; i < sizeof(rng_size) / sizeof(uint32_t); i++) {
    printf("############PRNG, len: %d, begin#############\n", rng_size[i]);
    memset(rng_buf, 0, 8192);
    rng_ctx->rng_buf = rng_buf;
    rng_ctx->rng_len = rng_size[i];
    rng_ctx->mode = 0x31; /*CE_METHOD_PRNG*/
    rng_ctx->key = key;
    rng_ctx->key_len = key_len;
    ret = do_rng_gen(rng_ctx);
    if (ret < 0) {
      printf("############PRNG, len: %d, fail#############\n\n\n", rng_size[i]);
      goto out;
    }
#if 0
        if (rng_size[i] < 100)
            ce_dump("prng:", rng_buf, rng_size[i], 16);
#endif
    printf("############PRNG, len: %d, pass#############\n\n\n", rng_size[i]);
  }

out:
  if (rng_ctx) hal_free_align(rng_ctx);

  if (rng_buf) hal_free_align(rng_buf);

  return ret;
}
#else
int rng_test(void) {
  printf("sun20iw2 crypto engine do not support rng, please use hal_trng.\n");

  return 0;
}
#endif

int rsa_test(void) {
  int ret = 0;
  int i = 0;
  __aligned(CACHELINE_LEN) uint8_t dst_buffer[256] = {0};
  crypto_rsa_req_ctx_t *rsa_ctx = NULL;

  rsa_ctx = (crypto_rsa_req_ctx_t *)hal_malloc_align(
      sizeof(crypto_rsa_req_ctx_t), max(CE_ALIGN_SIZE, CACHELINE_LEN));
  if (rsa_ctx == NULL) {
    printf(" malloc rsa ctx fail\n");
    return -1;
  }

  /*rsa enc and dec*/
  for (i = 0; i < sizeof(rsa_bitwidth) / sizeof(rsa_bitwidth[0]); i++) {
    /* enc with public key*/
    printf("############RSA ENC/DEC, len: %d, begin#############\n",
           rsa_bitwidth[i]);
    memset(dst_buffer, 0, 256);
    memset(rsa_ctx, 0, sizeof(crypto_rsa_req_ctx_t));

    rsa_ctx->key_n = rsa_keyn[i];
    rsa_ctx->n_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_e = rsa_keye[i];
    rsa_ctx->e_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_d = 0;
    rsa_ctx->d_len = 0;

    rsa_ctx->src_buffer = rsa_src[i];
    rsa_ctx->src_length = rsa_bitwidth[i] / 8;
    rsa_ctx->dst_buffer = dst_buffer;
    rsa_ctx->dst_length = rsa_bitwidth[i] / 8;

    rsa_ctx->dir = 0;
    rsa_ctx->type = 0x20; /*CE_METHOD_RSA*/
    rsa_ctx->bitwidth = rsa_bitwidth[i];

    ret = do_rsa_crypto(rsa_ctx);
    if (ret < 0) {
      printf("do rsa crypto failed: %d\n", ret);
      goto out;
    }

    ret = memcmp(rsa_ctx->dst_buffer, rsa_enc[i], rsa_bitwidth[i] / 8);
    if (ret) {
      printf("rsa encrypt failed\n");
      ce_dump("want data: ", rsa_enc[i], rsa_bitwidth[i] / 8, 16);
      ce_dump("calc data: ", rsa_ctx->dst_buffer, rsa_ctx->dst_length, 16);
      printf("############RSA ENC, len: %d, fail#############\n\n\n",
             rsa_bitwidth[i]);
      goto out;
    }

    /* dec with private key */
    memset(dst_buffer, 0, 256);
    memset(rsa_ctx, 0, sizeof(crypto_rsa_req_ctx_t));

    rsa_ctx->key_n = rsa_keyn[i];
    rsa_ctx->n_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_e = 0;
    rsa_ctx->e_len = 0;
    rsa_ctx->key_d = rsa_keyd[i];
    rsa_ctx->d_len = rsa_bitwidth[i] / 8;

    rsa_ctx->src_buffer = rsa_enc[i];
    rsa_ctx->src_length = rsa_bitwidth[i] / 8;
    rsa_ctx->dst_buffer = dst_buffer;
    rsa_ctx->dst_length = rsa_bitwidth[i] / 8;

    rsa_ctx->dir = 0;
    rsa_ctx->type = 0x20; /*CE_METHOD_RSA*/
    rsa_ctx->bitwidth = rsa_bitwidth[i];

    ret = do_rsa_crypto(rsa_ctx);
    if (ret < 0) {
      printf("do rsa crypto failed: %d\n", ret);
      goto out;
    }

    ret = memcmp(rsa_ctx->dst_buffer, rsa_src[i], rsa_bitwidth[i] / 8);
    if (ret) {
      printf("rsa decrypt failed\n");
      ce_dump("want data: ", rsa_src[i], rsa_bitwidth[i] / 8, 16);
      ce_dump("calc data: ", rsa_ctx->dst_buffer, rsa_ctx->dst_length, 16);
      printf("############RSA DEC, len: %d, fail#############\n\n\n",
             rsa_bitwidth[i]);
      goto out;
    }

    printf("############RSA ENC/DEC, len: %d, pass#############\n\n\n",
           rsa_bitwidth[i]);
  }

  /* rsa sign/verify sha256 value */
  for (i = 0; i < sizeof(rsa_bitwidth) / sizeof(rsa_bitwidth[0]); i++) {
    /* sign with private key */
    printf("############RSA SIGN/VERIFY SHA256, len: %d, begin#############\n",
           rsa_bitwidth[i]);
    memset(dst_buffer, 0, 256);
    memset(rsa_ctx, 0, sizeof(crypto_rsa_req_ctx_t));

    rsa_ctx->key_n = rsa_keyn[i];
    rsa_ctx->n_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_e = 0;
    rsa_ctx->e_len = 0;
    rsa_ctx->key_d = rsa_keyd[i];
    rsa_ctx->d_len = rsa_bitwidth[i] / 8;

    rsa_ctx->src_buffer = rsa_sha256_raw[i];
    rsa_ctx->src_length = rsa_bitwidth[i] / 8;
    rsa_ctx->dst_buffer = dst_buffer;
    rsa_ctx->dst_length = rsa_bitwidth[i] / 8;

    rsa_ctx->dir = 0;
    rsa_ctx->type = 0x20; /*CE_METHOD_RSA*/
    rsa_ctx->bitwidth = rsa_bitwidth[i];

    ret = do_rsa_crypto(rsa_ctx);
    if (ret < 0) {
      printf("do rsa crypto failed: %d\n", ret);
      goto out;
    }

    ret = memcmp(rsa_ctx->dst_buffer, rsa_sha256_sign[i], rsa_bitwidth[i] / 8);
    if (ret) {
      printf("rsa encrypt failed\n");
      ce_dump("want data: ", rsa_sha256_sign[i], rsa_bitwidth[i] / 8, 16);
      ce_dump("calc data: ", rsa_ctx->dst_buffer, rsa_ctx->dst_length, 16);
      printf("############RSA SIGN SHA256, len: %d, fail#############\n\n\n",
             rsa_bitwidth[i]);
      // goto out;
    }

    /* verify with public key */
    memset(dst_buffer, 0, 256);
    memset(rsa_ctx, 0, sizeof(crypto_rsa_req_ctx_t));

    rsa_ctx->key_n = rsa_keyn[i];
    rsa_ctx->n_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_e = rsa_keye[i];
    rsa_ctx->e_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_d = 0;
    rsa_ctx->d_len = 0;

    rsa_ctx->src_buffer = rsa_sha256_sign[i];
    rsa_ctx->src_length = rsa_bitwidth[i] / 8;
    rsa_ctx->dst_buffer = dst_buffer;
    rsa_ctx->dst_length = 256 / 8;

    rsa_ctx->dir = 0;
    rsa_ctx->type = 0x20; /*CE_METHOD_RSA*/
    rsa_ctx->bitwidth = rsa_bitwidth[i];

    ret = do_rsa_crypto(rsa_ctx);
    if (ret < 0) {
      printf("do rsa crypto failed: %d\n", ret);
      goto out;
    }

    ret = memcmp(rsa_ctx->dst_buffer, rsa_sha256[i], 256 / 8);
    if (ret) {
      printf("rsa decrypt failed\n");
      ce_dump("want data: ", rsa_sha256[i], 256 / 8, 16);
      ce_dump("calc data: ", rsa_ctx->dst_buffer, rsa_ctx->dst_length, 16);
      printf("############RSA VERIFY SHA256, len: %d, fail#############\n\n\n",
             rsa_bitwidth[i]);
      goto out;
    }

    printf("############RSA SIGN/VERIFY SHA256, len: %d, pass#############\n\n\n",rsa_bitwidth[i]);
  }

  /* rsa sign/verify */
  for (i = 0; i < sizeof(rsa_bitwidth) / sizeof(rsa_bitwidth[0]); i++) {
    /* sign with private key */
    printf("############RSA SIGN/VERIFY, len: %d, begin#############\n",
           rsa_bitwidth[i]);
    memset(dst_buffer, 0, 256);
    memset(rsa_ctx, 0, sizeof(crypto_rsa_req_ctx_t));

    rsa_ctx->key_n = rsa_keyn[i];
    rsa_ctx->n_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_e = 0;
    rsa_ctx->e_len = 0;
    rsa_ctx->key_d = rsa_keyd[i];
    rsa_ctx->d_len = rsa_bitwidth[i] / 8;

    rsa_ctx->src_buffer = rsa_sign_raw[i];
    rsa_ctx->src_length = rsa_bitwidth[i] / 8;
    rsa_ctx->dst_buffer = dst_buffer;
    rsa_ctx->dst_length = rsa_bitwidth[i] / 8;

    rsa_ctx->dir = 0;
    rsa_ctx->type = 0x20; /*CE_METHOD_RSA*/
    rsa_ctx->bitwidth = rsa_bitwidth[i];

    ret = do_rsa_crypto(rsa_ctx);
    if (ret < 0) {
      printf("do rsa crypto failed: %d\n", ret);
      goto out;
    }

    ret = memcmp(rsa_ctx->dst_buffer, rsa_signature[i], rsa_bitwidth[i] / 8);
    if (ret) {
      printf("rsa encrypt failed\n");
      ce_dump("want data: ", rsa_signature[i], rsa_bitwidth[i] / 8, 16);
      ce_dump("calc data: ", rsa_ctx->dst_buffer, rsa_ctx->dst_length, 16);
      printf("############RSA SIGN, len: %d, fail#############\n\n\n",
             rsa_bitwidth[i]);
      // goto out;
    }

    /* verify with public key */
    memset(dst_buffer, 0, 256);
    memset(rsa_ctx, 0, sizeof(crypto_rsa_req_ctx_t));

    rsa_ctx->key_n = rsa_keyn[i];
    rsa_ctx->n_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_e = rsa_keye[i];
    rsa_ctx->e_len = rsa_bitwidth[i] / 8;
    rsa_ctx->key_d = 0;
    rsa_ctx->d_len = 0;

    rsa_ctx->src_buffer = rsa_signature[i];
    rsa_ctx->src_length = rsa_bitwidth[i] / 8;
    rsa_ctx->dst_buffer = dst_buffer;
    rsa_ctx->dst_length = 256 / 8;

    rsa_ctx->dir = 0;
    rsa_ctx->type = 0x20; /*CE_METHOD_RSA*/
    rsa_ctx->bitwidth = rsa_bitwidth[i];

    ret = do_rsa_crypto(rsa_ctx);
    if (ret < 0) {
      printf("do rsa crypto failed: %d\n", ret);
      goto out;
    }

    ret = memcmp(rsa_ctx->dst_buffer, rsa_sha256[i], 256 / 8);
    if (ret) {
      printf("rsa decrypt failed\n");
      ce_dump("want data: ", rsa_sha256[i], 256 / 8, 16);
      ce_dump("calc data: ", rsa_ctx->dst_buffer, rsa_ctx->dst_length, 16);
      printf("############RSA VERIFY, len: %d, fail#############\n\n\n",
             rsa_bitwidth[i]);
      goto out;
    }

    printf("############RSA SIGN/VERIFY, len: %d, pass#############\n\n\n",
           rsa_bitwidth[i]);
  }

out:
  if (rsa_ctx) hal_free_align(rsa_ctx);

  return ret;
}

#ifndef configAPPLICATION_NORMAL_PRIORITY
#define configAPPLICATION_NORMAL_PRIORITY (15)
#endif
static void aes_task(void *pvParameters) {
  int ret = 0;

  ret = aes_test();
  if (ret) {
    printf("ERROR: aes test failed\n");
  }

  vTaskDelete(NULL);
}
static void hash_task(void *pvParameters) {
  int ret = 0;

  ret = hash_test();
  if (ret) {
    printf("ERROR: hash test failed\n");
  }

  vTaskDelete(NULL);
}
static void rsa_task(void *pvParameters) {
  int ret = 0;

  ret = rsa_test();
  if (ret) {
    printf("ERROR: rsa test failed\n");
  }

  vTaskDelete(NULL);
}
static void rng_task(void *pvParameters) {
  int ret = 0;

  ret = rng_test();
  if (ret) {
    printf("ERROR: rng test failed\n");
  }

  vTaskDelete(NULL);
}

int cmd_test_ce(int argc, const char *argv[]) {
  int ret = 0;

  if (argc != 2) {
    printf("Parameter number Error!\n");
    printf("Usage: hal_ce <aes|hash|rsa|rng>\n");
    return -1;
  }

  sunxi_ce_init();

  if (strcmp(argv[1], "aes") == 0) {
    ret = aes_test();
  } else if (strcmp(argv[1], "hash") == 0) {
    ret = hash_test();
  } else if (strcmp(argv[1], "rsa") == 0) {
    ret = rsa_test();
  } else if (strcmp(argv[1], "rng") == 0) {
    ret = rng_test();
  } else if (strcmp(argv[1], "all") == 0) {
    TaskHandle_t task0, task1, task2, task3;
    portBASE_TYPE ret0, ret1, ret2, ret3;

    printf("******************************************************\n");
    printf("* NOTE: please enable CE_NO_IRQ when doing this test *\n");
    printf("******************************************************\n");

    ret0 = xTaskCreate(aes_task, (signed portCHAR *)"aes test", 4096, NULL,
                       configAPPLICATION_NORMAL_PRIORITY, &task0);
    if (ret0 != pdPASS) {
      printf("create aes task failed\n");
      return -1;
    }
    ret1 = xTaskCreate(hash_task, (signed portCHAR *)"hash test", 4096, NULL,
                       configAPPLICATION_NORMAL_PRIORITY, &task1);
    if (ret1 != pdPASS) {
      printf("create hash task failed\n");
      return -1;
    }
    ret2 = xTaskCreate(rsa_task, (signed portCHAR *)"rsa test", 4096, NULL,
                       configAPPLICATION_NORMAL_PRIORITY, &task2);
    if (ret2 != pdPASS) {
      printf("create rsa task failed\n");
      return -1;
    }
    ret3 = xTaskCreate(rng_task, (signed portCHAR *)"rng test", 4096, NULL,
                       configAPPLICATION_NORMAL_PRIORITY, &task3);
    if (ret3 != pdPASS) {
      printf("create rng task failed\n");
      return -1;
    }

  } else {
    printf("Parameter Error!\n");
    printf("Usage: hal_ce <aes|hash|rsa|rng|all>\n");
    ret = -1;
  }

  if (strcmp(argv[1], "all")) {
    sunxi_ce_uninit();
  }

  return ret;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_ce, hal_ce, tina rtos ce test demo)
```

# CSI

介绍sunxi 平台RTOS 上CSI_JPEG 驱动hal 的一般使用方法及调试接口，为开发与调试提供参考。

## 模块介绍

### SENSOR -> CSI 通路

CSI （CMOS sensor interface）接口时序上可支持独立 SYNC 和嵌入 SYNC(CCIR656)。支持接收 YUV422 或 YUV420 数据。

![image1](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image1.jpg)

VSYNC 和HSYNC 的有效电平可以是正极性，也可以是负极性。在配置时，需要保证摄像头和 CSI 内部配置保持一致。

最常见的 YUV422 格式输入后，内部只能处理成 YUV420 格式，并输出到 memory 存以 NV12布局形式。

![image2](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image2.jpg)

### CSI -> JPEG 通路

#### 编码格式

JPEG 模块只支持 YUV420 格式的编码，因此 CSI 捕获的数据输出给 JPEG 模块编码的图像格式必须是 YUV420。若 CSI 输入 JPEG 模块是 JPEG 码流，JPEG 模块也能正常将其输出。

#### 编码模式

JPEG 模块支持 online 及 offline 模式编码。

- online 模式即在线模式，CSI 每接收到 16 行数据就自动进行 JPEG 编码，当前帧图像接收完，编码也随即完成。该模式 CSI 不会将接收的原始图像数据保存起来，只输出 JPEG 编码后的数据。编码数据输出的方式又有：整帧模式和分块模式。
- offline 模式即离线模式，CSI 接收到的数据会先存到内存中，待一帧完整数据全部存储完成后，由软件启动 JPEG 编码。所以此时 JPEG 不是实时处理，可以对任何已经保存好的 YUV420 图像数据进行编码。

##### ONLINE 模式

Online 模式的通路框图如下图所示：

![image3](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image3.jpg)

Sensor(摄像头) 输出 YUV422 格式数据到 CSI，CSI 接收到 YUV422 后处理成 YUV420 格式，每接收到 16 行数据后，硬件会自动启动 JPEG encoder 进行一次编码操作，编码输出的码流通过总线直接写到设定好的内存中，故可认为 Online 模式下图像的接收和编码是同时进行的。在一帧数据接收完并编码结束后，JPEG encoder 会产生 ve finish(编码完成) 中断。因此，对图像分辨率的要求是行列数为 16 的整数倍，支持的最小分辨率为 32*32。

Online 分块模式与整帧模式的区别在于，分块模式可以在 JPEG 编码输出数据量达到设定值 (例如 2KB/4KB) 后产生中断，并且可以在一帧编码过程中循环使用编码输出空间，例如只分配 8KB的编码输出空间，而一帧图像编码数据有 20KB，则在第一次写满 8KB 后，JPEG 将会从这 8KB的首地址开始存储，循环使用，故需要软件配合将之前的数据读走，否则之前的数据会被覆盖。

##### OFFLINE 模式

Offline 模式的通路框图如下图所示：

![image4](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image4.jpg)

Offline 模式下，CSI 会将 YUV420 的原始图像数据存储到 YUV memory 中，存放格式为NV12。一帧图像全部存完后，产生写回中断 (wb finish)，然后由软件启动 JPEG 开始编码， JPEG 编码器会读取 YUV memory 中的原始数据送给 Encoder 进行编码，编码后的数据写到JPEG memory 中。

## 模块配置

其menuconfig 的配置如下（以选择GC0308 摄像头为例）：

```c
Drivers Options --->
    soc related device drivers --->
        CSI Devices --->
            [*] enable csi driver
            [*] enable csi camera driver
            [*] csi camera choice --->
                --- csi camera choice
                [*] csi camera GC0308
            [*] enable jpeg encoder
            [*] enable csi demo test command  // csi_jpeg模块测试用例
```
## 源码结构

驱动位于 `rtos-hal/hal/source/drivers/hal/source/csi`

```c
csi/
├── csi_camera/         ;csi driver
│   ├── csi.c
│   ├── csi.h
│   ├── csi_reg/
│   │   ├── csi_reg.c
│   │   └── csi_reg.h
│   └── sensor/         ;cmos sensor driver
│   ├── drv_gc0308.c
│   ├── sensor_helper.c
│   └── sensor_helper.h
├── hal_csi_jpeg.c      ;csi_jpeg模块驱动实现主体
├── jpeg/               ;jpeg driver
│   ├── hal_jpeg.c
│   ├── hal_jpeg.h
│   ├── jpegenc.c
│   ├── jpegenc.h
│   ├── jpeglib.c
│   ├── jpeglib.h
│   ├── jpeg_marker.h
│   └── jpeg_reg/
│   ├── jpeg_reg.c
│   └── jpeg_reg.h
└── utility
    ├── cj_board_cfg.h
    ├── cj_platform_cfg.h
    └── sensor/
        ├── camera_sensor.h
        └── drv_gc0308.h
```
## 模块接口说明

### 数据结构

#### `csi_jpeg_fmt`

作用：用于描述csi_jpeg 模块的属性参数

成员：

- line_mode：JPEG 的工作模式。
- output_mode：CSI_JPEG 的输出图像格式。
- cb：CSI/JPEG 的硬件中断的回调函数。可以用做实现JPEG 分块模式的数据提取功能。

```c
struct csi_jpeg_fmt {
    unsigned int width;
    unsigned int height;
    enum line_mode_t line_mode;
    enum pix_output_fmt_mode_t output_mode;
    CapStatusCb cb;
    unsigned char fps; //reserve
}；

// 成员line_mode结构体
enum line_mode_t {
    OFFLINE_MODE = 0,
    ONLINE_MODE,
};

// 成员output_mode结构体
enum pix_output_fmt_mode_t {
    PIX_FMT_OUT_NV12 = 0x1,
    PIX_FMT_OUT_JPEG = 0x2,
    PIX_FMT_OUT_MAX = 0x3,
};
```

#### `csi_ipeg_mem`

作用：用于描述 CSI/JPEG 模块所申请 buffer 相关的属性信息

成员：

- buf : 所申请的 buffer。
- mpart_info : JPEG 分块模式的块属性信息。

```c
struct csi_ipeg_mem {
    unsigned char index;
    struct csi_ipeg_buf buf;
    jpeg_mpartbuffinfo mpart_info;
    struct list_head list;
};

// 成员buf结构体
struct csi_ipeg_buf {
    unsigned int size;
    void *addr;
};

// 成员mpart_info结构体
typedef struct {
    uint8_t buff_index;   /* Indicate which buffer the currently encoded part jpeg is stored in */
    uint32_t buff_offset; /* Indicate the offset of the current part of jpeg in the buffer */
    uint8_t tail;         /* Indicates whether it is the last part of a jpeg image */
    uint32_t size;        /* Indicate the size of the current part of jpeg encoding */
} jpeg_mpartbuffinfo;
```

### 模块加载初始化

csi_jpeg 模块的加载函数，主要是CSI/JPEG 模块的初始化、申请中断和clk 初始化等

函数原型：

```c
HAL_Status hal_csi_jpeg_probe(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### 模块去初始化

csi_jpeg 模块的移除函数，主要是CSI/JPEG 模块的反初始化、注销中断和clk 反初始化等。

```c
HAL_Status hal_csi_jpeg_remove(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### 配置参数

设置csi_jpeg 模块的属性参数。

函数原型：

```c
void hal_csi_jpeg_set_fmt(struct csi_jpeg_fmt *intput_fmt)
```

参数：

- intput_fmt：指向csi_jpeg_fmt 结构体类型的配置参数。

返回值：

- 无

### 申请图像buffer

CSI/JPEG 模块获取存放图像数据的buffer。多个缓存可以用于建立FIFO，来提高视频采集的效率。

函数原型：

```c
int hal_csi_jpeg_reqbuf(unsigned int count)
```

参数：

- count: buffer 数目

返回值：

- 0：成功
- 负数：失败

### 释放图像buffer

CSI/JPEG 模块释放存放图像数据的buffer。

函数原型：

```c
int hal_csi_jpeg_freebuf(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### 配置流开关

csi_jpeg 模块的开流/关流函数，主要是CSI/JPEG 模块的配置和控制CSI 采集功能等。

函数原型：

```c
void hal_csi_jpeg_s_stream(unsigned int on)
```

参数：

- on：“非0” 值代表开启，“0” 值代表关闭

返回值：

- 无

### CSI buffer 出列

将CSI driver 已经填充好数据的 buffer 出列，供应用使用。

函数原型：

```c
unsigned int hal_csi_dqbuf(struct csi_ipeg_mem *csi_mem, unsigned int timeout_msec)
```

参数：

- csi_mem：CSI buffer，指向csi_ipeg_mem 结构体类型的配置参数。
- timeout_msec：单位ms。

返回值：

- 正数代表成功，返回csi_mem
- 负数代表失败

### CSI buffer 入队

将 User 空间已经处理过的buffer，重新入队，移交给CSI driver，等待填充数据。

函数原型：

```c
void hal_csi_qbuf(void)
```

参数：

- 无

返回值：

- 无

### JPEG buffer 出列

将 JPEG driver 已经填充好数据的 buffer 出列，供应用使用。

函数原型：

```c
unsigned int hal_jpeg_dqbuf(struct csi_ipeg_mem *jpeg_mem, unsigned int timeout_msec)
```

参数：

- jpeg_mem：JPEG buffer，指向csi_ipeg_mem 结构体类型的配置参数。
- timeout_msec：单位ms。

返回值：

- 正数代表成功，返回csi_mem
- 负数代表失败

### JPEG buffer 入队

将User 空间已经处理过的buffer，重新入队，移交给JPEG driver，等待填充数据。

函数原型：

```c
void hal_jpeg_qbuf(void)
```

参数：

- 无

返回值：

- 无

## 模块使用范例

### online 模式

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "FreeRTOS/_os_semaphore.h"
#include "FreeRTOS/_os_time.h"
#include "sunxi_hal_twi.h"
#include <fcntl.h>
#include <hal_cmd.h>
#include <hal_log.h>
#include <hal_thread.h>
#include "hal_csi_jpeg.h"
#include "jpegenc.h"
#include "cj_platform_cfg.h"

/* Macro JPEG_MPART_ENABLE defined in jpegenc.h */
#if JPEG_MPART_ENABLE
#define JPEG_MPART_SIZE         (50*1024)
#endif

static int read_whole_jpg(struct csi_ipeg_mem *jpeg_mem, int order)
{
    FILE* fd;
    long long res;
    void *addr;
    int size;
    char name[128];

    hal_log_info("%s line: %d addr = 0x%08x size = %d\n", __func__, __LINE__,
                jpeg_mem->buf.addr, jpeg_mem->buf.size);

    sprintf(name, "/data/test_%d.jpg", order);
    fd = fopen(name, "ab");
    if (fd < 0) {
        hal_log_info("open /data/test.jpg error %d\n", fd);
        return -1;
    }
    addr = jpeg_mem->buf.addr - JPEG_HEADER_LEN;
    size = jpeg_mem->buf.size + JPEG_HEADER_LEN;

    res = fwrite(addr, size, 1, fd);
    if (res < 0) {
        hal_log_info("write fail(%d), line%d..\n", res, __LINE__);
        fclose(fd);
        return -1;
    }
    hal_log_info("write JPEG image ok\n");

    fclose(fd);

    return 0;
}

static int read_part_jpg(void *addr, int size, int order)
{
    FILE* fd;
    long long res;
    char name[128];

    hal_log_info("%s line: %d addr = 0x%08x size = %d\n", __func__, __LINE__, addr, size);

    sprintf(name, "/data/test_%d.jpg", order);
    fd = fopen(name, "ab");
    if (fd < 0) {
        hal_log_info("open /data/test.jpg error %d\n", fd);
        return -1;
    }

    res = fwrite(addr, size, 1, fd);
    if (res < 0) {
        hal_log_info("write fail(%d), line%d..\n", res, __LINE__);
        fclose(fd);
        return -1;
    }
    hal_log_info("write JPEG image ok\n");

    fclose(fd);

    return 0;
}

#if JPEG_MPART_ENABLE
static uint8_t* gmpartaddr[3];
static uint32_t gmpartsize[3];
static void jpeg_mpart_cb(struct csi_ipeg_mem *jpeg_mem)
{
    static uint32_t offset = 0;
    static int index = 0;
    hal_dcache_clean_invalidate((unsigned long)jpeg_mem->buf.addr +
            jpeg_mem->mpart_info.buff_offset, jpeg_mem->mpart_info.size); /* necessary operation */
    memcpy(gmpartaddr[index] + offset, jpeg_mem->buf.addr + jpeg_mem->mpart_info.buff_offset,
            jpeg_mem->mpart_info.size);
    offset += jpeg_mem->mpart_info.size;
    if (jpeg_mem->mpart_info.tail) { /*  encode one jpeg finish */
        gmpartsize[index] = offset;
        offset = 0;
        index++;
        if (index > 3)
            index = 0;
    }
}
#endif

static void main_test()
{
    struct csi_jpeg_fmt fmt;
    unsigned int count, i;
    struct csi_ipeg_mem *csi_mem;
    struct csi_ipeg_mem *jpeg_mem[3];
    unsigned int test_count;
    unsigned int timeout_msec;
    unsigned int j = 0;

    fmt.width = 640;
    fmt.height = 480;
    fmt.line_mode = ONLINE_MODE;
    fmt.output_mode = PIX_FMT_OUT_MAX;
#if JPEG_MPART_ENABLE
    fmt.cb = &jpeg_mpart_cb;
#endif
    hal_csi_jpeg_set_fmt(&fmt);

    count = 3;

    if (hal_csi_jpeg_reqbuf(count) != 0) {
        return;
    }

    test_count = 3;

    hal_csi_jpeg_s_stream(1);

    hal_log_info("csi stream on!");

    timeout_msec = 2000;

#if JPEG_MPART_ENABLE
    for (i = 0; i < count; i++) {
        gmpartaddr[i] = malloc(JPEG_MPART_SIZE);
        hal_log_info("jpeg pic addr = %x\n", gmpartaddr[i]);
        memset(gmpartaddr[i], 0 , JPEG_MPART_SIZE);
    }
#endif

    while (test_count-- > 0) {
        jpeg_mem[j] = hal_jpeg_dqbuf(jpeg_mem[j], timeout_msec);
        hal_jpeg_qbuf();
        j++;
        if (j > count)
            j = 0;
    }
    hal_disable_irq(CSI_JPEG_IRQn);

#if JPEG_MPART_ENABLE
    for (i = 0; i < count; i++) {
        read_part_jpg(jpeg_mem[i]->buf.addr - JPEG_HEADER_LEN, JPEG_HEADER_LEN, i);
        read_part_jpg(gmpartaddr[i], gmpartsize[i], i);
        free(gmpartaddr[i]);
    }
#else
    for (i = 0; i < count; i++)
        read_whole_jpg(jpeg_mem[i], i);
#endif

    hal_csi_jpeg_s_stream(0);
    hal_csi_jpeg_freebuf();
    hal_log_info("csi stream off!!\n");

}

int cmd_csi_jpeg_online_test(int argc, const char **argv)
{
    hal_log_info("csi jpeg demo started\n");
    hal_csi_jpeg_probe();

    main_test();

    hal_csi_jpeg_remove();
    hal_log_info("csi jpeg demo over\n");

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_csi_jpeg_online_test, hal_csi_jpeg_online, csi jpeg online encode test)
```

### offline 模式

```c
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "FreeRTOS/_os_semaphore.h"
#include "FreeRTOS/_os_time.h"
#include "sunxi_hal_twi.h"
#include <fcntl.h>
#include <hal_cmd.h>
#include <hal_log.h>
#include <hal_thread.h>
#include "hal_csi_jpeg.h"
#include "jpegenc.h"

static int out_fmt = 0;
#define CSI_JPEG_IRQn   109  // rv
//#define CSI_JPEG_IRQn 93  // arm

static int read_frame(struct csi_ipeg_mem *csi_mem)
{
    FILE* fd;
    long long res;

    hal_disable_irq(CSI_JPEG_IRQn);  // when write bin, close irq, r/w too slow
    hal_log_info("%s line: %d addr = 0x%08x size = %d\n", __func__, __LINE__,
                csi_mem->buf.addr, csi_mem->buf.size);

    fd = fopen("/data/nv12.bin", "ab");
    if (fd < 0) {
        hal_log_info("open /data/nv12.bin error %d\n", fd);
        return -1;
    }

    res = fwrite(csi_mem->buf.addr, csi_mem->buf.size, 1, fd);
    if (res < 0) {
        hal_log_info("write fail(%d), line%d..\n", res, __LINE__);
        fclose(fd);
        return -1;
    }
    hal_log_info("write YUV image ok\n");

    fclose(fd);

    hal_enable_irq(CSI_JPEG_IRQn);  // after write bin, open irq, r/w too slow
    return 0;
}

static int read_jpg(struct csi_ipeg_mem *jpeg_mem)
{
    FILE* fd;
    long long res;
    void *addr;
    unsigned int size;
    char name[128];

    hal_disable_irq(CSI_JPEG_IRQn);  // cfm when write bin, close irq
    hal_log_info("%s line: %d addr = 0x%08x size = %d\n", __func__, __LINE__,
                jpeg_mem->buf.addr, jpeg_mem->buf.size);

    fd = fopen("/data/test.jpg", "ab");
    if (fd < 0) {
        hal_log_info("open /data/test_online.jpg error %d\n", fd);
        return -1;
    }

    addr = jpeg_mem->buf.addr - JPEG_HEADER_LEN;
    size = jpeg_mem->buf.size + JPEG_HEADER_LEN;

    res = fwrite(addr, size, 1, fd);
    if (res < 0) {
        hal_log_info("write fail(%d), line%d..\n", res, __LINE__);
        fclose(fd);
        return -1;
    }
    hal_log_info("write JPEG image ok\n");

    fclose(fd);
    hal_enable_irq(CSI_JPEG_IRQn);  // cfm after write bin, open irq

    return 0;
}

static void main_test()
{
    struct csi_jpeg_fmt fmt;
    unsigned int count;
    struct csi_ipeg_mem *csi_mem;
    struct csi_ipeg_mem *jpeg_mem;
    unsigned int test_count;
    unsigned int timeout_msec;

    fmt.width = 640;
    fmt.height = 480;
    fmt.line_mode = OFFLINE_MODE;
    fmt.output_mode = PIX_FMT_OUT_MAX;
    hal_csi_jpeg_set_fmt(&fmt);

    count = 3;

    if (hal_csi_jpeg_reqbuf(count) != 0) {
        return ;
    }

    hal_csi_jpeg_s_stream(1);
    hal_log_info("csi stream on!");

    test_count = 200;
    timeout_msec = 2000;  // recommend 2s, 10s for pm test

    if (!out_fmt) {
        while (test_count-- > 0) {
            hal_log_info("test count = %d\n", test_count);
            csi_mem = hal_csi_dqbuf(csi_mem, timeout_msec);
            if (test_count == 1)
                read_frame(csi_mem);
            hal_csi_qbuf();
        }
    } else {
        while (test_count-- > 0) {
            hal_log_info("test count = %d\n", test_count);
            jpeg_mem = hal_jpeg_dqbuf(jpeg_mem, timeout_msec);
            if (test_count == 1)
                read_jpg(jpeg_mem);
            hal_jpeg_qbuf();
        }
    }

    hal_csi_jpeg_s_stream(0);
    hal_csi_jpeg_freebuf();
    hal_log_info("csi stream off!!\n");

}

struct rt_thread *thread;

static void csi_thread(void *data)
{
    hal_log_info("csi jpeg demo started\n");
    hal_csi_jpeg_probe();

    main_test();

    hal_csi_jpeg_remove();
    hal_log_info("csi jpeg demo over\n");

    kthread_stop(thread);

    return 0;
}

int cmd_csi_jpeg_offline_test(int argc, const char **argv)
{
    int ret;
    if (argc < 2)
    {
        hal_log_info("Usage: hal_csi_jpeg_offline num. num: 0 is nv12, 1 is jpeg\n");
    } else {
        out_fmt = strtol(argv[1], NULL, 0);
    }

    thread = kthread_create((void *)csi_thread, NULL, "csi_thread", 409600, HAL_THREAD_PRIORITY_SYS);
    kthread_start(thread);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_csi_jpeg_offline_test, hal_csi_jpeg_offline, csi jpeg offline encode test)
```

# CCU

介绍 RTOS 中CCU 驱动的接口及使用方法，为 CCU 的使用者提供参考。

## 模块介绍

CCU 驱动主要实现设备驱动的底层细节，并为上层提供一套标准的API 接口以供使用。

## 模块配置

其menuconfig 的配置如下：

```shell
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            CCMU devices --->
                [*] enable ccmu-ng driver
                [*] enbale ccmu-ng hal APIs Test command
```

## 源码结构

```c
.
│  common_ccmu.h
│  hal_clk.c
│  hal_reset.c
│  Kconfig
│  Makefile
│  platform_ccmu.h
│  platform_rst.h
│
├─sunxi
│  │  clk.c
│  │  clk.h
│  │  clk_factors.c
│  │  clk_factors.h
│  │  clk_periph.c
│  │  clk_periph.h
│  │  Makefile
│  │  platform_clk.h
│  │
│  └─sun8iw21p1             # sun8iw21p1平台实现(老平台，目前使用ng驱动)
│          clk_sun8iw21.c
│          clk_sun8iw21.h
│          Makefile
│
└─sunxi-ng                  # sunxi-ng 驱动实现
        ccu-sun20iw2-aon.c
        ccu-sun20iw2-aon.h
        ccu-sun20iw2-r.c
        ccu-sun20iw2-r.h
        ccu-sun20iw2.c
        ccu-sun20iw2.h
        ccu.c
        ccu.h
        ccu_common.c
        ccu_common.h
        ccu_div.c
        ccu_div.h
        ccu_frac.c
        ccu_frac.h
        ccu_gate.c
        ccu_gate.h
        ccu_mp.c
        ccu_mp.h
        ccu_mult.c
        ccu_mult.h
        ccu_mux.c
        ccu_mux.h
        ccu_nk.c
        ccu_nk.h
        ccu_nkm.c
        ccu_nkm.h
        ccu_nkmp.c
        ccu_nkmp.h
        ccu_nm.c
        ccu_nm.h
        ccu_phase.c
        ccu_phase.h
        ccu_reset.c
        ccu_reset.h
        ccu_sdm.c
        ccu_sdm.h
        clk-divider.c
        clk-fixed-factor.c
        clk-fixed-rate.c
        clk-fixed-rate.h
        clk.c
        clk.h
        Makefile
        rst-sun20iw2-aon.h
        rst-sun20iw2-r.h
        rst-sun20iw2.h
        type.h
```

## 模块接口说明

头文件

```c
#include <hal_clk.h>
#include <hal_reset.h>
#include <ccmu/common_ccmu.h>
```

### 返回值定义枚举

```c
typedef enum
{

    HAL_CLK_STATUS_DISABLED = -1,
    HAL_CLK_STATUS_ENABLED = 0,
    HAL_CLK_STATUS_ERROR_CLK_FACTOR_REFUSED = -11,
    HAL_CLK_STATUS_ERROR_CLK_NEED_DISABLED  = -10,
    HAL_CLK_STATUS_ERROR_CLK_PARENT_DISABLED  = -9,
    HAL_CLK_STATUS_ERROR_CLK_ENABLED_FAILED  = -8,
    HAL_CLK_STATUS_ERROR_CLK_ROUND_FAILED = -7,
    HAL_CLK_STATUS_ERROR_CLK_SET_RATE_REFUSED = -6,
    HAL_CLK_STATUS_ERROR_CLK_NOT_FOUND  = -5,
    HAL_CLK_STATUS_ERROT_CLK_UNDEFINED  = -4,
    HAL_CLK_STATUS_UNINITIALIZED = -3,        /**< Uninitialized clock driver. */
    HAL_CLK_STATUS_INVALID_PARAMETER = -2,    /**< Invalid parameter. */
    HAL_CLK_STATUS_ERROR = -1,                /**< Unknown error. */
    HAL_CLK_STATUS_OK = 0,                    /**< Successful. */
} hal_clk_status_t;
```

### 时钟类型定义枚举

```c
typedef enum
{
    HAL_SUNXI_FIXED_CCU = 0,
    HAL_SUNXI_RTC_CCU,
    HAL_SUNXI_CCU,
    HAL_SUNXI_AON_CCU,
    HAL_SUNXI_R_CCU,
    HAL_SUNXI_DSP,
    HAL_SUNXI_CCU_NUMBER,
} hal_clk_type_t;
```

### 初始化CCU驱动

函数原型

```c
void hal_clock_init(void);
```

参数：

- 无

返回值：

- 无

### 判断指定时钟是否已经打开

函数原型

```c
hal_clk_status_t hal_clock_is_enabled(hal_clk_t clk);
```

参数：

- clk：clk id

返回值：

- HAL_CLK_STATUS_ENABLED：打开
- HAL_CLK_STATUS_DISABLED：关闭

### 获得指定的时钟句柄

函数原型

```c
hal_clk_t hal_clock_get(hal_clk_type_t type, hal_clk_id_t id);
```

参数：

- type：时钟类型
- id：时钟id

返回值：

- 时钟句柄 hal_clk_t

### 释放指定时钟句柄

函数原型

```c
hal_clk_status_t hal_clock_put(hal_clk_t clk);
```

参数：

- clk：要操作的时钟句柄

返回值：

- 0：成功
- 负数：失败

### 打开指定时钟

函数原型

```c
hal_clk_status_t hal_clock_enable(hal_clk_t clk);
```

参数：

- clk：时钟id

返回值：

- 0：成功
- 负数：失败

### 关闭指定时钟

函数原型

```c
hal_clk_status_t hal_clock_disable(hal_clk_t clk);
```

参数：

- clk：时钟id

返回值：

- 0：成功
- 负数：失败

### 重新计算指定时钟的频率

函数原型

```c
u32 hal_clk_recalc_rate(hal_clk_t clk);
```

参数：

- clk：时钟id

返回值：

- 0：成功
- 负数：失败

### 设置一个跟指定频率最接近的时钟频

函数原型

```c
u32 hal_clk_round_rate(hal_clk_t clk, u32 rate);
```

参数：

- clk：时钟id
- rate：频率

返回值：

- 0：成功
- 负数：失败

### 获取指定时钟频率

> 可能非实时

函数原型

```c
u32 hal_clk_get_rate(hal_clk_t clk);
```

参数：

- clk：时钟id

返回值：

- 0：成功
- 负数：失败

### 设置指定时钟的频

函数原型

```c
hal_clk_status_t hal_clk_set_rate(hal_clk_t clk,  u32 rate);
```

参数：

- clk：时钟id
- rate：频率

返回值：

- 0：成功
- 负数：失败

### 设置指定时钟的父时钟

函数原型

```c
hal_clk_status_t hal_clk_set_parent(hal_clk_t clk, hal_clk_t parent);
```

参数：

- clk：时钟id
- parent：父时钟id

返回值：

- 0：成功
- 负数：失败

### 获取指定时钟的父时钟

函数原型

```c
hal_clk_t hal_clk_get_parent(hal_clk_t clk);
```

参数：

- clk：时钟id

返回值：

- 0：成功
- 负数：失败

## 模块使用范例

```c
#include <stdlib.h>
#include <hal_log.h>
#include <hal_cmd.h>
#include <hal_clk.h>
#include <hal_reset.h>
#include <ccmu/common_ccmu.h>
#include "../../source/ccmu/sunxi-ng/ccu-sun20iw2-aon.h"

#ifndef CLK_RTC_NUMBER
#define CLK_RTC_NUMBER 0
#endif

int clk_number[] = {
    CLK_SRC_NUMBER,
    CLK_RTC_NUMBER,
    CLK_NUMBER,
    CLK_AON_NUMBER,
    CLK_R_NUMBER,
    0
};

int reset_number[] = {
    RST_BUS_NUMBER,
    RST_R_BUS_NUMBER,
    0,
};

char *strict_clks[] = {
    "pll-ddr0",
    "riscv",
    "pll-cpux",
    "pll-periph0-parent",
    "riscv-axi",
    "apb1",
    "fanout-27m",
    "fix-losc",
    "rc-16m",
    "ext-32k",
    "rc-hf",
    "pclk-spc-1",
    "pclk-spc-2",
    "pclk-spc",
    NULL,
};

char *clk_type_name[] = {
    "HAL_SUNXI_FIXED_CCU",
    "HAL_SUNXI_RTC_CCU",
    "HAL_SUNXI_CCU",
    "HAL_SUNXI_AON_CCU",
    "HAL_SUNXI_R_CCU",
};

int is_strict_clk(hal_clk_t clk)
{
    int i;
    for (i = 0; strict_clks[i] != NULL; i++)
    {
        if (!strcmp(clk->name, strict_clks[i]))
            return 1;
    }

    return 0;
}

int is_dcxo_clk(hal_clk_t clk)
{
    if (!strncmp(clk->name, "dcxo", 4))
        return 1;
    return 0;
}

int cmd_test_ng_ccmu(int argc, char **argv)
{
    int i, j;

    hal_clk_type_t clk_type;
    hal_clk_id_t   clk_id;
    hal_clk_t clk, p_clk;
    u32  old_rate;

    hal_reset_type_t reset_type;
    hal_reset_id_t  reset_id;
    hal_clk_status_t clk_status;
    struct reset_control *reset;
    int reset_status;
    u32 new_rate;

    printf("clock\t\t\t\t\t type\t\t\t\t\t parent\t\t\t\t\t rate\n");
    for (i = HAL_SUNXI_FIXED_CCU; i < HAL_SUNXI_CCU_NUMBER; i++)
    {
        clk_type = i;
        for (j = 0; j < clk_number[i]; j++)
        {
            clk_id = j;
            clk = hal_clock_get(clk_type, clk_id);
            if (!clk) {
                printf("fail to get clk\n");
                continue;
            }

            p_clk = hal_clk_get_parent(clk);

            old_rate = hal_clk_get_rate(clk);
            if (p_clk)
                printf("%-20s\t\t\t %-20s\t\t\t %-15s\t\t\t %d\n", clk->name, clk_type_name[i], p_clk->name, old_rate);
            else
                printf("%-20s\t\t\t %-20s\t\t\t NULL\t\t\t\t\t %d\n", clk->name, clk_type_name[i], old_rate);

        }
    }
    for (i = HAL_SUNXI_RESET; i < HAL_SUNXI_RESET_NUMBER; i++)
    {
        reset_type = i;
        for (j = 0; j < reset_number[i]; j++)
        {
            reset_id = j;

            printf("reset: get reset control, type:%d, id: %d\n", reset_type, reset_id);
            reset = hal_reset_control_get(reset_type, reset_id);

            printf("reset: control deassert\n");
            hal_reset_control_deassert(reset);

            reset_status = hal_reset_control_status(reset);
            printf("reset status: %s", reset_status ? "assert" : "deassert");

            printf("reset: put reset control, type:%d, id: %d\n", reset_type, reset_id);
            hal_reset_control_put(reset);
        }
    }
    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_ng_ccmu, hal_ccmu, sunxi - ng ccmu hal APIs tests)
```

# DMA Controller

本文介绍RTOS 中DMA 驱动的接口及使用方法，为DMA 的使用者提供参考。

DMA 主要实现设备与设备、设备与 memory、memory 与 memory 之间的数据搬运与传输；BSP DMA 驱动主要实现设备驱动的底层细节，并为上层提供一套标准的 API 接口以供使用。

## 文档约定

| 数据       | 说明        |
| :--------- | :---------- |
| DRQSRC_XXX | 源 DRQ 号   |
| DRQDST_XXX | 目的 DRQ 号 |

## 模块配置

```c
Drivers Options —>
    soc related device drivers —>
        DMA Devices —>
            [*] enable dma driver
            [*]     enable dma hal API test command
```

## 源码结构

```c
hal/source/dma/       ---- 驱动源码
├── hal_dma.c
├── Kconfig
├── Makefile
├── platform
│   └── dma-sun20iw3.h
├── platform-dma.h

include/hal/          ---- 驱动APIs声明头文件
└── hal_dma.h
```

## 驱动框架

![image5](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image5.jpg)

## 模块接口说明

头文件：

```c
#include <hal_dma.h>
#include <sunxi_hal_common.h>
```

### 申请 DMA 通道

函数原型：

```c
hal_dma_chan_status_t hal_dma_chan_request(struct sunxi_dma_chan **dma_chan)
```

参数：

- dma_chan: 存放 DMA 通道的指针变量

返回值：

- HAL_DMA_CHAN_STATUS_BUSY: 申请失败
- HAL_DMA_CHAN_STATUS_FREE: 申请成功

### 释放 DMA 通道

函数原型：

```c
hal_dma_status_t hal_dma_chan_free(struct sunxi_dma_chan *chan)
```

参数：

- chan: 要释放的 DMA 通道结构体指针变量

返回值：

- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 释放 DMA 通道描述符

函数原型：

```c
hal_dma_status_t hal_dma_chan_desc_free(struct sunxi_dma_chan *chan)
```

参数：

- chan: 要释放的 DMA 通道结构体指针变量

返回值：

- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 初始化环形 DMA 传输

函数原型：

```c
hal_dma_status_t hal_dma_prep_cyclic(struct sunxi_dma_chan *chan, uint32_t buf_addr, uint32_t buf_len, uint32_t period_len, enum dma_transfer_direction dir)
```

参数：

- chan:DMA 通道结构体指针变量
- buf_addr: 数据缓冲区
- buf_len: 数据缓冲区长度
- period_len: 单次 DMA 搬运长度
- dir:DMA 传输方向

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 初始化 memory to memory DMA 传输

函数原型：

```c
hal_dma_status_t hal_dma_prep_memcpy(struct sunxi_dma_chan *chan, uint32_t dest, uint32_t src, uint32_t len)
```

参数：

- chan:DMA 通道结构体指针变量
- dest: 目的地址
- src: 源地址
- len: 传输长度

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 初始化通用 DMA 传输

函数原型：

```c
hal_dma_status_t hal_dma_prep_device(struct sunxi_dma_chan *chan, uint32_t dest, uint32_t src, uint32_t len, enum dma_transfer_direction dir)
```

参数：

- chan:DMA 通道结构体指针变量
- dest: 目的地址
- src: 源地址
- len: 传输长度
- dir:DMA 传输方向

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 注册 DMA 回调函数

函数原型：

```c
hal_dma_status_t hal_dma_callback_install(struct sunxi_dma_chan *chan, dma_callback callback, void *callback_param)
```

参数：

- chan:DMA 通道结构体指针变量
- callback: 回调函数 handler
- callback_param: 回调函数传参

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_OK: 成功

### 配置 DMA 描述符传输信息

函数原型：

```c
hal_dma_status_t hal_dma_slave_config(struct sunxi_dma_chan *chan, struct dma_slave_config *config)
```

参数：

- chan:DMA 通道结构体指针变量
- config:DMA 描述符结构体指针变量

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_OK: 成功

### 获取 DMA 发送状态

函数原型：

```c
enum dma_status hal_dma_tx_status(struct sunxi_dma_chan *chan, uint32_t *left_size)
```

参数：

- chan:DMA 通道结构体指针变
- left_size: 存放剩余长度的指针变量

返回值：

- DMA_INVALID_PARAMETER: 参数非法
- DMA_IN_PROGRESS: 正在进行
- DMA_COMPLETE: 传输完成

### 启动 DMA 传输

函数原型：

```c
hal_dma_status_t hal_dma_start(struct sunxi_dma_chan *chan)
```

参数：

- chan:DMA 通道结构体指针变量

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 停止 DMA 传输

函数原型：

```c
hal_dma_status_t hal_dma_stop(struct sunxi_dma_chan *chan)
```

参数：

- chan:DMA 通道结构体指针变量

返回值：

- HAL_DMA_STATUS_INVALID_PARAMETER: 参数非法
- HAL_DMA_STATUS_ERROR: 失败
- HAL_DMA_STATUS_OK: 成功

### 初始化 DMA 控制器驱动

函数原型：

```c
void hal_dma_init(void)
```

参数：

- 无

返回值：

- 无

### 申请一致性内存

函数原型：

```c
void *dma_alloc_coherent(size_t size)
```

参数：

- size: 申请内存的大小

返回值：

- ptr: 内存缓冲区指针

### 释放一致性内存

函数原型：

```c
void dma_free_coherent(void *addr)
```

参数：

- addr: 内存缓冲区指针

返回值：

- 无

## 调试节点

- `menuconfig` 选择测试文件`CONFIG_HAL_TEST_DMA`
- s系统启动后执行`hal_dma`即可，若结果为 “PASS”, 则表明当前 DMA 基本功能是否正常

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <hal_mem.h>
#include <hal_cache.h>
#include <hal_dma.h>

#include <sunxi_hal_common.h>

#define DMA_TEST_LEN    1024
static void dma_test_cb(void *param)
{
    hal_log_info("DMA finished, callback to do something...\n");
}

int cmd_test_dma(int argc, char **argv)
{
    int ret, i;
    struct sunxi_dma_chan *hdma = NULL;
    char *buf1 = NULL,*buf2 = NULL;
    struct dma_slave_config config = {0};
    uint32_t size = 0;

    hal_log_info("run in dma test");

    buf2 = dma_alloc_coherent(DMA_TEST_LEN);
    buf1 = dma_alloc_coherent(DMA_TEST_LEN);

    if (buf1 == NULL) {
        hal_log_err("malloc buf1 error!");
        goto end;
    }

    if (buf2 == NULL) {
        hal_log_err("malloc buf2 error!");
        goto end;
    }

    memset(buf1, 0, DMA_TEST_LEN);
    memset(buf2, 0, DMA_TEST_LEN);

    for (i = 0;i < DMA_TEST_LEN; i++)
        buf1[i] = i & 0xff;

    hal_dcache_clean_invalidate((unsigned long)buf1, DMA_TEST_LEN);
    hal_dcache_clean_invalidate((unsigned long)buf2, DMA_TEST_LEN);

    /* request dma chan */
    ret = hal_dma_chan_request(&hdma);
    if (ret == HAL_DMA_CHAN_STATUS_BUSY) {
        hal_log_err("dma channel busy!");
        goto end;
    }

    /* register dma callback */
    ret = hal_dma_callback_install(hdma, dma_test_cb, hdma);
    if (ret != HAL_DMA_STATUS_OK) {
        hal_log_err("register dma callback failed!");
        goto end;
    }

    config.direction = DMA_MEM_TO_MEM;
    config.dst_addr_width = DMA_SLAVE_BUSWIDTH_8_BYTES;
    config.src_addr_width = DMA_SLAVE_BUSWIDTH_8_BYTES;
    config.dst_maxburst = DMA_SLAVE_BURST_16;
    config.src_maxburst = DMA_SLAVE_BURST_16;
    config.slave_id = sunxi_slave_id(DRQDST_SDRAM, DRQSRC_SDRAM);

    ret = hal_dma_slave_config(hdma, &config);

    if (ret != HAL_DMA_STATUS_OK) {
        hal_log_err("dma config error, ret:%d", ret);
        goto end;
    }

    ret = hal_dma_prep_memcpy(hdma, (unsigned long)buf2, (unsigned long)buf1, DMA_TEST_LEN);
    if (ret != HAL_DMA_STATUS_OK) {
        hal_log_err("dma prep error, ret:%d", ret);
        goto end;
    }

    ret = hal_dma_start(hdma);
    if (ret != HAL_DMA_STATUS_OK) {
        hal_log_err("dma start error, ret:%d", ret);
        goto end;
    }

    while (hal_dma_tx_status(hdma, &size)!= 0);

    ret = hal_dma_stop(hdma);
    if (ret != HAL_DMA_STATUS_OK) {
        hal_log_err("dma stop error, ret:%d", ret);
        goto end;
    }

    ret = hal_dma_chan_free(hdma);
    if (ret != HAL_DMA_STATUS_OK) {
        hal_log_err("dma free error, ret:%d", ret);
        goto end;
    }

    hal_dcache_invalidate((unsigned long)buf2, DMA_TEST_LEN);

    hal_log_info("src buf:\n");
    for (i = 0;i < DMA_TEST_LEN; i++) {
        if (i % 16 == 0)
            printf("\n");
        printf("%02x ", buf1[i]);
    }
    printf("\n\n\n");
    hal_log_info("dst buf:\n");
    for (i = 0;i < DMA_TEST_LEN; i++) {
        if (i % 16 == 0)
            printf("\n");
        printf("%02x ", buf2[i]);
    }
    printf("\n\n\n");

    if (memcmp(buf1, buf2, DMA_TEST_LEN) != 0)
        printf("dma test fail\n");
    else
        printf("dma test pass\n");

end:
    dma_free_coherent(buf1);
    dma_free_coherent(buf2);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_dma, hal_dma, dma hal APIs tests)
```

## 常见问题

1. 使用时出现数据搬运后数据为 0 的情况

确保传输内存使用 `dma_alloc_coherent` 申请

# Flash Controller

Flash Controller 为 R128 内置的一个 Nor Flash 读写控制器，用于控制命令的收发、数据读写和执行 XIP，兼容 Standard SPI/Dual SPI/Quad SPI。R128 既可以通过 SPI 控制器与Nor Flash 芯片通讯，也可以通过 Flash 控制器与之通讯。在 Flash Controller 前一级加入了 Flash Encryption 模块。Flash Encryption 模块在向Flash 写数据时进行 AES 加密，从 Flash 中读数据时进行解密。Flash Controller 与 Flash Encryption 组合称为 FlashC_Enc。

## 模块介绍

FlashC_Enc 的主要特性如下：

- 支持不同时钟频率，最大支持 96MHz
- 支持 SPI 1/2/4 线收发，支持 SPI Model 0/1/2/3
- 可灵活配置 4 段虚拟地址区间，支持 DMA 读写、Nor Flash XIP 操作
- 最大 2ˆ32Bytes 容量的 Nor Flash，常见有 64Mb，128Mb，256Mb
- 可对 Flash 进行加密，最大可配置 6 段独立的加密区间
- 支持在读写数据时进行实时 AES 加解密

## 模块配置

```
Drivers Options --->
    soc related device drivers --->
        FlashControler Devices --->
            [*] enable flashc driver           # FlashC 驱动，选中表示使用 FlashC 与 Flash 通讯
            [*] enable flashc test command     # FlashC 测试用例，测试 FlashC 相关功能
            [*] enable flashc xip              # 支持 XIP
            [*] enable flashc enc              # FlashEnc 驱动，需要加密功能时选中
            [*] enable flash enc hal APIs test command # FlashEnc 测试用例，测试 FlashEnc 相关功能
```

## 源码结构

FlashC_Enc 模块源码结构如下所示：

```
rtos-hal/
|--hal/source/flash_mcu/hal_flashctrl_rom.c   // FlashC相关驱动
|--hal/source/flash_mcu/hal_flashctrl.h       // FlashC相关驱动头文件
|--hal/source/flash_mcu/hal_flash_rom.c       // Flash 初始化、读写相关API
|--hal/source/flash_mcu/hal_flash.h           // Flash 初始化、读写相关API头文件
|--hal/source/flash_mcu/flashchip/            // Flash 芯片相关驱动
|--hal/source/flashc/hal_flashc_enc.c         // FlashEnc相关API
|--include/hal/hal_flashc_enc.h               // 头文件
```

## 模块接口说明

### Flash_Init 接口

先初始化 FlashC 控制器模块，然后初始化 NOR Flash

```c
HAL_Status HAL_Flash_Init(uint32_t flash, FlashBoardCfg *cfg)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- cfg：Flash 设备的板级配置信息，即 g_flash_cfg 结构体数组

返回值：

- HAL_OK：代表成功
- HAL_ERROR：错误
- HAL_BUSY：设备忙
- HAL_TIMEOUT：超时
- HAL_INVALID：无效参数

### Flash_Deinit 接口

反初始化

```c
HAL_Status HAL_Flash_Deinit(uint32_t flash, FlashBoardCfg *cfg)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- cfg：Flash 设备的板级配置信息，即 g_flash_cfg 结构体数组

返回值：

- HAL_OK：代表成功

### Flash_Open 接口

打开一个 Flash 设备，拿互斥锁，如果已经打开则无法再打开。

```c
HAL_Status HAL_Flash_Open(uint32_t flash, uint32_t timeout_ms)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- timeout_ms：等待打开 Flash 的时间，单位 ms

返回值：

- HAL_OK：代表成功

### Flash_Close 接口

关闭一个 Flash 设备，释放互斥锁

```c
HAL_Status HAL_Flash_Close(uint32_t flash)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引

返回值：

- HAL_OK：代表成功

### Flash_Read 接口

从 Flash 中读取指定长度的数据

```c
HAL_Status HAL_Flash_Read(uint32_t flash, uint32_t addr, uint8_t *data, uint32_t size)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- addr：读取的起始地址
- data：读到的数据存放地址
- size：读数据长度

返回值：

- HAL_OK：代表成功

### Flash_Write 接口

写一段数据到 Flash 中指定的地址，写之前需要确保该区间已经被擦除过

```c
HAL_Status HAL_Flash_Write(uint32_t flash, uint32_t addr, const uint8_t *data, uint32_t size)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- addr：要写入的起始地址
- data：要写的数据存放地址
- size：写数据长度

返回值：

- HAL_OK：代表成功

### Flash_Overwrite 接口

写一段数据到 Flash 中指定的地址，写之前不需要关心该区间是否已经被擦除过（只在4K 擦除模式有效）

```c
HAL_Status HAL_Flash_Overwrite(uint32_t flash, uint32_t addr, const uint8_t *data, uint32_t size)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- addr：要写入的起始地址
- data：要写的数据存放地址
- size：写数据长度

返回值：

- HAL_OK：代表成功

### Flash_erase 接口

擦除 Flash 中指定地址和大小的区间，擦除地址需要与擦除大小对齐。

```c
HAL_Status HAL_Flash_Erase(uint32_t flash, FlashEraseMode blk_size, uint32_t addr, uint32_t blk_cnt)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- blk_size：擦除大小，如 4k/32k/64k/chip
- addr：擦除的起始地址
- blk_cnt：需要擦除的扇区块数

返回值：

- HAL_OK：代表成功

### Flash_Ioctl 接口

擦除 Flash 中指定地址和大小的区间，擦除地址需要与擦除大小对齐。

```c
HAL_Status HAL_Flash_Ioctl(uint32_t flash, FlashControlCmd attr, uint32_t arg)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- attr：功能操作行为类型
- arg：实际功能的参数

返回值：

- HAL_OK：代表成功

### Flash_MemoryOf 接口

计算输入地址所处的可擦除 Block 首地址

```c
HAL_Status HAL_Flash_MemoryOf(uint32_t flash, FlashEraseMode size, uint32_t addr, uint32_t *start)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- addr：要擦除的起始地址
- start：返回的 Block 首地址

返回值：

- HAL_OK：代表成功

### Flash_Check 接口

检查被写区域是否需要先擦除

```c
int HAL_Flash_Check(uint32_t flash, uint32_t addr, uint8_t *data, uint32_t size)
```

参数：

- flash：Flash 设备号，即 g_flash_cfg 结构体数组索引
- addr：要写入的起始地址
- data：要写的数据存放地址
- size：写数据长度

返回值：

- -1：检查失败
- 0：数据相同，不需要擦写
- 1：可直接写，不需要擦除
- 2：需要先擦除再写

### Flash_Enc 初始化接口

初始化 Flash_Enc 模块

```c
int hal_flashc_enc_init(uint32_t max_addr)
```

参数：

- max_addr：对应 Flash 的最大容量
- addr：要擦除的起始地址
- start：返回的 Block 首地址

返回值：

- 0：代表成功
- -1：失败

### Flash_Enc 申请加密通道接口

申请一个加密通道，Flash_Enc 支持最多 6 段加密区间的设置，一个通道代表一个区间，对某个 Flash 区间设置加密前需先申请一个通道。

```c
int hal_flashc_enc_alloc_ch(void)
```

参数：

- 无

返回值：

- 0~5：申请到的加密通道号
- -1：失败

### Flash_Enc 设置加密接口

对一个 Flash 区间进行加密设置。

```c
int hal_set_flashc_enc(const Flashc_Enc_Set *enc_set)
```

参数：

- enc_set：加密配置，如起始地址、密钥等

返回值：

- 0：代表成功
- -1：失败

### Flash_Enc 使能加密接口

使能一个加密区间。

```c
int hal_flashc_enc_enable(const Flashc_Enc_Set *enc_set)
```

参数：

- enc_set：加密配置，如起始地址、密钥等

返回值：

- 0：代表成功
- -1：失败

### Flash_Enc 失能加密接口

失能一个加密区间。

```c
int hal_flashc_enc_disable(const Flashc_Enc_Set *enc_set)
```

参数：

- enc_set：加密配置，如起始地址、密钥等

返回值：

- 0：代表成功
- -1：失败

## 模块使用范例

### SPI Flash 擦写读示例

FlashC 模块的初始化、Flash 参数配置等在 `flashc_nor_init()` 中通过调用 `HAL_Flash_Init()` 完成，这里简单展示对 SPI Nor Flash 的擦写读操作：

```c
static int flash_api_test(void)
{
    u8 read_buf[128], write_buf[128], i;
    uint32_t addr = 0, size = sizeof(write_buf);
    int ret;
    HAL_Status status = HAL_ERROR;

    for(i = 0; i < size ;i++)                  // 准备测试数据
        write_buf[i] = i;

    status = HAL_Flash_Open(0, 5000);          // 开启设备
    if (status != HAL_OK) {
        printf("open %u fail\n", 0);
        return status;
    }
    status = HAL_Flash_Erase(0 , FLASH_ERASE_4KB, addr, 1);  // 擦除，对齐4K
    if (status != HAL_OK) {
        printf("erase %u fail\n", 0);
        return status;
    } 
    status = HAL_Flash_Write(0 , addr, write_buf, size);     // 写入数据
    if (status != HAL_OK) {
        printf("erase %u fail\n", 0);
        return status;
    }
    memset(read_buf, 0, size);
    status = HAL_Flash_Read(0 , addr, read_buf, size);       // 读取数据

    if (status != HAL_OK) {
        printf("erase %u fail\n", 0);
        return status;
    }

    HAL_Flash_Close(0);                         // 关闭设备
    if (status != HAL_OK) {
        printf("close %u fail\n", 0);
        return status;
    }

    ret = memcmp(write_buf, read_buf, size);    // 对比数据
    if (ret != 0) {
        printf("\tresult: err\n");
    } else {
        printf("\tresult: ok\n");
    }
    return ret;
}
```

### 对 Flash 进行加密

```c
int user_enc_api_test(void)
{
    Flashc_Enc_Set enc_set;
    Flashc_Enc_Config *enc_cfg = get_flashc_enc_cfg();
    enc_set.ch = hal_flashc_enc_alloc_ch();

    if (enc_set.ch < 0) {
        ENC_ERR("err: alloc channel failed.\n");
        return -1;
    }

    enc_set.start_addr = 0x800000;    // Flash加密区间物理起始地址
    enc_set.end_addr = 0x900000;      // Flash加密区间物理结束地址
    enc_set.key_0 = 0x12345678;       // 密钥
    enc_set.key_1 = 0x12345678;       // 密钥
    enc_set.key_2 = 0x12345678;       // 密钥
    enc_set.key_3 = 0x12345678;       // 密钥
    enc_set.enable = 1;
    hal_set_flashc_enc(&enc_set);
}
```

请注意：

- 在开启XIP功能时，若对Flash的物理区间0x800000-0x900000开启加密时，需要对 XIP 访问的对应虚拟地址区间也进行相应的加密设置。虚拟地址区间的加密，是调用 `hal_flashc_enc_alloc_ch`v时自动分配和设置的，不需要用户另外申请和设置。

## XIP 配置和使用

为了执行存放在 Nor Flash 中的代码，我们需要配置开启 XIP 功能支持。

1. 执行 `menuconfig` 选中 XIP

```c
Drivers Options --->
    soc related device drivers --->
        FlashControler Devices --->
            [*] enable flashc xip
```

1. 编辑 `sys_partition_xip.fex` 增加 xip 分区：

```ini
[partition]
    name = rtos-xip
    size = 1600
    downloadfile = "rtos_xip_arm.fex"
    user_type = 0x8000
```

1. 编辑 `image_header_xip.cfg` 增加

```json
{"id": "0xa5e05a01", "bin": "rtos_xip_arm.fex", "attr": "0x02"},
```

1. 编辑 `freerrtos.lds.S`，将代码放在 xip 段：

```c
#if (defined(CONFIG_XIP))
    .xip :
    {
        . = ALIGN(16);
        __xip_start__ = .;
        ...
        *(.xip_text* .xip_rodata*)
        . = ALIGN(16);
        __xip_end__ = .;
    } > FLASH
#endif /* CONFIG_XIP */
```

> 不可将中断中访问的资源放在 XIP 中，包括中断处理函数中调用到的函数、字符串常量等，否则在 Flash 擦写期间，XIP 不能访问，此时若发生中断，将造成系统卡死。此外，在 XIP 未初始化时，也不能访问 Flash 中的代码。

1. XIP 代码检查确认。当执行以上步骤时，可查看 map 文件来确认是否达到预期效果：

```shell
.xip    0x0000000010000000      0x69840
        0x0000000010000000      . = ALIGN (0x10)
        0x0000000010000000      __xip_start__ = .
*build/r128_evb1_m33/components/aw/iobox/rm.o(.text .text.* .rodata .rodata.*)
...
```

## 添加新的 Flash 芯片支持

新的 Flash 芯片分为两类：一类是该芯片的命令与 `flash_default.c` 实现的接口一致，为 Default Flash Chip 类型，只需要简单配置即可支持该 Flash 芯片，参见 “Default Flash Chip“ 支持。另一类是该芯片的命令与 `flash_default.c` 实现的接口不一致或不完全一致，该芯片为非 Default Flash Chip 类型，则需要进行对应接口的重写，参见 “非 Default Flash Chip“ 支持。已支持的 Flash 芯片可以通过 `rtos-hal/hal/source/flash_mcu/flashchip/flash_chip_cfg.c`进行确认。

### Default Flash Chip 支持

通过扩展 `simpleFlashChipCfg` 数组实现，在数组里增加 `FlashChipCfg` 结构体类型的元素，并根据 Flash 芯片的 Data Sheet 获取相关参数，配置好该结构体。（`simpleFlashChipCfg` 数组在 `rtos-hal/hal/source/flash_mcu/flashchip/flash_chip_cfg.c` 定义）

FlashChip 部分成员如下：

| 参数                |                                                              |
| :------------------ | :----------------------------------------------------------- |
| mJedec              | Flash 的 jedec ID，24bit                                     |
| mSize               | 芯片的存储容量，如32Mbit                                     |
| mEraseSizeSupport   | 芯片支持哪些擦除命令，如 4K、32K、64K、全片擦除              |
| mPageProgramSupport | 芯片支持哪些烧写命令，如 FLASH_PAGEPROGRAM、FLASH_QUAD_PAGEPROGRAM |
| mReadStausSupport   | 芯片支持读哪些状态寄存器，如 FLASH_STATUS1 、FLASH_STATUS2、FLASH_STATUS3 |
| mWriteStatusSupport | 芯片支持写哪些状态寄存器，如 FLASH_STATUS1 、FLASH_STATUS2、FLASH_STATUS3 |
| mReadSupport        | 芯片支持哪些读命令，如 FLASH_READ_NORMAL_MODE 、FLASH_READ_FAST_MODE、FLASH_READ_DUAL_O_MODE、FLASH_READ_DUAL_IO_MODE、FLASH_READ_QUAD_O_MODE 、FLASH_READ_QUAD_IO_MODE |
| mMaxFreq            | 除了 READ 命令以外，其他命令允许的最高频率                   |
| mMaxReadFreq        | READ 命令的最高频率                                          |
| mSuspendSupport     | 表示是否支持擦/写暂停，1 表示支持，0 表示不支持              |
| mSuspend_Latency    | 发送暂停命令后需要等待的最小延时                             |
| mResume_Latency     | 发送恢复命令后需要等待的最小延时                             |

下面以 winbond 的 W25Q128BV 为例：

```c
{
    .mJedec = 0x1840ef,
    .mSize = 16*1024*1024,
    .mEraseSizeSupport = FLASH_ERASE_64KB | FLASH_ERASE_32KB |
                         FLASH_ERASE_4KB | FLASH_ERASE_CHIP,
    .mPageProgramSupport = FLASH_PAGEPROGRAM,
    .mReadStausSupport = FLASH_STATUS1 | FLASH_STATUS2 | FLASH_STATUS3,
    .mWriteStatusSupport = FLASH_STATUS1 | FLASH_STATUS2 |FLASH_STATUS3,
    .mReadSupport = FLASH_READ_NORMAL_MODE | FLASH_READ_FAST_MODE |
                    FLASH_READ_DUAL_O_MODE| FLASH_READ_DUAL_IO_MODE |
                    FLASH_READ_QUAD_O_MODE | FLASH_READ_QUAD_IO_MODE,
    .mContinuousReadSupport = FLASH_CONTINUOUS_READ_SUPPORT,
    .mBurstWrapReadSupport = FLASH_BURST_WRAP_16B,
    .mMaxFreq = 100 * 1000 * 1000,
    .mMaxReadFreq = 100 * 1000 * 1000,
    .mSuspendSupport = 0,
    .mSuspend_Latency = 0,
    .mResume_Latency = 0,
}
```

### 非 Default Flash Chip 支持

这里以 P25Q16H 为例，通过 data sheet 我们了解到这款芯片的绝大部命令实现与我们的 `flash_default.c` 接口实现一致，但是 `status` 寄存器的写命令与 `flash_default.c` 接口有差别，需要重新实现 `writeStatus` 接口。首先创建一个`flash_P25QXXH.c` 文件，通过 `Flash chip jedec` 值确定使用的芯片型号，然后具体配置特定的参数（如 Flash 的大小、支持的读写操作等），就可以实现代码复用。

```c
FlashChipCtor P25Q16H_FlashChip = {
    .mJedecId = P25Q16H_JEDEC,
    .enumerate = P25QXXH_FlashCtor,
    .init = P25QXXH_FlashInit,
    .destory = P25QXXH_FlashDeinit,
};
```

P25QXXH 芯片 `FlashChipCfg` 配置：

```c
static const FlashChipCfg _P25QXXH_FlashChipCfg = {
    .mJedec = P25Q40H_JEDEC,
    .mSize = 16 * 8 * 4096,
    .mEraseSizeSupport = FLASH_ERASE_64KB | FLASH_ERASE_32KB | FLASH_ERASE_4KB |
                         FLASH_ERASE_CHIP,
    .mPageProgramSupport = FLASH_PAGEPROGRAM | FLASH_QUAD_PAGEPROGRAM,
    ...
};
```

创建 P25QXXH 系列芯片实例：

```c
static struct FlashChip *P25QXXH_FlashCtor(struct FlashChip *chip, uint32_t arg)
{
    uint32_t jedec = arg;
    uint32_t size;
    PCHECK(chip);
    if (jedec == P25Q64H_JEDEC) {
        size = 8 * 1024 * 1024;
    } else if (jedec == P25Q32H_JEDEC) {
        size = 4 * 1024 * 1024;
    } else if (jedec == P25Q16H_JEDEC) {
        size = 2 * 1024 * 1024;
    } else if (jedec == P25Q80H_JEDEC) {
        size = 1 * 1024 * 1024;
    } else if (jedec == P25Q40H_JEDEC) {
        size = 512 * 1024;
    } else {
        return NULL;
    }
    memcpy(&chip->cfg, &_P25QXXH_FlashChipCfg, sizeof(FlashChipCfg));
    chip->cfg.mJedec = jedec;
    chip->cfg.mSize = size;
    ...
    return chip;
}
```

写状态寄存器函数重写：

```c
static int P25QXXH_WriteStatus(struct FlashChip *chip, FlashStatus reg, uint8_t *status)
{
    int ret;
    uint8_t status_buf[2];
    InstructionField instruction[2];
    PCHECK(chip);

    if (!(reg & chip->cfg.mWriteStatusSupport)) {
        FLASH_NOTSUPPORT();
        return HAL_INVALID;
    }
    memset(&instruction, 0, sizeof(instruction));
    if (reg == FLASH_STATUS1) {
        if ((chip->cfg.mJedec & 0xFF0000) < 0x160000) {
            FCI_CMD(0).data = FLASH_INSTRUCTION_RDSR2;
            FCI_CMD(0).line = 1;
            FCI_DATA(1).pdata = (uint8_t *)&status_buf[1];
            FCI_DATA(1).len = 1;
            FCI_DATA(1).line = 1;
            chip->driverRead(chip, &FCI_CMD(0), NULL, NULL, &FCI_DATA(1));
        }
        ....
    chip->writeDisable(chip);
    return ret;
}
```

添加 `writestatus` 函数的挂载以及其他函数复用 `flash_default.c` 的接口：

```c
static int P25QXXH_FlashInit(struct FlashChip *chip)
{
    PCHECK(chip);
    chip->writeEnable = defaultWriteEnable;
    chip->writeDisable = defaultWriteDisable;
    chip->readStatus = defaultReadStatus;
    chip->erase = defaultErase;
    chip->jedecID = defaultGetJedecID;
    chip->pageProgram = defaultPageProgram;
    chip->read = defaultRead;
    chip->driverWrite = defaultDriverWrite;
    chip->driverRead = defaultDriverRead;
    chip->xipDriverCfg = defaultXipDriverCfg;
    chip->setFreq = defaultSetFreq;
    chip->switchReadMode = defaultSwitchReadMode;
    chip->enableXIP = defaultEnableXIP;
    chip->disableXIP = defaultDisableXIP;
    chip->isBusy = defaultIsBusy;
    chip->control = defaultControl;
    chip->minEraseSize = defaultGetMinEraseSize;
    ...
    return 0;
}
```

最后在 `flash_chip.c` 的 `flashChipList` 里补充 `P25Q16H_FlashChip` 就完成了扩展。

```c
FlashChipCtor *flashChipList[] = {
    #ifdef FLASH_DEFAULTCHIP
        &DefaultFlashChip, /*default chip must be at the first*/
    #endif
        ...
    #ifdef FLASH_P25Q16H
        &P25Q16H_FlashChip,
    #endif
};
```

# GPADC

## 模块介绍

GPADC 是 12bit 采集精度的模数转换模块，支持 4 路通道，模拟输入范围 0-1.8v，最高采样率 1MHZ，并且支持数据比较，自校验功能，同时工作于可配置的四种工作模式：

- Single mode：在指定的通道完成一次转换并将数据放在响应数据寄存器中；
- Single-cycle mode：在指定的通道完成一个周期转换并将数据放在响应数据寄存器中；
- Continuous mode：在指定的通道持续转换并将数据放在响应数据寄存器中；
- Burst mode：边采样边转换并将数据放入 32 字节的 FIFO，支持中断控制。

一般来说 GPADC 接口用于 KEY 模块按键的读取，一般包括 VOL+、VOL-、HOME、MENU、ENTER 等等，GPADC0 用于 KEY 的电路如上图。AVCC-AP 为 1.8V 的供电，不同的按键按下，GPADC 口的电压不同，CPU 通过对这个电压的采样来确定具体是那一个按键按下。如下图，VOL+、VOL-、MENU、ENTER、HOME对应的电压分别为 0.21V、0.41V、0.59V、0.75V、0.88V。

![image6](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image6.jpg)

## 模块配置

其 menuconfig 的配置如下：

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            GPADC devices --->
                [*] enable gpadc driver
                [*] enbale gpadc hal APIs Test command
```

## 源码结构

GPADC 模块源码结构如下所示：

```c
rtos-hal/
|--hal/source/gpadc/hal_gpadc.c    // hal层接口代码
|--include/hal/sunxi_hal_gpadc.h   // 头文件
```

## 模块接口说明

头文件：

```c
#include <sunxi_hal_gpadc.h>
```

### GPADC 初始化接口

GPADC 模块初始化，主要初始化时钟，中断以及采样率配置等

```c
int hal_gpadc_init(void)
```

参数：

- 无

返回值：

- 0 代表成功
- 负数代表失败

### GPADC 通道配置接口

选择并配置 GPADC 某个通道

```c
hal_gpadc_status_t hal_gpadc_channel_init(hal_gpadc_channel_t channal)
```

参数：

- channel：通道号

返回值：

- 0 代表成功
- 负数代表失败

### GPADC 通道取消配置接口

取消 GPADC 某个通道配置

```c
hal_gpadc_status_t hal_gpadc_channel_exit(hal_gpadc_channel_t channal)
```

参数：

- channel：通道号

返回值：

- 0 代表成功
- 负数代表失败

### GPADC 去初始化接口

GPADC 模块去初始化

```c
hal_gpadc_status_t hal_gpadc_deinit(void)
```

参数：

- 无

返回值：

- 0 代表成功
- 负数代表失败

### GPADC 注册回调接口

向应用层提供注册回调接口的功能

```c
hal_gpadc_status_t hal_gpadc_register_callback(hal_gpadc_channel_t channal, gpadc_callback_t user_callback)
```

参数：

- channel：通道号
- user_callback：应用层回调接口

返回值：

- 0 代表成功
- 负数代表失败

## 模块使用范例

### 读取电压

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <sunxi_hal_gpadc.h>

int channel = -1;

int cmd_test_gpadc(int argc, char **argv)
{
    int ret = -1;
    uint32_t vol_data;

    printf("Run gpadc test\n");

    if (argc < 2)
    {
        hal_log_err("usage: hal_gpadc channel\n");
        return -1;
    }

    ret = hal_gpadc_init();
    if (ret) {
        hal_log_err("gpadc init failed!\n");
        return -1;
    }

    channel = strtol(argv[1], NULL, 0);

    if (channel < 0 || channel > CHANNEL_NUM)
    {
        hal_log_err("channel %d is wrong, must between 0 and %d\n", CHANNEL_NUM);
        return -1;
    }

    hal_gpadc_channel_init(channel);
    vol_data = gpadc_read_channel_data(channel);
    printf("channel %d vol data is %u\n", channel, vol_data);
    hal_gpadc_channel_exit(channel);
    hal_gpadc_deinit();

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_gpadc, hal_gpadc, gpadc hal APIs tests)
```

### 回调方式读取电压

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <sunxi_hal_gpadc.h>

int channel = -1;

int sunxigpadc_irq_callback(uint32_t dada_type, uint32_t data)
{
    int vol_data;
    data = ((VOL_RANGE / 4096) * data);
    vol_data = data / 1000;
    printf("channel %d vol data: %d\n", channel, vol_data);
    hal_gpadc_channel_exit(channel);
    hal_gpadc_deinit();
    return 0;
}

int cmd_test_gpadc_callback(int argc, char **argv)
{
    int ret = -1;
    uint32_t vol_data;

    printf("Run gpadc test\n");

    if (argc < 2)
    {
        hal_log_err("usage: hal_gpadc channel\n");
        return -1;
    }

    ret = hal_gpadc_init();
    if (ret) {
        hal_log_err("gpadc init failed!\n");
        return -1;
    }

    channel = strtol(argv[1], NULL, 0);

    if (channel < 0 || channel > CHANNEL_NUM)
    {
        hal_log_err("channel %d is wrong, must between 0 and %d\n", CHANNEL_NUM);
        return -1;
    }

    hal_gpadc_channel_init(channel);
    hal_gpadc_register_callback(channel, sunxigpadc_irq_callback);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_gpadc_callback, hal_gpadc callback, gpadc hal APIs tests callback)
```

# GPIO

## 模块介绍

整个 GPIO 控制器由数字部分（GPIO 和外设接口）以及 IO 模拟部分（输出缓冲，双下拉，引脚Pad）组成。其中数字部分的输出可以通过 MUX 开关选择，模拟部分可以用来配置上下拉，驱动能力以及引脚输出电压等等。具体的规格如下：

- 可以在软件上配置各个引脚的状态
- 每个引脚都可以触发中断
- 可以配置 上拉/下拉/无上下拉 三种状态
- 每个引脚都可以配置 4 种驱动能力
- 可以配置边缘中断触发
- 最高 99 个中断

## 模块配置

其 menuconfig 的配置如下：

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            GPIO devices --->
                [*] enable GPIO driver
                [*] enbale GPIO hal APIs Test command
```

## 源码结构

GPIO 模块源码结构如下所示：

```
rtos-hal/source/gpio/
│-- gpio.h                 # 模块内部公共头文件
│-- hal_gpio.c             # 公共操作接口
├─  sun20iw2               # sun20iw2 平台的实现
    │---- gpio-sun20iw2.c  # GPIO具体实现
    │---- platform-gpio.h  # 实现头文件

include/hal/               # 驱动APIs声明头文件
└── hal_gpio.h
```

- `platform-gpio.h` 主要包含 GPIO 控制器基地址、GPIO 中断号、pin 的声明等信息
- `gpio-sun20iw2.c` 主要包含每个平台的 GPIO 描述符配置

## 模块接口说明

### 数据结构

由于 GPIO 需要配置每个引脚的引脚复用功能，中断类型，驱动能力，上下拉，输出/输入数据，输入/输出方向等等，所以对 GPIO 的这些配置都封装在一个 enum 枚举结构里面，方便使用。下面是一些配置的定义。想要了解更多的可以到 hal_gpio.h 查看

#### 引脚定义 gpio_pin_t

该枚举定义了可用的每个引脚定义，在配置引脚的时候将相关参数传入则可，具体定义如下：

```c
typedef enum
{
    GPIO_PC0 = GPIOC(0),
    GPIO_PC1 = GPIOC(1),
    GPIO_PC2 = GPIOC(2),
    GPIO_PC3 = GPIOC(3),
    ...
    GPIO_PL0 = GPIOL(0),
    GPIO_PL1 = GPIOL(1),
    GPIO_PL2 = GPIOL(2),
    GPIO_PL3 = GPIOL(3),
    GPIO_PL4 = GPIOL(4),
    GPIO_PL5 = GPIOL(5),
} gpio_pin_t;
```

#### 引脚驱动能力 gpio_driving_level_t

该枚举定义了引脚的驱动能力的值，具体定义如下：

```c
typedef enum
{
    GPIO_DRIVING_LEVEL0 = 0, /**< Defines GPIO driving current as level0. */
    GPIO_DRIVING_LEVEL1 = 1, /**< Defines GPIO driving current as level1. */
    GPIO_DRIVING_LEVEL2 = 2, /**< Defines GPIO driving current as level2. */
    GPIO_DRIVING_LEVEL3 = 3  /**< Defines GPIO driving current as level3. */
} gpio_driving_level_t;
```

#### 引脚上下拉 gpio_pull_status_t

该枚举定义了引脚的上下拉的值，具体定义如下：

```c
typedef enum
{
    GPIO_PULL_DOWN_DISABLED = 0, /**< Defines GPIO pull up and pull down disable.*/
    GPIO_PULL_UP = 1,            /**< Defines GPIO is pull up state. */
    GPIO_PULL_DOWN = 2,          /**< Defines GPIO is pull down state. */
} gpio_pull_status_t;
```

#### 引脚数据 gpio_data_t

该枚举定义引脚的输入输出数据，具体定义如下：

```c
typedef enum
{
    GPIO_DATA_LOW = 0, /**< GPIO data low. */
    GPIO_DATA_HIGH = 1 /**< GPIO data high. */
} gpio_data_t;
```

#### 引脚电压能力 gpio_power_mode_t

该枚举定义了引脚的电压模式，可以配置成 1.8V 和 3.3V，具体定义如下

```c
typedef enum
{
    POWER_MODE_330 = 0,
    POWER_MODE_180 = 1
} gpio_power_mode_t;
```

#### 中断模式 gpio_interrupt_mode_t

该枚举定义了引脚的中断模式，具体定义如下：

```c
typedef enum
{
    IRQ_TYPE_NONE = 0x00000000,
    IRQ_TYPE_EDGE_RISING = 0x00000001,
    IRQ_TYPE_EDGE_FALLING = 0x00000002,
    IRQ_TYPE_EDGE_BOTH = (IRQ_TYPE_EDGE_FALLING | IRQ_TYPE_EDGE_RISING),
    IRQ_TYPE_LEVEL_HIGH = 0x00000004,
    IRQ_TYPE_LEVEL_LOW = 0x00000008,
} gpio_interrupt_mode_t;
```

### GPIO 驱动初始化

函数原型：

```c
int hal_gpio_init(void);
```

参数：

- 无

返回值

- true：合法
- false：非法

### 判断 GPIO 的合法性

函数原型：

```c
bool hal_gpio_check_valid(gpio_pin_t pin);
```

参数：

- pin：id

返回值

- true：合法
- false：非法

### 获取指定 GPIO 的电平状态

函数原型：

```c
int hal_gpio_get_data(gpio_pin_t pin, gpio_data_t *data);
```

参数：

- pin：pin id
- data：存放数据的指针变量

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 的电平状态

函数原型：

```c
int hal_gpio_set_data(gpio_pin_t pin, gpio_data_t data);
```

参数：

- pin：pin id
- 需设置的电平高低

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 的 IO 模式

函数原型：

```c
int hal_gpio_set_direction(gpio_pin_t pin, gpio_direction_t direction);
```

参数：

- pin：pin id
- direction：需设置的 IO 模式

返回值

- -1：失败
- 0：成功

### 获取指定 GPIO 的 IO 模式

函数原型：

```c
int hal_gpio_get_direction(gpio_pin_t pin, gpio_direction_t *direction);
```

参数：

- pin：pin id
- direction：存放IO的指针变量

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 的上下拉状态

函数原型：

```c
int hal_gpio_set_pull(gpio_pin_t pin, gpio_pull_status_t pull);
```

参数：

- pin：pin id
- pull：需设置的上下拉状态

返回值

- -1：失败
- 0：成功

### 获取指定 GPIO 的上下拉状态

函数原型：

```c
int hal_gpio_get_pull(gpio_pin_t pin, gpio_pull_status_t *pull);
```

参数：

- pin：pin id
- pull：存放上下拉状态的指针变量

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 的驱动能力

函数原型：

```c
int hal_gpio_set_driving_level(gpio_pin_t pin, gpio_driving_level_t level);
```

参数：

- pin：pin id
- level：需设置的驱动能力

返回值

- -1：失败
- 0：成功

### 获取指定 GPIO 的驱动能力

函数原型：

```c
int hal_gpio_get_driving_level(gpio_pin_t pin, gpio_driving_level_t *level);
```

参数：

- pin：pin id
- level：存放驱动能力的指针变量

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 的复用功能

函数原型：

```c
int hal_gpio_pinmux_set_function(gpio_pin_t pin, gpio_muxsel_t function_index);
```

参数：

- pin：pin id
- function_index：需设置的复用功能

返回值

- -1：失败
- 0：成功

### 获取指定 GPIO 的复用功能

函数原型：

```c
int hal_gpio_pinmux_get_function(gpio_pin_t pin, gpio_muxsel_t *function_index);
```

参数：

- pin：pin id
- function_index：需设置的复用功能的指针变量

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 组的电压模式

函数原型：

```c
int hal_gpio_sel_vol_mode(gpio_pin_t pins, gpio_power_mode_t pm_sel);
```

参数：

- pin：pin id
- pm_sel：需设置的电压模式

返回值

- -1：失败
- 0：成功

### 设置指定 GPIO 组的中断采样频率

函数原型：

```c
int hal_gpio_set_debounce(gpio_pin_t pin, unsigned value);
```

参数：

- pin：pin id
- value：需设置的值（bit0-clock select; bit6:4-clock pre-scale）

返回值

- -1：失败
- 0：成功

### 获取指定 GPIO 的 IRQ 中断号

函数原型：

```c
int hal_gpio_to_irq(gpio_pin_t pin, uint32_t *irq);
```

参数：

- pin：pin id
- irq：存放中断号的指针变量

返回值

- -1：失败
- 0：成功

### GPIO 中断申请

函数原型：

```c
int hal_gpio_irq_request(uint32_t irq, hal_irq_handler_t hdle, unsigned long flags, void *data);
```

参数：

- irq：中断号
- hdle：中断处理函数
- flag：中断触发模式
- data：数据指针

返回值

- -1：失败
- 0：成功

### GPIO 中断释放

函数原型：

```c
int hal_gpio_irq_free(uint32_t irq);
```

参数：

- irq：中断号

返回值

- -1：失败
- 0：成功

### 使能 GPIO 中断

函数原型：

```c
int hal_gpio_irq_enable(uint32_t irq);
```

参数：

- irq：中断号

返回值

- -1：失败
- 0：成功

### 关闭 GPIO 中断

函数原型：

```c
int hal_gpio_irq_disable(uint32_t irq);
```

参数：

- irq：中断号

返回值

- -1：失败
- 0：成功

## 模块使用范例

```c
#include <stdint.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <hal_interrupt.h>
#include <hal_gpio.h>

#include <hal_gpio.h>

#define GPIO_TEST       GPIO_PA1          // 待测试的 GPIO
#define GPIO_PORT_MAX (8)

static int pins_number[GPIO_PORT_MAX] = {
    22, /* PA pins num */
    12, /* PC pins num */
    23, /* PD pins num */
    18, /* PE pins num */
    7,  /* PF pins num */
    8,  /* PG pins num */
    16, /* PH pins num */
    5,  /* PI pins num */
};

static void cmd_usage(void)
{
    printf("Usage:\n"
        "\t hal_gpio_cmd <cmd> <gpio> <arg>\n");
}

enum {
    GPIO_CMD_SET_VOL = 0,
};

static hal_irqreturn_t gpio_irq_test(void *data)
{
    hal_log_info("fake gpio interrupt handler");

    return 0;
}

int cmd_test_gpio(int argc, char **argv)
{
    uint32_t irq;
    int ret = 0;
    gpio_pull_status_t pull_state;
    gpio_direction_t gpio_direction;
    gpio_data_t gpio_data;
    gpio_muxsel_t function_index;

    hal_gpio_get_pull(GPIO_TEST, &pull_state);
    hal_gpio_get_direction(GPIO_TEST, &gpio_direction);
    hal_gpio_get_data(GPIO_TEST, &gpio_data);
    hal_gpio_pinmux_get_function(GPIO_TEST,&function_index);

    hal_log_info("Original: pin: %d pull state: %d, dir: %d, data: 0x%0x, function_index: %d",
                 GPIO_TEST, pull_state, gpio_direction, gpio_data, function_index);

    hal_log_info("Setting: pin: %d pull state: %d, dir: %d, data: 0x%x, function_index: %d",
                 GPIO_TEST, GPIO_PULL_UP, GPIO_DIRECTION_OUTPUT, GPIO_DATA_HIGH, GPIO_MUXSEL_OUT);

    hal_gpio_set_pull(GPIO_TEST, GPIO_PULL_UP);
    hal_gpio_set_direction(GPIO_TEST, GPIO_DIRECTION_OUTPUT);
    hal_gpio_set_data(GPIO_TEST, GPIO_DATA_HIGH);
    hal_gpio_pinmux_set_function(GPIO_TEST,GPIO_MUXSEL_OUT);

    hal_gpio_get_pull(GPIO_TEST, &pull_state);
    hal_gpio_get_direction(GPIO_TEST, &gpio_direction);
    hal_gpio_get_data(GPIO_TEST, &gpio_data);
    hal_gpio_pinmux_get_function(GPIO_TEST,&function_index);

    hal_log_info("Results: pin: %d pull state: %d, dir: %d, data: 0x%0x, function_index: %d",
                 GPIO_TEST, pull_state, gpio_direction, gpio_data, function_index);

    if (pull_state == GPIO_PULL_UP
            && gpio_direction == GPIO_DIRECTION_OUTPUT
            && gpio_data == GPIO_DATA_HIGH
        && function_index == GPIO_MUXSEL_OUT)
    {
        hal_log_info("Test hal_gpio_set_pull API success!");
        hal_log_info("Test hal_gpio_set_direction API success!");
        hal_log_info("Test hal_gpio_set_data API success!");
        hal_log_info("Test hal_gpio_pinmux_set_function API success!");
        hal_log_info("Test hal_gpio_get_pull API success!");
        hal_log_info("Test hal_gpio_get_direction API success!");
        hal_log_info("Test hal_gpio_get_data API success!");
        hal_log_info("Test hal_gpio_pinmux_get_function API success!");
    } else {
        hal_log_err("Test API fail");
        goto failed;
    }

    ret = hal_gpio_to_irq(GPIO_TEST, &irq);
    if (ret < 0)
    {
        hal_log_err("gpio to irq error, irq num:%d error num: %d", irq, ret);
        goto failed;
    } else {
        hal_log_info("Test hal_gpio_to_irq API success!");
    }

    ret = hal_gpio_irq_request(irq, gpio_irq_test, IRQ_TYPE_EDGE_RISING, NULL);
    if (ret < 0)
    {
        hal_log_err("request irq error, irq num:%d error num: %d", irq, ret);
        goto failed;
    } else {
        hal_log_info("Test hal_gpio_irq_request API success!");
    }

    ret = hal_gpio_irq_enable(irq);
    if (ret < 0)
    {
        hal_log_err("request irq error, error num: %d", ret);
        goto failed;
    } else {
        hal_log_info("Test hal_gpio_irq_enable API success!");
    }

    ret = hal_gpio_irq_disable(irq);
    if (ret < 0)
    {
        hal_log_err("disable irq error, irq num:%d, error num: %d", irq, ret);
        goto failed;
    } else {
        hal_log_info("Test hal_gpio_irq_disable API success!");
    }

    ret = hal_gpio_irq_free(irq);
    if (ret < 0)
    {
        hal_log_err("free irq error, error num: %d", ret);
        goto failed;
    } else {
        hal_log_info("Test hal_gpio_irq_free API success!");
    }

    hal_log_info("Test gpio hal APIs success!");

    return 0;

failed:
    hal_log_err("Test gpio hal APIs failed!");
    return -1;
}

int cmd_test_gpio_all(int argc, char **argv)
{
    int i = 0;
    int j =0;
    int cnt = 0;
    int ret = 0;
    uint32_t irq;
    gpio_pin_t pin;
    gpio_pull_status_t pull_state;
    gpio_direction_t gpio_direction;
    gpio_data_t gpio_data;

    hal_log_info("The program will test all gpio hal APIs ...\n");

    for(i = 0; i < GPIO_PORT_MAX; i++)
    {
        for(j = 0; j < pins_number[i]; j++)
        {
            switch(i)
            {
            case 0: pin = GPIOA(j); break;
            case 1: pin = GPIOC(j); break;
            case 2: pin = GPIOD(j); break;
            case 3: pin = GPIOE(j); break;
            case 4: pin = GPIOF(j); break;
            case 5: pin = GPIOG(j); break;
            case 6: pin = GPIOH(j); break;
            case 7: pin = GPIOI(j); break;
            default: break;
            }
            hal_log_info("Setting: pull state: %d, dir: %d, data: 0x%x, pin: %d",
                            GPIO_PULL_DOWN, GPIO_DIRECTION_INPUT, GPIO_DATA_LOW, pin);

            hal_gpio_set_pull(pin, GPIO_PULL_DOWN);
            hal_gpio_set_direction(pin, GPIO_DIRECTION_INPUT);
            hal_gpio_set_data(pin, GPIO_DATA_LOW);

            hal_gpio_get_pull(pin, &pull_state);
            hal_gpio_get_direction(pin, &gpio_direction);
            hal_gpio_get_data(pin, &gpio_data);

            hal_log_info("Results: pull state: %d, dir: %d, data: 0x%0x",
                            pull_state, gpio_direction, gpio_data);

            if(pull_state != GPIO_PULL_DOWN
                   || gpio_direction != GPIO_DIRECTION_INPUT
                   || gpio_data != GPIO_DATA_LOW)
                    goto failed;

            ret = hal_gpio_to_irq(pin, &irq);
            if(ret < 0)
                    goto failed;

            ret = hal_gpio_irq_request(irq, gpio_irq_test, IRQ_TYPE_EDGE_FALLING, NULL);
            if(ret < 0)
                    goto failed;

            ret = hal_gpio_irq_enable(irq);
            if(ret < 0)
                    goto failed;

            ret = hal_gpio_irq_disable(irq);
            if(ret < 0)
                    goto failed;

            ret = hal_gpio_irq_free(irq);
            if(ret < 0)
                    goto failed;

            cnt++;
            hal_log_info("Test-%d: gpio pin %d hal success!\n", cnt, pin);
        }
    }

    hal_log_info("Test all gpio hal APIs success, cnt: %d!", cnt);
    return 0;

failed:
    hal_log_err("Test all gpio hal APIs failed!");
    return -1;
}

int cmd_test_gpio_cmd(int argc, char **argv)
{
    int cmd, gpio, arg;

    if (argc != 4)
        cmd_usage();

    cmd = strtol(argv[1], NULL, 0);
    gpio = strtol(argv[2], NULL, 0);
    arg = strtol(argv[3], NULL, 0);

    switch (cmd) {
        case GPIO_CMD_SET_VOL:
            hal_gpio_sel_vol_mode(gpio, arg);
            break;
        default:
            break;
    }

    return 0;
}

FINSH_FUNCTION_EXPORT_ALIAS(cmd_test_gpio, hal_gpio, gpio hal APIs tests);
FINSH_FUNCTION_EXPORT_ALIAS(cmd_test_gpio_cmd, hal_gpio_cmd, gpio hal APIs tests with cmd);
FINSH_FUNCTION_EXPORT_ALIAS(cmd_test_gpio_all, hal_gpio_all, gpio hal all APIs tests);
```

# G2D

G2D 驱动主要实现图像旋转/数据格式/颜色空间转换, 以及图层合成功能(包括包括alpha、colorkey、rotate、mirror、rop、maskblt) 等图形加速功能。

## 模块功能

### 矩形填充（fill color rectgngle）

填充矩形区域功能可以实现对某块区域进行预订的颜色值填充，如下图就填充了 0xFF0080FF的 ARGB 值，该功能还可以通过设定数据区域大小实现画点和直线，同时也可以通过设定 flag 实现一种填充颜色和目标做 alpha 运算。

![image7](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image7.jpg)

### 旋转和镜像 (rotate and mirror)

旋转镜像主要是实现如下 Horizontal、Vertical、Rotate180°、Mirror45°、Rotate90°、Mirror135°、Rotate270° 共 7 种操作。

![image8](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image8.jpg)

### alpha blending

不同的图层之间可以做 alpha blending。Alpha 分为 pixel alpha、plane alpha、multi alpha 三种：

- pixel alpha 意为每个像素自带有一个专属 alpha 值；
- plane alpha 则是一个图层中所有像素共用一个 globe alpha 值；
- multi alpha 则每个像素在代入 alpha 运算时的值为 globe alpha*pixel alpha，可以通过 G2D 驱动接口的 flag 去控制

![image9](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image9.jpg)

### colorkey

不同 image 之间可以做 colorkey 效果：

- 左图中 destination 的优先级高于 source，destination 中 match 部分（橙色五角星部分），则被选择透过，显示为 source 与 destination 做 alpha blending 后的效果图。
- 右图中 source 的优先级高于 destination，则 source 中 match 部分（深红色五角星部分），则被选择透过，直接显示 destination 与 source 做 alpha blending 后的效果图。

![image10](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image10.jpg)

### 缩放 (Stretchblt)

Stretchblt 主要是把 source 按照 destination 的 size 进行缩放，并最终与 destination 做alpha blending、colorkey 等运算或直接旋转镜像后拷贝到目标

![image11](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image11.jpg)

### 二元光栅操作 (rop2)

我们在画线和填充区域的时候将画笔和目标像素组合得到新的目标像素。

### 三元光栅操作 (maskblt rop3)

对于图像有同样光栅操作用于生成各种特殊效果, 我们要处理的有三种像素: 源图像像素, 目标图像像素, 画刷像素 (模板图像像素)。如下图所示, 从左上到右下分别是 src ptn mask dst。

![image12](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image12.jpg)

## 支持的format

```
G2D_FORMAT_ARGB8888/G2D_FORMAT_ARGB8888/G2D_FORMAT_ABGR8888/
G2D_FORMAT_RGBA8888/G2D_FORMAT_BGRA8888/G2D_FORMAT_XRGB8888,
G2D_FORMAT_XBGR8888/G2D_FORMAT_RGBX8888/G2D_FORMAT_BGRX8888/
G2D_FORMAT_RGB888/G2D_FORMAT_BGR888/G2D_FORMAT_RGB565,
G2D_FORMAT_BGR565/G2D_FORMAT_ARGB4444/G2D_FORMAT_ABGR4444/
G2D_FORMAT_RGBA4444/G2D_FORMAT_BGRA4444/G2D_FORMAT_ARGB1555,
G2D_FORMAT_ABGR1555/G2D_FORMAT_RGBA5551/G2D_FORMAT_BGRA5551/
G2D_FORMAT_ARGB2101010/G2D_FORMAT_ABGR2101010,
G2D_FORMAT_RGBA1010102/G2D_FORMAT_BGRA1010102
G2D_FORMAT_IYUV422_V0Y1U0Y0, G2D_FORMAT_IYUV422_Y1V0Y0U0, G2D_FORMAT_IYUV422_U0Y1V0Y0, G2D_FORMAT_IYUV422_Y1U0Y0V0, G2D_FORMAT_YUV422UVC_V1U1V0U0, G2D_FORMAT_YUV422UVC_U1V1U0V0, G2D_FORMAT_YUV422_PLANAR, G2D_FORMAT_YUV420UVC_V1U1V0U0, G2D_FORMAT_YUV420UVC_U1V1U0V0, G2D_FORMAT_YUV420_PLANAR, G2D_FORMAT_YUV411UVC_V1U1V0U0, G2D_FORMAT_YUV411UVC_U1V1U0V0, G2D_FORMAT_YUV411_PLANAR, G2D_FORMAT_Y8,
G2D_FORMAT_YVU10_P010,
G2D_FORMAT_YVU10_P210,
G2D_FORMAT_YVU10_444,
G2D_FORMAT_YUV10_444,
```

## 模块配置

其menuconfig 的配置如下：

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            G2D devices --->
                [*] enable g2d driver
                [*] enbale g2d hal APIs Test command
```

## 源码结构

```
.
├── g2d_bld.c
├── g2d_bld.h
├── g2d_bsp.h
├── g2d.c
├── g2d_driver.h
├── g2d_driver_i.h
├── g2d_mixer.c
├── g2d_mixer.h
├── g2d_mixer_type.h
├── g2d_ovl_u.c
├── g2d_ovl_u.h
├── g2d_ovl_v.c
├── g2d_ovl_v.h
├── g2d_rcq.c
├── g2d_rcq.h
├── g2d_rotate.c
├── g2d_rotate.h
├── g2d_rotate_type.h
├── g2d_scal.c
├── g2d_scal.h
├── g2d_top.c
├── g2d_top.h
├── g2d_top_type.h
├── g2d_wb.c
├── g2d_wb.h
├── Kconfig
├── Makefile
├── simple_idr.c
└── simple_idr.h
```

## 模块接口说明

头文件

```c
#include <g2d_driver_enh.h>
```

### 数据结构

#### g2d_blt_flags

`g2d_blt_flags` 用于描述一个bitblt 和stretchblt 的flag 属性信息

```c
typedef enum {
    G2D_BLT_NONE = 0x00000000,
    G2D_BLT_PIXEL_ALPHA = 0x00000001,
    G2D_BLT_PLANE_ALPHA = 0x00000002,
    G2D_BLT_MULTI_ALPHA = 0x00000004,
    G2D_BLT_SRC_COLORKEY = 0x00000008,
    G2D_BLT_DST_COLORKEY = 0x00000010,
    G2D_BLT_FLIP_HORIZONTAL = 0x00000020,
    G2D_BLT_FLIP_VERTICAL = 0x00000040,
    G2D_BLT_ROTATE90 = 0x00000080,
    G2D_BLT_ROTATE180 = 0x00000100,
    G2D_BLT_ROTATE270 = 0x00000200,
    G2D_BLT_MIRROR45 = 0x00000400,
    G2D_BLT_MIRROR135 = 0x00000800,
}g2d_blt_flags;
```

| FLAG                    | 描述             |
| :---------------------- | :--------------- |
| G2D_BLT_NONE            | 纯拷贝           |
| G2D_BLT_PIXEL_ALPHA     | 点alpha标志      |
| G2D_BLT_PLANE_ALPHA     | 面alpha标志      |
| G2D_BLT_MULTI_ALPHA     | 混合alpha标志    |
| G2D_BLT_SRC_COLORKEY    | 源colorkey标志   |
| G2D_BLT_DST_COLORKEY    | 目标colorkey标志 |
| G2D_BLT_FLIP_HORIZONTAL | 水平翻转         |
| G2D_BLT_FLIP_VERTICAL   | 垂直翻转         |
| G2D_BLT_ROTATE90        | 逆时针旋转90度   |
| G2D_BLT_ROTATE180       | 逆时针旋转180度  |
| G2D_BLT_ROTATE270       | 逆时针旋转270度  |
| G2D_BLT_MIRROR45        | 镜像45度         |
| G2D_BLT_MIRROR135       | 镜像135度        |

#### g2d_fillrect_flags

`g2d_fillrect_flags` 用于描述一个fillrect 属性信息

```c
typedef enum {
    G2D_FIL_NONE = 0x00000000,
    G2D_FIL_PIXEL_ALPHA = 0x00000001,
    G2D_FIL_PLANE_ALPHA = 0x00000002,
    G2D_FIL_MULTI_ALPHA = 0x00000004,
}g2d_fillrect_flags;
```

| FLAG                | 描述                                           |
| :------------------ | :--------------------------------------------- |
| G2D_FIL_NONE        | 纯填充                                         |
| G2D_FIL_PIXEL_ALPHA | 填充区域和目标做点alpha                        |
| G2D_FIL_PLANE_ALPHA | 填充区域和目标做面alpha                        |
| G2D_FIL_MULTI_ALPHA | 填充区域的alpha值 x 面alpha值后再和目标做alpha |

#### g2d_blt_flags_h

`g2d_blt_flags_h` 定义二元光栅操作码

```c
typedef enum {
    G2D_BLT_NONE_H = 0x0,
    G2D_BLT_BLACKNESS,
    G2D_BLT_NOTMERGEPEN,
    G2D_BLT_MASKNOTPEN,
    G2D_BLT_NOTCOPYPEN,
    G2D_BLT_MASKPENNOT,
    G2D_BLT_NOT,
    G2D_BLT_XORPEN,
    G2D_BLT_NOTMASKPEN,
    G2D_BLT_MASKPEN,
    G2D_BLT_NOTXORPEN,
    G2D_BLT_NOP,
    G2D_BLT_MERGENOTPEN,
    G2D_BLT_COPYPEN,
    G2D_BLT_MERGEPENNOT,
    G2D_BLT_MERGEPEN,
    G2D_BLT_WHITENESS = 0x000000ff,

    G2D_ROT_90  = 0x00000100,
    G2D_ROT_180 = 0x00000200,
    G2D_ROT_270 = 0x00000300,
    G2D_ROT_0   = 0x00000400,
    G2D_ROT_H = 0x00001000,
    G2D_ROT_V = 0x00002000,

/*  G2D_SM_TDLR_1  =    0x10000000, */
    G2D_SM_DTLR_1 = 0x10000000,
/*  G2D_SM_TDRL_1  =    0x20000000, */
/*  G2D_SM_DTRL_1  =    0x30000000, */
} g2d_blt_flags_h;
G2D_BLT_NONE 单个源操作
G2D_BLT_BLACK BLACKNESS :使用与物理调色板的索引0相关的色彩来填充目标矩形区域,(对缺省的物理调色板,该颜
色为黑色)
G2D_BLT_NOTMERGEPEN dst = ~(dst+src) :
G2D_BLT_MASKNOTPEN dst =~src&dst
G2D_BLT_NOTCOPYPEN dst =~src
G2D_BLT_MASKPENNOT dst =src&~dst
G2D_BLT_NOT dst =~dst :使目标矩形区域颜色取反
G2D_BLT_XORPEN dst =src^dst
G2D_BLT_NOTMASKPEN dst =~(src&dst)
G2D_BLT_MASKPEN dst =src&dst
G2D_BLT_NOTXORPEN dst =~(src^dst)
G2D_BLT_NOP dst =dst
G2D_BLT_MERGENOTPEN dst =~src+dst
G2D_BLT_COPEPEN dst =src
G2D_BLT_MERGEPENNOT dst =src+~dst
G2D_BLT_MERGEPEN dst =src+dst
G2D_BLT_WHITE WHITENESS :使用与物理调色板中索引1有关的颜色填充目标矩形区域(对于缺省物理调色板来说,这
个颜色为白色)
```

#### g2d_image_enh

`g2d_image_enh` 主要描述图片的宽高、存放地址、是否做Clip 处理，是否为预乘等。

```c
typedef struct {
    int      bbuff;
    __u32        color;
    g2d_fmt_enh  format;
    __u32        laddr[3];
    __u32        haddr[3];
    __u32        width;
    __u32        height;
    __u32        align[3];

    g2d_rect     clip_rect;
    g2d_size     resize;
    g2d_coor     coor;

    __u32        gamut;
    int      bpremul;
    __u8         alpha;
    g2d_alpha_mode_enh mode;
    int      fd;
    __u32 use_phy_addr;
} g2d_image_enh;
format: 图格式
laddr Buffer: 起始低位地址
haddr Buffer: 起始高位地址
width : 图宽度（in pixel）
height : 图高度（in pixel）
pitch : Buffer的pitch
clip_rect : ROI矩形
gamut : 图的色域
bpremul : 是否为预乘
alpha : 面alpha值
mode : alpha模式设置
use_phy_addr: 是否使用物理地址的标志。1表示使用，0表示使用fd
```

注意: 当 `use_phy_addr` 为 `1` 的时候，你必须自己设置好 `laddr` 和 `haddr`，并自行做好偏移。使用`fd` 则不需要设置这两个数组。

#### g2d_fmt_enh

`g2d_fmt_enh` 用于描述G2D 模块支持的格式

```
typedef enum {
    G2D_FORMAT_ARGB8888,
    G2D_FORMAT_ABGR8888,
    G2D_FORMAT_RGBA8888,
    G2D_FORMAT_BGRA8888,
    G2D_FORMAT_XRGB8888,
    G2D_FORMAT_XBGR8888,
    G2D_FORMAT_RGBX8888,
    G2D_FORMAT_BGRX8888,
    G2D_FORMAT_RGB888,
    G2D_FORMAT_BGR888,
    G2D_FORMAT_RGB565,
    G2D_FORMAT_BGR565,
    G2D_FORMAT_ARGB4444,
    G2D_FORMAT_ABGR4444,
    G2D_FORMAT_RGBA4444,
    G2D_FORMAT_BGRA4444,
    G2D_FORMAT_ARGB1555,
    G2D_FORMAT_ABGR1555,
    G2D_FORMAT_RGBA5551,
    G2D_FORMAT_BGRA5551,
    G2D_FORMAT_ARGB2101010,
    G2D_FORMAT_ABGR2101010,
    G2D_FORMAT_RGBA1010102,
    G2D_FORMAT_BGRA1010102,

    /* invailed for UI channel */
    G2D_FORMAT_IYUV422_V0Y1U0Y0 = 0x20,
    G2D_FORMAT_IYUV422_Y1V0Y0U0,
    G2D_FORMAT_IYUV422_U0Y1V0Y0,
    G2D_FORMAT_IYUV422_Y1U0Y0V0,

    G2D_FORMAT_YUV422UVC_V1U1V0U0,
    G2D_FORMAT_YUV422UVC_U1V1U0V0,
    G2D_FORMAT_YUV422_PLANAR,

    G2D_FORMAT_YUV420UVC_V1U1V0U0 = 0x28,
    G2D_FORMAT_YUV420UVC_U1V1U0V0,
    G2D_FORMAT_YUV420_PLANAR,

    G2D_FORMAT_YUV411UVC_V1U1V0U0 = 0x2c,
    G2D_FORMAT_YUV411UVC_U1V1U0V0,
    G2D_FORMAT_YUV411_PLANAR,

    G2D_FORMAT_Y8 = 0x30,

    /* YUV 10bit format */
    G2D_FORMAT_YVU10_P010 = 0x34,

    G2D_FORMAT_YVU10_P210 = 0x36,

    G2D_FORMAT_YVU10_444 = 0x38,
    G2D_FORMAT_YUV10_444 = 0x39,
    G2D_FORMAT_MAX,
} g2d_fmt_enh;
```

#### g2d_rop3_cmd_flag

`g2d_rop3_cmd_flag` 用于定义三元光栅操作码

```c
typedef enum {
    G2D_ROP3_BLACKNESS = 0x00,
    G2D_ROP3_NOTSRCERASE = 0x11,
    G2D_ROP3_NOTSRCCOPY = 0x33,
    G2D_ROP3_SRCERASE = 0x44,
    G2D_ROP3_DSTINVERT = 0x55,
    G2D_ROP3_PATINVERT = 0x5A,
    G2D_ROP3_SRCINVERT = 0x66,
    G2D_ROP3_SRCAND = 0x88,
    G2D_ROP3_MERGEPAINT = 0xBB,
    G2D_ROP3_MERGECOPY = 0xC0,
    G2D_ROP3_SRCCOPY = 0xCC,
    G2D_ROP3_SRCPAINT = 0xEE,
    G2D_ROP3_PATCOPY = 0xF0,
    G2D_ROP3_PATPAINT = 0xFB,
    G2D_ROP3_WHITENESS = 0xFF,
} g2d_rop3_cmd_flag;
G2D_ROP3_BLACKNESS dst = BLACK
G2D_ROP3_NOTSRCERASE dst = (NOT src) AND (NOT dst)
G2D_ROP3_NOTSRCCOPY dst = (NOT src) :将源矩形区域颜色取反,拷贝到目标矩形区域
G2D_ROP3_SRCERASE dst = src AND (NOT dst )
G2D_ROP3_DSTINVERT dst = (NOT dst)
G2D_ROP3_PATINVERT dst = pattern XOR dst :通过使用布尔型的异或(XOR)操作符将特定模式和目标矩形区域颜色合并
G2D_ROP3_SRCINVERT dst = src XOR dst :通过使用布尔型的异或(XOR)操作符将源和目标矩形区域颜色合并
G2D_ROP3_SRCAND dst = srcAND dst :通过使用与操作符将源和目标矩形区域颜色值合并
G2D_ROP3_MERGEPAINT dst = (NOT src) OR dst :通过使用布尔型的或(OR)操作符将反向的源矩形区域的颜色与目标矩形区域颜色合并
G2D_ROP3_MERGECOPY dst = (src AND pattern)
G2D_ROP3_SRCCOPY dst = src :将源矩形区域直接拷贝到目标矩形区域
G2D_ROP3_SRCPAINT dst = src OR dst :通过使用布尔型的或(OR)操作符将源和目标矩形区域颜色合并
G2D_ROP3_PATCOPY dst = pattern
G2D_ROP3_PATPAINT dst = DPSnoo :通过使用布尔型的或(OR)操作符将源矩形区域取反后的颜色值与特定模式的颜色合并,然后使用OR操作符与该操作的结果与目标矩形区域内的颜色合并.
G2D_ROP3_WHITENESS dst = WHITE
```

#### g2d_bld_cmd_flag

`g2d_bld_cmd_flag` 定义BLD 操作命令

```c
typedef enum {
    G2D_BLD_CLEAR = 0x00000001,
    G2D_BLD_COPY = 0x00000002,
    G2D_BLD_DST = 0x00000003,
    G2D_BLD_SRCOVER = 0x00000004,
    G2D_BLD_DSTOVER = 0x00000005,
    G2D_BLD_SRCIN = 0x00000006,
    G2D_BLD_DSTIN = 0x00000007,
    G2D_BLD_SRCOUT = 0x00000008,
    G2D_BLD_DSTOUT = 0x00000009,
    G2D_BLD_SRCATOP = 0x0000000a,
    G2D_BLD_DSTATOP = 0x0000000b,
    G2D_BLD_XOR = 0x0000000c,
    G2D_CK_SRC = 0x00010000,
    G2D_CK_DST = 0x00020000,
} g2d_bld_cmd_flag;
```

#### g2d_ck

`g2d_ck` 定义了colorkey 操作的参数

```c
typedef struct {
    int match_rule;
    __u32 max_color;
    __u32 min_color;
} g2d_ck;
match_rule 当match_rule为假时，Color Min=<Color<=Color Max表示满足匹配条件
当match_rule为真时，Color>Color Max or Color <Color Min表示满足匹配条件
ck_max_color Color Max
ck_min_color Color Min
```

#### g2d_alpha_mode_enh

`g2d_alpha_mode_enh` 定义进行alpha blend 操作时，选择的alpha mode

```
typedef enum{
    G2D_PIXEL_ALPHA,
    G2D_GLOBAL_ALPHA,
    G2D_MIXER_ALPHA,
}g2d_alpha_mode_enh;
G2D_PIXEL_ALPHA 点 alpha
G2D_GLOBAL_ALPHA 面 alpha
G2D_MIXER_ALPHA 混合 alpha
```

#### g2d_color_gmt

`g2d_color_gmt` 定义进行位操作时，选择的颜色空间

```c
typedef enum{
    G2D_BT601,
    G2D_BT709,
    G2D_BT2020,
}g2d_color_gmt;
```

#### g2d_blt_h

`g2d_blt_h` 实现对 `foreground` 带缩放的ROP2 处理。

```c
typedef struct {
    g2d_blt_flags_h flag_h;
    g2d_image_enh src_image_h;
    g2d_image_enh dst_image_h;
} g2d_blt_h;
flag_h : blt操作flag标志，增强版标志
src_image_h : 源图像信息,增强版的图像参数,详见g2d_image_enh
dst_image_h : 目标图像信息，增强版的图像参数
color : colorkey颜色
alpha : 面alpha值
```

### 函数接口

G2D 驱动向OS 或其他 `driver hal` 暴露的接口如下表，模块使用主要通过 `ioctl` 实现，即 `sunxi_g2d_control`，后续将主要介绍该接口的用法。

#### 开启 G2D

函数原型

```c
int sunxi_g2d_open(void);
```

参数

- 无

返回值

- 0：成功
- 其他：失败

#### 关闭 G2D

函数原型

```c
int sunxi_g2d_close(void);
```

参数

- 无

返回值

- 0：成功
- 其他：失败

#### G2D 驱动 ioctl 接口

函数原型

```c
int sunxi_g2d_control(int cmd, void *arg);
```

参数

- cmd: 操作类型
- arg：参数

返回值

- 0：成功
- 其他：失败

## G2D ioctl 操作示例

### 单幅图的缩放、格式转换

```
g2d_cmd`：`G2D_CMD_BITBLT_H
```

实现单幅图的缩放、格式转换等。实现对foreground 带缩放的 ROP2 处理。

#### 旋转功能

```c
blit.flag_h = G2D_ROT_90;
blit.src_image_h.addr[0] = saddr[0];
blit.src_image_h.format = G2D_FORMAT_ARGB8888;
blit.src_image_h.mode = G2D_GLOBAL_ALPHA;
blit.src_image_h.clip_rect.x = 0;
blit.src_image_h.clip_rect.y = 0;
blit.src_image_h.clip_rect.w = 1920;
blit.src_image_h.clip_rect.h = 1080;
blit.src_image_h.width = 1920;
blit.src_image_h.height = 1080;
blit.src_image_h.alpha = 0xff;
blit.dst_image_h.addr[0] = daddr[0];
blit.dst_image_h.format = G2D_FORMAT_ARGB8888;
blit.dst_image_h.mode = G2D_GLOBAL_ALPHA;
blit.dst_image_h.clip_rect.x = 0;
blit.dst_image_h.clip_rect.y = 0;
blit.dst_image_h.clip_rect.w = 1920;
blit.dst_image_h.clip_rect.h = 1080;
blit.dst_image_h.alpha = 0xff;
blit.dst_image_h.width = 1920;
blit.dst_image_h.height = 1080;

if (sunxi_g2d_control(G2D_CMD_BITBLT_H, (unsigned long)(&blit)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_BITBLT_H failure!\n", __LINE__, __FILE__,__FUNCTION__);
  return ‑1;
}
```

#### 缩放功能

```c
blit.flag_h = G2D_BLT_NONE_0;
blit.src_image_h.addr[0] = saddr[0];
blit.src_image_h.format = G2D_FORMAT_ARGB8888;
blit.src_image_h.mode = G2D_GLOBAL_ALPHA;
blit.src_image_h.clip_rect.x = 0;
blit.src_image_h.clip_rect.y = 0;
blit.src_image_h.clip_rect.w = 1280;
blit.src_image_h.clip_rect.h = 800;
blit.src_image_h.width = 1280;
blit.src_image_h.height = 800;
blit.src_image_h.alpha = 0xff;
blit.dst_image_h.addr[0] = daddr[0];
blit.dst_image_h.format = G2D_FORMAT_ARGB8888;
blit.dst_image_h.mode = G2D_GLOBAL_ALPHA;
blit.dst_image_h.clip_rect.x = 0;
blit.dst_image_h.clip_rect.y = 0;
blit.dst_image_h.clip_rect.w = 1920;
blit.dst_image_h.clip_rect.h = 1080;
blit.dst_image_h.alpha = 0xff;
blit.dst_image_h.width = 1920;
blit.dst_image_h.height = 1080;

if (sunxi_g2d_control(G2D_CMD_BITBLT_H, (unsigned long)(&blit)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_BITBLT_H failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  return ‑1;
}
```

#### 格式转换

```c
blit.flag_h = G2D_BLT_NONE_0;
blit.src_image_h.addr[0] = saddr[0];
blit.src_image_h.format = G2D_FORMAT_ARGB8888;
blit.src_image_h.mode = G2D_GLOBAL_ALPHA;
blit.src_image_h.clip_rect.x = 0;
blit.src_image_h.clip_rect.y = 0;
blit.src_image_h.clip_rect.w = 1280;
blit.src_image_h.clip_rect.h = 800;
blit.src_image_h.width = 1280;
blit.src_image_h.height = 800;
blit.src_image_h.alpha = 0xff;
blit.dst_image_h.addr[0] = daddr[0];
blit.dst_image_h.format = G2D_FORMAT_YUV420UVC_V1U1V0U0;
blit.dst_image_h.mode = G2D_GLOBAL_ALPHA;
blit.dst_image_h.clip_rect.x = 0;
blit.dst_image_h.clip_rect.y = 0;
blit.dst_image_h.clip_rect.w = 1280;
blit.dst_image_h.clip_rect.h = 800;
blit.dst_image_h.alpha = 0xff;
blit.dst_image_h.width = 1280;
blit.dst_image_h.height = 800;

if (sunxi_g2d_control(G2D_CMD_BITBLT_H, (unsigned long)(&blit)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_BITBLT_H failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  return ‑1;
}
```

### 两幅图的BLD操作

```
g2d_cmd`：`G2D_CMD_BLD_H
```

实现两幅图的BLD(porter‑duff) 操作

```c
blend.bld_cmd = G2D_BLD_COPY;
blend.src_image_h.mode = G2D_GLOBAL_ALPHA;
blend.src_image_h.format = G2D_FORMAT_ARGB8888;
blend.src_image_h.alpha = 128;
blend.src_image_h.clip_rect.x = 0;
blend.src_image_h.clip_rect.y = 0;
blend.src_image_h.clip_rect.w = 1280;
blend.src_image_h.clip_rect.h = 800;
blend.src_image_h.width = 1280;
blend.src_image_h.height = 800;
blend.dst_image_h.mode = G2D_GLOBAL_ALPHA;
blend.dst_image_h.format = G2D_FORMAT_ARGB8888;
blend.dst_image_h.alpha = 128;
blend.dst_image_h.clip_rect.x = 0;
blend.dst_image_h.clip_rect.y = 0;
blend.dst_image_h.clip_rect.w = 1280;
blend.dst_image_h.clip_rect.h = 800;
blend.dst_image_h.width = 1280;
blend.dst_image_h.height = 800;
if (sunxi_g2d_control(G2D_CMD_BLD_H, (unsigned long)(&blend)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_BLD_H failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  return ‑1;
}
```

### 掩膜图光栅操作

```
g2d_cmd`：`G2D_CMD_MASK_H
```

根据掩膜图和光栅操作码对src、pattern 和dst 进行操作，并将结果保存到dst 中.

```c
mask.back_flag = G2D_ROP3_NOTSRCCOPY;
mask.fore_flag = G2D_ROP3_SRCINVERT;
mask.src_image_h.clip_rect.x = 0;
mask.src_image_h.clip_rect.y = 0;
mask.src_image_h.clip_rect.w = 1280;
mask.src_image_h.clip_rect.h = 800;
mask.src_image_h.width = 1280;
mask.src_image_h.height = 800;
mask.src_image_h.mode = G2D_GLOBAL_ALPHA;
mask.dst_image_h.clip_rect.x = 0;
mask.dst_image_h.clip_rect.y = 0;
mask.dst_image_h.clip_rect.w = 1280;
mask.dst_image_h.clip_rect.h = 800;
mask.dst_image_h.width = 1280;
mask.dst_image_h.height = 800;
mask.dst_image_h.mode = G2D_GLOBAL_ALPHA;
mask.mask_image_h.clip_rect.x = 0;
mask.mask_image_h.clip_rect.y = 0;
mask.mask_image_h.clip_rect.w = 1280;
mask.mask_image_h.clip_rect.h = 800;
mask.mask_image_h.width = 1280;
mask.mask_image_h.height = 800;
mask.mask_image_h.mode = G2D_GLOBAL_ALPHA;
mask.ptn_image_h.clip_rect.x = 0;
mask.ptn_image_h.clip_rect.y = 0;
mask.ptn_image_h.clip_rect.w = 1280;
mask.ptn_image_h.clip_rect.h = 800;
mask.ptn_image_h.width = 1280;
mask.ptn_image_h.height = 800;
mask.ptn_image_h.mode = G2D_GLOBAL_ALPHA;
mask.src_image_h.alpha = 0xff;
mask.mask_image_h.alpha = 0xff;
mask.ptn_image_h.alpha = 0xff;
mask.dst_image_h.alpha = 0xff;
mask.src_image_h.format = G2D_FORMAT_ARGB8888;
mask.mask_image_h.format = G2D_FORMAT_ARGB8888;
mask.ptn_image_h.format = G2D_FORMAT_ARGB8888;
mask.dst_image_h.format = G2D_FORMAT_ARGB8888;

if (sunxi_g2d_control(G2D_CMD_MASK_H, (unsigned long)(&mask)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_MASK_H failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
      return ‑1;
}
```

### 批处理接口

```
g2d_cmd`：`G2D_CMD_MIXER_TASK
struct mixer_para {
    g2d_operation_flag op_flag;
    g2d_blt_flags_h flag_h;
    g2d_rop3_cmd_flag back_flag;
    g2d_rop3_cmd_flag fore_flag;
    g2d_bld_cmd_flag bld_cmd;
    g2d_image_enh src_image_h;
    g2d_image_enh dst_image_h;
    g2d_image_enh ptn_image_h;
    g2d_image_enh mask_image_h;
    g2d_ck ck_para;
};

typedef enum {
    OP_FILLRECT = 0x1,
    OP_BITBLT = 0x2,
    OP_BLEND = 0x4,
    OP_MASK = 0x8,
    OP_SPLIT_MEM = 0x10,
} g2d_operation_flag;
```

`struct mixer_para` 是 RCQ 批处理的核心结构体，可以看到除了第一个成员，其它成员的类型都是旧驱动里面有的，`struct mixer_para` 是之前驱动接口结构体的一个合集，如图所示：

![image13](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image13.jpg)

所以你可以用批处理接口完成上面其它接口的功能，只要你设置好对应的成员和`g2d_operation_flag`即可.

其中 arg 的参数如下

```
arg[0]: 设备文件标识符arg指向mixer_para指针，批处理的话就是数组指针。
arg[1]: 指针需要处理的帧的数量，大于等于1
```

用户要做的事情，就是填充好mixer_para 数组，申请好输入输出内存，将要处理的图像写入到输入内存里面，将处理好的图像在输出内存里面取出来。

下面是批处理缩放16 帧示例，其中4 帧是rgb 格式的缩放，6 帧是Y8 的是缩放，6 帧是nv12 的缩放。

```c
#define RGB_IMAGE_NAME "../../pic/c1080_good.rgb"
#define Y8_IMAGE_NAME "../../pic/en_dmabuf_bike_1280x720_220_Y8.bin"
#define NV12_IMAGE_NAME "../../pic/bike_1280x720_220.bin"
#define FRAME_TO_BE_PROCESS 16

/*4 rgb convert 6 Y8 convert 6 yuv420 convert*/
unsigned int out_width[FRAME_TO_BE_PROCESS] = {
    192,  154,  108,  321,  447,  960, 241, 320,
    1920, 1439, 1280, 1920, 2048, 720, 800, 480};

unsigned int out_height[FRAME_TO_BE_PROCESS] = {
    108,  87,  70,   217, 213, 640,
    840,  240, 1080, 777, 800, 1080,
    2048, 480, 480,  240};

struct test_info_t {
  struct mixer_para info[FRAME_TO_BE_PROCESS];
  .....
};

int main() {
  ....
  test_info.info[0].flag_h = G2D_BLT_NONE_H;
  test_info.info[0].op_flag = OP_BITBLT;
  test_info.info[0].src_image_h.format = G2D_FORMAT_RGB888;
  test_info.info[0].src_image_h.width = 1920;
  test_info.info[0].src_image_h.height = 1080;
  test_info.info[0].src_image_h.clip_rect.x = 0;
  test_info.info[0].src_image_h.clip_rect.y = 0;
  test_info.info[0].src_image_h.clip_rect.w = 1920;
  test_info.info[0].src_image_h.clip_rect.h = 1080;
  test_info.info[0].src_image_h.color = 0xee8899;
  test_info.info[0].src_image_h.mode = G2D_PIXEL_ALPHA;
  test_info.info[0].src_image_h.alpha = 0xaa;
  test_info.info[0].src_image_h.align[0] = 0;
  test_info.info[0].src_image_h.align[1] = 0;
  test_info.info[0].src_image_h.align[2] = 0;
  test_info.info[0].dst_image_h.format = G2D_FORMAT_RGB888;
  test_info.info[0].dst_image_h.width = 800;
  test_info.info[0].dst_image_h.height = 480;
  test_info.info[0].dst_image_h.clip_rect.x = 0;
  test_info.info[0].dst_image_h.clip_rect.y = 0;
  test_info.info[0].dst_image_h.clip_rect.w = 1920;
  test_info.info[0].dst_image_h.clip_rect.h = 1080;
  test_info.info[0].dst_image_h.color = 0xee8899;
  test_info.info[0].dst_image_h.mode = G2D_PIXEL_ALPHA;
  test_info.info[0].dst_image_h.alpha = 255;
  test_info.info[0].dst_image_h.align[0] = 0;
  test_info.info[0].dst_image_h.align[1] = 0;
  test_info.info[0].dst_image_h.align[2] = 0;
  for (i = 0; i < FRAME_TO_BE_PROCESS; ++i) {
    memcpy(&test_info.info[i], &test_info.info[0], sizeof(struct mixer_para));
    test_info.info[i].dst_image_h.width = out_width[i];
    test_info.info[i].dst_image_h.height = out_height[i];
    test_info.info[i].dst_image_h.clip_rect.w = out_width[i];
    test_info.info[i].dst_image_h.clip_rect.h = out_height[i];
    if (i < 4) {
      test_info.out_size[i] = test_info.info[i].dst_image_h.width *
                              test_info.info[i].dst_image_h.height * 3;
      test_info.info[i].src_image_h.format = G2D_FORMAT_BGR888;
      test_info.info[i].src_image_h.width = 1920;
      test_info.info[i].src_image_h.height = 1080;
      test_info.info[i].src_image_h.clip_rect.w = 1920;
      test_info.info[i].src_image_h.clip_rect.h = 1080;
      test_info.in_size[i] = 1920 * 1080 * 3;
      snprintf(test_info.src_image_name[i], 100, "%s", RGB_IMAGE_NAME);
    } else if (i < 10) {
      test_info.out_size[i] = test_info.info[i].dst_image_h.width *
                              test_info.info[i].dst_image_h.height;
      test_info.info[i].src_image_h.format = G2D_FORMAT_Y8;
      test_info.info[i].src_image_h.width = 1280;
      test_info.info[i].src_image_h.height = 720;
      test_info.info[i].src_image_h.clip_rect.w = 1280;
      test_info.info[i].src_image_h.clip_rect.h = 720;
      test_info.in_size[i] = 1280 * 720;
      snprintf(test_info.src_image_name[i], 100, "%s", Y8_IMAGE_NAME);
    } else {
      test_info.out_size[i] = test_info.info[i].dst_image_h.width *
                              test_info.info[i].dst_image_h.height * 2;
      test_info.info[i].src_image_h.format = G2D_FORMAT_YUV420UVC_U1V1U0V0;
      test_info.info[i].src_image_h.width = 1280;
      test_info.info[i].src_image_h.height = 720;
      test_info.info[i].src_image_h.clip_rect.w = 1280;
      test_info.info[i].src_image_h.clip_rect.h = 720;
      test_info.in_size[i] = 1280 * 720 * 2;
      snprintf(test_info.src_image_name[i], 100, "%s", NV12_IMAGE_NAME);
    }
    ret = ion_memory_request(&test_info.dst_ion[i], 1, NULL,
                             test_info.out_size[i]);
    test_info.info[i].dst_image_h.fd =
        test_info.dst_ion[i].fd_data.fd;  // rtos‑hal中的驱动不支持使用fd，这里请修改为物理地址，并设置好偏移
    test_info.info[i].dst_image_h.format = test_info.info[i].src_image_h.format;
    ret = ion_memory_request(&test_info.src_ion[i], 0,
                             test_info.src_image_name[i], test_info.in_size[i]);
    test_info.info[i].src_image_h.fd =
        test_info.src_ion[i].fd_data.fd;  // rtos‑hal中的驱动不支持使用fd，这里请修改为物理地址，并设置好偏移
  }
  arg[0] = (unsigned long)test_info.info;
  arg[1] = FRAME_TO_BE_PROCESS;
  if (sunxi_g2d_control(G2D_CMD_MIXER_TASK, (arg)) < 0) {
    printf("[%d][%s][%s]G2D_CMD_MIXER_TASK failure!\n", __LINE__, __FILE__,
           __FUNCTION__);
    goto FREE_SRC;
  }
  printf("[%d][%s][%s]G2D_CMD_MIXER_TASK SUCCESSFULL!\n", __LINE__, __FILE__,
         __FUNCTION__);
  printf("save result data to file \n");
  char sufix[40] = {0};
  for (i = 0; i < FRAME_TO_BE_PROCESS; ++i) {
    if (i < 4) {
      snprintf(sufix, 40, "rgb888");
    } else if (i < 10)
      snprintf(sufix, 40, "y8");
    else
      snprintf(sufix, 40, "nv12");
    snprintf(test_info.dst_image_name[i], 100,
             "../../ result/frame%d_%dx%d_to_%dx%d.%s", i,
             test_info.info[i].src_image_h.width,
             test_info.info[i].src_image_h.height,
             test_info.info[i].dst_image_h.width,
             test_info.info[i].dst_image_h.height, sufix);
    if ((test_info.dst_fp[i] = fopen(test_info.dst_image_name[i], "wb+")) ==
        NULL) {
      printf("open file %s fail .\ n", test_info.dst_image_name[i]);
      break;
    } else {
      ret = fwrite(test_info.dst_ion[i].virt_addr, test_info.out_size[i], 1,
                   test_info.dst_fp[i]);
      fflush(test_info.src_fp);
      printf("Frame %d saved\n", i);
    }
  }
  ....
}
```

### 创建新的批处理实例

```
g2d_cmd` ：`G2D_CMD_CREATE_TASK
arg[0] arg指向mixer_para指针，批处理的话就是数组指针。
arg[1] 需要处理的帧的数量，大于等于1

处理后：
arg[0]对应的指针所指向的mixer_para内容会被更新。
```

该 `ioctl` 命令用于创建新的批处理实例，但不做硬件处理, 只是准备好软件。

这个过程会构造对应帧数的 `rcq` 队列内存以及进行输入输出图像的 `dma map` 和 `dma umap` 操作，构造完毕之后会更新 `mixer_para` 回应用层。

`task_id` 是唯一的，只要不销毁批处理实例，会一直占据这个`id`，根据这个`id` 用户可以进一步操作，比如设置，销毁，获取当前 `mixer_para`。

如下例子，会创建两个不同帧数和输入输出格式的批处理实例，最终得到两个不同的`task id`，`task0` 和task1。`mixer_para` 如何构造参考 `G2D_CMD_MIXER_TASK` 的例子。

```c
arg[0] = (unsigned long)test_info.info;
arg[1] = FRAME_TO_BE_PROCESS;

task0 = sunxi_g2d_control(G2D_CMD_CREATE_TASK, (arg));

if (task0 < 1) {
  printf("[%d][%s][%s]G2D_CMD_CREATE_TASK failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  goto FREE_SRC;
}

printf("[%d][%s][%s]G2D_CMD_CREATE_TASK SUCCESSFULL!\n",
       __LINE__,
       __FILE__,
       __FUNCTION__);

arg[0] = (unsigned long)test_info2.info;
arg[1] = FRAME_TO_BE_PROCESS2;
task1 = sunxi_g2d_control(G2D_CMD_CREATE_TASK, (arg));

if (task1 < 1) {
  printf("[%d][%s][%s]G2D_CMD_CREATE_TASK failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  goto FREE_SRC;
}

printf("[%d][%s][%s]G2D_CMD_CREATE_TASK SUCCESSFULL!\n",
       __LINE__,
       __FILE__,
       __FUNCTION__);
```

### 执行批处理的硬件操作

```
g2d_cmd`：`G2D_CMD_TASK_APPLY
arg[0] task id(由G2D_CMD_CREATE_TASK命令获得）
arg[1] arg指向mixer_para指针，批处理的话就是数组指针
```

该 `ioctl` 命令的作用是执行批处理的硬件操作。

值得注意 `arg[1]` 中的`mixer_para`，必须是`G2D_CMD_CREATE_TASK` 之后返回的 `mixer_para` 或者是通过另外一个 `ioctl` 命令`G2D_CMD_TASK_GET_PARA` 才行，这里不需要制定帧数的原因是前面的`G2D_CMD_CREATE_TASK` 已经指定好帧数，而`G2D_CMD_TASK_APPLY` 是基于`task id` 来执行的。

```c
arg[0] = task0;
arg[1] = (unsigned long)test_info.info;
if (sunxi_g2d_control(G2D_CMD_TASK_APPLY, (arg)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_TASK_APPLY failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  goto FREE_SRC;
}

printf("[%d][%s][%s]G2D_CMD_TASK_APPLY SUCCESSFULL!\n",
       __LINE__,
       __FILE__,
       __FUNCTION__);

arg[0] = task1;
arg[1] = (unsigned long)test_info2.info;
if (sunxi_g2d_control(G2D_CMD_TASK_APPLY, (arg)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_TASK_APPLY failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  goto FREE_SRC;
}

printf("[%d][%s][%s]G2D_CMD_TASK_APPLY SUCCESSFULL!\n",
       __LINE__,
       __FILE__,
       __FUNCTION__);
```

### 销毁指定 task id 的批处理实例

```
g2d_cmd`： `G2D_CMD_TASK_DESTROY
```

该ioctl 命令的作用是销毁指定task id 的批处理实例。

```c
arg[0] = task0;

if (sunxi_g2d_control(G2D_CMD_TASK_DESTROY, (arg)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_TASK_DESTROY failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  goto FREE_SRC;
}
printf("[%d][%s][%s]G2D_CMD_TASK_DESTROY SUCCESSFULL!\n",
       __LINE__,
       __FILE__,
       __FUNCTION__);
arg[0] = task1;
;
if (sunxi_g2d_control(G2D_CMD_TASK_DESTROY, (arg)) < 0) {
  printf("[%d][%s][%s]G2D_CMD_TASK_DESTROY failure!\n", __LINE__, __FILE__,
         __FUNCTION__);
  goto FREE_SRC;
}
printf("[%d][%s][%s]G2D_CMD_TASK_DESTROY SUCCESSFULL!\n",
       __LINE__,
       __FILE__,
       __FUNCTION__);
```

### 获取指定 `task id` 的 `mixer para`

```
g2d_cmd`：`G2D_CMD_TASK_GET_PARA
```

用户必须自行保证传入的指针所指向的内存足够存放这么多帧的参数

# HW Spinlock

## 模块介绍

hwspinlock 提供一种硬件同步机制，lock 操作可以防止多处理器同时处理共享数据。保证数据的一致性。

## 源码结构

```
├── hal_hwspinlock.c
├── hwspinlock.h
├── Kconfig
├── Makefile
├── platform
│   ├── hwspinlock-sun20iw2.h 
└── platform-hwspinlock.h
```

## 模块配置

配置路径如下:

```
There is no help available for this option. Symbol: DRIVERS_HWSPINLOCK [=y]
Type : boolean
Prompt: enable hwspinlock driver
Location:
    -> Drivers options
        -> Supported drivers
            -> HW SPINLOCK Devices
```

## 模块接口说明

头文件：

```c
#include <hal_hwspinlock.h>
```

### 获取锁

函数原型

```
int hal_hwspinlock_get(int num)
```

参数：

- `num`：`0~31`，hwspinlock 锁的序号

返回值：

- `HWSPINLOCK_OK`：上锁完成
- `HWSPINLOCK_EXCEED_MAX`：锁已达最大值，获取失败
- `HWSPINLOCK_ERR`：上锁失败

### 解锁

函数原型

```
int hal_hwspinlock_put(int num)
```

参数：

- `num`：`0~31`，hwspinlock 锁的序号

返回值：

- `HWSPINLOCK_OK`：上锁完成
- `HWSPINLOCK_EXCEED_MAX`：锁已达最大值，获取失败

### 检查锁是否在使用中

函数原型

```
int hal_hwspinlock_check_taken(int num)
```

参数：

- `num`：`0~31`，hwspinlock 锁的序号

返回值

- 1：使用中
- 0：未被使用

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>
#include <hal_log.h>
#include <hal_cmd.h>
#include <hal_hwspinlock.h>

static int cmd_test_hwspinlock_get(int argc, char **argv)
{
    hal_hwspinlock_get(0);
    return 0;
}

static int cmd_test_hwspinlock_put(int argc, char **argv)
{
    hal_hwspinlock_put(0);
    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_hwspinlock_get, hal_hwspinlock_get, test_hwspinlock)
FINSH_FUNCTION_EXPORT_CMD(cmd_test_hwspinlock_put, hal_hwspinlock_put, test_hwspinlock)
```

在 FreeRTOS 控制台输入 `hal_hwspinlock_get` 命令会上锁，输入 `hal_hwspinlock_put` 命令会解锁。

# IR

红外是一种电磁波，可以实现数据的无线传输，由发送和接收两个部分组成。发送端对红外信号进行脉冲编码，接收端完成对红外信号的脉冲解码。红外遥控协议有多种，如 NEC、SIRC、 RC-5 等，这些协议都比较简单，基本都是以脉冲宽度或脉冲间隔来编码。当遥控器按下按键时，遥控器逻辑单元会产生一个完整的脉冲波形，包含遥控指令的信息，即红外传输的基带信号。这个波形被送到遥控器的调制单元，经调制单元调制成高频红外电磁波信号，由发光二极管发射出去，如下图所示。

![image14](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image14.jpg)

红外电磁波信号一般使用一体化接收头接收，同时完成信号的解调和放大，其输出信号就是红外的基带脉冲信号。解调后的信号可直接送入信号处理单元，由处理单元对脉冲波形进行解码，典型红外接收电路如下图所示。

![image15](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image15.jpg)

相对应的，IR RX 模块属于INPUT 输入设备，支持红外遥控器的按键遥控。具体规格如下所示：

![image16](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image16.jpg)

整个系统框架流程如上图所示：当用户按下遥控器的时候，会触发一个中断。IR 驱动会进入中断，然后解析遥控器发送的键值，然后对该电压值进行解码，然后将该事件上报给INPUT 子系统。INPUT 子系统找到相应的事件处理程序之后，会将该按键事件上报给用户空间，等待用户程序对该按键信息的读取与处理。

## IR TX 发送 （CIR_TX）

### 模块内部调制原理

内部调制原理如下图所示。其中 IMS（Internal Modulation Select），为选择使用内部调制或不调制。软件需设置使用IMS。

![image17](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image17.jpg)

### 载波频率设置

载波频率计算公式为：

```
Fc = Fclk / [(RFMC + 1) * (DRMC + 2)] (公式1)
```

其中

- Fc为载波频率；
- Fclk为Sunxi IR-TX时钟源，目前配置为12MHz；
- RFMC为载波分频系数，由MCR寄存器（0x04）bit[7:0]设定；
- DRMC为载波占空比设置，由GLR寄存器（0x00）bit[6:5]设定，可配置1/2、1/3或1/4。

通常，载波占空比DRMC 和载波频率 Fc 由应用层设定，因此设置载波占空比即转换为设置GLR bit[6:5]，设置载波频率即转换成设置MCR bit[7:0]，由公式1 变换得计算RFMC 的公式为：

```
RFMC = Fclk / [Fc *(DRMC + 2)] - 1 (公式2)
```

### 数据发送流程

CIR-TX 驱动数据发送流程如下图所示：

![image18](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image18.jpg)

### 模块配置介绍

IR_TX 在 `menuconfig` 中配置如下

![image19](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image19.jpg)

### 模块源码结构

CIR_TX 模块源码结构如下所示：

```
rtos-hal/
|--hal/source/cir_tx/hal_cir_tx     // hal层接口代码
|--include/hal/sunxi_hal_cir_tx.h   // 头文件
```

### 模块接口说明

头文件

```
#include <sunxi_hal_cir_tx.h>
```

#### IRTX 初始化

IRTX 模块初始化，主要完成clk 初始化

函数原型：

```c
cir_tx_status_t hal_cir_tx_init(struct sunxi_cir_tx_t *cir_tx);
```

参数：

- `cir_tx` ：操作结构体

返回值：

- `0`：成功初始化
- 负数：初始化失败

#### IRTX 设置载波占空比

配置 IRTX 模块占空比

函数原型：

```c
void hal_cir_tx_set_duty_cycle(int duty_cycle);
```

参数：

- `duty_cycle`：占空比大小

返回值：

- 无

#### IRTX 设置载波频率

设置载波频率

函数原型：

```c
void hal_cir_tx_set_carrier(int carrier_freq);
```

参数：

- `carrier_freq`：载波频率大小

返回值：

- 无

#### IRTX 使能发送

发送IRTX 数据

函数原型：

```c
void hal_cir_tx_xmit(unsigned int *txbuf, unsigned int count);
```

参数：

- `txbuf`： 代表数据 `buf`
- `count`： 代表数据长度

返回值：

- 无

### 模块使用范例

```c
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <hal_cmd.h>

#include "sunxi_hal_cir_tx.h"

#define NS_TO_US(nsec) ((nsec) / 1000)

#define NEC_NBITS 32
#define NEC_UNIT 562500 /* ns. Logic data bit pulse length */
#define NEC_HEADER_PULSE \
  (16 * NEC_UNIT) /* 9ms. 16 * Logic data bit pulse length*/
#define NEC_HEADER_SPACE (8 * NEC_UNIT) /* 4.5ms */
#define NEC_BIT_PULSE (1 * NEC_UNIT)
#define NEC_BIT_0_SPACE (1 * NEC_UNIT)
#define NEC_BIT_1_SPACE (3 * NEC_UNIT)
#define NEC_TRAILER_PULSE (1 * NEC_UNIT)
#define NEC_TRAILER_SPACE (10 * NEC_UNIT) /* even longer */

#define GPIO_IR_RAW_BUF_SIZE 128
#define DEFAULT_DUTY_CYCLE 33
#define DEFAULT_CARRIER_FREQ 38000

#define LIRC_MODE2_PULSE 0x01000000
#define LIRC_MODE2_SPACE 0x00000000

#define LIRC_VALUE_MASK 0x00FFFFFF
#define LIRC_MODE2_MASK 0xFF000000

#define LIRC_PULSE(val) (((val)&LIRC_VALUE_MASK) | LIRC_MODE2_PULSE)
#define LIRC_SPACE(val) (((val)&LIRC_VALUE_MASK) | LIRC_MODE2_SPACE)

uint32_t tx_raw_buf[GPIO_IR_RAW_BUF_SIZE];

static int nec_modulation_byte(uint32_t *buf, uint8_t code) {
  int i = 0;
  uint8_t mask = 0x01;

  while (mask) {
    if (code & mask) {
      /* bit 1 */
      *(buf + i) = LIRC_PULSE(NS_TO_US(NEC_BIT_PULSE));
      *(buf + i + 1) = LIRC_SPACE(NS_TO_US(NEC_BIT_1_SPACE));
    } else {
      /* bit 0 */
      *(buf + i) = LIRC_PULSE(NS_TO_US(NEC_BIT_PULSE));
      *(buf + i + 1) = LIRC_SPACE(NS_TO_US(NEC_BIT_0_SPACE));
    }
    mask <<= 1;
    i += 2;
  }
  return i;
}

static int ir_lirc_transmit_ir(uint32_t *raw_buf, size_t n) {
  int ret, count;

  count = n / sizeof(unsigned int);
  if (count > 1024 || count % 2 == 0) {
    return -1;
  }
}

static int nec_ir_encode(uint32_t *raw_buf, uint32_t key_code) {
  uint8_t address, reverse_address, command, reverse_command;
  uint32_t *head_p, *data_p, *stop_p;

  address = (key_code >> 24) & 0xff;
  reverse_address = (key_code >> 16) & 0xff;
  command = (key_code >> 8) & 0xff;
  reverse_command = (key_code >> 0) & 0xff;

  /* head bit */
  head_p = raw_buf;
  *(head_p) = LIRC_PULSE(NS_TO_US(NEC_HEADER_PULSE));
  *(head_p + 1) = LIRC_PULSE(NS_TO_US(NEC_HEADER_SPACE));

  /* data bit */
  data_p = raw_buf + 2;
  nec_modulation_byte(data_p, address);

  data_p += 16;
  nec_modulation_byte(data_p, reverse_address);

  data_p += 16;
  nec_modulation_byte(data_p, command);

  data_p += 16;
  nec_modulation_byte(data_p, reverse_command);

  /* stop bit */
  stop_p = data_p + 16;
  *(stop_p) = LIRC_PULSE(NS_TO_US(NEC_TRAILER_PULSE));
  *(stop_p + 1) = LIRC_PULSE(NS_TO_US(NEC_TRAILER_SPACE));

  return ((NEC_NBITS + 2) * 2 - 1);
}

int cmd_test_cir_tx(int argc, char **argv) {
  int key_code = 0x04fb13ec;
  int i, size;
  int count = 67;
  struct sunxi_cir_tx_t *cir_tx;

  hal_cir_tx_init(cir_tx);

  hal_cir_tx_set_duty_cycle(DEFAULT_DUTY_CYCLE);
  hal_cir_tx_set_carrier(DEFAULT_CARRIER_FREQ);

  size = nec_ir_encode(tx_raw_buf, key_code);
  for (i = 0; i < size; i++) {
    printf("%d ", *(tx_raw_buf + i) & 0x00FFFFFF);
    if ((i + 1) % 8 == 0) {
      printf("\n");
    }
  }
  printf("\n");

  for (i = 0; i < size; i++) tx_raw_buf[i] = (tx_raw_buf[i] & 0x00FFFFFF);

  hal_cir_tx_xmit(tx_raw_buf, count);
  printf("end test!\n");

  return 0;
}
```

## IR RX 接收（CIR）

### 模块配置介绍

IR 在 `menuconfig` 中配置如下

![image20](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image20.jpg)

### 模块源码结构

CIR 模块源码结构如下所示：

```
rtos-hal/
|--hal/source/cir/hal_cir.c     // hal层接口代码
|--include/hal/sunxi_hal_cir.h  // 头文件
```

### 模块返回值定义

| 返回值 | 枚举           | 定义                    |
| :----- | :------------- | :---------------------- |
| -4     | `CIR_PIN_ERR`  | 配置的 CIR 引脚错误     |
| -3     | `CIR_CLK_ERR`  | 配置的 CIR 模块时钟错误 |
| -2     | `CIR_IRQ_ERR`  | 中断配置错误            |
| -1     | `CIR_PORT_ERR` | 配置 CIR 端口错误       |
| 0      | `CIR_OK`       | 成功                    |

```c
typedef enum {
   CIR_PIN_ERR = -4,
   CIR_CLK_ERR = -3,
   CIR_IRQ_ERR = -2,
   CIR_PORT_ERR = -1,
   CIR_OK = 0,
} cir_status_t;
```

### 模块接口说明

头文件

```c
#include <sunxi_hal_cir.h>
```

#### IR 初始化接口

IR 模块初始化，主要初始化采样率、通道选择及注册中断等

函数原型：

```c
cir_status_t sunxi_cir_init(cir_port_t port);
```

参数：

- `port` ：CIR 通道

返回值：

- `0`：成功初始化
- 负数：初始化失败

#### IR 注册回调接口

向应用层提供注册回调接口的功能

函数原型：

```c
void sunxi_cir_callback_register(cir_port_t port, cir_callback_t callback);
```

参数：

- `port` ：CIR 通道
- `callback`：应用层回调接口

返回值：

- 无

#### IR 去初始化接口

函数原型：

```c
void sunxi_cir_deinit(cir_port_t port);
```

参数：

- `port` ：CIR 通道

返回值：

- 无

### 模块使用范例

```c
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <hal_cmd.h>
#include <hal_log.h>

#include "sunxi_hal_cir.h"

static cir_callback_t cir_irq_callback(uint32_t data_type, uint32_t data) {
  printf("reg_val:0x%u\n", data);
  return 0;
}

int cmd_test_cir(int argc, char **argv) {
  cir_port_t port;
  int ret = -1;
  int timeout_sec = 15;
  TickType_t start_ticks, current_ticks;

  printf("Run ir test\n");

  if (argc < 2) {
    hal_log_err("usage: hal_ir channel\n");
    return -1;
  }

  port = strtol(argv[1], NULL, 0);
  ret = sunxi_cir_init(port);
  if (ret) {
    hal_log_err("cir init failed!\n");
    return -1;
  }

  sunxi_cir_callback_register(port, cir_irq_callback);
  start_ticks = xTaskGetTickCount();
  printf("start_ticks: %u\n", start_ticks);

  while (1) {
    current_ticks = xTaskGetTickCount();
    if ((current_ticks - start_ticks) * portTICK_PERIOD_MS >=
        timeout_sec * 1000) {
      printf("current_ticks: %u\n", current_ticks);
      break;
    }
  }
  sunxi_cir_deinit(port);
  return 0;
}
```

# PMU

PMU - 电源管理单元，负责系统各模块供电及电池充放电管理。

## 模块配置

regulator 相关配置项：

```
Drivers Options --->
    soc related device drivers --->
        REGULATOR Devices --->
            [*] enable regulator driver
            [*] regulator test
```

power 相关配置项：

```
Drivers Options --->
    soc related device drivers --->
        POWER Devices --->
            [*] enable power driver
                [*] use axp2585
                [*] regulator test
```

## 源码结构介绍

```
lichee/rtos-hal/hal/source/power/
├── axp2585.c
├── axp2585.h
├── axp.c
├── axp_twi.c
├── ffs.h
├── Kconfig
├── Makefile
├── sun20iw2p1
│ └── core.c
└── type.h

lichee/rtos-hal/hal/source/regulator/
├── Kconfig
├── Makefile
└── sun20iw2p1
  └── core.c
```

## 模块接口说明

头文件：

```c
#include <sunxi_hal_power.h>
#include <sunxi_hal_regulator.h>
```

### regulator 相关结构体

```c
struct regulator_ops{
    int (*enable) (struct regulator_dev *);
    int (*disable) (struct regulator_dev *);
    int (*set_voltage) (struct regulator_dev *, int target_uV);
    int (*get_voltage) (struct regulator_dev *, int *vol_uV);
    int (*set_en) (struct regulator_dev *, unsigned int flags);
    int (*set_voltage_ext) (struct regulator_dev *, int target_uV, unsigned int status);
    int (*get_voltage_ext) (struct regulator_dev *, int *vol_uV,  unsigned int status);
};

struct regulator_dev{
    unsigned int flag;
    struct regulator_ops *ops;
    void *private;
};
```

### power 相关结构体

```c
struct power_dev{
    unsigned int flag;
    struct bat_power_ops *bat_ops;
    struct usb_power_ops *usb_ops;
    struct power_supply  *config;
    hal_sem_t irq_schd;
};
```

### regulator 获取电路接口

函数原型

```c
int hal_regulator_get(unsigned int request_flag, struct regulator_dev *rdev)
```

参数：

- rdev: 指定regulator的结构体
- request_flag: 指定regulator的电路参数

返回值：

- 成功：0
- 失败：‑1

### regulator 电路使能接口

函数原型

```c
int hal_regulator_set_able(struct regulator_dev *rdev, unsigned int flags)
```

参数：

- rdev: 指定regulator的结构体
- flags: 电路开关状态

返回值：

- 成功：0
- 失败：‑1

### regulator 获取电压接口

函数原型

```c
int hal_regulator_get_voltage_ext(struct regulator_dev *rdev, int *vol_uV, unsigned int status)
```

参数：

- rdev: 指定regulator的结构体
- vol_uV: 获取的电压信息
- status: 运行/休眠时的电压

返回值：

- 成功：0
- 失败：‑1

### regulator 调节电压接口

函数原型

```c
int hal_regulator_set_voltage_ext(struct regulator_dev *rdev, int target_uV, unsigned int status)
```

参数：

- rdev: 指定regulator的结构体
- target_uV: 指定调压信息
- status: 运行/休眠时的电压

返回值：

- 成功：0
- 失败：‑1

### power 初始化

函数原型

```c
int hal_power_init(void);
```

参数：

- 无

返回值：

- 成功：0
- 失败：‑1

### 获取当前 power 驱动

函数原型

```c
int hal_power_get(struct power_dev *rdev);
```

参数：

- rdev：初始化前的 power_dev 结构体

返回值：

- 0

### 获取电池电量信息

函数原型

```c
int hal_power_get_bat_cap(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 电池电量，[0‑100]
- 失败：‑1

### 获取库仑计信息

函数原型

```c
int hal_power_get_coulumb_counter(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：返回电流大小，单位mA
- 失败：‑1

### 查看电池当前状态

函数原型

```c
int hal_power_get_bat_present(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：电池有效返回1，否则返回0
- 失败：‑1

### 查看电池是否连接

函数原型

```c
int hal_power_get_bat_online(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：电池存在返回1，否则返回0
- 失败：‑1

### 获取电池充电状态

函数原型

```c
int hal_power_get_bat_status(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：返回电池的多种状态，[0] 未知状态；[1] 充电状态；[3] 连接单不充电；[4] 充满电。
- 失败：‑1

### 获取电池当前的健康状态

函数原型

```c
int hal_power_get_bat_health(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：返回1，电池健康
- 失败：‑1

### 获取电池电压

函数原型

```c
int hal_power_get_vbat(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：返回当前电压，单位mV
- 失败：‑1

### 获取充电电流

函数原型

```c
int hal_power_get_ibat(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：返回当前充电电流，单位mA
- 失败：‑1

### 获取放电电流

函数原型

```c
int hal_power_get_disibat(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：返回当前放电电流，单位mA
- 失败：‑1

### 获取 AXP IC 温度

函数原型

```c
int hal_power_get_temp(struct power_dev *rdev);
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：当前AXP IC 温度，单位为温度数值*10
- 失败：‑1

### 获取电池温度

函数原型

```c
int hal_power_get_temp_ambient(struct power_dev *rdev)
```

参数：

- 成功：当前电池温度，单位为温度数值*10

返回值：

- 失败：‑1

### 设置充电电流

函数原型

```c
int hal_power_set_chg_cur(struct power_dev *rdev, int cur)
```

参数：

- rdev：初始化后power_dev 结构体
- cur：充电电流大小，单位mA

返回值：

- 成功：0
- 失败：‑1

### 设置充电截止电压

函数原型

```c
int hal_power_set_chg_vol(struct power_dev *rdev, int vol)
```

参数：

- rdev：初始化后power_dev 结构体
- vol：充电截止电压，单位mV

返回值：

- 成功：0
- 失败：‑1

### 设置电池开关

函数原型

```c
int hal_power_set_batfet(struct power_dev *rdev, int onoff)
```

参数：

- rdev：初始化后power_dev 结构体
- onoff：电池开关，0 关闭电池与电路连接，1 打开连接

返回值：

- 成功：0
- 失败：‑1

### 获取当前USB 状态

函数原型

```c
int hal_power_get_usb_status(struct power_dev *rdev)
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：[1]USB 连接，有VBUS；[0] 无USB 连接，无VBUS
- 失败：‑1

### 获取USB 口输入限流值

函数原型

```c
int hal_power_get_usb_ihold(struct power_dev *rdev)
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：USB 口限流的电流值，单位mA
- 失败：‑1

### 获取USB 口输入限压值

函数原型

```c
int hal_power_get_usb_vhold(struct power_dev *rdev)
```

参数：

- rdev：初始化后power_dev 结构体

返回值：

- 成功：USB 口限压电流值，单位mV
- 失败：‑1

### 设置USB 口输入限流值

函数原型

```c
int hal_power_set_usb_ihold(struct power_dev *rdev, int cur)
```

参数：

- rdev：初始化后power_dev 结构体
- cur：USB 口限流的电流值，单位mA，范围[0‑3100]

返回值：

- 成功：0
- 失败：‑1

### 设置USB 口输入限压值

函数原型

```c
int hal_power_set_usb_vhold(struct power_dev *rdev, int vol)
```

参数：

- rdev：初始化后power_dev 结构体
- vol：USB 口输入限压值，单位mV，范围[3880mV~5080mV]

返回值：

- 成功：0
- 失败：‑1

## 模块使用范例

### regulator 模块使用范例

```c
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <stddef.h>

#include <unistd.h>

#include <sunxi_hal_regulator.h>
#include <sunxi_hal_common.h>
#include <hal_cmd.h>
#include <hal_log.h>

#define SOC_PRCM_BASE             (0x40050000)
#define SOC_PRCM_DCDC_CTRL0       (SOC_PRCM_BASE+0x0004)
#define SOC_PRCM_DCDC_CTRL1       (SOC_PRCM_BASE+0x0008)
#define SOC_PRCM_DCDC_LDO_MODE    (SOC_PRCM_BASE+0x000c)
#define SOC_PRCM_RTC_LDO_CTRL     (SOC_PRCM_BASE+0x0020)
#define SOC_PRCM_EXT_LDO_CTRL     (SOC_PRCM_BASE+0x0024)
#define SOC_PRCM_TOP_LDO_CTRL     (SOC_PRCM_BASE+0x0028)
#define SOC_PRCM_AON_LDO_CTRL     (SOC_PRCM_BASE+0x0040)
#define SOC_PRCM_APP_LDO_CTRL     (SOC_PRCM_BASE+0x0044)
#define SOC_PRCM_DSP_LDO_CTRL     (SOC_PRCM_BASE+0x004c)

//test : rpccli arm hal_regulator_set_current_able

static int hal_regulator_regs_check(void)
{
    printf("[regulator] %x:%x\n", SOC_PRCM_DCDC_CTRL0, readl(SOC_PRCM_DCDC_CTRL0));
    printf("[regulator] %x:%x\n", SOC_PRCM_DCDC_CTRL1, readl(SOC_PRCM_DCDC_CTRL1));
    printf("[regulator] %x:%x\n", SOC_PRCM_DCDC_LDO_MODE, readl(SOC_PRCM_DCDC_LDO_MODE));
    printf("[regulator] %x:%x\n", SOC_PRCM_RTC_LDO_CTRL, readl(SOC_PRCM_RTC_LDO_CTRL));
    printf("[regulator] %x:%x\n", SOC_PRCM_EXT_LDO_CTRL, readl(SOC_PRCM_EXT_LDO_CTRL));
    printf("[regulator] %x:%x\n", SOC_PRCM_TOP_LDO_CTRL, readl(SOC_PRCM_TOP_LDO_CTRL));
    printf("[regulator] %x:%x\n", SOC_PRCM_AON_LDO_CTRL, readl(SOC_PRCM_AON_LDO_CTRL));
    printf("[regulator] %x:%x\n", SOC_PRCM_APP_LDO_CTRL, readl(SOC_PRCM_APP_LDO_CTRL));
    printf("[regulator] %x:%x\n", SOC_PRCM_DSP_LDO_CTRL, readl(SOC_PRCM_DSP_LDO_CTRL));
    return 0;
}

static int cmd_set_able(int argc, const char **argv)
{
    int ret;
    int id = SOC_ID_MAX;
    unsigned int flag = 0;
    struct regulator_dev regulator;
    if (argv[1])
        id = (int)*argv[1] - 48;
    if (argv[2])
        flag = (int)*argv[2] - 48;
    printf("[regulator] set regulator_en[%d]:%x, flage:%d\n", id, REGULATOR_GET(SOC_REGULATOR, id), flag);
    hal_regulator_get(REGULATOR_GET(SOC_REGULATOR, id), &regulator);
    printf("[regulator] set_able regulator_en\n");
    hal_regulator_set_able(&regulator, flag);
    printf("[regulator] set_regulator[%d]able_status:%d\n", id, flag);
    hal_regulator_regs_check();
    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(cmd_set_able, hal_regulator_set_current_able, regulator hal APIs tests)

static int cmd_get_voltage_ext(int argc, const char **argv)
{
    int ret;
    int id = SOC_ID_MAX;
    unsigned int flag = 0;
    struct regulator_dev regulator;
    if (argv[1])
        id = (int)*argv[1] - 48;
    if (argv[2])
        flag = (int)*argv[2] - 48;
    printf("[regulator] get regulator:%x\n", REGULATOR_GET(SOC_REGULATOR, id));
    hal_regulator_get(REGULATOR_GET(SOC_REGULATOR, id), &regulator);
    printf("[regulator] cat check_dedc_status\n");
    hal_regulator_get_voltage_ext(&regulator, &ret, flag);
    printf("[regulator] get_regulator[%d]status[%d]voltage:%d\n", id, flag, ret);
    hal_regulator_regs_check();
    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(cmd_get_voltage_ext, hal_regulator_get_voltage, regulator hal APIs tests)

static int cmd_set_voltage_ext(int argc, const char **argv)
{
    int ret[4] = {0};
    int ret1;
    int id = SOC_ID_MAX;
    unsigned int flag = 0;
    struct regulator_dev regulator;
    if (argv[1])
        id = (int)*argv[1] - 48;
    if (argv[2])
        flag = (int)*argv[2] - 48;
    if (argv[3])
        ret[0] = ((int)*argv[3] - 48) * 1000;
    if (argv[4])
        ret[1] = ((int)*argv[4] - 48) * 100;
    if (argv[5])
        ret[2] = ((int)*argv[5] - 48) * 10;
    if (argv[6])
        ret[3] = ((int)*argv[6] - 48) * 1;
    ret1 = (ret[0] + ret[1] + ret[2] + ret[3]) * 1000;
    printf("[regulator] set regulator:%x\n", REGULATOR_GET(SOC_REGULATOR, id));
    hal_regulator_get(REGULATOR_GET(SOC_REGULATOR, id), &regulator);
    printf("[regulator] set_regulator[%d]status[%d]voltage:%d\n", id, flag, ret1);
    hal_regulator_set_voltage_ext(&regulator, ret1, flag);
    printf("[regulator] finishe-set_regulator[%d]status[%d]voltage:%d\n", id, flag, ret1);
    hal_regulator_regs_check();
    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_set_voltage_ext, hal_regulator_set_voltage, regulator hal APIs tests)
```

### power 模块使用范例

```c
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#include <sunxi_hal_power.h>
#include <hal_cmd.h>
#include <hal_log.h>

static int cmd_test_power_get_bat(int argc, const char **argv)
{
    int ret;
    struct power_dev rdev;
    printf("[power] get power\n");
    hal_power_get(&rdev);

    printf("[power] get bat cap\n");
    ret = hal_power_get_bat_cap(&rdev);
    printf("[power] bat cap:%d\n", ret);

    printf("[power] get_coulumb_counter\n");
    ret = hal_power_get_coulumb_counter(&rdev);
    printf("[power] coulumb_counter:%d\n", ret);

    printf("[power] get bat_present\n");
    pr_err("pmu_bat_unused:%d\n", rdev.config->pmu_bat_unused);
    pr_err("pmu_version:%d\n", rdev.config->pmu_version);
    ret = hal_power_get_bat_present(&rdev);
    printf("[power] bat_present:%d\n", ret);

    printf("[power] get online\n");
    ret = hal_power_get_bat_online(&rdev);
    printf("[power] bat online:%d\n", ret);

    printf("[power] get status\n");
    ret = hal_power_get_bat_status(&rdev);
    printf("[power] bat status:%d\n", ret);

    printf("[power] get bat health\n");
    ret = hal_power_get_bat_health(&rdev);
    printf("[power] bat health:%d\n", ret);

    printf("[power] get vbat\n");
    ret = hal_power_get_vbat(&rdev);
    printf("[power] bat vbat:%d\n", ret);

    printf("[power] get ibat\n");
    ret = hal_power_get_ibat(&rdev);
    printf("[power] bat ibat:%d\n", ret);

    printf("[power] get disibat\n");
    ret = hal_power_get_disibat(&rdev);
    printf("[power] bat disibat:%d\n", ret);

    printf("[power] get temp\n");
    ret = hal_power_get_temp(&rdev);
    printf("[power] bat temp:%d\n", ret);

    printf("[power] bat get test finish\n");
    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(cmd_test_power_get_bat, test_power_get_bat, power hal APIs tests)

static int cmd_test_power_set_bat(int argc, const char **argv)
{
    int ret;
    struct power_dev rdev;
    int cur = strtol(argv[1], NULL, 0);
    int vol = strtol(argv[2], NULL, 0);

    printf("[power] set bat power:cur:%d vol:%d\n", cur, vol);
    hal_power_get(&rdev);

    printf("[power] set bat cur:%d\n", cur);
    ret = hal_power_set_chg_cur(&rdev, cur);
    printf("[power] chg_cur:%d\n", ret);

    printf("[power] set bat vol:%d\n", vol);
    ret = hal_power_set_chg_vol(&rdev, vol);
    printf("[power] _chg_vol:%d\n", ret);

    printf("[power] bat set test finish\n");
    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(cmd_test_power_set_bat, test_power_set_bat, power hal APIs tests)

static int cmd_test_power_get_usb(int argc, const char **argv)
{
    int ret;
    struct power_dev rdev;
    printf("[power] get power\n");
    hal_power_get(&rdev);

    printf("[power] get usb_status\n");
    ret = hal_power_get_usb_status(&rdev);
    printf("[power] usb_status:%d\n", ret);

    printf("[power] usb_ihold\n");
    ret = hal_power_get_usb_ihold(&rdev);
    printf("[power] usb_ihold:%d\n", ret);

    printf("[power] get usb_vhold\n");
    ret = hal_power_get_usb_vhold(&rdev);
    printf("[power] usb_vhold:%d\n", ret);

    printf("[power] get cc_status\n");
    ret = hal_power_get_cc_status(&rdev);
    printf("[power] cc_status:%d\n", ret);

    printf("[power] usb get test finish\n");
    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(cmd_test_power_get_usb, test_power_get_usb, power hal APIs tests)

static int cmd_test_power_set_usb(int argc, const char **argv)
{
    int ret;
    struct power_dev rdev;
    int cur = strtol(argv[1], NULL, 0);
    int vol = strtol(argv[2], NULL, 0);

    printf("[power] set usb power:cur:%d vol:%d\n", cur, vol);
    hal_power_get(&rdev);

    printf("[power] set usb_ihold:%d\n", cur);
    ret = hal_power_set_usb_ihold(&rdev, cur);
    printf("[power] usb_ihold:%d\n", ret);

    printf("[power] set usb_vhold:%d\n", vol);
    ret = hal_power_set_usb_vhold(&rdev, vol);
    printf("[power] usb_vhold:%d\n", ret);

    printf("[power] usb set test finish\n");
    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(cmd_test_power_set_usb, test_power_set_usb, power hal APIs tests)
```

# LEDC

LEDC（Light Emitting Diode Controller），发光二极管控制器。支持驱动目前市场上已有成熟的智能外控 LED，例如 WS2812 系列，每个 LED 的三基色均可实现 256 级亮度显示，因此整个 LED 可完成 256ˆ3（即 16777216）种颜色的全真色彩显示。模块支持最大1024颗外控 LED级联。

## 模块介绍

LEDC 硬件方框图如上图所示，CPU 通过 APB 总线操作 LEDC 寄存器来控制 LEDC；当 CPU配置好 LEDC 的相关寄存器之后，通过 CPU 或 DMA 将 R、G、B 数据从 DRAM 搬到 LEDCFIFO 中，启动 LEDC 之后就可以通过 PIN 脚向外部的 LED 发送数据了。

![image21](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image21.jpg)

LED 典型电路如图所示，其中 DI 表示控制数据输入脚，DO 表示控制数据输出脚。DI 端接收从控制器传过来的数据，每个 LED 内部的数据锁存器会存储 24bit 数据，剩余的数据经过内部整形处理电路整形放大后通过 DO 端口开始转发输出给下一个级联的 LED。因此，每经过一个LED，数据减少 24bit。

![image22](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image22.jpg)

​	注意，如果在单次直接设置第 n 个 LED 的亮度和色彩的时候，前面 n-1 个 LED 的亮度数据会在第 n 个 LED 的数据前发送，不过这些数据将会是原来 n-1 个 LED 的亮度数据。

## 模块配置

配置路径如下:

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            LEDC devices --->
                [*] enable ledc driver
```

## 源码结构

LEDC 模块源码结构如下所示：

```
rtos-hal/
|--hal/source/ledc/hal_ledc.c   // hal层接口代码
|--include/hal/sunxi_hal_ledc.h // 头文件
```

## 模块接口说明

头文件：

```c
#include <sunxi_hal_ledc.h>
```

### LEDC 初始化接口

LEDC 模块初始化，主要初始化时钟，GPIO 以及 DMAC 通道等

函数原型：

```c
int hal_gpadc_init(void)
```

参数：

- 无

返回值：

- 1：成功
- 其他：失败

### LEDC 数据传输接口

发送 RGB 数据

函数原型：

```c
int hal_ledc_trans_data(struct ledc_config *ledc)
```

参数：

- ledc: 配置参数信息，包括待发送数据、数据长度、发送方式（CPU/DMA）及各时间参数设置

返回值：

- 1：成功
- 其他：失败

### LEDC 清除中断接口

清除 LEDC 中断

函数原型：

```c
void hal_ledc_clear_all_irq(void)
```

参数：

- 无

返回值：

- 无

### LEDC 获取中断状态接口

获取 LEDC 中断状态

函数原型：

```c
unsigned int hal_ledc_get_irq_status(void)
```

参数：

- 无

返回值：

- LEDC 中断状态寄存器值

### LEDC DMA 回调接口

获取 DMA 状态信息

函数原型：

```c
void hal_ledc_dma_callback(void *para)
```

参数：

- DMAC 状态信息指针

返回值：

- 无

### LEDC 复位接口

复位 LEDC

函数原型：

```c
void hal_ledc_reset(void)
```

参数：

- 无

返回值：

- 无

### LEDC 去初始化接口

LEDC 模块去初始化

函数原型：

```c
void hal_ledc_deinit(void)
```

参数：

- 无

返回值：

- 无

### LEDC 初始化接口

LEDC 模块初始化

函数原型：

```c
int sunxi_led_init(void);
```

参数：

- 无

返回值：

- 1：成功
- 其他：失败

### LEDC 设置单个 LED 颜色亮度

LEDC 设置 LED 的亮度

函数原型：

```c
int sunxi_set_led_brightness(int led_num, unsigned int brightness);
```

参数：

- led_num：led 数量
- brightness：待配置的亮度

返回值：

- 1：成功
- 其他：失败

### LEDC 设置全部 LED 颜色亮度

LEDC 设置 LED 的亮度

函数原型：

```c
int sunxi_set_all_led(int led_num, unsigned int brightness);
```

参数：

- led_num：led 数量
- brightness：待配置的亮度

返回值：

- 1：成功
- 其他：失败

## 模块使用范例

```c
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <stdio.h>
#include <hal_timer.h>
#include <hal_cmd.h>

#include "sunxi_hal_ledc.h"

#define DEFAULT_BRIGHTNESS  127

void show_default_rgb(void)
{
    printf("======show default RGB======\n");
    sunxi_set_led_brightness(1, DEFAULT_BRIGHTNESS << 8);
    sunxi_set_led_brightness(1, DEFAULT_BRIGHTNESS << 16);
    sunxi_set_led_brightness(1, DEFAULT_BRIGHTNESS << 0);
    sunxi_set_led_brightness(1, 0);
}

int ledc_test_single(int argc, char **argv)
{
    int brightness = 0;
    int led_num;
    int err;

    printf("========SINGLE LEDC TEST========\n");

    err = hal_ledc_init();
    if (err) {
        printf("ledc init error\n");
        return -1;
    }

    if(argc < 3)
    {
        show_default_rgb();
        printf("uasge : hal_ledc [led_num] [RGB] [rgb_brightness], eg: hal_ledc 1 R 100\n");
        return -1;
    }

    led_num = atoi(argv[1]);
    if (led_num < 1 || led_num > 1024)
    {
        printf("The led_num you entered should be between 1 and 1024\n");
    }

    brightness = atoi(argv[3]);

    switch(argv[2][0])
    {
        case 'R' : brightness <<= 8; break;
        case 'G' : brightness <<= 16; break;
        case 'B' : brightness <<= 0; break;
        default  : printf("parameters err\n");
               return -1;
    }

    err = sunxi_set_led_brightness(led_num, brightness);
    if (err) {
        printf("set all led error\n");
        return -1;
    }

    printf("led is %d\n", led_num);
    printf("brightness is %d\n", brightness);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(ledc_test_single, hal_ledc, drv single ledc test_code);

int ledc_test_all(int argc, char **argv)
{
    int brightness = 0;
    int led_num;
    int err;

    printf("========ALL LEDC TEST========\n");

    err = hal_ledc_init();
    if (err) {
        printf("ledc init error\n");
        return -1;
    }

    if(argc < 3)
    {
        printf("uasge : hal_ledc_all [led_num] [RGB] [rgb_brightness], eg: hal_ledc_all 34 R 100\n");
        return -1;
    }

    led_num = atoi(argv[1]);
    if (led_num < 1 || led_num > 1024)
    {
        printf("The led_num you entered should be between 1 and 1024\n");
    }

    brightness = atoi(argv[3]);

    switch(argv[2][0])
    {
        case 'R' : brightness <<= 8; break;
        case 'G' : brightness <<= 16; break;
        case 'B' : brightness <<= 0; break;
        default  : printf("parameters err\n");
               return -1;
    }

    err = sunxi_set_all_led(led_num, brightness);
    if (err) {
        printf("set all led error\n");
        return -1;
    }

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(ledc_test_all, hal_ledc_all, drv all ledc test_code);
```

# UART

Universal Asynchronous Receiver/Transmitter，通用异步收发传输器

- Compatible with industry-standard 16450/16550 UARTs
- 64-Byte Transmit and receive data FIFOs
- Supports DMA controller interface
- Supports Software/ Hardware Flow Control
- Supports IrDA 1.0 SIR
- Supports RS-485 mode

## 模块配置

其menuconfig 的配置如下：

```shell
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            UART devices --->
                [*] enable uart driver
                [*] enbale uart hal APIs Test command
```

## 源码结构

```c
.
│  hal_uart.c         # 驱动源码
│  platform-uart.h    # 平台选择头文件
│  uart.h             # 驱动私有头文件
└─platform
        uart-sun20iw2p1.h # 平台特化定义
```

## 模块接口说明

头文件

```c
#include <hal_uart.h>
```

### 返回值枚举

```c
typedef enum
{
    HAL_UART_STATUS_ERROR_PARAMETER = -4,      /**< Invalid user input parameter. */
    HAL_UART_STATUS_ERROR_BUSY = -3,           /**< UART port is currently in use. */
    HAL_UART_STATUS_ERROR_UNINITIALIZED = -2,  /**< UART port has not been initialized. */
    HAL_UART_STATUS_ERROR = -1,                /**< UART driver detected a common error. */
    HAL_UART_STATUS_OK = 0                     /**< UART function executed successfully. */
} hal_uart_status_t;
```

### 波特率枚举

```c
typedef enum
{
    UART_BAUDRATE_300 = 0,
    UART_BAUDRATE_600,
    UART_BAUDRATE_1200,
    UART_BAUDRATE_2400,
    UART_BAUDRATE_4800,
    UART_BAUDRATE_9600,
    UART_BAUDRATE_19200,
    UART_BAUDRATE_38400,
    UART_BAUDRATE_57600,
    UART_BAUDRATE_115200,
    UART_BAUDRATE_230400,
    UART_BAUDRATE_576000,
    UART_BAUDRATE_921600,
    UART_BAUDRATE_1000000,
    UART_BAUDRATE_1500000,
    UART_BAUDRATE_3000000,
    UART_BAUDRATE_4000000,
    UART_BAUDRATE_MAX,
} uart_baudrate_t;
```

### UART 字长枚举

```c
typedef enum
{
    UART_WORD_LENGTH_5 = 0,
    UART_WORD_LENGTH_6,
    UART_WORD_LENGTH_7,
    UART_WORD_LENGTH_8,
} uart_word_length_t;
```

### UART 停止位枚举

```c
typedef enum
{
    UART_STOP_BIT_1 = 0,
    UART_STOP_BIT_2,
} uart_stop_bit_t;
```

### UART 奇偶枚举

```c
typedef enum
{
    UART_PARITY_NONE = 0,
    UART_PARITY_ODD,
    UART_PARITY_EVEN
} uart_parity_t;
```

### UART 配置结构体

```c
typedef struct
{
    uart_baudrate_t baudrate;
    uart_word_length_t word_length;
    uart_stop_bit_t stop_bit;
    uart_parity_t parity;
} _uart_config_t;
```

### 获取UART驱动的版本号

函数原型：

```c
sunxi_hal_version_t hal_uart_get_version(int32_t dev)
```

参数：

- dev：UART端口号

返回：

- UART 驱动版本号

### 初始化UART驱动

函数原型：

```c
int32_t hal_uart_init(int32_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 0：成功
- 负数：失败

### 初始化异构AMP UART控制台

函数原型：

```c
int32_t hal_uart_init_for_amp_cli(int32_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 0：成功
- 负数：失败

### 卸载UART驱动

函数原型：

```c
int32_t hal_uart_deinit(int32_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 0：成功
- 负数：失败

### 发送数据

函数原型：

```c
int32_t hal_uart_send(int32_t dev, const uint8_t *data, uint32_t num);
```

参数：

- dev：UART 端口号
- data：准备发送的数据buffer
- num：buffer 大小

返回：

- 成功发送的字节数

### 发送一个字符

函数原型：

```c
int32_t hal_uart_put_char(int32_t dev, char c);
```

参数：

- dev：UART 端口号
- c：待发送的字符

返回：

- 1：成功

### 接收数据

函数原型：

```c
int32_t hal_uart_receive(int32_t dev, uint8_t *data, uint32_t num);
```

参数：

- dev：UART 端口号
- data：接收数据缓冲区
- num：接收数据的大小

返回：

- size：接收到的数据大小

### 非阻塞接收数据

函数原型：

```c
int32_t hal_uart_receive_no_block(int32_t dev, uint8_t *data, uint32_t num, int32_t timeout);
```

参数：

- dev：UART 端口号
- data：接收数据缓冲区
- num：接收数据的大小
- timeout：超时时间

返回：

- size：接收到的数据大小

### 接收一个字符

函数原型：

```c
uint8_t hal_uart_get_char(int32_t dev);
```

参数：

- dev：UART 端口号

返回：

- 收到的字符值

### 设置 UART 工作参数

函数原型：

```c
int32_t hal_uart_control(int32_t uart_port, int cmd, void *args);
```

参数：

- uart_port：UART 端口号
- cmd：保留
- args: 指向 _uart_config_t 类型的结构体

返回：

- 0：成功
- 负数：失败

### 轮询接收

函数原型：

```c
int32_t hal_uart_receive_polling(int32_t dev, uint8_t *data, uint32_t num);
```

参数：

- dev：UART 端口号
- data：接收数据缓冲区
- num：接收数据的大小

返回：

- size：接收到的数据大小

### 查看轮询接收状态

函数原型：

```c
int32_t hal_uart_check_poll_state(int32_t dev_id, short key);
```

参数：

- dev_id：UART 端口号
- key：标志位，取值 POLLIN，POLLOUT，POLLERR

返回：

- UART 当前的接收状态

### 执行唤醒处理函数

函数原型：

```c
int32_t hal_uart_poll_wakeup(int32_t dev_id, short key);
```

参数：

- dev_id：UART 端口号
- key：标志位，取值 POLLIN，POLLOUT，POLLERR

返回：

- 回调函数执行返回值

### 注册唤醒处理函数

函数原型：

```c
int32_t hal_uart_register_poll_wakeup(poll_wakeup_func poll_wakeup);
```

参数：

- poll_wakeup：回调函数

返回：

- 0

### 设置硬件流控

函数原型：

```c
void hal_uart_set_hardware_flowcontrol(uart_port_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 无

### 禁用硬件流控

函数原型：

```c
void hal_uart_disable_flowcontrol(uart_port_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 无

### 设置 UART 回环

函数原型：

```c
void hal_uart_set_loopback(uart_port_t uart_port, bool enable);
```

参数：

- uart_port：UART 端口号
- enable：是否开启

返回：

- 无

### 使能 RX 中断

函数原型：

```c
int32_t hal_uart_enable_rx(int32_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 0

### 失能 RX 中断

函数原型：

```c
int32_t hal_uart_disable_rx(int32_t uart_port);
```

参数：

- uart_port：UART 端口号

返回：

- 0

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <hal_timer.h>
#include <hal_uart.h>

static void cmd_usage(void)
{
    printf("Usage:\n"
        "\t hal_uart <port> <baudrate>\n");
}

int cmd_test_uart(int argc, char **argv)
{
    uint8_t tbuf[6] = {"hello"};
    uint8_t rbuf[10] = {0};
    uart_port_t port;
    uint32_t baudrate;
    _uart_config_t uart_config;
    int i;

    hal_log_info("Testing UART in loopback mode");

    if (argc != 3) {
        cmd_usage();
        return -1;
    }

    port = strtol(argv[1], NULL, 0);
    baudrate = strtol(argv[2], NULL, 0);

    if(CONFIG_CLI_UART_PORT == port){
        hal_log_info("uart0 can't test, please use other port!");
        return -1;
    }
    memset(rbuf, 0, 10 * sizeof(uint8_t));

    switch (baudrate) {
    case 4800:
        uart_config.baudrate = UART_BAUDRATE_4800;
        break;

    case 9600:
        uart_config.baudrate = UART_BAUDRATE_9600;
        break;

    case 115200:
        uart_config.baudrate = UART_BAUDRATE_115200;
        break;

    case 1500000:
        uart_config.baudrate = UART_BAUDRATE_1500000;
        break;

    case 4000000:
        uart_config.baudrate = UART_BAUDRATE_4000000;
        break;
    default:
        hal_log_info("Using default baudrate: 115200");
        uart_config.baudrate = UART_BAUDRATE_115200;
        break;
    }

    uart_config.word_length = UART_WORD_LENGTH_8;
    uart_config.stop_bit = UART_STOP_BIT_1;
    uart_config.parity = UART_PARITY_NONE;

    hal_uart_init(port);
    hal_uart_control(port, 0, &uart_config);
    hal_uart_disable_flowcontrol(port);
    hal_uart_set_loopback(port, 1);

    /* send */
    hal_uart_send(port, tbuf, 5);

    /* loopback receive */
    hal_uart_receive_no_block(port, rbuf, 5, MS_TO_OSTICK(1000));

    printf("Sending:");
    for (i = 0; i < 5; i++)
        printf("%c", tbuf[i]);
    printf("\n");

    printf("Receiving:");
    for (i = 0; i < 5; i++)
        printf("%c", rbuf[i]);
    printf("\n");

    /* verify data */
    for (i = 0; i < 5; i++) {
        if (tbuf[i] != rbuf[i])
            break;
    }
    if (i == 5) {
        hal_log_info("Test hal_uart_init API success!");
        hal_log_info("Test hal_uart_control API success!");
        hal_log_info("Test hal_uart_disable_flowcontrol API success!");
        hal_log_info("Test hal_uart_set_loopback API success!");
        hal_log_info("Test hal_uart_send API success!");
        hal_log_info("Test hal_uart_receive API success!");
        hal_log_info("Test hal_uart_deinit API success!");
        hal_log_info("Test uart hal APIs success!");
    } else {
        hal_log_info("Test uart hal APIs failed!");
    }

    hal_msleep(1000);
    hal_uart_deinit(port);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_uart, hal_uart, uart hal APIs tests)

#define BUFFSIZE 4096

static void cmd_stress_usage(void)
{
    printf("Usage:\n"
        "\t hal_uart <port> <baudrate> <flowctrl> <loopback> <len>\n");
}

int cmd_test_uart_stress(int argc, char **argv)
{
    uint8_t *tbuf = malloc(BUFFSIZE);
    uint8_t *rbuf = malloc(BUFFSIZE);
    uart_port_t port;
    uint32_t baudrate;
    _uart_config_t uart_config;
    int i;
    int flowctrl, loopback, testlen;

    hal_log_info("Testing UART in loopback mode with stress");

    if (argc != 6) {
        cmd_stress_usage();
        free(tbuf);
        free(rbuf);
        return -1;
    }

    port = strtol(argv[1], NULL, 0);
    baudrate = strtol(argv[2], NULL, 0);
    flowctrl = strtol(argv[3], NULL, 0);
    loopback = strtol(argv[4], NULL, 0);
    testlen = strtol(argv[5], NULL, 0);

    for (i = 0; i < BUFFSIZE; i++) {
        tbuf[i] = ('a' + i) & 0xff;
    }
    memset(rbuf, 0, BUFFSIZE * sizeof(uint8_t));

    switch (baudrate) {
    case 4800:
        uart_config.baudrate = UART_BAUDRATE_4800;
        break;

    case 9600:
        uart_config.baudrate = UART_BAUDRATE_9600;
        break;

    case 115200:
        uart_config.baudrate = UART_BAUDRATE_115200;
        break;

    case 1500000:
        uart_config.baudrate = UART_BAUDRATE_1500000;
        break;

    default:
        hal_log_info("Using default baudrate: 115200");
        uart_config.baudrate = UART_BAUDRATE_115200;
        break;
    }

    uart_config.word_length = UART_WORD_LENGTH_8;
    uart_config.stop_bit = UART_STOP_BIT_1;
    uart_config.parity = UART_PARITY_NONE;

    hal_uart_init(port);
    hal_uart_control(port, 0, &uart_config);
    printf("flow:%d, loopback:%d len:%d\n", flowctrl, loopback, testlen);
    if (flowctrl)
        hal_uart_set_hardware_flowcontrol(port);
    else
        hal_uart_disable_flowcontrol(port);

    if (loopback)
        hal_uart_set_loopback(port, 1);
    else
        hal_uart_set_loopback(port, 0);

    /* send */
    printf("send\n");
    hal_uart_send(port, tbuf, testlen);
    printf("send done\n");

    printf("recv\n");
    /* loopback receive */
    hal_uart_receive(port, rbuf, testlen);
    printf("recv done\n");

#if 0
    printf("Sending:");
    for (i = 0; i < testlen; i++) {
        if (i % 16 == 0)
            printf("\n");
        printf("0x%x ", tbuf[i]);
    }
    printf("\n");

    printf("Receiving:");
    for (i = 0; i < testlen; i++) {
        if (i % 16 == 0)
            printf("\n");
        printf("0x%x ", rbuf[i]);
    }
    printf("\n");
#endif

    /* verify data */
    for (i = 0; i < testlen; i++) {
        if (tbuf[i] != rbuf[i]) {
            printf("check %d fail, 0x%x != 0x%x\n", i, tbuf[i], rbuf[i]);
            break;
        }
    }
    if (i == testlen) {
        hal_log_info("Test hal_uart_init API success!");
        hal_log_info("Test hal_uart_control API success!");
        hal_log_info("Test hal_uart_disable_flowcontrol API success!");
        hal_log_info("Test hal_uart_set_loopback API success!");
        hal_log_info("Test hal_uart_send API success!");
        hal_log_info("Test hal_uart_receive API success!");
        hal_log_info("Test hal_uart_deinit API success!");
        hal_log_info("Test uart hal APIs success!");
    } else {
        hal_log_info("Test uart hal APIs failed!");
    }

    hal_msleep(1000);
    hal_uart_deinit(port);
    free(tbuf);
    free(rbuf);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_uart_stress, hal_uart_stress, uart hal APIs tests)
```

# LPUART

## 模块介绍

LPUART 驱动主要实现设备驱动的底层细节，并为上层提供一套标准的 API 接口以供使用。

## 模块配置

配置路径如下:

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            LPUART Devices --->
                [*] enable lpuart driver
```

## 源码结构

LPUART 模块源码结构如下所示：

```c
hal/source/lpuart/             ---- 驱动源码
├── hal_lpuart.c
├── Kconfig
├── Makefile
├── platform
│   ├── lpuart-sun20iw2p1.h    ---- 平台地址，引脚复用等配置
│   └── ...
├── platform-lpuart.h
└── lpuart.h
include/hal/                   ---- 驱动APIs声明头文件
└── hal_lpuart.h
```

## 模块接口说明

需要包含头文件

```c
#include <hal_lpuart.h>
```

### 初始化 LPUART 驱动

函数原型：

```c
int32_t hal_lpuart_init(int32_t lpuart_port)
```

参数：

- lpuart_port：LPUART 端口号

返回值：

- SUNXI_HAL_OK: 成功
- HAL_LPUART_STATUS_ERROR: 失败

### 卸载 LPUART 驱动

函数原型：

```c
int32_t hal_lpuart_deinit(int32_t lpuart_port)
```

参数：

- lpuart_port：LPUART 端口号

返回值：

- SUNXI_HAL_OK: 成功

### 设置波特率及参数

函数原型：

```c
int32_t hal_lpuart_control(lpuart_port_t lpuart_port, int cmd, void *args)
```

参数：

- lpuart_port_t：LPUART 端口号
- cmd：预留，暂未使用
- args：指向 _lpuart_config_t 类型变量的数组

返回值：

- SUNXI_HAL_OK: 成功
- HAL_LPUART_STATUS_ERROR: 失败

### 接收处理

函数原型：

```c
int32_t hal_lpuart_receive(int32_t dev, uint8_t *data, uint32_t num)
```

参数：

- dev：LPUART 端口号
- data: 接收数据缓冲区
- num: 接收数据长度

返回值：

- size: 成功接收的字节数

### 接收对比处理

函数原型：

```c
int32_t hal_lpuart_rx_cmp(lpuart_port_t lpuart_port, uint8_t cmp_len, uint8_t *cmp_data);
```

参数：

- lpuart_port：LPUART 端口号
- cmp_len：比较数据的长度
- cmp_data：比较的数据

返回值：

- SUNXI_HAL_OK: 成功
- HAL_LPUART_STATUS_ERROR: 失败

### 启用接收对比处理回调

函数原型：

```c
int32_t hal_lpuart_enable_rx_cmp(lpuart_port_t lpuart_port, lpuart_callback_t cb, void *arg);
```

参数：

- lpuart_port：LPUART 端口号
- cb：处理回调函数
- arg：回调函数的参数

返回值：

- SUNXI_HAL_OK: 成功
- HAL_LPUART_STATUS_ERROR: 失败

### 禁用接收对比处理回调

函数原型：

```c
int32_t hal_lpuart_disable_rx_cmp(lpuart_port_t lpuart_port);
```

参数：

- lpuart_port：LPUART 端口号

返回值：

- SUNXI_HAL_OK: 成功
- HAL_LPUART_STATUS_ERROR: 失败

### 配置PM绕过模式

函数原型：

```c
int32_t HAL_LPUART_SetBypassPmMode(lpuart_port_t lpuart_port, uint8_t mode);
```

参数：

- lpuart_port：LPUART 端口号
- mode：配置模式

返回值：

- SUNXI_HAL_OK: 成功
- HAL_LPUART_STATUS_ERROR: 失败

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <hal_log.h>
#include <hal_cmd.h>
#include <hal_timer.h>
#include <hal_lpuart.h>
#include <hal_uart.h>

/* find a free uart_port or pc com as source */
#define UART_TEST UART_1
#define TEST_LEN 5

static void cmd_usage(void)
{
    printf("Usage:\n"
        "\t hal_lpuart <port> <baudrate>\n");
}

void test_recv_data(lpuart_port_t port)
{
    printf("enter recv data test\n");
    hal_lpuart_enable_rx_data(port, NULL, NULL);
    /* use uart as source */
    hal_uart_init(UART_TEST);
    hal_uart_send(UART_TEST, "a", 1);
    /* use pc com as source */
    printf("enter\n");
    hal_sleep(5);
    hal_lpuart_disable_rx_data(port);
}

static void compare_callback(void *arg)
{
    printf("data compare success!\n");
}

void test_cmp_data(lpuart_port_t port)
{
    printf("enter cmp data test\n");
    char cmp[TEST_LEN + 1] = "abcde";

    if (hal_lpuart_init(port)) {
        printf("lpuart %d not inited\n", port);
        return;
    }

    hal_lpuart_rx_cmp(port, TEST_LEN, cmp);
    hal_lpuart_enable_rx_cmp(port, compare_callback, NULL);
    /* use uart as source, stop bit of uart should be 2 */
    hal_uart_init(UART_TEST);
    hal_uart_send(UART_TEST, cmp, TEST_LEN);
    /* use pc com as source */
    printf("enter abcde\n");
    hal_sleep(5);
    hal_lpuart_disable_rx_cmp(port);
}

void lpuart_reset_multiplex()
{
    lpuart_multiplex(LPUART_0, UART_0);
    lpuart_multiplex(LPUART_1, UART_1);
}

int cmd_test_lpuart(int argc, char **argv)
{
    if (argc != 3) {
        cmd_usage();
        return -1;
    }

    lpuart_port_t port;
    uint32_t baudrate;

    port = strtol(argv[1], NULL, 0);
    baudrate = strtol(argv[2], NULL, 0);

    if (hal_lpuart_init(port) != SUNXI_HAL_OK) {
        printf("Fail to init lpuart\n");
        return -1;
    }

    if (port == 0) {
        lpuart_multiplex(LPUART_0, UART_TEST);
    } else if (port == 1) {
        lpuart_multiplex(LPUART_1, UART_TEST);
    }
    test_recv_data(port);
    test_cmp_data(port);

    lpuart_reset_multiplex();

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_lpuart, hal_lpuart, lpuart hal APIs tests)
```

# TWI

## 模块介绍

![image23](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image23.jpg)

TWI 控制器的框图如上所示，该控制器支持的标准通信速率为 100Kbps，最高通信速率可以达到 400Kbps。其中 CPUX 域的 TWI 控制器时钟源来自于 APB2，CPUS 域的 S‑TWI 时钟源来自于APBS。

TWI 传输数据的方式包括包传输和 DMA 运输。

## 模块配置

模块配置在 `menuconfig` 位于如下位置

```c
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            TWI devices --->
                [*] enable twi driver
```

TWI 模块寄存器的基本配置位于 `common_twi.h` 文件里面，包括每个 TWI 的寄存器地址和中断号，部分配置如下：

```c
/* TWI Register Offset */
#define TWI_ADDR_REG        (0x00)  /*  31:8bit reserved,7-1bit for slave addr,0 bit for GCE */
#define TWI_XADDR_REG       (0x04)  /*  31:8bit reserved,7-0bit for second addr in 10bit addr */
#define TWI_DATA_REG        (0x08)  /*  31:8bit reserved, 7-0bit send or receive data byte */
#define TWI_CTL_REG         (0x0C)  /*  INT_EN,BUS_EN,M_STA,INT_FLAG,A_ACK */
#define TWI_STAT_REG        (0x10)  /*  28 interrupt types + 0xF8 normal type = 29  */
#define TWI_CLK_REG         (0x14)  /*  31:7bit reserved,6-3bit,CLK_M,2-0bit CLK_N */
#define TWI_SRST_REG        (0x18)  /*  31:1bit reserved;0bit,write 1 to clear 0. */
#define TWI_EFR_REG         (0x1C)  /*  31:2bit reserved,1:0 bit data byte follow read command */
#define TWI_LCR_REG         (0x20)  /*  31:6bits reserved  5:0bit for sda&scl control*/
#define TWI_DVFS_REG        (0x24)  /*  31:3bits reserved  2:0bit for dvfs control. only A10 support. */
#define TWI_DRIVER_CTRL     (0x200)
...
```

TWI 模块对于不同平台的区分位于 `platform\twi_sun20iw3.h` 中。包括基地址以及平台相关参数

```c
/** the irq of each TWI **/
#ifdef CONFIG_ARCH_SUN20IW3
#define SUNXI_GIC_START 16
#else
#define SUNXI_GIC_START 0
#endif

/** the base address of TWI*/
#define SUNXI_TWI0_PBASE 0x02502000
#define SUNXI_IRQ_TWI0 (41 - SUNXI_GIC_START)
#define TWI0_SCK GPIOA(16)
#define TWI0_SDA GPIOA(17)
#define TWI0_PIN_MUXSEL 4

#define SUNXI_TWI1_PBASE 0x02502400
#define SUNXI_IRQ_TWI1 (42 - SUNXI_GIC_START)
#define TWI1_SCK GPIOA(6)
#define TWI1_SDA GPIOA(7)
#define TWI1_PIN_MUXSEL 4
...
```

## 源码结构

```c
rtos‑hal/
|‑‑hal/source/twi/hal_twi.c    /* hal层接口代码 */
|‑‑include/hal/sunxi_hal_twi.h    /* 头文件 */
```

## 模块接口说明

头文件：

```
#include <sunxi_hal_twi.h>
```

### TWI 端口号 twi_port_t

该数据结构主要用来表明 TWI 的编号，用户可以用来调用 TWI 的控制器。具体定义如下：

```
typedef enum
{
    TWI_MASTER_0,           /**< TWI master 0. */
    TWI_MASTER_1,           /**< TWI master 1. */
    TWI_MASTER_2,           /**< TWI master 0. */
    TWI_MASTER_3,           /**< TWI master 1. */
    TWI_MASTER_4,           /**< TWI master 4. */
    TWI_MASTER_5,           /**< TWI master 5. */
    S_TWI_MASTER_0,           /**< S_TWI master 0. */
    S_TWI_MASTER_1,           /**< S_TWI master 1. */
    S_TWI_MASTER_2,           /**< S_TWI master 2. */
    TWI_MASTER_MAX              /**< max TWI master number, \<invalid\> */
} twi_port_t;
```

### TWI 消息结构体 twi_msg_t

该数据结构是 TWI 通信时的消息结构，定义每个通信数据的格式：

```c
typedef struct twi_msg
{
    uint16_t addr;          /* slave address */
    uint16_t flags;
/* read data, from slave to master
 * TWI_M_RD is guaranteed to be 0x0001!
 */
#define TWI_M_RD        0x0001  
#define TWI_M_TEN       0x0010  /* this is a ten bit chip address */
    uint16_t len;           /* msg length */
    uint8_t *buf;       /* pointer to msg data */
} twi_msg_t;
```

### TWI 控制结构体 hal_twi_transfer_cmd_t

该数据接口储存了一些用户在调用 twi_control 的时候可以用到的一些参数，具体如下：

```c
typedef enum
{
    I2C_SLAVE = 0,  /* 设置从机地址 */
    I2C_SLAVE_FORCE = 1, /* 强制设置从机地址 */
    I2C_TENBIT = 2,  /* 支持10位地址 */
    I2C_RDWR = 3 /* 读写支持 */
} hal_twi_transfer_cmd_t;
```

### TWI 频率结构体 twi_frequency_t

```c
typedef enum
{
    TWI_FREQUENCY_100K = 100000,          /**<  100kbps. */
    TWI_FREQUENCY_200K = 200000,          /**<  200kbps. */
    TWI_FREQUENCY_400K = 400000,          /**<  400kbps. */
} twi_frequency_t;
```

### TWi 返回值结构体

```
typedef enum
{
    TWI_STATUS_ERROR = -4,                        /**<  An error occurred and the transaction has failed. */
    TWI_STATUS_ERROR_BUSY = -3,                   /**<  The TWI bus is busy, an error occurred. */
    TWI_STATUS_INVALID_PORT_NUMBER = -2,          /**<  A wrong port number is given. */
    TWI_STATUS_INVALID_PARAMETER = -1,            /**<  A wrong parameter is given. */
    TWI_STATUS_OK = 0                             /**<  No error occurred during the function call. */
} twi_status_t;
```

### TWI 初始化接口

TWI 模块初始化，主要初始化时钟，中断以及引脚配置等

函数原型：

```c
twi_status_t hal_twi_init(twi_port_t port)
```

参数：

- port：TWI 端口号

返回值：

- 0 代表成功
- 负数代表失败

### TWI 控制接口

更改 TWI 的一些配置，包括从设备地址以及读写数据等

函数原型：

```c
twi_status_t hal_twi_control(twi_port_t port, hal_twi_transfer_cmd_t cmd, void *args)
```

参数：

- port：端口号
- cmd：控制参数
- args：传入的配置数据

返回值：

- 0 代表成功
- 负数代表失败

### TWI 数据发送接口

函数原型：

```c
twi_status_t hal_twi_write(twi_port_t port, unsigned long pos, const void *buf, uint32_t size)
```

参数：

- port：通道号
- pos：偏移量（目前支持 1 个字节大小）
- buf：待发送数据
- size：发送数据大小，不包括偏移量

返回值：

- 0 代表成功
- 负数代表失败

### TWI 数据接收接口

函数原型：

```c
twi_status_t hal_twi_read(twi_port_t port, unsigned long pos, void *buf, uint32_t size)
```

参数：

- port：通道号
- pos：偏移量（目前支持 1 个字节大小）
- buf：接收的数据
- size：接收数据大小，不包括偏移量

返回值：

- 0 代表成功
- 负数代表失败

### TWI 去初始化接口

函数原型：

```c
twi_status_t hal_twi_deinit(twi_port_t port)
```

参数：

- port：TWI 端口号

返回值：

- 0 代表成功
- 负数代表失败

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <sunxi_hal_twi.h>

#define TEST_READ 0
#define TEST_WRITE 1

static int cmd_test_twi(int argc, const char **argv)
{
    twi_msg_t msg;
    twi_port_t port;
    uint16_t addr;
    char reg_addr, reg_val = 0, rw = TEST_READ;
    int c;

    if (argc < 5)
    {
        hal_log_info("Usage:");
        hal_log_info("\ttwi [port] [slave_addr] [reg] -r");
        hal_log_info("\t                              -w [val]");
        return -1;
    }

    hal_log_info("Run twi test");

    port = strtol(argv[1], NULL, 0);
    addr = strtol(argv[2], NULL, 0);
    reg_addr = strtol(argv[3], NULL, 0);
    if (argv[5])
    {
        reg_val = strtol(argv[5], NULL, 0);
    }

    while ((c = getopt(argc, (char *const *)argv, "rw")) != -1)
    {
        switch (c)
        {
            case 'r':
                hal_log_info("twi read test");
                rw = TEST_READ;
                break;
            case 'w':
                hal_log_info("twi write test");
                rw = TEST_WRITE;
                reg_val = strtol(argv[5], NULL, 0);
                break;
    default:
                hal_log_err("invalid param!");
        }
    }

    hal_twi_init(port);
    hal_twi_control(port, I2C_SLAVE, &addr);

    if (rw == TEST_READ)
    {
        hal_twi_read(port, reg_addr, &reg_val, 1);
        hal_log_info("reg_val: 0x%x", reg_val);
    }
    else if (rw == TEST_WRITE)
    {
        /*
         * hal_twi_write bug workaround
         */
        uint8_t buf[2];

        buf[0] = reg_addr;
        buf[1] = reg_val;
        msg.flags = 0;
        msg.addr =  addr;
        msg.len = 2;
        msg.buf = buf;

        hal_twi_control(port, I2C_RDWR, &msg);
    }

    hal_log_info("Twi test finish");

    //hal_twi_uninit(port);

    hal_log_info("Twi test1 finish");
    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_twi, hal_twi, twi hal APIs tests)
```

# TRNG

TRNG是真随机数发生器，随机源是8 路独立的环形振荡器，由模拟器件电源噪声产生频率抖动，用低频始终重采样，然后进行弹性抽取和熵提取处理，最终输出128bit真随机数。

## 模块配置

其 menuconfig 的配置如下：

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            TRNG devices --->
                [*] enable trng driver
                [*] enbale trng hal APIs Test command
```

## 源码结构

```
drv_trng.c
drv_trng.h
hal_trng.c
```

## 模块接口说明

头文件

```c
#include <sunxi_hal_trng.h>
```

### 返回值枚举

```c
typedef enum
{
    HAL_TRNG_STATUS_OK      = 0,    /* success */
    HAL_TRNG_STATUS_ERROR   = -1,   /* general error */
    HAL_TRNG_STATUS_BUSY    = -2,   /* device or resource busy */
    HAL_TRNG_STATUS_TIMEOUT = -3,   /* wait timeout */
    HAL_TRNG_STATUS_INVALID = -4    /* invalid argument */
} HAL_TRNG_Status;
```

### 获取随机数

函数原型

```c
HAL_TRNG_Status HAL_TRNG_Extract(uint8_t type, uint32_t random[4]);
```

参数：

- type：随机数生成熵提取模式（0：crc，1：xor）
- random：存放生成的随机数

返回值：

- 0：成功
- 负数：失败

## 模块使用范例

```c
#include <stdio.h>
#include <string.h>
#include <hal_log.h>
#include <hal_cmd.h>
#include <sunxi_hal_trng.h>

static int cmd_test_trng(int argc, const char **argv)
{
    int ret = 0;
    uint32_t random[4] = {0};

    if (argc != 2) {
        printf("Parameter number Error!\n");
        printf("Usage: hal_trng <crc|xor>\n");
        return -1;
    }

    if (strcmp(argv[1], "crc") == 0)
        ret = HAL_TRNG_Extract(0, random);
    else if (strcmp(argv[1], "xor") == 0)
        ret = HAL_TRNG_Extract(1, random);
    else {
        printf("Parameter Error!\n");
        printf("Usage: hal_trng <crc|xor>\n");
        ret = -1;
        return ret;
    }

    if (ret) {
        printf("trng extract failed: %d\n", ret);
        return ret;
    }

    printf("trng result: 0x%08x 0x%08x 0x%08x 0x%08x\n", random[0], random[1], random[2], random[3]);

    return ret;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_trng, hal_trng, trng hal APIs tests)
```

# Mbus

MSI（Memory System Interconnet）是SoC系统中统筹所有模块访问dram的总线互联器。MSI支持AXI、MBUS、MBUS和MSB接口，各种接口的数量单独可配，为各个模块提供高效的存储交互。MSI具有以下特点

- 优先级控制
- 带宽监控
- 数据加扰
- 安全控制功能

其中的Mbus模块提供给用户使用的包括总线使能和获取带宽接口。

## 模块配置

配置路径如下:

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            MBUS Devices --->
                [*] enable mbus driver
```

## 源码结构

```c
rtos-hal/
|-- hal/source/mbus/hal_mbus.c   // hal层接口代码
|-- include/hal/sunxi_hal_mbus.h // 头文件
```

## 模块接口介绍

### Mbus 获取带宽枚举

```c
/* MBUS PMU ids */
enum mbus_pmu {
    MBUS_PMU_CPU    = 0,    /* CPU bandwidth */
    MBUS_PMU_GPU,           /* GPU bandwidth */
    MBUS_PMU_VE,            /* VE */
    MBUS_PMU_DISP,          /* DISPLAY */
    MBUS_PMU_OTH,           /* other masters */
    MBUS_PMU_TOTAL,         /* total masters */
    MBUS_PMU_RV_SYS,        /* RV_SYS */
    MBUS_PMU_CE,            /* CE */
    MBUS_PMU_DE,            /* DE */
    MBUS_PMU_G2D,           /* G2D */
    MBUS_PMU_TVD,           /* TVD */
    MBUS_PMU_CSI,           /* CSI */
    MBUS_PMU_DSP_SYS,       /* DSP_SYS */
    MBUS_PMU_DI,            /* DI */
    MBUS_PMU_IOMMU,         /* IOMMU */
    MBUS_PMU_DMA0,          /* DMA0 */
    MBUS_PMU_DMA1,          /* DMA1 */
    MBUS_PMU_MAHB,          /* MAHB */
};
```

### 返回值枚举

```c
typedef enum{
    HAL_MBUS_STATUS_ERROR_PARAMETER = -3,
    HAL_MBUS_STATUS_ERROR_CHANNEL = -2,
    HAL_MBUS_STATUS_ERROR = -1,
    HAL_MBUS_STATUS_OK = 0
}hal_mbus_status_t;
```

### Mbus 总线使能接口

使能Mbus总线

函数原型：

```c
hal_mbus_status_t hal_mbus_pmu_enable(void);
```

参数：

- 无

返回值：

- 参考hal_mbus_status_t枚举

### 获取带宽接口

获取不同模块在总线上的带宽

函数原型：

```c
hal_mbus_status_t hal_mbus_pmu_get_value(enum mbus_pmu type, unsigned int *value);
```

参数：

- type：模块类型
- value，保存获取的带宽数据

返回值：

- 参考hal_mbus_status_t枚举

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#include <hal_cmd.h>
#include <sunxi_hal_mbus.h>

int cmd_mbus(int argc, char **argv)
{
    int cnt = 1;
    int ms_delay = 0;
    int windows_us;
    uint32_t cpu_value = 0, gpu_value = 0, ve_value = 0, disp_value = 0;
    uint32_t total_value = 0, di_value = 0, oth_value = 0, csi_value = 0;
    uint32_t tvd_value = 0, g2d_value = 0, iommu_value = 0, rv_value = 0;
    uint32_t dsp_value = 0, dma0_value = 0, dma1_value = 0, de_value = 0;
    uint32_t ce_value = 0, mahb_value = 0,rv_sys_value = 0;

    printf("============MBUS TEST===============\n");
    hal_mbus_pmu_enable();

    if (argc >= 2)
        cnt = atoi(argv[1]);

    if (argc >= 3)
        ms_delay = atoi(argv[2]);

    printf("the bus bandwidth occupancy status is :\n");
    while (cnt--) {
        hal_mbus_pmu_get_value(MBUS_PMU_CPU, &cpu_value);
        hal_mbus_pmu_get_value(MBUS_PMU_GPU, &gpu_value);
        hal_mbus_pmu_get_value(MBUS_PMU_RV_SYS, &rv_sys_value);
        hal_mbus_pmu_get_value(MBUS_PMU_VE, &ve_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DISP, &disp_value);
        hal_mbus_pmu_get_value(MBUS_PMU_OTH, &oth_value);
        hal_mbus_pmu_get_value(MBUS_PMU_CE, &ce_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DI, &di_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DE, &de_value);
        hal_mbus_pmu_get_value(MBUS_PMU_CSI, &csi_value);
        hal_mbus_pmu_get_value(MBUS_PMU_TVD, &tvd_value);
        hal_mbus_pmu_get_value(MBUS_PMU_G2D, &g2d_value);
        hal_mbus_pmu_get_value(MBUS_PMU_IOMMU, &iommu_value);
        hal_mbus_pmu_get_value(MBUS_PMU_RV_SYS, &rv_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DSP_SYS, &dsp_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DMA0, &dma0_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DMA1, &dma1_value);
        hal_mbus_pmu_get_value(MBUS_PMU_MAHB, &mahb_value);
        hal_mbus_pmu_get_value(MBUS_PMU_TOTAL, &total_value); //mbus calculate bw every window time, total is the max one
        hal_mbus_pmu_get_window(&windows_us);
        printf("window(us) maxbw(k) cpu      gpu      ve       disp     di       csi      tvd      g2d      iommu    rv       dsp      dma0     dma1     cd       de       mahb     others  rv_sys\n");
        printf("%-10d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d\n",\
                windows_us , total_value, cpu_value, gpu_value, ve_value, disp_value,\
                di_value, csi_value, tvd_value, g2d_value, iommu_value,\
                rv_value, dsp_value, dma0_value, dma1_value, ce_value,\
                de_value, mahb_value, oth_value,rv_sys_value);

        if (cnt && ms_delay)
            mdelay(ms_delay);
    }

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_mbus, mbus_test, Mbus hal APIs tests);

int cmd_mbus_enable(int argc, char **argv)
{
    hal_mbus_pmu_enable();

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_mbus_enable, mbus_enable, Mbus hal enable APIs tests);

int cmd_mbus_value(int argc, char **argv)
{

    int cnt = 1;
    int ms_delay = 0;
    int windows_us;
    uint32_t cpu_value = 0, gpu_value = 0, ve_value = 0, disp_value = 0;
    uint32_t total_value = 0, di_value = 0, oth_value = 0, csi_value = 0;
    uint32_t tvd_value = 0, g2d_value = 0, iommu_value = 0, rv_value = 0;
    uint32_t dsp_value = 0, dma0_value = 0, dma1_value = 0, de_value = 0;
    uint32_t ce_value = 0, mahb_value = 0,rv_sys_value = 0;

    if (argc >= 2)
        cnt = atoi(argv[1]);

    if (argc >= 3)
        ms_delay = atoi(argv[2]);

    printf("the bus bandwidth occupancy status is :\n");
    while (cnt--) {
        hal_mbus_pmu_get_value(MBUS_PMU_CPU, &cpu_value);
        hal_mbus_pmu_get_value(MBUS_PMU_GPU, &gpu_value);
        hal_mbus_pmu_get_value(MBUS_PMU_VE, &ve_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DISP, &disp_value);
        hal_mbus_pmu_get_value(MBUS_PMU_OTH, &oth_value);
        hal_mbus_pmu_get_value(MBUS_PMU_CE, &ce_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DI, &di_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DE, &de_value);
        hal_mbus_pmu_get_value(MBUS_PMU_CSI, &csi_value);
        hal_mbus_pmu_get_value(MBUS_PMU_TVD, &tvd_value);
        hal_mbus_pmu_get_value(MBUS_PMU_G2D, &g2d_value);
        hal_mbus_pmu_get_value(MBUS_PMU_IOMMU, &iommu_value);
        hal_mbus_pmu_get_value(MBUS_PMU_RV_SYS, &rv_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DSP_SYS, &dsp_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DMA0, &dma0_value);
        hal_mbus_pmu_get_value(MBUS_PMU_DMA1, &dma1_value);
        hal_mbus_pmu_get_value(MBUS_PMU_MAHB, &mahb_value);
        hal_mbus_pmu_get_value(MBUS_PMU_TOTAL, &total_value); //mbus calculate bw every window time, total is the max one
        hal_mbus_pmu_get_window(&windows_us);
        printf("window(us) maxbw(k) cpu      gpu      ve       disp     di       csi      tvd      g2d      iommu    rv       dsp      dma0     dma1     cd       de       mahb     others \n");
        printf("%-10d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d %-8d   0x%08x  %-8d %-8d %-8d %-8d %-8d %-8d %-8d \n",\
                windows_us , total_value, cpu_value, gpu_value, ve_value, disp_value,\
                di_value, csi_value, tvd_value, g2d_value, iommu_value,\
                rv_value, dsp_value, dma0_value, dma1_value, ce_value,\
                de_value, mahb_value, oth_value);

        if (cnt && ms_delay)
            mdelay(ms_delay);
    }

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_mbus_value, mbus_test_value, Mbus hal value APIs tests);
```

# MMC

## MMC 特性

- Compatible with Secure Digital Memory (SD mem-version 2.0)
- Compatible with Secure Digital I/O (SDIO-version 3.0)
- Compatible with embedded MultiMediaCard (eMMC-version 5.0)
- Supports Card insertion and removal interrupt
- Supports hardware CRC generation and error detection
- Supports programmable baud rate
- Supports SDIO interrupts in 1-bit and 4-bit modes
- Supports block size of 1 to 65535 bytes
- Supports descriptor-based internal DMA controller
- Internal 1024-Bytes RX FIFO and 1024-Bytes TX FIFO
- Supports 1-bit, 4-bit SD and SDIO data bus width
- Supports 1-bit, 4-bit eMMC data bus width

## 模块介绍

RTOS 提供了MMC 子系统来实现对各种SD/SDIO 设备访问，MMC 子系统由上到下可以分为三层，MMC/SD card 层，MMC/SD core 层以及MMC/SD host 层，它们之间的层次关系如下所示。

MMC/SD card 层负主要是按照RTOS 块设备驱动程序的框架实现一个卡的块设备驱动。负责块设备请求的处理，以及请求队列的管理。MMC/SD core 层负责通信协议的处理，包括SD/SDIO，为上一层提供具体读写接口，同时为下一层提供host 端接口。MMC/SD host 是实现对SD/MMC 控制器相关的操作，直接操作硬件，也是主要实现部分。

![image24](http://photos.100ask.net/aw-r128-docs/rtos/developer-guide/part2/chapter1/image24.jpg)

## 模块配置

其 menuconfig 的配置如下：

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            SDMMC devices --->
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
```

## 源码结构

MMC 模块源码结构如下所示：

```c
.
├── cmd
│   ├── cmd_sd.c
│   └── Kconfig
├── core.c
├── _core.h
├── hal
│   └── hal_ccm.c
├── hal_sdhost.c
├── hal_sdpin.c
├── Kconfig
├── Makefile
├── mmc.c
├── _mmc.h
├── osal
│   ├── Makefile
│   └── os
│       ├── FreeRTOS
│       │   ├── Makefile
│       │   ├── os_debug.c
│       │   ├── os_debug.h
│       │   ├── os_mutex.c
│       │   ├── os_queue.c
│       │   ├── os_semaphore.c
│       │   ├── os_thread.c
│       │   ├── os_timer.c
│       │   └── os_util.h
│       ├── Kconfig
│       └── Makefile
├── platform
│   └── mmc_sun20iw2p1.h
├── platform_mmc.h
├── quirks.c
├── sd.c
├── _sd_define.h
├── _sd.h
├── _sdhost.h
├── sdio.c
├── _sdio.h
├── sdio_irq.c
└── test.c
```

## 模块接口说明

### SDMMC 接口

```c
/**
 * @brief read SD card.
 * @param card:
 *        @arg card->card handler.
 * @param buf:
 *        @arg buf->for store readed data.
 * @param sblk:
 *        @arg sblk->start block num.
 * @param nblk:
 *        @arg nblk->number of blocks.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_block_read(struct mmc_card *card, uint8_t *buf, uint64_t sblk, uint32_t nblk);

/**
 * @brief write SD card.
 * @param card:
 *        @arg card->card handler.
 * @param buf:
 *        @arg buf->data will be write.
 * @param sblk:
 *        @arg sblk->start block num.
 * @param nblk:
 *        @arg nblk->number of blocks.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_block_write(struct mmc_card *card, const uint8_t *buf, uint64_t sblk, uint32_t nblk);

/**
 * @brief scan or rescan SD card.
 * @param card:
 *        @arg card->card handler.
 * @param sdc_id:
 *        @arg sdc_id->SDC ID which card on.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_rescan(struct mmc_card *card, uint32_t sdc_id);

/**
 * @brief deinit SD card.
 * @param card:
 *        @arg card->card handler.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_card_deinit(struct mmc_card *card);

/**
 * @brief malloc for card_info.
 * @param card_id:
 *        @arg card ID.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_card_create(uint8_t card_id, SDCard_InitTypeDef *param);

/**
 * @brief free for card_info.
 * @param card_id:
 *        @arg card ID.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_card_delete(uint8_t card_id);

/**
 * @brief get pointer of mmc_card.
 * @param card_id:
 *        @arg card ID.
 * @retval  pointer of mmc_card if success or NULL if failed.
 */
extern struct mmc_card* mmc_card_open(uint8_t card_id);

/**
 * @brief close mmc_card.
 * @param card_id:
 *        @arg card ID.
 * @retval  0 if success or other if failed.
 */
extern int32_t mmc_card_close(uint8_t card_id);
extern struct mmc_card_info* mmc_card_save(uint8_t card_id);
extern int32_t mmc_card_restore(struct mmc_card_info *s_card_info);
```

### SDIO 接口

```c
typedef struct mmc_card sdio_t;

/**
 *  sdio_readb - read a single byte from a SDIO function
 *  @card: SDIO to access
 *  @addr: address to read
 *  @err_ret: optional status value from transfer
 *
 *  Reads a single byte from the address space of a given SDIO
 *  function. If there is a problem reading the address, 0xff
 *  is returned and @err_ret will contain the error code.
 */
extern uint8_t
sdio_readb(struct mmc_card *card, uint32_t func_num, uint32_t addr,
           int32_t *err_ret);

/**
 *  sdio_writeb - write a single byte to a SDIO function
 *  @card: SDIO to access
 *  @b: byte to write
 *  @addr: address to write to
 *  @err_ret: optional status value from transfer
 *
 *  Writes a single byte to the address space of a given SDIO
 *  function. @err_ret will contain the status of the actual
 *  transfer.
 */
extern void
sdio_writeb(struct mmc_card *card, uint32_t func_num, const uint8_t b,
            uint32_t addr, int32_t  *err_ret);

/**
 *  sdio_readw - read a 16 bit integer from a SDIO function
 *  @func: SDIO function to access
 *  @addr: address to read
 *  @err_ret: optional status value from transfer
 *
 *  Reads a 16 bit integer from the address space of a given SDIO
 *  function. If there is a problem reading the address, 0xffff
 *  is returned and @err_ret will contain the error code.
 */
extern uint16_t sdio_readw(struct sdio_func *func, unsigned int addr, int *err_ret);
/**
 *  sdio_writew - write a 16 bit integer to a SDIO function
 *  @func: SDIO function to access
 *  @b: integer to write
 *  @addr: address to write to
 *  @err_ret: optional status value from transfer
 *
 *  Writes a 16 bit integer to the address space of a given SDIO
 *  function. @err_ret will contain the status of the actual
 *  transfer.
 */
extern void sdio_writew(struct sdio_func *func, uint16_t b, unsigned int addr, int *err_ret);
/**
 *  sdio_readl - read a 32 bit integer from a SDIO function
 *  @func: SDIO function to access
 *  @addr: address to read
 *  @err_ret: optional status value from transfer
 *
 *  Reads a 32 bit integer from the address space of a given SDIO
 *  function. If there is a problem reading the address,
 *  0xffffffff is returned and @err_ret will contain the error
 *  code.
 */
extern uint32_t sdio_readl(struct sdio_func *func, unsigned int addr, int *err_ret);
/**
 *  sdio_writel - write a 32 bit integer to a SDIO function
 *  @func: SDIO function to access
 *  @b: integer to write
 *  @addr: address to write to
 *  @err_ret: optional status value from transfer
 *
 *  Writes a 32 bit integer to the address space of a given SDIO
 *  function. @err_ret will contain the status of the actual
 *  transfer.
 */
extern void sdio_writel(struct sdio_func *func, uint32_t b, unsigned int addr, int *err_ret);

/**
 *  memcpy_fromio - read a chunk of memory from a SDIO function
 *  @dst: buffer to store the data
 *  @addr: address to begin reading from
 *  @count: number of bytes to read
 *
 *  Reads from the address space of a given SDIO function. Return
 *  value indicates if the transfer succeeded or not.
 */
extern int
sdio_memcpy_fromio(struct mmc_card *card, unsigned int func_num, void *dst,
                   unsigned int addr, int count);

/**
 *  memcpy_toio - write a chunk of memory to a SDIO function
 *  @addr: address to start writing to
 *  @src: buffer that contains the data to write
 *  @count: number of bytes to write
 *
 *  Writes to the address space of a given SDIO function. Return
 *  value indicates if the transfer succeeded or not.
 */
extern int
sdio_memcpy_toio(struct mmc_card *card, unsigned int func_num, unsigned int addr,
                 const void *src, int count);

/**
 *    sdio_claim_irq - claim the IRQ for a SDIO function
 *    @card: SDIO card
 *    @func_num: function num
 *    @handler: IRQ handler callback
 *
 *    Claim and activate the IRQ for the given SDIO function. The provided
 *    handler will be called when that IRQ is asserted.  The host is always
 *    claimed already when the handler is called so the handler must not
 *    call sdio_claim_host() nor sdio_release_host().
 */
//extern int sdio_claim_irq(struct mmc_card *card, unsigned int func_num,
//                          sdio_irq_handler_t *handler);
extern int sdio_claim_irq(struct sdio_func *func, sdio_irq_handler_t *handler);

/**
 *    sdio_release_irq - release the IRQ for a SDIO function
 *    @card: SDIO card
 *    @func_num: function num
 *
 *    Disable and release the IRQ for the given SDIO function.
 */
//extern int sdio_release_irq(struct mmc_card *card, unsigned int func_num);
extern int sdio_release_irq(struct sdio_func *func);

/**
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
 */
//unsigned int sdio_align_size(struct mmc_card *card, unsigned int sz);
unsigned int sdio_align_size(struct sdio_func *func, unsigned int sz);
```

# MSGBOX

msgbox 用来实现多 CPU 之间通讯，在一些 IC 内部可能同时存在多种核心用来实现多种不同功能，这些不同核心运行不同架构、不同系统，需要通过 MSGBOX 用来实现这些不同系统间通讯。

## 模块介绍

- msgbox 为一个双端 fifo 结构，cpu0 从一端写，cpu1 从一端读。
- rpmsg 为 linux 用来实现通讯的一种框架
- msgbox 为片上处理器之间提供了中断通讯机制

对于 R128 平台，CPU Remote ID如下

| CPU          | Remote ID |
| :----------- | :-------- |
| ARM M33 Star | 0         |
| RISC-V C906  | 1         |
| HIFI5 DSP    | 2         |

## 模块配置

配置路径如下:

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            msgbox devices --->
                [*] enable msgbox driver
```

## 源码结构

```c
msgbox/
    ├── msgbox_amp            // msgbox AMP 实现
    │   ├── Makefile
    │   └── msgbox_amp.c        
    ├── platform              // 平台寄存器定义
    │   ├── msgbox-sun20iw2.h
    └── platform-msgbox.h     // 公共头文件
```

## 模块接口说明

头文件

```c
#include <hal_msgbox.h>
```

### 初始化接口

函数原型：

```c
int32_t hal_msgbox_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### 通道申请接口

函数原型：

```c
uint32_t hal_msgbox_alloc_channel(struct msg_endpoint *edp, int32_t remote, int32_t read, int32_t write);
```

参数：

- edp：msgbox的端点
- remote：远端核心id
- read：读通道
- write：写通道

返回值：

- 0：成功
- 负数：失败

### 数据发送接口

函数原型：

```c
uint32_t hal_msgbox_channel_send(struct msg_endpoint *edp, uint8_t *bf, uint32_t len);
```

参数：

- edp：msgbox的端点
- bf：数据buffer
- len：buffer长度

返回值：

- 0：成功
- 负数：失败

### 通道释放接口

函数原型：

```c
void hal_msgbox_free_channel(struct msg_endpoint *edp);
```

参数：

- edp：msgbox的端点

返回值：

- 0：成功
- 负数：失败

### MSGBOX 申请流程

1. 使用hal_msgbox_alloc_channel接口申请 msgbox 通道
2. 填充msg_endpoint接收回调，这个会在 msgbox 的中断函数里调用
3. 通过hal_msgbox_channel_send进行数据发送
4. 接收通过中断的方式进行接收，会调用msg_endpoint的回调，无需主动调用

### MSGBOX 接收流程

1. 在接收函数里会首先遍历所有的msg_endpoint，判断当前终端是否有中断发送
2. irq_msgbox_channel_handler里会读取当前msg_endpoint的寄存器，来判断是否有中断，如果有，则读取数据
3. 退出中断

### MSGBOX 发送流程

1. 调用hal_msgbox_channel_send接口进行数据发送
2. msgbox_channel_send_data会判断是远端处理器是哪个，并且计算 local->remote 的系数 N 是多少，这个系数回存放在 to_coef_n 的表格里
3. 计算完成后往远端的 msgbox 的 fifo 中写数据
4. 发送完成

## 模块使用范例

```c
#include <FreeRTOS.h>
#include <queue.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <unistd.h>
#include <string.h>
#include <awlog.h>
#include <hal_msgbox.h>

#include <console.h>

#define RECEIVE_QUEUE_LENGTH 16
#define RECEIVE_QUEUE_WAIT_MS 100

struct msgbox_demo {
    int remote_id;
    int read_ch;
    int write_ch;
    QueueHandle_t recv_queue;
};

static void print_help_msg(void)
{
    printf("\n");
    printf("USAGE:\n");
    printf("  hal_msgbox <REQUIRED_ARGUMENTS> [OPTIONS]\n");
    printf("\n");
    printf("REQUIRED_ARGUMENTS:\n");
    printf("  -E REMOTE_ID: specify remote id\n");
    printf("  -R READ_CH  : specify read channel\n");
    printf("  -W WRITE_CH : specify write channel\n");
    printf("OPTIONS:\n");
    printf("  -s MESSAGE  : send MESSAGE\n");
    printf("  -r          : receive messages\n");
    printf("  -t TIMEOUT  : exit in TIMEOUT seconds when receive\n");
    printf("e.g. (communicate with remote 0, use read channel 3 and write channel 3):\n");
    printf("  hal_msgbox -E 0 -R 3 -W 3 -s \"hello\" : send string \"hello\"\n");
    printf("  hal_msgbox -E 0 -R 3 -W 3 -r           : receive messages (default in 10 seconds)\n");
    printf("  hal_msgbox -E 0 -R 3 -W 3 -r -t 20     : receive messages in 20 seconds\n");
    printf("\n");
}

static int recv_callback(unsigned long data, void *private_data)
{
    BaseType_t taskwoken = pdFALSE;
    printf("Receive callback (data: 0x%lx)\n", data);
    struct msgbox_demo *demo = private_data;
    BaseType_t ret = xQueueSendFromISR(demo->recv_queue, &data, &taskwoken);
    if (ret == errQUEUE_FULL) {
        printf("recv_queue is full\n");
        return -1;
    }
    if (ret == pdPASS) {
        portYIELD_FROM_ISR(taskwoken);
    }
    return 0;
}

static int cmd_hal_msgbox(int argc, char *argv[])
{
    int ret = 0;
    int c;

    struct msgbox_demo demo= {
        .remote_id = -1,
        .read_ch = -1,
        .write_ch = -1,
        .recv_queue = NULL,
    };
    struct msg_endpoint ept;

    TickType_t start_ticks, current_ticks;
    int do_send = 0;
    const char *data_send= NULL;
    int do_recv = 0;
    int timeout_sec = 10;
    uint32_t data_recv;

    if (argc <= 1) {
        print_help_msg();
        ret = -1;
        goto out;
    }

    while ((c = getopt(argc, argv, "hs:rt:E:W:R:")) != -1) {
        switch (c) {
        case 'h' :
            print_help_msg();
            ret = 0;
            goto out;
        case 'E':
            demo.remote_id = atoi(optarg);
            break;
        case 'R':
            demo.read_ch = atoi(optarg);
            break;
        case 'W':
            demo.write_ch = atoi(optarg);
            break;
        case 's':
            do_send = 1;
            data_send = optarg;
            break;
        case 'r':
            do_recv = 1;
            break;
        case 't':
            timeout_sec = atoi(optarg);
            break;
        default:
            print_help_msg();
            ret = -1;
            goto out;
        }
    }

    if (demo.remote_id < 0 || demo.read_ch < 0 || demo.write_ch < 0) {
        printf("Error. Please specify remote id, read channel and write channel\n");
        print_help_msg();
        ret = -1;
        goto out;
    }

    printf("remote id: %d, write channel: %d, read channel: %d\n",
            demo.remote_id, demo.write_ch, demo.read_ch);

    if (do_recv) {
        demo.recv_queue = xQueueCreate(RECEIVE_QUEUE_LENGTH, sizeof(uint32_t));
        if (!demo.recv_queue) {
            printf("Failed to create receive queue\n");
            ret = -1;
            goto out;
        }
        ept.rec = (void *)recv_callback;
        ept.private = &demo;
    }

    ret = hal_msgbox_alloc_channel(&ept, demo.remote_id, demo.read_ch, demo.write_ch);
    if (ret != 0) {
        printf("Failed to allocate msgbox channel\n");
        goto delete_recv_queue;
    }

    if (do_send) {
        ret = hal_msgbox_channel_send(&ept, (unsigned char *)data_send, strlen(data_send));
        if (ret != 0) {
            printf("Failed to send message\n");
            goto free_channel;
        }
    }

    if (do_recv) {
        printf("hal_msgbox will exit in %d seconds\n", timeout_sec);
        start_ticks = xTaskGetTickCount();
        printf("start_ticks: %u\n", start_ticks);

        while (1) {
            if (pdTRUE == xQueueReceive(demo.recv_queue, &data_recv,
                        RECEIVE_QUEUE_WAIT_MS / portTICK_PERIOD_MS)) {
                printf("Received from queue: 0x%x\n", data_recv);
            }
            current_ticks = xTaskGetTickCount();
            if ((current_ticks - start_ticks) * portTICK_PERIOD_MS
                    >= timeout_sec * 1000) {
                printf("current_ticks: %u\n", current_ticks);
                break;
            }
        }
    }

    printf("hal_msgbox exited\n");
    ret = 0;

free_channel:
    hal_msgbox_free_channel(&ept);
delete_recv_queue:
    if (do_recv) {
        vQueueDelete(demo.recv_queue);
    }
out:
    return ret;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_hal_msgbox, hal_msgbox, hal msgbox);
```

# PWM

## 模块介绍

脉冲宽度调制（PWM）是一种对模拟信号电平进行数字编码的方法。通过高分辨率计数器的使用，方波的占空比被调制用来对一个具体模拟信号的电平进行编码。PWM 具有以下特点：

- 支持脉冲（脉冲个数可配）、周期和互补对输出；
- 支持捕捉输入；
- 带可编程死区发生器，死区时间可控；
- 0-24M/100M 输出频率范围、0%-100% 占空比可调、最小分辨率 1/65536；
- 支持 PWM 输出和捕捉输入产生中断；
- 支持 PWM 组模式，同组内各个通道起始相位可配置。

## 模块配置

配置路径如下:

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            pwm devices --->
                [*] enable pwm driver
```

## 源码结构

```c
rtos-hal/
|--hal/source/pwm/hal_pwm.c    // hal层接口代码
|--include/hal/sunxi_hal_pwm.h // 头文件
```

## 模块接口说明

头文件

```c
#include <sunxi_hal_pwm.h>
```

### 返回值枚举

```c
typedef enum {
    HAL_PWM_STATUS_ERROR_PARAMETER = -3,
    HAL_PWM_STATUS_ERROR_CHANNEL = -2,
    HAL_PWM_STATUS_ERROR = -1,
    HAL_PWM_STATUS_OK = 0
} hal_pwm_status_t;
```

### PWM 初始化接口

PWM 模块初始化，主要完成 clk 初始化

函数原型：

```c
pwm_status_t hal_pwm_init(void)
```

参数：

- 

返回值：

- 0：成功
- 负数：失败

### PWM 通道配置接口

配置 PWM 模块某个通道，包括周期、占空比和极性

函数原型：

```c
pwm_status_t hal_pwm_control(int channel, struct pwm_config *config_pwm)
```

参数：

- channel 代表通道号
- config_pwm 代表该通道的配置参数

返回值：

- 0：成功
- 负数：失败

### PWM 通道使能接口

使能 PWM 模块某个通道

函数原型：

```c
void hal_pwm_enable_controller(uint32_t channel_in)
```

参数：

- channel_in 代表通道号

返回值：

- 无

### PWM 去初始化接口

PWM 模块去初始化，主要关闭 clk

函数原型：

```c
pwm_status_t hal_pwm_deinit(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

#include <hal_log.h>
#include <hal_cmd.h>
#include <sunxi_hal_pwm.h>

#if defined(CONFIG_ARCH_DSP)
#include <delay.h>
#define sleep(sec) msleep(sec * 1000)
#endif

#ifndef printfFromISR
#define printfFromISR printf
#endif

static int cmd_test_pwm(int argc, char **argv)
{

    struct pwm_config *config;
    uint8_t port;
    //uint8_t ns;
    int period, duty;

    if (argc < 4)
    {
        hal_log_info("Usage: pwm port | duty | period\n");
        return -1;
    }

    hal_log_info("Run pwm hal layer test case\n");

    port = strtol(argv[1], NULL, 0);
    hal_log_info("port = %d", port);
    duty = strtoul(argv[2], NULL, 0);
    period = strtoul(argv[3], NULL, 0);

    config = (struct pwm_config *)malloc(sizeof(struct pwm_config));

    config->duty_ns   = duty;
    config->period_ns = period;
    config->polarity  = PWM_POLARITY_NORMAL;
    hal_log_info("duty_ns = %d \n", config->duty_ns);
    hal_log_info("period_ns = %d \n", config->period_ns);
    hal_log_info("polarity = %d \n", config->polarity);

    hal_pwm_init();

    hal_pwm_control(port, config);

    hal_log_info("control pwm test finish\n");

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_pwm, hal_pwm, pwm hal APIs tests)

static int cmd_release_pwm_channel(int argc, char **argv)
{

    struct pwm_config *config;
    uint8_t port;
    uint8_t ns;
    ulong period, duty;

    if (argc < 2)
    {
        hal_log_info("Usage: pwm port\n");
        return -1;
    }

    hal_log_info("Run close pwm channel test case\n");

    port = strtol(argv[1], NULL, 0);
    hal_log_info("port = %d", port);

    hal_pwm_release(port);

    hal_log_info("release pwm channel finish\n");

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_release_pwm_channel, hal_pwm_close, release pwm channel hal APIs tests)

static void pwm_cap_callback(void* param)
{
    hal_pwm_cap_info *info = (hal_pwm_cap_info *)param;

    printfFromISR("pwm%d capture callback, cnt is %d, period is %d, duty is %d\n", info->channel, info->cnt, info->period, info->duty);
}

hal_pwm_status_t pwm_capture_init(uint32_t channel)
{

    hal_pwm_cap_enable(channel, pwm_cap_callback);

    return HAL_PWM_STATUS_OK;
}

hal_pwm_status_t pwm_capture_deinit(uint32_t channel)
{
    hal_pwm_cap_disable(channel);

    return HAL_PWM_STATUS_OK;
}

void cmd_pwm_capture_help(void)
{
    printf("pwm capture test, stop capture after 10s\n");
    printf("usage: pwm_capture_test<channel>\n");
    printf("\t<channel>: 0 ~ 15\n");
    printf("eg: pwm_capture_test 0, pwm0 capture function\n");
}

int cmd_pwm_capture(int argc, char *argv[])
{
    int count = 0;

    if (argc != 2 || atoi(argv[1]) > 15) {
        cmd_pwm_capture_help();
        return -1;
    }

    /* capture setting */
    pwm_capture_init(atoi(argv[1]));

    for(count = 0; count < 10; count++) {
        sleep(1);
    }

    /* disable */
    pwm_capture_deinit(atoi(argv[1]));

    printf("[%s]: pwm stop capture ssd\n", __func__);

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_pwm_capture, pwm_capture_test, pwm capture test)
```

# RTC

## 模块介绍

实时时钟 RTC 用于实现时钟计数和定时唤醒功能，能够实时显示日，时，分，秒功能。该模块电源独立，可以在系统掉电后工作，RTC 具有以下特点。

- 内部具有一个 16bit 的日计数器，5bit 的小时计数器，6bit 的分计数器，6bit 的秒计数器
- 可外接 32768Hz 低频晶振作为计数时钟
- 可随时软件配置初始值
- 具有定时闹钟功能，可产生中断及唤醒外围设备
- 14 个用户寄存器可存放掉电信息
- 多个特殊寄存器记录 BROM 相关信息
- RTC 模块记录的时间范围为 1900-2097 年。

## 模块配置

配置路径如下:

```c
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            rtc devices --->
                [*] enable rtc driver
```

## 源码结构

```c
rtos-hal/
|-- hal/source/rtc/hal_rtc.c                // hal层接口代码
|-- hal/source/rtc/platform/rtc_sun20iw2.h  // 平台配置
|-- include/hal/sunxi_hal_rtc.h             // 头文件
```

RTC 模块寄存器的基本配置位于文件rtc_sun20iw2.h 里面，包括每个 RTC 的寄存器地址和中断号，部分配置如下：

```c
// 寄存器基址
#define SUNXI_RTC_BASE 0x07000000
#define SUNXI_RTC_DATA_BASE (SUNXI_RTC_BASE+0x100)
// 中断
#define SUNXI_GIC_START 32
#define SUXNI_IRQ_RTC (SUNXI_GIC_START + 105)
```

## 模块接口说明

### RTC 时间结构体

该结构体用来保存 RTC 模块的时间，具体如下所示：

```c
struct rtc_time
{
    int tm_sec;  // 秒
    int tm_min;  // 分
    int tm_hour; // 时
    int tm_mday; // 天
    int tm_mon;  // 月
    int tm_year; // 年
    int tm_wday;
    int tm_yday;
    int tm_isdst;
};
```

### RTC 闹钟结构体

该结构体用来保存 RTC 模块的闹钟时间，具体如下所示：

```c
struct rtc_wkalrm
{
    unsigned char enabled; /* 0 = alarm disabled, 1 = alarm enabled */
    unsigned char pending; /* 0 = alarm not pending, 1 = alarm pending */
    struct rtc_time time;  /* time the alarm is set to */
};
```

### RTC 初始化接口

RTC 模块初始化，主要初始化一些工作模式，中断等等

函数原型：

```c
int hal_rtc_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### 获取时间接口

获取时间值，保存在 rtc_tm 结构体里面

函数原型：

```c
int hal_rtc_gettime(struct rtc_time *rtc_tm);
```

参数：

- rtc_tm，保存时间的结构体参数

返回值：

- 0：成功
- 负数：失败

### 设置时间接口

设置时间值

函数原型：

```c
int hal_rtc_settime(struct rtc_time *rtc_tm);
```

参数：

- rtc_tm，设置时间的结构体参数

返回值：

- 0：成功
- 负数：失败

### 获取闹钟接口

获取闹钟数据

函数原型：

```c
int hal_rtc_getalarm(struct rtc_wkalrm *wkalrm);
```

参数：

- wkalrm，保存闹钟数据的结构体

返回值：

- 0：成功
- 负数：失败

### 设置闹钟接口

设置闹钟数据

函数原型：

```c
int hal_rtc_setalarm(struct rtc_wkalrm *wkalrm)
```

参数：

- wkalrm，保存闹钟数据的结构体

返回值：

- 0：成功
- 负数：失败

### 使能闹钟中断接口

使能闹钟中断

函数原型：

```c
int hal_rtc_alarm_irq_enable(unsigned int enabled);
```

参数：

- enabled：1使能，0失能

返回值：

- 0：成功
- 负数：失败

### 注册闹钟回调接口

注册闹钟回调接口

函数原型：

```c
int hal_rtc_register_callback(rtc_callback_t user_callback);
```

参数：

- user_callback：int callback(void) 的函数指针

返回值：

- 0：成功
- 负数：失败

## 模块使用范例

```c
#include <stdio.h>
#include <hal_log.h>
#include <hal_cmd.h>
#include <sunxi_hal_rtc.h>

static int callback(void)
{
    printf("alarm interrupt\n");
    return 0;
}

static int cmd_test_rtc(int argc, const char **argv)
{
    unsigned int enable = 1;
    struct rtc_time rtc_tm;
    struct rtc_wkalrm wkalrm;

    hal_rtc_init();

    hal_rtc_register_callback(callback);

    if (hal_rtc_gettime(&rtc_tm))
    {
        printf("sunxi rtc gettime error\n");
    }

    wkalrm.enabled = 1;
    wkalrm.time = rtc_tm;
    if(rtc_tm.tm_min > 0)
        rtc_tm.tm_min -= 1;
    else
        wkalrm.time.tm_min += 1;

    printf("alarm time %04d-%02d-%02d %02d:%02d:%02d\n",
           wkalrm.time.tm_year + 1900, wkalrm.time.tm_mon + 1, wkalrm.time.tm_mday,
           wkalrm.time.tm_hour, wkalrm.time.tm_min, wkalrm.time.tm_sec);

    if (hal_rtc_settime(&rtc_tm))
    {
        printf("sunxi rtc settime error\n");
    }

    if (hal_rtc_setalarm(&wkalrm))
    {
        printf("sunxi rtc setalarm error\n");
    }

    if (hal_rtc_getalarm(&wkalrm))
    {
        printf("sunxi rtc getalarm error\n");
    }

    if (hal_rtc_gettime(&rtc_tm))
    {
        printf("sunxi rtc gettime error\n");
    }

    //if do hal_rtc_alarm_irq_enable and hal_rtc_uninit, alarm will not work
    hal_rtc_alarm_irq_enable(enable);

    /* if the alarm time is less than code run,run here will close rtc, so the interrupt will not response*/
    //hal_rtc_deinit();
    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_rtc, hal_rtc, rtc hal APIs tests)
```

# SID

## 模块介绍

SID 模块主要用于烧写 SoC 的 efuse。efuse 包括 ChipID、HASH 码等相关信息。该模块特点如下：

- efuse 一根熔丝只能被编程一次，并且具有一次可编程存储器的特点。
- 包含 SID_SRAM，SID_SRAM 在每次芯片上电时会备份 efuse 信息。
- SID 模块寄存器是非安全的；efuse 有安全非安全区分。
- 提供芯片唯一ID ChipID，出厂前会烧录好
- （secure enable bit ）作为 efuse 中安全开启开关，使能后，芯片会变成安全芯片

## 模块配置

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            SID devices --->
                [*] enable efuse driver
```

## 源码结构

SID 驱动位于 `hal/source/efuse/` 目录下。

```c
hal
├── source
│   ├── efuse
│ │ ├── efuse.c # SID底层驱动文件
│ │ ├── efuse.h # SID底层驱动头文件
│ │ ├── hal_efuse.c # SID公用操作接口函数文件
│ │ ├── Kconfig
│ │ ├── Makefile
│ │ ├── platform
│ │ │   ├── efuse_sun20iw2.h # 具体的平台配置头文件
│ │ └── platform_efuse.h # 平台配置头文件
└── include
    └── hal
        └── sunxi_hal_efuse.h # SID公用操作接口函数头文件
```

## 模块接口说明

头文件

```c
#include <sunxi_hal_efuse.h>
```

### efuse 写接口

将指定名字的数据写入 efuse

```c
int hal_efuse_write(char key_name, unsigned char key_data, size_t key_bit_len)
```

参数：

- key_name: efuse 区域名字
- key_data: 待写入数据
- key_bit_len: 待写入数据 bit 数

返回值：

- 0：成功
- 负数：失败

### efuse 读接口

读 efuse 中指定名字区域的数据

```c
int hal_efuse_read(char key_name, unsigned char key_data, size_t key_bit_len)
```

参数：

- key_name: efuse 区域名字
- key_data: 待读取数据
- key_bit_len: 待读取数据 bit 数

返回值：

- 0：成功
- 负数：失败

### efuse 读扩展接口

读 efuse 中指定名字区域的数据

```c
int hal_efuse_read_ext(uint32_t start_bit, uint32_t bit_num, uint8_t *data)
```

参数：

- start_bit: efuse 区域名字
- bit_num: 待读取数据
- data: 存放待读取数据

返回值：

- 0：成功
- 负数：失败

### 开启 secure enable bit 接口

开启 secure enable bit

```c
int hal_efuse_set_security_mode(void)
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

> 开启 **efuse** 中 **secure enable bit** 之后，芯片会变成安全芯片，此过程不可逆，开启时请额外注意。

### 读取 secure enable bit 状态接口

读取 secure enable bit 状态

```c
int hal_efuse_get_security_mode(void)
```

参数：

- 无

返回值：

- 0：没有烧写
- 1：烧写了

### 读取 chipid 接口

读取 efuse 中 chipid

```c
int hal_efuse_get_chipid(unsigned char *buffer)
```

参数：

- buffer: 用于存放 chipid 数据的指针

返回值：

- 0：成功
- 负数：失败

### 读取 thermal 校准值接口

读取 thermal sensor 校准值

```c
int hal_efuse_get_thermal_cdata(unsigned char *buffer)
```

参数：

- buffer: 存放读取的数据的指针

返回值：

- 0：成功
- 负数：失败

### 读取芯片版本接口

读取芯片版本信息

```c
int hal_efuse_get_chip_ver(void)
```

参数：

- 无

返回值：

- 正数：芯片版本号
- 负数：失败

### 读取 efuse sram 接口

读取 efuse sram 中数据

```c
int hal_get_module_param_from_sid(uint32_t *dst, uint32_t offset, uint32_t len)
```

参数：

- dst: 存放读取的数据
- offset: 读取的偏移
- len: 读取长度（字节）

返回值：

- 0：成功
- 负数：失败

## 模块使用范例

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <hal_cmd.h>
#include <sunxi_hal_efuse.h>

#undef  HEXDUMP_LINE_CHR_CNT
#define HEXDUMP_LINE_CHR_CNT 16

static int sunxi_hexdump(const unsigned char *buf, int bytes)
{
    unsigned char line[HEXDUMP_LINE_CHR_CNT] = {0};
    int addr;

    for (addr = 0; addr < bytes; addr += HEXDUMP_LINE_CHR_CNT)
    {
        int len = ((bytes-addr)<HEXDUMP_LINE_CHR_CNT ? (bytes-addr) : HEXDUMP_LINE_CHR_CNT);
    int i;

        memcpy(line, buf + addr, len);
        memset(line + len, 0, HEXDUMP_LINE_CHR_CNT - len);

        /* print addr */
        printf("0x%.8X: ", addr);
        /* print hex */
        for (i = 0; i < HEXDUMP_LINE_CHR_CNT; i++)
        {
            if (i < len)
            {
                printf("%.2X ", line[i]);
            }
            else { printf("   "); }
        }
        /* print char */
        printf("|");
        for (i = 0; i < HEXDUMP_LINE_CHR_CNT; i++)
        {
            if (i < len)
            {
                if (line[i] >= 0x20 && line[i] <= 0x7E)
                {
                    printf("%c", line[i]);
                }
                else
                {
                    printf(".");
                }
            }
            else
            {
                printf(" ");
            }
        }
        printf("|\n");
    }
    return 0;
}

int cmd_test_efuse(int argc, char **argv)
{
    char buffer[32] = {0};

    hal_efuse_get_chipid(buffer);
    sunxi_hexdump(buffer, sizeof(buffer));

    printf("===================================\n");
    printf("Test Finished.\n");

    return 0;
}

FINSH_FUNCTION_EXPORT_CMD(cmd_test_efuse, hal_efuse, efuse hal APIs tests)
```

# Smart Card

## 模块介绍

智能卡读取器（SCR）是一种通信控制器，可在系统和智能卡之间传输数据。控制器可以执行完整的智能卡会话，包括停用卡激活卡，冷/热重置，重置应答（ATR）响应接收，数据传输等。

## 模块配置

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            smartcard devices --->
                [*] enable smartcard driver
```

## 源码结构

```c
rtos-hal/
|--hal/source/smartcard/scr_hal.c // hal层接口代码
```

## 模块接口说明

头文件

```c
#include <sunxi_hal_scr.h>
```

### SCR 命令枚举

```c
enum scr_cmd {
    SCR_IOCGSTATUS = 0,
    SCR_IOCRESET,
    SCR_IOCGATR,
    SCR_IOCGPARA,
    SCR_IOCSPARA,
    SCR_IOCGATRPARA,
    SCR_IOCGPPSPARA,
    SCR_IOCWRDATA,
};
```

### SCR ATA 数据结构体

```c
struct scr_atr {
    unsigned char atr_len;
    unsigned char atr_data[MAX_ATR_LEN];
};
```

### SMARTCARD 初始化接口

SMARTCARD 模块初始化，主要初始化采样率、通道选择及注册中断等

```c
hal_scr_status_t hal_scr_init(void);
```

参数：

- 无

返回值

- 0：成功
- 负数：失败

### SMARTCARD 测试接口

SMARTCARD 模块功能测试

```c
hal_scr_test(enum scr_cmd cmd, void *arg)
```

参数：

- cmd：命令
- arg：参数

返回值

- 0：成功
- 负数：失败

```c
#include <stdio.h>
#include <stdlib.h>
#include <interrupt.h>
#include <irqs.h>
#include <string.h>
#include <console.h>
#include <param.h>
#include <hal_osal.h>
#include <hal_timer.h>
#include <hal_atomic.h>
#include "hal_clk.h"
#include <hal_gpio.h>
#include <hal_reset.h>

#include <sunxi_hal_scr.h>

#include "scr_test.h"

#define SCR_TEST_INFO  printf
#define SCR_TEST_DBG   printf
#define get_wvalue  readl
#define APB2CLK 24000000

const unsigned int SCR_REG_DEFAULT[] = {12             //reg Count
                               ,0x00000000 ,0x000 ,0x01ff0f07   //reg 0: (default, addr, mask)
                               ,0x00000000 ,0x004 ,0x00ff1e1f
                               ,0x00000000 ,0x008 ,0x00ff1e1f
                               ,0x00000101 ,0x00c ,0x00000707
                               ,0x00000000 ,0x010 ,0x1f1f1f1f //0x1f001f1f //
                               ,0x00000000 ,0x014 ,0x000000ff
                               ,0x00000000 ,0x018 ,0xffffffff
                               ,0x00000000 ,0x01c ,0x00ffffff
                               ,0x00000000 ,0x020 ,0xffff00ff
                               ,0x00000000 ,0x030 ,0x000000ff
                               ,0x00000000 ,0x03c ,0xffffffff
                               ,0x000003ff ,0x040 ,0xffffffff
                               };

const unsigned int SCR_REG_RW[]    =   {12               //reg Count
                               ,0x01  //Byte|Hword|Word
                               ,0x00000000 ,0x000 ,0x01ff0007   //reg 0: (default, addr, mask)
                               ,0x00000000 ,0x004 ,0x00ff1e1f
                               ,0x00000000 ,0x008 ,0x00000000
                               ,0x00000101 ,0x00c ,0x00000000
                               ,0x00000000 ,0x010 ,0x1f1f0000 //0x1f000000 //
                               ,0x00000000 ,0x014 ,0x000000ff
                               ,0x00000000 ,0x018 ,0xffffffff
                               ,0x00000000 ,0x01c ,0x00ffffff
                               ,0x00000000 ,0x020 ,0xffff00ff
                               ,0x00000000 ,0x030 ,0x000000fd
                               ,0x00000000 ,0x03c ,0x00000000
                               ,0x000003ff ,0x040 ,0xffffffff
                               };

uint8_t ic_card_atr[SMART_CARD_NUM][30] = {
    { 7, 0x3b, 0x93, 0x11, 0x00, 0x00, 0x40, 0x41 }, //莱西有线
    { 18, 0x3b, 0x7d, 0x94, 0x00, 0x00, 0x57, 0x44, 0x53, 0x67, 0x96, 0x86,
        0x93, 0x03, 0x9d, 0xf7, 0x10, 0x00, 0x9d }, //神州大众卡1
    { 15, 0x3b, 0xb9, 0x94, 0x00, 0x40, 0x14, 0x47, 0x47, 0x33, 0x53, 0x30,
        0x35, 0x41, 0x53, 0x30 }, //神州大众卡2
    { 17, 0x3b, 0x9d, 0x95, 0x00, 0x13, 0x61, 0x40, 0x36, 0x13, 0x85, 0xe9,
        0x44, 0x34, 0x8f, 0x78, 0x8f, 0x4a }, //数字电视卡1
    { 17, 0x3b, 0x9d, 0x95, 0x00, 0x13, 0x61, 0x40, 0x36, 0x13, 0x85, 0xe9,
        0x44, 0x34, 0xf3, 0x78, 0x8f, 0x4a }, //数字电视卡2
    {
        22, 0x3b, 0x9f, 0x95, 0x80, 0x1f, 0xc3, 0x80,
        0x31, 0xe0, 0x73, 0xfe, 0x21, 0x13, 0x57, 0x86,
        0x81, 0x02, 0x86, 0x98, 0x44, 0x18, 0xa8 }, //电信4G卡
    { 20, 0x3b, 0xfb, 0x94, 0x00, 0x00, 0x80, 0x1f, 0x83, 0x80, 0x65,
        0x92, 0x10, 0x26, 0x86, 0x53, 0x83, 0x00, 0x90, 0x00, 0xf4 }, //联通卡
    { 16, 0x3b, 0x7b, 0x94, 0x00, 0x00, 0x97, 0x88, 0x84, 0x86, 0x60, 0xa0,
        0x04, 0x01, 0x00, 0x04, 0x00 }, //移动卡
    { 20, 0x3b, 0x7f, 0x12, 0x00, 0x00, 0x44, 0x56, 0x4e, 0x20, 0x54,
        0x45, 0x53, 0x54, 0x20, 0x43, 0x41, 0x52, 0x44, 0x76, 0x31 } // digital
    // TV卡
};

uint8_t ic_card_send_cmd[SMART_CARD_NUM][30] = {
    { 5, 0xe5, 0x04, 0x00, 0x00, 0x04 }, //莱西有线
    { 0 },
    { 0 },
    { 0 },
    { 0 },
    { 0 },
    { 0 },
    { 7, 0xA0, 0xA4, 0x00, 0x00, 0x02, 0x3F, 0x00 }, //移动卡
    { 0 }
};

uint8_t ic_card_rev_data[SMART_CARD_NUM][30] = {
    { 7, 0x04, 0x4d, 0x33, 0x4f, 0x4b, 0x90, 0x00 }, //莱西有线
    { 0 },
    { 0 },
    { 0 },
    { 0 },
    { 0 },
    { 0 },
    { 3, 0xa4, 0x9f, 0x1b }, //移动卡
    { 0 }
};

scr_struct scr;
scr_fsm_record scr_fsm;
scatr_struct scatr;
upps_struct pps;

extern scr_test_stage stage;
static int state_dly = 0x0;

#define SCR_SIM_DBG(x) pattern_mod_goto(0x2, x)

void scr_ccu_clk_gate_on(u32 sel)
{
    int ret;
    ret = readl(0x4003c004);
    hal_write_reg32(0x4003c004, 0x4000000 | ret);
}

void scr_ccu_clk_gate_off(u32 sel)
{
    int ret;
    ret = readl(0x4003c004);
    hal_write_reg32(0x4003c004, 0xfbffffff & ret);
}

void scr_module_rst_on(u32 sel)
{
    int ret;
    ret = readl(0x4003c00c);
    hal_write_reg32(0x4003c00c, 0x4000000 | ret);
}

void scr_module_rst_off(u32 sel)
{
    int ret;
    ret = readl(0x4003c00c);
    hal_write_reg32(0x4003c00c, 0xfbffffff & ret);
}

void scr_module_rst(u32 sel)
{
    scr_module_rst_off(sel);
    udelay(300);
    scr_module_rst_on(sel);
    udelay(300);
}

void scr_pio_setup(void)
{
    int ret;
    ret = hal_gpio_pinmux_set_function(GPIOA(14), 5);
    if (ret) {
        printf("scr pin set function failed\n");
        return -1;
    }
}

/* Configure the CCMU Clock & De-assert Reset & Gating & GPIO configure */
void scr_system_setup(u32 sel)
{
    scr_module_rst_off(sel);
    scr_ccu_clk_gate_off(sel);
    udelay(300);
    scr_ccu_clk_gate_on(sel); /*enable APB clock*/
    scr_module_rst_on(sel);
    scr_pio_setup(); /*IO configure*/
}

uint32_t
scr_reg_test(void) // registers default values cheak and read write check
{
    uint32_t temp;

    scr_module_rst(SCR_NO);
    SCR_TEST_INFO("SCR Register Test Pass!!\n");
    return 1;
}

static hal_irqreturn_t scr0_irq_handler(void* dev)
{
    scr_handler_irq(&scr);

    return 0;
}

void reg_scr0_irq_handler(void)
{
    hal_request_irq(scr.irq_no, scr0_irq_handler, "scr0", &scr);
    hal_enable_irq(scr.irq_no);
}

void scr_params_init(void)
{
    scr.reg_base = 0x40045400;

    scr.irq_no = 69; //中断号
    scr.csr_config = CSR_CONFIG_DETPOL | CSR_CONFIG_T | CSR_CONFIG_ATRSTFLUSH | CSR_CONFIG_TSRXEN | CSR_CONFIG_CLKSTPPOL | CSR_CONFIG_PECRXE | CSR_CONFIG_MSBF | CSR_CONFIG_DPOL;

    scr.inten_bm = 0xffffffff; // Enbale all the interrupts
    scr.txfifo_thh = SCR_FIFO_DEPTH / 2; // set the txfifo trigger level as half full
    scr.rxfifo_thh = SCR_FIFO_DEPTH / 2; // set the rxfifo trigger level as half full
    scr.tx_repeat = 0x3; // iso7816中规定对于存在争议的字符，最多只能重发3次
    scr.rx_repeat = 0x3; // iso7816中规定对于存在争议的字符，最多只能重发3次

    scr.scclk_div = (APB2CLK / (2 * SCR_CLK_FRQ)) - 1; // PCLK/12, <175, && SCCLK >= 1M && =<4M
    scr.baud_div = (scr.scclk_div + 1) * 372 - 1; // ETU = 372*SCCLK

    scr.act_time = 1; // 1*256 clock cycle
    scr.rst_time = 1; // 1*256 clock cycle
    scr.atr_time = (35000 >> 8); // 400~40000   冷复位和热复位时,在RST拉高后,IO要作出ATR的时间限制
    scr.guard_time = 2; //=2*ETUs   /* GT = 12etu + R * N/f   ---   Default extra
        // guard time is 0 */
    scr.chlimit_time = 9600; // 1024*(10+scr.guard_time); //1K Characters
    scr.debounce_time = 0xfffff; // insert detect debounce time
}

volatile u32 card_name = 0;
volatile u32 scr_ret = 0;
uint32_t scr_test_process(pscr_struct pscr)
{
    uint8_t atr_temp[30];
    uint8_t rsp_temp[30];
    u32 i = 0;
    u32 j = 0;
    uint8_t atr_cmp = 0;

    switch (stage) {
    case sts_wait_connect:
        if (scr.detected) /*if detect card, ACT the card*/
        {
            state_dly++;
            if (state_dly >= 50) {
                msleep(10);
                scr_start_activation(&scr); /* Activation */
                stage = sts_wait_act;
                state_dly = 0;
            }
        } else {
            state_dly = 0;
        }
        break;
    case sts_wait_act:
        if (scr.activated) {
            stage = sts_wait_atr;
        }
        break;
    case sts_wait_atr:
        if (scr.atr_resp != SCR_ATR_RESP_INVALID) {
            if (scr.atr_resp == SCR_ATR_RESP_OK) /*ATR response is 有效的*/
            {
                uint32_t i = 0;
                SCR_TEST_DBG("ATR = ");
                for (i = 0; i < scr.rxbuf.wptr; i++) {
                    SCR_TEST_DBG("0x%02x ", *((uint8_t*)(scr.rxbuf.buffer + i)));
                    atr_temp[i] = *((uint8_t*)(scr.rxbuf.buffer + i));
                }
                SCR_TEST_DBG(" \n");
                scr.rxbuf.rptr = scr.rxbuf.wptr;
                smartcard_atr_decode(&scatr, (uint8_t*)scr.rxbuf.buffer, &pps, 1);

                scr_buffer_flush(&scr.rxbuf); // clean rxbuffer
                stage = sts_start_pps;

                for (i = 0; i < SMART_CARD_NUM; i++) {
                    u32 atr_length = ic_card_atr[i][0];
                    for (j = 0; j < atr_length; j++) {
                        if (atr_temp[j] != ic_card_atr[i][j + 1]) {
                            break;
                        }
                    }
                    if (j == atr_length) {
                        card_name = i;
                        atr_cmp = 1;
                        break;
                    } else {
                        atr_cmp = 0;
                    }
                }

                if (atr_cmp) {
                    printf("crad_name = %d\n", card_name);
                    printf("ATR Function PASS!!\n");
                } else {
                    printf("ATR Function FAIL!!\n");
                }
            } else {
                stage = sts_start_deact;
            }
        }
        break;
    case sts_start_pps: /* Protocol and parameters selection */
        pscr->chto_flag = 0;
        scr_buffer_flush(&scr.rxbuf);

        scr_write_fifo(&scr, pps.ppss);
        printf("ppss:%x  \n", pps.ppss);
        scr_write_fifo(&scr, pps.pps0);
        printf("pps0:%x  \n", pps.pps0);
        if (pps.pps0 & (0x1 << 4)) {
            scr_write_fifo(&scr, pps.pps1);
            printf("pps1:%x  \n", pps.pps1);
        }
        if (pps.pps0 & (0x1 << 5)) {
            scr_write_fifo(&scr, pps.pps2);
            printf("pps2:%x  \n", pps.pps2);
        }
        if (pps.pps0 & (0x1 << 6)) {
            scr_write_fifo(&scr, pps.pps3);
            printf("pps3:%x  \n", pps.pps3);
        }
        scr_write_fifo(&scr, pps.pck);
        printf("pck:%x  \n", pps.pck);

        stage = sts_wait_pps_resp;
        break;
    case sts_wait_pps_resp: // pps交换成功的最普通的情况就是:卡设备的pps请求和ic卡的pps应答的内容完全一样
        if (pscr->chto_flag) // Wait Data Timeout/*time is too long, time is
        // out*/
        {
            if (scr_buffer_is_empty(&scr.rxbuf)) // RX Buffer, No Response
            {
                SCR_TEST_INFO("No PPS Response!!\n");
                stage = sts_warm_reset;
            } else {
                uint8_t data = scr_dump_buffer(&scr.rxbuf); // read ppss
                printf("ppss:%x  \n", data);
                if (data != pps.ppss) // check ppss
                {
                    SCR_TEST_INFO("PPS Resp Start Error: 0x%x !!\n", data);
                    break;
                }
                if (scr_buffer_is_empty(&scr.rxbuf)) // no pps0
                {
                    SCR_TEST_INFO("PPS Resp Too Short 1\n");
                    break;
                }
                data = scr_dump_buffer(&scr.rxbuf); // read pps0
                printf("pps0:%x  \n", data);
                if (data != pps.pps0) // check pps0
                {
                    SCR_TEST_INFO("PPS Resp PPS0 Error: 0x%x vs 0x%x !!\n", pps.pps0,
                        data);
                    break;
                }
                if (pps.pps0 & (0x1 << 4)) //根据pps0的值,有pps1
                {
                    if (scr_buffer_is_empty(&scr.rxbuf)) //收不到pps1
                    {
                        SCR_TEST_INFO("PPS Resp Too Short 2\n");
                        break;
                    }
                    data = scr_dump_buffer(&scr.rxbuf); //读取pps1
                    printf("pps1:%x  \n", data);
                    if (data != pps.pps1) //检测pps1
                    {
                        SCR_TEST_INFO("PPS Resp PPS1 Error: 0x%x vs 0x%x !!\n", pps.pps1,
                            data);
                        break;
                    }
                }
                if (pps.pps0 & (0x1 << 5)) //根据pps0的值,有pps2
                {
                    if (scr_buffer_is_empty(&scr.rxbuf)) //收不到pps2
                    {
                        SCR_TEST_INFO("PPS Resp Too Short 3\n");
                        break;
                    }
                    data = scr_dump_buffer(&scr.rxbuf); //读取pps2
                    printf("pps2:%x  \n", data);
                    if (data != pps.pps2) //检测pps2
                    {
                        SCR_TEST_INFO("PPS Resp PPS2 Error: 0x%x vs 0x%x !!\n", pps.pps2,
                            data);
                        break;
                    }
                }
                if (pps.pps0 & (0x1 << 6)) //根据pps0的值,有pps3
                {
                    if (scr_buffer_is_empty(&scr.rxbuf)) //收不到pps3
                    {
                        SCR_TEST_INFO("PPS Resp Too Short 4\n");
                        break;
                    }
                    data = scr_dump_buffer(&scr.rxbuf); //读取pps3
                    printf("pps3:%x  \n", data);
                    if (data != pps.pps3) //检测pps3
                    {
                        SCR_TEST_INFO("PPS Resp PPS3 Error: 0x%x vs 0x%x !!\n", pps.pps3,
                            data);
                        break;
                    }
                }
                if (scr_buffer_is_empty(&scr.rxbuf)) //收不到pck
                {
                    SCR_TEST_INFO("PPS Resp Too Short 5\n");
                    break;
                }
                data = scr_dump_buffer(&scr.rxbuf); //读取pck
                printf("pck:%x  \n", data);
                if (data != pps.pck) //检测pck
                {
                    SCR_TEST_INFO("PPS Resp PCK Error: 0x%x vs 0x%x !!\n", pps.pck, data);
                    break;
                }

                scr_buffer_flush(&scr.rxbuf);
                stage = sts_send_cmd;

                SCR_TEST_INFO(
                    "PPS Response OK!!\n"); //如果上述if中都没有break出来,则表示pps交换成功

                scr.baud_div = (scr.scclk_div + 1) * (scatr.F) / (scatr.D) - 1;
                scr_set_baud_divisor(&scr, pscr->baud_div);
            }
        }
        break;

    case sts_warm_reset:
        scr.atr_resp = SCR_ATR_RESP_INVALID;
        scr_start_warmreset(&scr);
        stage = sts_wait_atr_again;
        break;

    case sts_wait_atr_again:
        if (scr.atr_resp != SCR_ATR_RESP_INVALID) {
            if (scr.atr_resp == SCR_ATR_RESP_OK) /*ATR response is 有效的*/
            {
                uint32_t i = 0;
                SCR_TEST_DBG("ATR : ");
                for (i = 0; i < scr.rxbuf.wptr; i++) {
                    SCR_TEST_DBG("0x%02x ", *((uint8_t*)(scr.rxbuf.buffer + i)));
                    atr_temp[i] = *((uint8_t*)(scr.rxbuf.buffer + i));
                }
                SCR_TEST_DBG(" \n");
                scr.rxbuf.rptr = scr.rxbuf.wptr;
                smartcard_atr_decode(&scatr, (uint8_t*)scr.rxbuf.buffer, &pps, 1);

                for (i = 0; i < SMART_CARD_NUM; i++) {
                    u32 atr_length = ic_card_atr[i][0];
                    for (j = 0; j < atr_length; j++) {
                        if (atr_temp[j] != ic_card_atr[i][j + 1]) {
                            break;
                        }
                    }
                    if (j == atr_length) {
                        card_name = i;
                        atr_cmp = 1;
                        break;
                    } else {
                        atr_cmp = 0;
                    }
                }

                if (atr_cmp) {
                    printf("crad_name = %d\n", card_name);
                    printf("ATR Function PASS!!\n");
                } else {
                    printf("ATR Function FAIL!!\n");
                }

                scr.baud_div = (scr.scclk_div + 1) * (scatr.F) / (scatr.D) - 1;
                scr_set_baud_divisor(&scr, pscr->baud_div);

                scr_buffer_flush(&scr.rxbuf); // clean rxbuffer
                stage = sts_send_cmd;
            } else {
                stage = sts_start_deact;
            }
        }
        break;

    case sts_send_cmd: //这里应该可以加入我们想要的沟通命令
    {
        uint8_t cmp_rlt = 0;
        if (ic_card_send_cmd[card_name][0]) {
            for (i = 0; i < ic_card_send_cmd[card_name][0]; i++) {
                uint8_t send = ic_card_send_cmd[card_name][i + 1];
                scr_write_fifo(&scr, send);
            }
            msleep(1000);
            scr_rx_fifo_read(rsp_temp);

            for (i = 0; i < ic_card_rev_data[card_name][0]; i++) {
                if (rsp_temp[i] != ic_card_rev_data[card_name][i + 1]) {
                    cmp_rlt = 1;
                }
            }
            if (cmp_rlt) {
                printf("Communication Command Error: ");
                for (i = 0; i < ic_card_rev_data[card_name][0]; i++)
                    printf("0x%02x  ", rsp_temp[i]);
                printf("\n");
                scr_ret++;
            } else {
                printf("Communication Command Respone PASS!!\n");
            }
        } else {
            printf("No communication command, No command test!!\n");
            stage = sts_idle;
        }
        msleep(1000);
    } break;
    case sts_start_deact:
        stage = sts_wait_deact;
        scr_start_deactivation(&scr); /* Deactivation */
        msleep(10);
        break;
    case sts_wait_deact:
        if (!scr.activated) {
            stage = sts_wait_disconnect;
            scr_module_rst(SCR_NO);
            scr_params_init();
            smartcard_params_init(&scatr); /*set smart card protocol, v,i,frequency*/
            scr_init(&scr);
        }
        break;
    case sts_wait_disconnect:
        if (!scr.detected)
            stage = sts_wait_connect;

        break;

    case sts_idle:
        msleep(50);
        if (sts_idle == stage)
            stage = sts_idle;
        break;
    default:
        stage = sts_idle;
        break;
    }

    return 0;
}

void scr_data_transfer_test(void)
{
    scr_params_init();
    scr_init(&scr);
    reg_scr0_irq_handler();
    scr_global_interrupt_enable(&scr);
    while (1)
        scr_test_process(&scr);
}

/* s32 scr_test(void) */
int scr_test1(int argc, char** argv)
{
    scr_params_init();
    /*register default check and read write check*/
    scr_system_setup(SCR_NO);

    if (scr_reg_test() != 1)
        return -1;

    /*SCR Control and smart card data transfer test*/
    scr_system_setup(SCR_NO);

    scr_data_transfer_test();

    return 0;
}
FINSH_FUNCTION_EXPORT_CMD(scr_test1, hal_smartcard, smartcard);
```

# USB

USB 驱动主要实现设备驱动的底层细节，并为上层提供一套标准的 API 接口以供使用。USB模块主要特性如下：

- Complies with USB 2.0 Specification
- Supports High-Speed (HS, 480-Mbps), Full-Speed (FS, 12-Mbps), and Low-Speed (LS, 1.5-Mbps) in Host mode
- Supports High-Speed (HS, 480 Mbps), Full-Speed (FS, 12 Mbps) in Device mode
- Supports the UTMI+ Level 3 interface. The 8-bit bidirectional data buses are used
- Supports bi-directional endpoint0 for Control transfer
- Supports up to 8 User-Configurable Endpoints for Bulk, Isochronous and Interrupt bi-directional transfers (Endpoint1, Endpoint2, Endpoint3, Endpoint4)
- Supports up to (4KB+64Bytes) FIFO for EPs (Including EP0)
- Supports High-Bandwidth Isochronous & Interrupt transfers
- Automated splitting/combining of packets for Bulk transfers
- Supports point-to-point and point-to-multipoint transfer in both Host and Peripheral mode
- Includes automatic ping capabilities
- Soft connect/disconnect function
- Performs all transaction scheduling in hardware
- Power Optimization and Power Management capabilities
- Includes interface to an external Normal DMA controller for every Eps

## 模块配置

> R128 仅有一个 USB，HAL 驱动支持两个及以上 USB 外设，故部分配置为空。

```
Kernel Setup --->
    Drivers Setup --->
        SoC HAL Drivers --->
            USB devices --->
                [*] enable USB driver
                [*] USB HOST  --->
                    [*]   Support usb host ehci0 # USB0 配置
                    [*]   Support usb host ohci0
                    [ ]   Support usb host ehci1 # USB1 配置
                    [ ]   Support usb host ohci1 
                    [*]     Mass Storage support
                    [*]       USB CD support
                    [ ]     Carplay host support
                    [ ]     UVC support
                    [ ]     HID support
                [*] USB DEVICE  --->
                    [ ]   enable dma for udc driver
                    [*]   Support usb gadget driver
                        usb gadget driver (adb gadget driver)  --->
                            (X) adb gadget driver
                            ( ) mtp gadget driver
                            ( ) uac gadget driver
                            ( ) ncm gadget driver
                            ( ) msc gadget driver
                [*] USB MANAGER
```

## 源码结构

```
.
├── Kconfig
├── Makefile
├── common               # 公共操作
│   ├── Makefile
│   ├── list_head_ext.c
│   ├── list_head_ext.h
│   ├── usb_init.c
│   ├── usb_init.h
│   ├── usb_phy.c
│   └── usb_phy.h
├── core                 # USB 核心驱动
│   ├── Makefile
│   ├── urb.c
│   ├── urb.h
│   ├── usb_core_base.c
│   ├── usb_core_base.h
│   ├── usb_core_config.c
│   ├── usb_core_config.h
│   ├── usb_core_init.c
│   ├── usb_core_init.h
│   ├── usb_core_interface.c
│   ├── usb_core_interface.h
│   ├── usb_driver_init.c
│   ├── usb_driver_init.h
│   ├── usb_gen_hcd.c
│   ├── usb_gen_hcd.h
│   ├── usb_gen_hcd_rh.c
│   ├── usb_gen_hcd_rh.h
│   ├── usb_gen_hub.c
│   ├── usb_gen_hub.h
│   ├── usb_gen_hub_base.c
│   ├── usb_gen_hub_base.h
│   ├── usb_msg.c
│   ├── usb_msg.h
│   ├── usb_msg_base.c
│   ├── usb_msg_base.h
│   ├── usb_virt_bus.c
│   └── usb_virt_bus.h
├── gadget             # gadget 相关实现
│   ├── Makefile
│   ├── function
│   │   ├── adb.c
│   │   ├── msc
│   │   │   ├── msc.c
│   │   │   ├── scsi.c
│   │   │   ├── scsi.h
│   │   │   ├── usb_slave_msc.c
│   │   │   └── usb_slave_msc.h
│   │   ├── mtp.c
│   │   └── uac.c
│   ├── gadget.c
│   ├── gadget.h
│   └── gadget_hal.c
├── hid                # hid 相关实现
│   ├── Class   
│   │   ├── Hid.c
│   │   ├── HidProtocol.c
│   │   ├── HidProtocol.h
│   │   ├── HidTransport.c
│   │   ├── HidTransport.h
│   │   └── Makefile
│   ├── Client        
│   │   ├── KeyBoard
│   │   │   ├── KeyBoard.c
│   │   │   ├── KeyBoard.h
│   │   │   └── Makefile
│   │   ├── Makefile
│   │   ├── Mouse
│   │   │   ├── Makefile
│   │   │   ├── UsbMouse.c
│   │   │   ├── UsbMouse.h
│   │   │   ├── UsbMouse_DriftControl.c
│   │   │   └── UsbMouse_DriftControl.h
│   │   └── misc_lib.c
│   ├── Include
│   │   ├── Hid.h
│   │   ├── HidFunDrv.h
│   │   ├── HidSpec.h
│   │   ├── Hid_i.h
│   │   └── misc_lib.h
│   └── Makefile
├── host               # Host 驱动
│   ├── Makefile
│   ├── ehci-hcd.c
│   ├── ehci-hub.c
│   ├── ehci-mem.c
│   ├── ehci-q.c
│   ├── ehci-sched.c
│   ├── ehci-sunxi.c
│   ├── ehci-timer.c
│   ├── ehci.h
│   ├── hci_hal.c
│   ├── ohci-hcd.c
│   ├── ohci-hub.c
│   ├── ohci-mem.c
│   ├── ohci-q.c
│   ├── ohci-sunxi.c
│   ├── ohci.h
│   ├── sunxi-hci.c
│   └── sunxi-hci.h
├── include
│   ├── audio.h
│   ├── bitops.h
│   ├── ch11.h
│   ├── ch9.h
│   ├── ehci_def.h
│   ├── endian.h
│   ├── error.h
│   ├── hcd.h
│   ├── mod_devicetable.h
│   ├── mod_usbhost.h
│   ├── storage.h
│   ├── usb.h
│   ├── usb_list.h
│   ├── usb_melis.h
│   ├── usb_os_platform.h
│   └── usb_rtos.h
├── manager           # usb 管理类
│   ├── Makefile
│   ├── sunxi_usb_board.h
│   ├── usb_hw_scan.c
│   ├── usb_hw_scan.h
│   ├── usb_manager.c
│   ├── usb_manager_common.h
│   ├── usb_msg_center.c
│   └── usb_msg_center.h
├── platform          # 芯片平台寄存器定义
│   ├── sun20iw2
│   │   ├── Makefile
│   │   ├── usb_sun20iw2.c
│   │   └── usb_sun20iw2.h
.   .   .
.   .   .
.   .   .
├── storage           # 存储器相关实现
│   ├── Class
│   │   ├── Makefile
│   │   ├── mscProtocol.c
│   │   ├── mscProtocol.h
│   │   ├── mscTransport.c
│   │   ├── mscTransport.h
│   │   ├── mscTransport_i.c
│   │   ├── msc_common.h
│   │   └── usb_msc.c
│   ├── Disk
│   │   ├── BlkDev.c
│   │   ├── BlkDev.h
│   │   ├── CD.c
│   │   ├── CD.h
│   │   ├── Disk.c
│   │   ├── LunMgr.c
│   │   ├── LunMgr_i.h
│   │   ├── Makefile
│   │   └── Scsi2.c
│   ├── Kconfig
│   ├── Makefile
│   ├── Misc
│   │   ├── Makefile
│   │   ├── usbh_buff_manager.c
│   │   ├── usbh_disk_info.c
│   │   └── usbh_disk_remove_time.c
│   └── include
│       ├── LunMgr.h
│       ├── Scsi2.h
│       ├── usb_msc.h
│       ├── usb_msc_i.h
│       ├── usbh_buff_manager.h
│       ├── usbh_disk_info.h
│       └── usbh_disk_remove_time.h
├── udc               # UDC 实现
│   ├── Makefile
│   ├── udc.c
│   ├── udc.h
│   ├── udc_hal.c
│   ├── udc_platform.h
│   ├── usb_dma.c
│   └── usb_dma.h
└── uvc                # UVC 实现
    ├── Class
    │   ├── Makefile
    │   ├── uvc.c
    │   ├── uvc_driver.c
    │   ├── uvc_driver.h
    │   ├── uvc_v4l2.c
    │   ├── uvc_video.c
    │   └── uvc_video.h
    ├── Include
    │   ├── UVC.h
    │   ├── assessibility.h
    │   ├── uvcvideo.h
    │   ├── video.h
    │   └── videodev2.h
    ├── Makefile
    ├── Misc
    │   ├── Makefile
    │   └── assessibility.c
    ├── Webcam
    │   ├── Makefile
    │   ├── usbWebcam.c
    │   ├── usbWebcam.h
    │   ├── usbWebcam_proc.c
    │   └── usbWebcam_proc.h
    └── drv_webcam
        ├── Makefile
        ├── dev_cfg
        │   ├── webcam_dev.c
        │   └── webcam_dev_i.h
        ├── drv_webcam.c
        ├── drv_webcam.h
        ├── drv_webcam_i.h
        ├── fb.h
        └── webcam_core
            ├── dev_webcam.c
            ├── dev_webcam_i.h
            ├── webcam_linklist_manager.c
            └── webcam_linklist_manager.h
```

## 模块接口说明

头文件

```c
#include <sunxi_hal_usb.h>
#include <usb_os_platform.h>
```

### UDC 回调事件结构体

```c
typedef enum {
    UDC_EVENT_RX_STANDARD_REQUEST = 1,
    UDC_EVENT_RX_CLASS_REQUEST = 2,
    UDC_EVENT_RX_DATA = 3,
    UDC_EVENT_TX_COMPLETE = 4,
} udc_callback_event_t;
```

\### UDC 错误返回枚举

```c
typedef enum {
    UDC_ERRNO_SUCCESS = 0,
    UDC_ERRNO_CMD_NOT_SUPPORTED = -1,
    UDC_ERRNO_CMD_INVALID = -2,
    UDC_ERRNO_BUF_NULL = -3,
    UDC_ERRNO_BUF_FULL = -4,
    UDC_ERRNO_EP_INVALID = -5,
    UDC_ERRNO_RX_NOT_READY = -6,
    UDC_ERRNO_TX_BUSY = -7,
} udc_errno_t;
```

### USB 驱动初始化

函数原型

```c
void sunxi_usb_init(void);
```

参数：

- 无

返回值：

- 无

### USB HOST 初始化

函数原型

```c
int hal_usb_core_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB HOST 去初始化

函数原型

```c
int hal_usb_core_exit(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB HOST 加载所有主机驱动（除了0）

函数原型

```c
int hal_usb_hci_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB HOST 去加载所有主机驱动（除了0）

函数原型

```c
int hal_usb_hci_deinit(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB HOST 加载指定主机驱动

函数原型

```c
int hal_usb_hcd_init(int hci_num);
```

参数：

- hci_num：指定主机驱动

返回值：

- 0：成功
- 负数：失败

### USB HOST 去加载指定主机驱动

函数原型

```c
int hal_usb_hcd_deinit(int hci_num);
```

参数：

- hci_num：指定主机驱动

返回值：

- 0：成功
- 负数：失败

### USB HOST PHY 区域显示

函数原型

```c
void hal_hci_phy_range_show(int hci_num);
```

参数：

- hci_num：指定主机驱动

返回值：

- 无

### USB HOST PHY 配置区域

函数原型

```c
void hal_hci_phy_range_set(int hci_num, int val);
```

参数：

- hci_num：指定主机驱动
- val：配置的值

返回值：

- 无

### USB HOST 显示驱动能力

函数原型

```c
void hal_hci_driverlevel_show(int hci_num);
```

参数：

- hci_num：指定主机驱动

返回值：

- 无

### USB HOST 配置驱动能力

函数原型

```c
void hal_hci_driverlevel_adjust(int hci_num, int driverlevel);
```

参数：

- hci_num：指定主机驱动
- driverlevel：配置的驱动能力

返回值：

- 无

### USB HOST 眼图测试

函数原型

```c
void hal_hci_ed_test(int hci_num, const char *buf, unsigned int count);
```

参数：

- hci_num：指定主机驱动
- buf：传输的数据
- count：数据长度

返回值：

- 无

### USB UDC 初始化

函数原型

```c
int32_t hal_udc_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB UDC 去初始化

函数原型

```c
int32_t hal_udc_deinit(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB UDC EP 读操作

函数原型

```c
int32_t hal_udc_ep_read(uint8_t ep_addr, void *buf, uint32_t len);
```

参数：

- ep_addr：ep地址
- buf：读取的数据指针
- len：读取长度

返回值：

- 0：成功
- 负数：失败

### USB UDC EP 写操作

函数原型

```c
int32_t hal_udc_ep_write(uint8_t ep_addr, void *buf , uint32_t len);
```

参数：

- ep_addr：ep地址
- buf：读取的数据指针
- len：读取长度

返回值：

- 0：成功
- 负数：失败

### USB UDC 初始化设备描述符

函数原型

```c
void hal_udc_device_desc_init(void *device_desc);
```

参数：

- device_desc：设备描述符数据

返回值：

- 无

### USB UDC 配置描述符初始化

函数原型

```c
void hal_udc_config_desc_init(void *config_desc, uint32_t len);
```

参数：

- config_desc：配置描述符指针
- len：长度

返回值：

- 无

### USB UDC 字符串描述符初始化

函数原型

```c
void hal_udc_string_desc_init(const void *string_desc);
```

参数：

- string_desc：配置字符串描述符的指针

返回值：

- 无

### USB UDC 注册回调函数

函数原型

```c
void hal_udc_register_callback(udc_callback_t user_callback);
```

参数：

- user_callback：回调函数

返回值：

- 无

### USB UDC 禁用 EP

函数原型

```c
void hal_udc_ep_disable(uint8_t ep_addr);
```

参数：

- ep_addr：地址

返回值：

- 无

### USB UDC 启用 EP

函数原型

```c
void hal_udc_ep_enable(uint8_t ep_addr, uint16_t maxpacket, uint32_t ts_type);
```

参数：

- ep_addr：地址
- maxpacket：最大包大小
- ts_type：模式

返回值：

- 无

### USB UDC 设置 EP 发送/接收 buffer

函数原型

```c
void hal_udc_ep_set_buf(uint8_t ep_addr, void *buf, uint32_t len);
```

参数：

- ep_addr：地址
- buf：buf的指针
- len：buf的长度

返回值：

- 无

### USB UDC 显示驱动能力

函数原型

```c
void hal_udc_driverlevel_show(void);
```

参数：

- 无

返回值：

- 无

### USB UDC 调整驱动能力

函数原型

```c
void hal_udc_driverlevel_adjust(int driverlevel);
```

参数：

- driverlevel：驱动能力

返回值：

- 无

### USB UDC 显示范围

函数原型

```c
void hal_udc_phy_range_show(int usbc_num);
```

参数：

- usbc_num：usb控制器号

返回值：

- 无

### USB UDC 配置范围

函数原型

```c
void hal_udc_phy_range_set(int usbc_num, int val);
```

参数：

- usbc_num：usb控制器号
- val：值

返回值：

- 无

### USB UDC 眼图测试

函数原型

```c
void hal_udc_ed_test(const char *buf, size_t count);
```

参数：

- buf：测试使用的buf
- count：数量

返回值：

- 无

### USB Manager 初始化

函数原型

```c
int hal_usb_manager_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB Manager 去初始化

函数原型

```c
int hal_usb_manager_deinit(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB Gadget 初始化

函数原型

```c
int hal_gadget_init(void);
```

参数：

- 无

返回值：

- 0：成功
- 负数：失败

### USB Gadget 去初始化

函数原型

```c
void hal_gadget_exit(void);
```

参数：

- 无

返回值：

- 无

### USB Gadget 启用功能

函数原型

```c
int usb_gadget_function_enable(const char *name);
```

参数：

- name：功能名

返回值：

- 0：成功
- 负数：失败

### USB Gadget 禁用功能

函数原型

```c
int usb_gadget_function_disable(const char *name);
```

参数：

- name：功能名

返回值：

- 0：成功
- 负数：失败

### USB Gadget 读取

函数原型

```c
int usb_gadget_function_read(int ep_idx, char *buf, int size);
```

参数：

- ep_idx：端点号
- buf：buf指针
- size：buf的大小

返回值：

- 0：成功
- 负数：失败

### USB Gadget 限时读取

函数原型

```c
int usb_gadget_function_read_timeout(int ep_idx, char *buf, int size, int ms);
```

参数：

- ep_idx：端点号
- buf：buf指针
- size：buf的大小
- ms：超时时间

返回值：

- 0：成功
- 负数：失败

### USB Gadget 写数据

函数原型

```c
int usb_gadget_function_write(int ep_idx, char *buf, int size);
```

参数：

- ep_idx：端点号
- buf：buf指针
- size：buf的大小

返回值：

- 0：成功
- 负数：失败

### USB Gadget 写字符串

函数原型

```c
int usb_gadget_function_string_set(char *name, char *str, unsigned int idx);
```

参数：

- name：名称
- str：字符串指针
- idx：端点号

返回值：

- 0：成功
- 负数：失败

## 模块使用范例

### 测试用例公共头文件

```
usb_test.h
#ifndef USB_TEST_H
#define USB_TEST_H

#include <sunxi_hal_usb.h>
#include <usb_os_platform.h>

#ifdef __cplusplus
extern "C" {
#endif

int usb_test_cmd_hci(int argc, const char **argv);
int usb_test_cmd_udc(int argc, const char **argv);
int usb_test_cmd_phy_range(int argc, const char **argv);
int usb_test_cmd_ed_test(int argc, const char **argv);
int usb_test_cmd_debug(int argc, const char **argv);
int usb_test_cmd_uvc(int argc, const char **argv);


int usb_test_is_otg(int port);
int usb_test_get_port(const char *buf, int *port);
void usb_test_show_help(void);

unsigned char usb_core_is_enabled(void);
unsigned char sunxi_ehci_status_get(void);

#ifdef __cplusplus
}
#endif

#endif // USB_TEST_H
```

### HCI 测试实现实现

```c
#include "usb_test.h"

int usb_test_cmd_hci(int argc, const char **argv)
{
    int c;
    int hci_num = 0;
    unsigned int port = 0;

    if (argc == 4) {
        // insmod/rmmod indicate host driver
        if (usb_test_get_port(argv[3], &port))
            return 0;
    } else if (argc == 3) {
        // insmod/rmmod all host driver
        port = 0xffff;
    } else
        return -1;

    while ((c = getopt(argc, (char *const *)argv, "ir")) != -1) {
        switch (c) {
        case 'i':
#ifdef CONFIG_HAL_TEST_UDC
            /*otg mode rmmod device driver before insmod hci*/
            if (usb_test_is_otg(port)) {
                printf("[usb0] rmmod device driver!\n");
                hal_gadget_exit();
            }
#endif
            if (!usb_core_is_enabled())
                hal_usb_core_init();

            if (port == 0xffff)
                for (hci_num = 0; hci_num < USB_MAX_CONTROLLER_COUNT; hci_num++)
                    hal_usb_hcd_init(hci_num);
            else
                hal_usb_hcd_init(port);
            break;
        case 'r':
            if (port == 0xffff)
                for (hci_num = 0; hci_num < USB_MAX_CONTROLLER_COUNT; hci_num++)
                    hal_usb_hcd_deinit(hci_num);
            else
                hal_usb_hcd_deinit(port);

            if (usb_core_is_enabled() && !sunxi_ehci_status_get())
                hal_usb_core_exit();
            break;
        default:
            printf("ERR: insmod/rmmod error!\n");
            usb_test_show_help();
            break;
        }
    }

    return 0;
}

int usb_test_cmd_debug(int argc, const char **argv)
{
    int enable = 0;

    if (argc != 3)
        return -1;

    enable = atoi(argv[2]);
    if (enable == 1 || enable == 0) {
        hal_usb_hcd_debug_set(enable);
        printf("USB debug %s!\n", hal_usb_hcd_debug_get() ? "open" : "close");
        return 0;
    }

    return -1;
}
```

### MSG 测试用例实现

```c
#include <inttypes.h>

#include "usb.h"
#include "ch9.h"
#include "storage.h"
#include "usb_os_platform.h"


struct usb_msg_dev {
    uint8_t max_lun;
    uint8_t cbw[32];
};

static struct usb_device_descriptor demo_device_desc = {
    .bLength = USB_DT_DEVICE_SIZE,
    .bDescriptorType = USB_DT_DEVICE,
    .bcdUSB = 0x0200,
    .bDeviceClass = 0,
    .bDeviceSubClass = 0,
    .bDeviceProtocol = 0,
    .bMaxPacketSize0 = 64,
    .idVendor = 0x18d1,
    .idProduct = 0x0001,
    .bcdDevice = 0x0001,
    .iManufacturer = 0x01,
    .iProduct = 0x02,
    .iSerialNumber = 0x03,
    .bNumConfigurations = 1
};

static struct usb_config_descriptor demo_config_desc = {
    .bLength = USB_DT_CONFIG_SIZE,
    .bDescriptorType = USB_DT_CONFIG,
    .wTotalLength = 32, /* FIXME */
    .bNumInterfaces = 1,
    .bConfigurationValue = 1,
    .iConfiguration = 0,
    .bmAttributes = 0x80,
    .bMaxPower = 0x64 /* 200mA */
};

static struct usb_interface_descriptor demo_intf_desc = {
    .bLength = USB_DT_INTERFACE_SIZE,
    .bDescriptorType = USB_DT_INTERFACE,
    .bInterfaceNumber = 0x0,
    .bAlternateSetting = 0x0,
    .bNumEndpoints = 2,
    .bInterfaceClass = 0x08, /* Mass Storage class */
    .bInterfaceSubClass = 0x06, /* SCSI Transparent Subclass */
    .bInterfaceProtocol = 0x50, /* Bulk-Only Protocol */
    .iInterface = 0
};

static struct usb_endpoint_descriptor demo_ep_bulk_out = {
    .bLength = USB_DT_ENDPOINT_SIZE,
    .bDescriptorType = USB_DT_ENDPOINT,
    .bEndpointAddress = 0x1 | USB_DIR_OUT,
    .bmAttributes = USB_ENDPOINT_XFER_BULK,
    .wMaxPacketSize = 0x0200, /* 512 Bytes */
    .bInterval = 0
};

static struct usb_endpoint_descriptor demo_ep_bulk_in = {
    .bLength = USB_DT_ENDPOINT_SIZE,
    .bDescriptorType = USB_DT_ENDPOINT,
    .bEndpointAddress = 0x1 | USB_DIR_IN,
    .bmAttributes = USB_ENDPOINT_XFER_BULK,
    .wMaxPacketSize = 0x0200, /* 512 Bytes */
    .bInterval = 0
};

/*
 * String descriptors
 */
static const uint16_t g_str_lang_id[] = {
    0x0304, 0x0409
};

static const uint16_t g_str_manufacturer[] = {
    0x030e, 'G', 'o', 'o', 'g', 'l', 'e'
};

static const uint16_t g_str_product[] = {
    0x0308, 'M', 's', 'g'
};

static const uint16_t g_str_serialnumber[] = {
    0x0314, '2', '0', '0', '8', '0', '4', '1', '1'
};

struct usb_msg_dev g_msg_dev = {
    .max_lun = 0,
};

static void *g_config_desc = NULL;

void usb_msg_desc_init(void)
{
    uint32_t config_desc_len;
    void *buf;

    config_desc_len = demo_config_desc.bLength + demo_intf_desc.bLength
            + demo_ep_bulk_out.bLength + demo_ep_bulk_in.bLength;

    g_config_desc = malloc(config_desc_len);

    /* compose configuation, interface and endpoint descriptors */
    buf = g_config_desc;
    memcpy(buf, &demo_config_desc, demo_config_desc.bLength);
    buf += demo_config_desc.bLength;
    memcpy(buf, &demo_intf_desc, demo_intf_desc.bLength);
    buf += demo_intf_desc.bLength;
    memcpy(buf, &demo_ep_bulk_out, demo_ep_bulk_out.bLength);
    buf += demo_ep_bulk_out.bLength;
    memcpy(buf, &demo_ep_bulk_in, demo_ep_bulk_in.bLength);

    hal_udc_device_desc_init(&demo_device_desc);
    hal_udc_config_desc_init(g_config_desc, config_desc_len);
    /* FIXME: string descriptors must be initialized in the following order now */
    hal_udc_string_desc_init(g_str_lang_id);
    hal_udc_string_desc_init(g_str_manufacturer);
    hal_udc_string_desc_init(g_str_product);
    hal_udc_string_desc_init(g_str_serialnumber);
}

static void usb_msg_ep_init(void)
{
    hal_log_info("usb demo ep init...\n");

    /* init bulk-in ep */
    hal_udc_ep_enable(demo_ep_bulk_in.bEndpointAddress,
            demo_ep_bulk_in.wMaxPacketSize,
            demo_ep_bulk_in.bmAttributes & USB_ENDPOINT_XFERTYPE_MASK);

    /* initialise bulk-out ep buf in order to get the first CBW */
    hal_udc_ep_set_buf(demo_ep_bulk_out.bEndpointAddress,
            g_msg_dev.cbw,
            sizeof(g_msg_dev.cbw));

    /* init bulk-out ep */
    hal_udc_ep_enable(demo_ep_bulk_out.bEndpointAddress,
            demo_ep_bulk_out.wMaxPacketSize,
            demo_ep_bulk_out.bmAttributes & USB_ENDPOINT_XFERTYPE_MASK);
}

static udc_errno_t usb_msg_class_request_handler(struct usb_ctrlrequest *crq)
{
    udc_errno_t ret = UDC_ERRNO_SUCCESS;

    switch(crq->bRequest) {
    case US_BULK_RESET_REQUEST:
        /* TODO */
        break;
    case US_BULK_GET_MAX_LUN:
        hal_log_info("get MAX_LUN\r\n");

        if (crq->bRequestType !=
                (USB_DIR_IN | USB_TYPE_CLASS | USB_RECIP_INTERFACE)) {
            ret = UDC_ERRNO_CMD_INVALID;
            break;
        }
        /* FIXME: a fake response for demo */
        hal_udc_ep_write(0, &g_msg_dev.max_lun, sizeof(g_msg_dev.max_lun));
        break;
    default:
        ret = UDC_ERRNO_CMD_INVALID;
        break;
    }

    return ret;
}

static udc_errno_t usb_msg_standard_request_handler(struct usb_ctrlrequest *crq)
{
    udc_errno_t ret = UDC_ERRNO_SUCCESS;

    switch (crq->bRequest) {
    case USB_REQ_SET_CONFIGURATION:
        /* FIXME: usb msg driver should be independent of demo code */
        usb_msg_ep_init();
        break;
    default:
        ret = UDC_ERRNO_CMD_INVALID;
        break;
    }

    return ret;
}

static udc_errno_t usb_msg_scsi_cmd_handler(struct bulk_cb_wrap *cbw)
{
    udc_errno_t ret = UDC_ERRNO_SUCCESS;
    uint8_t opcode = cbw->CDB[0];
    uint8_t fake_rsp[36] = {0x00, 0x80, 0x02, 0x02, 0x1F, 0x00, 0x00,
            0x00, 0x54, 0x69, 0x6e, 0x61, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20,
            0x20, 0x20, 0x20, 0x20, 0x20};

    hal_log_info("scsi cmd opcode: 0x%x\n", opcode);

    switch (opcode) {
    case 0x12: /* INQUIRY */
        /* FIXME: a fake response for demo */
        hal_udc_ep_write(demo_ep_bulk_in.bEndpointAddress, fake_rsp, sizeof(fake_rsp));
        break;
    default:
        ret = UDC_ERRNO_CMD_INVALID;
        break;
    }

    return ret;
}

udc_errno_t usb_msg_callback(uint8_t ep_addr, udc_callback_event_t event, void *data, uint32_t len)
{
    uint8_t ep_idx;
    uint8_t is_in;
    udc_errno_t ret = UDC_ERRNO_SUCCESS;
    struct usb_ctrlrequest *crq;
    struct bulk_cb_wrap *cbw;

    hal_log_info("usb_msg_callback event: %"PRIu32", len: %"PRIu32"\n", event, len);

    ep_idx = ep_addr & 0x7f;
    is_in = ep_addr & USB_DIR_IN;

    if (ep_idx == 0) { /* handle ep0 */
        crq = (struct usb_ctrlrequest *)data;

        switch (event) {
        case UDC_EVENT_RX_STANDARD_REQUEST:
            ret = usb_msg_standard_request_handler(crq);
            break;
        case UDC_EVENT_RX_CLASS_REQUEST:
            ret = usb_msg_class_request_handler(crq);
            break;
        default:
            ret = UDC_ERRNO_CMD_NOT_SUPPORTED;
            break;
        }
    } else { /* handle ep1~4 */
        if (is_in) {
            /* TODO: maybe useless? */
        } else {
            cbw = (struct bulk_cb_wrap *)data;

            switch (event) {
            case UDC_EVENT_RX_DATA:
                usb_msg_scsi_cmd_handler(cbw);
                break;
            default:
                ret = UDC_ERRNO_CMD_NOT_SUPPORTED;
                break;
            }
        }
    }

    return ret;
}
```

### PHY 驱动测试实现

```c
#include "usb_test.h"

static void __usb_ed_test(int port, const char *buf)
{
    if (usb_test_is_otg(port)) { /*otg mode*/
#ifdef CONFIG_HAL_TEST_UDC
        hal_udc_ed_test(buf, strlen(buf));
#else
        printf("ERR: udc config not find!\n");
#endif

    } else {
#ifdef CONFIG_HAL_TEST_HCI
        hal_hci_ed_test(port, buf, strlen(buf));
#else
        printf("ERR: hci config not find!\n");
#endif
    }
}

static void __phy_range_set(int port, int val)
{
    if (usb_test_is_otg(port)) { /*otg mode*/
#ifdef CONFIG_HAL_TEST_UDC
        hal_udc_phy_range_set(port, val);
#else
        printf("ERR: udc config not find!\n");
#endif
    } else {
#ifdef CONFIG_HAL_TEST_HCI
        hal_hci_phy_range_set(port, val);
#else
        printf("ERR: hci config not find!\n");
#endif
    }
}

static void __phy_range_show(int port)
{
    if (usb_test_is_otg(port)) { /*otg mode*/
#ifdef CONFIG_HAL_TEST_UDC
        hal_udc_phy_range_show(port);
#else
        printf("ERR: udc config not find!\n");
#endif
    } else {
#ifdef CONFIG_HAL_TEST_HCI
        hal_hci_phy_range_show(port);
#else
        printf("ERR: hci config not find!\n");
#endif
    }
}


int usb_test_cmd_ed_test(int argc, const char **argv)
{
    int port = 0;

    if (argc != 4)
        return -1;

    if (usb_test_get_port(argv[2], &port))
        return 0;

    __usb_ed_test(port, argv[3]);
    return 0;
}

int usb_test_cmd_phy_range(int argc, const char **argv)
{
    int c;
    int val;
    int port;

    if ((argc != 4) && (argc != 5))
        return -1;

    if (usb_test_get_port(argv[3], &port))
        return 0;

    if (usb_test_is_otg(port)) {
        printf("\nOTG%d phy range\n", port);
    } else
        printf("\nEHCI%d phy range\n", port);

    while ((c = getopt(argc, (char *const *)argv, "sg")) != -1) {
        switch (c) {
        case 's':
            if(argc == 5)
                val = strtol(argv[4], NULL, 16);
            else
                return -1;

            __phy_range_set(port, val);
            break;
        case 'g':
            __phy_range_show(port);
            break;
        default:
            printf("ERR: phy_range cmd error!\n");
            usb_test_show_help();
            break;
        }
    }
    return 0;
}
```

### USB UDC 测试用例实现

```c
#include "usb_test.h"

int usb_test_cmd_udc(int argc, const char **argv)
{
    int c;
    if ((argc != 3) && (argc != 4))
        return -1;

    while ((c = getopt(argc, (char *const *)argv, "ir")) != -1) {
        switch (c) {
        case 'i':
#ifdef CONFIG_HAL_TEST_HCI
            // rmmod host driver before insmod otg
            if (usb_test_is_otg(0) == 0) /*hci mode*/
                hal_usb_hcd_deinit(0);
#endif
            printf("[usb0] insmod device driver!\n");
            hal_gadget_init();
            break;
        case 'r':
            printf("[usb0] rmmod device driver!\n");
            hal_gadget_exit();
            break;
        default:
            printf("err: insmod/rmmod error!\n");
            usb_test_show_help();
            break;
        }
    }

    return 0;
}
```

### USB UVC 测试用例实现

```c
#include <sys/ioctl.h>
#include <fcntl.h>

#include "usb_test.h"
#include "uvcvideo.h"

static int save_frame_to_file(void *str, void *start, int length)
{
    FILE *fp = NULL;

    fp = fopen(str, "wb+"); //save more frames
    if (!fp) {
        printf(" Open %s error\n", (char *)str);

        return -1;
    }

    if (fwrite(start, length, 1, fp)) {
        fclose(fp);

        return 0;
    } else {
        printf(" Write file fail (%s)\n", strerror(errno));
        fclose(fp);

        return -1;
    }

    return 0;
}

int usb_test_cmd_uvc(int argc, const char **argv)
{
    int fd;
    struct v4l2_capability cap;      /* Query device capabilities */
    struct v4l2_streamparm parms;    /* set streaming parameters */
    struct v4l2_format fmt;          /* try a format */
    struct v4l2_requestbuffers req;  /* Initiate Memory Mapping or User Pointer I/O */
    struct v4l2_buffer buf;          /* Query the status of a buffer */
    enum v4l2_buf_type type;
    int n_buffers;
    char source_data_path[64];
    int np;

    /* 1.open /dev/videoX node */
    fd = open("/dev/video", O_RDWR);

    /* 2.Query device capabilities */
    memset(&cap, 0, sizeof(cap));
    if (ioctl(fd, VIDIOC_QUERYCAP, &cap) < 0) {
        printf(" Query device capabilities fail!!!\n");
    } else {
        printf(" Querey device capabilities succeed\n");
        printf(" cap.driver=%s\n", cap.driver);
        printf(" cap.card=%s\n", cap.card);
        printf(" cap.bus_info=%s\n", cap.bus_info);
        printf(" cap.version=0x%08x\n", cap.version);
        printf(" cap.capabilities=0x%08x\n", cap.capabilities);
    }

    /* 7.set streaming parameters */
    memset(&parms, 0, sizeof(struct v4l2_streamparm));
    parms.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    parms.parm.capture.timeperframe.numerator = 1;
    parms.parm.capture.timeperframe.denominator = 30;
    if (ioctl(fd, VIDIOC_S_PARM, &parms) < 0) {
        printf(" Setting streaming parameters failed, numerator:%d denominator:%d\n",
               parms.parm.capture.timeperframe.numerator,
               parms.parm.capture.timeperframe.denominator);
        close(fd);
        return -1;
    }

    /* 9.set the data format */
    memset(&fmt, 0, sizeof(struct v4l2_format));
    fmt.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    fmt.fmt.pix.width = 1280;
    fmt.fmt.pix.height = 720;
    fmt.fmt.pix.pixelformat = V4L2_PIX_FMT_MJPEG;
    fmt.fmt.pix.field = V4L2_FIELD_INTERLACED;

    if (ioctl(fd, VIDIOC_S_FMT, &fmt) < 0) {
        printf(" setting the data format failed!\n");
        close(fd);
        return -1;
    }

    /* 10.Initiate Memory Mapping or User Pointer I/O */
    memset(&req, 0, sizeof(struct v4l2_requestbuffers));
    req.count = 3;
    req.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    req.memory = V4L2_MEMORY_MMAP;
    if (ioctl(fd, VIDIOC_REQBUFS, &req) < 0) {
        printf(" VIDIOC_REQBUFS failed\n");
        close(fd);
        return -1;
    }

    /* 11.Exchange a buffer with the driver */
    for (n_buffers = 0; n_buffers < req.count; n_buffers++) {
        memset(&buf, 0, sizeof(struct v4l2_buffer));

        buf.index = n_buffers;
        if (ioctl(fd, VIDIOC_QBUF, &buf) == -1) {
            printf(" VIDIOC_QBUF error\n");

            close(fd);
            return -1;
        }
    }

    /* streamon */
    type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    if (ioctl(fd, VIDIOC_STREAMON, &type) == -1) {
        printf(" VIDIOC_STREAMON error! %s\n", strerror(errno));
    } else
        printf(" stream on succeed\n");

    np = 0;
    while (np < 5) {
        printf(" camera capture num is [%d]\n", np);

        /* wait uvc frame */
        memset(&buf, 0, sizeof(struct v4l2_buffer));

        if (ioctl(fd, VIDIOC_DQBUF, &buf) == -1) {
            printf(" VIDIOC_DQBUF error\n");

            goto EXIT;
        } else
            printf("*****DQBUF[%d] FINISH*****\n", buf.index);

        sprintf(source_data_path, "/data/source_frame_%d.jpg", np);
        save_frame_to_file(source_data_path, (void *)buf.mem_buf, buf.length);

        if (ioctl(fd, VIDIOC_QBUF, &buf) == -1) {
            printf(" VIDIOC_QBUF error\n");

            goto EXIT;
        } else
            printf("************QBUF[%d] FINISH**************\n\n", buf.index);

        np++;
    }

    printf("\n\n Capture thread finish\n");

EXIT:
    type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    ioctl(fd, VIDIOC_STREAMOFF, &type);

    memset(&req, 0, sizeof(struct v4l2_requestbuffers));
    req.count = 0;
    req.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    req.memory = V4L2_MEMORY_MMAP;
    ioctl(fd, VIDIOC_REQBUFS, &req);

    close(fd);

    return 0;
}
```

### USB 测试用例

```c
#include "usb_test.h"

void usb_test_show_help(void)
{
    printf("\nUsage:\n"\
        "\tusb hci {-i|-r} [<port>]\n"\
        "\tusb udc {-i|-r} [<port>]\n"\
        "\tusb phy_range {-s|-g} {<port>} [<phyrange>]\n"\
        "\tusb ed_test {<port>} {<type>}\n"\
        "\tusb debug {<status>}\n"\
        "\tusb uvc_test\n"\
        "\n\t- - - - - - - - - - - - - - - - - - - - -\n"\
        "Meaning:\n"\
        "\t-i:insmod, -r:rmmod, -s:set, -g:get\n"\
        "\n"\
        "\tport     : [0-%d],port number\n"\
        "\tphyrange : [0x0-0x1f],phy range\n"\
        "\tstatus   : [0-disable,1-enable],hci debug status\n"\
        "\ttype     : [test_j_state/test_k_state/test_se0_nak/test_pack]--hci & otg\n"\
        "\t           [test_not_operating/test_force_enable/test_mask]--hci only\n"\
        "\n\t==>> More information refer to spec <<==\n",
        USB_MAX_CONTROLLER_COUNT - 1);
}

int usb_test_is_otg(int port)
{
#if defined(CONFIG_HAL_TEST_HCI)
    if (port == 0 && !(sunxi_ehci_status_get() & 0x1)) /*otg mode*/
#else
    if (port == 0)
#endif
        return 1;
    else
        return 0;
}

int usb_test_get_port(const char *buf, int *port)
{
    *port = atoi(buf);
    if (*port > USB_MAX_CONTROLLER_COUNT - 1) {
        printf("ERR: port(%d) choose error! Port range [0-%d]\n", *port,
            USB_MAX_CONTROLLER_COUNT - 1);
        return -1;
    }

    return 0;
}

static int usb_test_command_hci(int argc, const char **argv)
{
#if defined(CONFIG_HAL_TEST_HCI)
    return usb_test_cmd_hci(argc, argv);
#else
    printf("ERR: Can't find command config!\n");
    return -1;
#endif
}

static int usb_test_command_udc(int argc, const char **argv)
{
#if defined(CONFIG_HAL_TEST_UDC)
    return usb_test_cmd_udc(argc, argv);
#else
    printf("ERR: Can't find command config!\n");
    return -1;
#endif
}

static int usb_test_command_phy_range(int argc, const char **argv)
{
    return usb_test_cmd_phy_range(argc, argv);
}

static int usb_test_command_ed_test(int argc, const char **argv)
{
    return usb_test_cmd_ed_test(argc, argv);
}

static int usb_test_command_debug(int argc, const char **argv)
{
#if defined(CONFIG_HAL_TEST_HCI)
    return usb_test_cmd_debug(argc, argv);
#else
    printf("ERR: Can't find command config!\n");
    return -1;
#endif
}

static int usb_test_command_uvc(int argc, const char **argv)
{
#if defined(CONFIG_HAL_TEST_UVC)
    // return usb_test_cmd_uvc(argc, argv);
    usb_test_cmd_uvc(argc, argv);/* -1 has other meaning in this case*/
    return 0;
#else
    printf("ERR: Can't find command config!\n");
    return -1;
#endif
}

static int usb_test_command(int argc, const char **argv)
{
    int ret = -1;
    if (argc < 2) {
        printf("ERR: command error\n");
        usb_test_show_help();
        return -1;
    }

    if (!strcmp(argv[1], "hci"))
        ret = usb_test_command_hci(argc, argv);
    else if (!strcmp(argv[1], "udc"))
        ret = usb_test_command_udc(argc, argv);
    else if (!strcmp(argv[1], "phy_range"))
        ret = usb_test_command_phy_range(argc, argv);
    else if (!strcmp(argv[1], "ed_test"))
        ret = usb_test_command_ed_test(argc, argv);
    else if (!strcmp(argv[1], "debug"))
        ret = usb_test_command_debug(argc, argv);
    else if (!strcmp(argv[1], "uvc_test"))
        ret = usb_test_command_uvc(argc, argv);


    if (ret == 0)
        return 0;

    usb_test_show_help();
    return -1;
}

FINSH_FUNCTION_EXPORT_CMD(usb_test_command, usb, usb tests)
```

