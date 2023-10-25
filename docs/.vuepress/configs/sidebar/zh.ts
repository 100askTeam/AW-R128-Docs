import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    '/zh/quick-start/chip-introduction/': [
        {
          text: '芯片概述',
          collapsible: true,
          children: [
            '/zh/quick-start/chip-introduction/chapter1.md',
            '/zh/quick-start/chip-introduction/chapter2.md',
            '/zh/quick-start/chip-introduction/chapter3.md',
          ],
        },
      ],
}
