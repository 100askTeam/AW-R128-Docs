import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    '/zh/quick-start/': [
        {
          text: '芯片概述',
          collapsible: true,
          children: [
            '/zh/quick-start/part1/chapter1.md',
            '/zh/quick-start/part1/chapter2.md',
            '/zh/quick-start/part1/chapter3.md',
          ],
        },
      ],
}
