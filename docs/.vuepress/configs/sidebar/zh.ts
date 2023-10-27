import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    '/zh/rtos/quick-start/': [
        {
          text: '芯片概述',
          collapsible: true,
          children: [
            '/zh/rtos/quick-start/part1/chapter1.md',
            '/zh/rtos/quick-start/part1/chapter2.md',
            '/zh/rtos/quick-start/part1/chapter3.md',
          ],
        },
        {
          text: '硬件上手',
          collapsible: true,
          children: [
            '/zh/rtos/quick-start/part2/chapter1.md',
            '/zh/rtos/quick-start/part2/chapter2.md',
            '/zh/rtos/quick-start/part2/chapter3.md',
            '/zh/rtos/quick-start/part2/chapter4.md',
          ],
        },
        {
          text: 'SDK入门',
          collapsible: true,
          children: [
            '/zh/rtos/quick-start/part3/chapter1.md',
            '/zh/rtos/quick-start/part3/chapter2.md',
            '/zh/rtos/quick-start/part3/chapter3.md',
            '/zh/rtos/quick-start/part3/chapter4.md',
            '/zh/rtos/quick-start/part3/chapter5.md',
            '/zh/rtos/quick-start/part3/chapter6.md',
          ],
        },
        {
          text: '软件配置',
          collapsible: true,
          children: [
            '/zh/rtos/quick-start/part4/chapter1.md',
            '/zh/rtos/quick-start/part4/chapter2.md',
          ],
        },
        {
          text: '外设模块配置',
          collapsible: true,
          children: [
            '/zh/rtos/quick-start/part5/chapter1.md',
            '/zh/rtos/quick-start/part5/chapter2.md',
            '/zh/rtos/quick-start/part5/chapter3.md',
          ],
        },
      ],
}
