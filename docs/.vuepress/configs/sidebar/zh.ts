import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    '/zh/Introduction/': [
        {
          text: 'R128入门基础',
          collapsible: true,
          children: [
            '/zh/Introduction/chapter1.md',
          ],
        },
      ],
}
