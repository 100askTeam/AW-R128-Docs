import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarZh: NavbarConfig = [
  {
    text: '基础入门',
    link: '/zh/rtos/quick-start/part1/chapter1.md',
  },
  {
    text: '开发指南',
    link: '/zh/rtos/developer-guide/part1/chapter1.md',
  },
  {
    text: `学习套件`,
    children: [
      {
        text: 'DShanMCU-R128学习套件（全志R128-S2/S3主控芯片）',
        link: 'https://item.taobao.com/item.htm?id=736154682975',
      },
    ],
  },
  {
    text: `关于我们`,
    children: [
      {
        text: '百问网在线学习平台',
        link: 'https://www.100ask.net',
      },
      {
        text: '淘宝店铺',
        link: 'https://100ask.taobao.com',
      },
      {
        text: '答疑交流社区',
        link: 'https://forums.100ask.net',
      },
      {
        text: '哔哩哔哩',
        link: 'https://space.bilibili.com/275908810',
      },
    ],
  },
  
]
