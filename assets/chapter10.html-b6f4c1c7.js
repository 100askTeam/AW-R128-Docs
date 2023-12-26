const i=JSON.parse('{"key":"v-5cd03b16","path":"/zh/rtos/developer-guide/part1/chapter10.html","title":"Wi-Fi - Wi-Fi Manager","lang":"中文简体","frontmatter":{},"headers":[{"level":2,"title":"Wi-Fi 简介","slug":"wi-fi-简介","link":"#wi-fi-简介","children":[{"level":3,"title":"Wi‑Fi 工作的几种模式","slug":"wi‐fi-工作的几种模式","link":"#wi‐fi-工作的几种模式","children":[]},{"level":3,"title":"代码路径","slug":"代码路径","link":"#代码路径","children":[]},{"level":3,"title":"配置介绍","slug":"配置介绍","link":"#配置介绍","children":[]}]},{"level":2,"title":"Wi-Fi Manager 简介","slug":"wi-fi-manager-简介","link":"#wi-fi-manager-简介","children":[{"level":3,"title":"Wi-Fi Manager 框架","slug":"wi-fi-manager-框架","link":"#wi-fi-manager-框架","children":[]},{"level":3,"title":"Wi-Fi Manager 代码目录结构","slug":"wi-fi-manager-代码目录结构","link":"#wi-fi-manager-代码目录结构","children":[]}]},{"level":2,"title":"Wi-Fi Manager 核心代码","slug":"wi-fi-manager-核心代码","link":"#wi-fi-manager-核心代码","children":[{"level":3,"title":"Wi-Fi Manager 核心代码目录结构","slug":"wi-fi-manager-核心代码目录结构","link":"#wi-fi-manager-核心代码目录结构","children":[]}]},{"level":2,"title":"Wi-Fi Manager 核心代码关键结构体说明","slug":"wi-fi-manager-核心代码关键结构体说明","link":"#wi-fi-manager-核心代码关键结构体说明","children":[{"level":3,"title":"定义Wi-Fi Manager 的错误码","slug":"定义wi-fi-manager-的错误码","link":"#定义wi-fi-manager-的错误码","children":[]},{"level":3,"title":"定义Wi-Fi Manager 支持的模式","slug":"定义wi-fi-manager-支持的模式","link":"#定义wi-fi-manager-支持的模式","children":[]},{"level":3,"title":"定义Wi-Fi Manager 网络接口状态","slug":"定义wi-fi-manager-网络接口状态","link":"#定义wi-fi-manager-网络接口状态","children":[]},{"level":3,"title":"定义Wi-Fi Manager 收到的消息类型","slug":"定义wi-fi-manager-收到的消息类型","link":"#定义wi-fi-manager-收到的消息类型","children":[]},{"level":3,"title":"定义Wi-Fi Manager 的加密方式","slug":"定义wi-fi-manager-的加密方式","link":"#定义wi-fi-manager-的加密方式","children":[]},{"level":3,"title":"定义Wi-Fi Manager station 模式的状态","slug":"定义wi-fi-manager-station-模式的状态","link":"#定义wi-fi-manager-station-模式的状态","children":[]},{"level":3,"title":"定义Wi-Fi Manager station 模式在连接过程中的事件","slug":"定义wi-fi-manager-station-模式在连接过程中的事件","link":"#定义wi-fi-manager-station-模式在连接过程中的事件","children":[]},{"level":3,"title":"定义 Wi-Fi Manager station 模式的一些信息","slug":"定义-wi-fi-manager-station-模式的一些信息","link":"#定义-wi-fi-manager-station-模式的一些信息","children":[]},{"level":3,"title":"定义Wi-Fi Manager station 模式保存的ap 信息","slug":"定义wi-fi-manager-station-模式保存的ap-信息","link":"#定义wi-fi-manager-station-模式保存的ap-信息","children":[]},{"level":3,"title":"定义Wi-Fi Manager station 模式时要进行连接的ap 的配置信息","slug":"定义wi-fi-manager-station-模式时要进行连接的ap-的配置信息","link":"#定义wi-fi-manager-station-模式时要进行连接的ap-的配置信息","children":[]},{"level":3,"title":"定义Wi-Fi Manager station 模式时扫描到的一条 ap 结果","slug":"定义wi-fi-manager-station-模式时扫描到的一条-ap-结果","link":"#定义wi-fi-manager-station-模式时扫描到的一条-ap-结果","children":[]},{"level":3,"title":"定义Wi-Fi Manager ap 模式的状态","slug":"定义wi-fi-manager-ap-模式的状态","link":"#定义wi-fi-manager-ap-模式的状态","children":[]},{"level":3,"title":"定义Wi-Fi Manager ap 模式时的事件","slug":"定义wi-fi-manager-ap-模式时的事件","link":"#定义wi-fi-manager-ap-模式时的事件","children":[]},{"level":3,"title":"定义Wi-Fi Manager ap 模式时开启的ap 热点的配置信息","slug":"定义wi-fi-manager-ap-模式时开启的ap-热点的配置信息","link":"#定义wi-fi-manager-ap-模式时开启的ap-热点的配置信息","children":[]},{"level":3,"title":"定义Wi-Fi Manager monitor 模式的状态","slug":"定义wi-fi-manager-monitor-模式的状态","link":"#定义wi-fi-manager-monitor-模式的状态","children":[]},{"level":3,"title":"定义Wi-Fi Manager monitor 模式时收到的数据帧","slug":"定义wi-fi-manager-monitor-模式时收到的数据帧","link":"#定义wi-fi-manager-monitor-模式时收到的数据帧","children":[]},{"level":3,"title":"定义Wi-Fi Manager p2p 模式时开启p2p 热点的配置信息","slug":"定义wi-fi-manager-p2p-模式时开启p2p-热点的配置信息","link":"#定义wi-fi-manager-p2p-模式时开启p2p-热点的配置信息","children":[]},{"level":3,"title":"定义Wi-Fi Manager p2p 模式时p2p 连接成功后的信息","slug":"定义wi-fi-manager-p2p-模式时p2p-连接成功后的信息","link":"#定义wi-fi-manager-p2p-模式时p2p-连接成功后的信息","children":[]},{"level":3,"title":"定义Wi-Fi Manager p2p 模式时的状态","slug":"定义wi-fi-manager-p2p-模式时的状态","link":"#定义wi-fi-manager-p2p-模式时的状态","children":[]},{"level":3,"title":"定义Wi-Fi Manager p2p 模式时的事件","slug":"定义wi-fi-manager-p2p-模式时的事件","link":"#定义wi-fi-manager-p2p-模式时的事件","children":[]},{"level":3,"title":"定义Wi-Fi Manager 收到的回调事件","slug":"定义wi-fi-manager-收到的回调事件","link":"#定义wi-fi-manager-收到的回调事件","children":[]}]},{"level":2,"title":"Wi-Fi Manager 核心代码各函数说明","slug":"wi-fi-manager-核心代码各函数说明","link":"#wi-fi-manager-核心代码各函数说明","children":[{"level":3,"title":"初始化Wi-Fi Manager","slug":"初始化wi-fi-manager","link":"#初始化wi-fi-manager","children":[]},{"level":3,"title":"反初始化Wi-Fi Manager","slug":"反初始化wi-fi-manager","link":"#反初始化wi-fi-manager","children":[]},{"level":3,"title":"打开Wi-Fi Manager 某种模式","slug":"打开wi-fi-manager-某种模式","link":"#打开wi-fi-manager-某种模式","children":[]},{"level":3,"title":"关闭Wi-Fi Manager","slug":"关闭wi-fi-manager","link":"#关闭wi-fi-manager","children":[]},{"level":3,"title":"sta 模式下连接ap","slug":"sta-模式下连接ap","link":"#sta-模式下连接ap","children":[]},{"level":3,"title":"sta 模式下断开与ap 的连接","slug":"sta-模式下断开与ap-的连接","link":"#sta-模式下断开与ap-的连接","children":[]},{"level":3,"title":"sta 模式下自动连接上某个ap","slug":"sta-模式下自动连接上某个ap","link":"#sta-模式下自动连接上某个ap","children":[]},{"level":3,"title":"sta 模式下获取当前状态的一些信息","slug":"sta-模式下获取当前状态的一些信息","link":"#sta-模式下获取当前状态的一些信息","children":[]},{"level":3,"title":"sta 模式下列出已保存的ap 的信息","slug":"sta-模式下列出已保存的ap-的信息","link":"#sta-模式下列出已保存的ap-的信息","children":[]},{"level":3,"title":"sta 模式下移除某个ap 信息","slug":"sta-模式下移除某个ap-信息","link":"#sta-模式下移除某个ap-信息","children":[]},{"level":3,"title":"ap 模式下使能ap 热点功能","slug":"ap-模式下使能ap-热点功能","link":"#ap-模式下使能ap-热点功能","children":[]},{"level":3,"title":"ap 模式下关闭ap 热点功能","slug":"ap-模式下关闭ap-热点功能","link":"#ap-模式下关闭ap-热点功能","children":[]},{"level":3,"title":"ap 模式下获取当前ap 热点的配置信息","slug":"ap-模式下获取当前ap-热点的配置信息","link":"#ap-模式下获取当前ap-热点的配置信息","children":[]},{"level":3,"title":"monitor 模式使能monitor 功能","slug":"monitor-模式使能monitor-功能","link":"#monitor-模式使能monitor-功能","children":[]},{"level":3,"title":"monitor 模式下动态切换监听的信道","slug":"monitor-模式下动态切换监听的信道","link":"#monitor-模式下动态切换监听的信道","children":[]},{"level":3,"title":"monitor 模式下关闭monitor 功能","slug":"monitor-模式下关闭monitor-功能","link":"#monitor-模式下关闭monitor-功能","children":[]},{"level":3,"title":"p2p 模式下使能p2p 功能","slug":"p2p-模式下使能p2p-功能","link":"#p2p-模式下使能p2p-功能","children":[]},{"level":3,"title":"p2p 模式下关闭p2p 功能","slug":"p2p-模式下关闭p2p-功能","link":"#p2p-模式下关闭p2p-功能","children":[]},{"level":3,"title":"p2p 模式下发起扫描","slug":"p2p-模式下发起扫描","link":"#p2p-模式下发起扫描","children":[]},{"level":3,"title":"p2p 模式下连接另外一个p2p 设备","slug":"p2p-模式下连接另外一个p2p-设备","link":"#p2p-模式下连接另外一个p2p-设备","children":[]},{"level":3,"title":"p2p 模式下断开已连接的p2p 设备","slug":"p2p-模式下断开已连接的p2p-设备","link":"#p2p-模式下断开已连接的p2p-设备","children":[]},{"level":3,"title":"p2p 模式下获取p2p 设备的某些信息","slug":"p2p-模式下获取p2p-设备的某些信息","link":"#p2p-模式下获取p2p-设备的某些信息","children":[]},{"level":3,"title":"任意模式下注册回调函数","slug":"任意模式下注册回调函数","link":"#任意模式下注册回调函数","children":[]},{"level":3,"title":"sta 模式下设置扫描参数","slug":"sta-模式下设置扫描参数","link":"#sta-模式下设置扫描参数","children":[]},{"level":3,"title":"sta 模式下获取扫描结果","slug":"sta-模式下获取扫描结果","link":"#sta-模式下获取扫描结果","children":[]},{"level":3,"title":"任意模式下设置mac 地址","slug":"任意模式下设置mac-地址","link":"#任意模式下设置mac-地址","children":[]},{"level":3,"title":"任意模式下获取mac 地址","slug":"任意模式下获取mac-地址","link":"#任意模式下获取mac-地址","children":[]},{"level":3,"title":"配网模式","slug":"配网模式","link":"#配网模式","children":[]},{"level":3,"title":"任意模式下获取Wi-Fi Manager 的状态信息","slug":"任意模式下获取wi-fi-manager-的状态信息","link":"#任意模式下获取wi-fi-manager-的状态信息","children":[]}]},{"level":2,"title":"Wi-Fi Manager 核心代码函数调用流程介绍","slug":"wi-fi-manager-核心代码函数调用流程介绍","link":"#wi-fi-manager-核心代码函数调用流程介绍","children":[{"level":3,"title":"以某种模式打开Wi-Fi Manager","slug":"以某种模式打开wi-fi-manager","link":"#以某种模式打开wi-fi-manager","children":[]},{"level":3,"title":"station 模式—关闭Wi-Fi Manager","slug":"station-模式—关闭wi-fi-manager","link":"#station-模式—关闭wi-fi-manager","children":[]},{"level":3,"title":"station 模式—扫描环境中存在哪些ap","slug":"station-模式—扫描环境中存在哪些ap","link":"#station-模式—扫描环境中存在哪些ap","children":[]},{"level":3,"title":"station 模式—连接某个特定的ap","slug":"station-模式—连接某个特定的ap","link":"#station-模式—连接某个特定的ap","children":[]},{"level":3,"title":"station 模式—断开与某个ap 的连接","slug":"station-模式—断开与某个ap-的连接","link":"#station-模式—断开与某个ap-的连接","children":[]},{"level":3,"title":"station 模式—设置自动连接功能","slug":"station-模式—设置自动连接功能","link":"#station-模式—设置自动连接功能","children":[]},{"level":3,"title":"station 模式—列出已保存的ap 列表信息","slug":"station-模式—列出已保存的ap-列表信息","link":"#station-模式—列出已保存的ap-列表信息","children":[]},{"level":3,"title":"station 模式—列出连接的ap 信息","slug":"station-模式—列出连接的ap-信息","link":"#station-模式—列出连接的ap-信息","children":[]},{"level":3,"title":"station 模式—移除某个或全部已保存的ap 信息","slug":"station-模式—移除某个或全部已保存的ap-信息","link":"#station-模式—移除某个或全部已保存的ap-信息","children":[]},{"level":3,"title":"ap 模式—启动ap 节点","slug":"ap-模式—启动ap-节点","link":"#ap-模式—启动ap-节点","children":[]},{"level":3,"title":"ap 模式—获取ap 配置信息","slug":"ap-模式—获取ap-配置信息","link":"#ap-模式—获取ap-配置信息","children":[]},{"level":3,"title":"ap 模式—关闭ap 热点","slug":"ap-模式—关闭ap-热点","link":"#ap-模式—关闭ap-热点","children":[]},{"level":3,"title":"monitor 模式—使用monitor 功能","slug":"monitor-模式—使用monitor-功能","link":"#monitor-模式—使用monitor-功能","children":[]},{"level":3,"title":"monitor 模式—切换监听的信道","slug":"monitor-模式—切换监听的信道","link":"#monitor-模式—切换监听的信道","children":[]},{"level":3,"title":"monitor 模式—关闭monitor 功能","slug":"monitor-模式—关闭monitor-功能","link":"#monitor-模式—关闭monitor-功能","children":[]},{"level":3,"title":"p2p 模式—启动p2p 功能","slug":"p2p-模式—启动p2p-功能","link":"#p2p-模式—启动p2p-功能","children":[]},{"level":3,"title":"p2p 模式—关闭p2p 功能","slug":"p2p-模式—关闭p2p-功能","link":"#p2p-模式—关闭p2p-功能","children":[]},{"level":3,"title":"p2p 模式—扫描周围p2p 设备","slug":"p2p-模式—扫描周围p2p-设备","link":"#p2p-模式—扫描周围p2p-设备","children":[]},{"level":3,"title":"p2p 模式—连接某个p2p 设备","slug":"p2p-模式—连接某个p2p-设备","link":"#p2p-模式—连接某个p2p-设备","children":[]},{"level":3,"title":"p2p 模式—断开与p2p 设备的连接","slug":"p2p-模式—断开与p2p-设备的连接","link":"#p2p-模式—断开与p2p-设备的连接","children":[]},{"level":3,"title":"p2p 模式—获取p2p 设备信息","slug":"p2p-模式—获取p2p-设备信息","link":"#p2p-模式—获取p2p-设备信息","children":[]},{"level":3,"title":"任意模式—获取mac 地址","slug":"任意模式—获取mac-地址","link":"#任意模式—获取mac-地址","children":[]},{"level":3,"title":"任意模式—设置mac 地址","slug":"任意模式—设置mac-地址","link":"#任意模式—设置mac-地址","children":[]},{"level":3,"title":"任意模式—获取打印等级","slug":"任意模式—获取打印等级","link":"#任意模式—获取打印等级","children":[]},{"level":3,"title":"任意模式—设置打印等级","slug":"任意模式—设置打印等级","link":"#任意模式—设置打印等级","children":[]}]},{"level":2,"title":"Wi-Fi Manager 配网模式","slug":"wi-fi-manager-配网模式","link":"#wi-fi-manager-配网模式","children":[{"level":3,"title":"wifimager 配网模式简介","slug":"wifimager-配网模式简介","link":"#wifimager-配网模式简介","children":[]},{"level":3,"title":"Wi-Fi Manager 扩展模式","slug":"wi-fi-manager-扩展模式","link":"#wi-fi-manager-扩展模式","children":[]}]},{"level":2,"title":"Wi-Fi Manager demo","slug":"wi-fi-manager-demo","link":"#wi-fi-manager-demo","children":[{"level":3,"title":"Wi-Fi Manager demo 目录结构","slug":"wi-fi-manager-demo-目录结构","link":"#wi-fi-manager-demo-目录结构","children":[]},{"level":3,"title":"编译 Wi-Fi Manager demo","slug":"编译-wi-fi-manager-demo","link":"#编译-wi-fi-manager-demo","children":[]}]},{"level":2,"title":"Wi-Fi Manager demo 快速测试命令简介","slug":"wi-fi-manager-demo-快速测试命令简介","link":"#wi-fi-manager-demo-快速测试命令简介","children":[{"level":3,"title":"station 模式常用命令","slug":"station-模式常用命令","link":"#station-模式常用命令","children":[]},{"level":3,"title":"ap 模式常用命令","slug":"ap-模式常用命令","link":"#ap-模式常用命令","children":[]},{"level":3,"title":"monitor 模式常用命令","slug":"monitor-模式常用命令","link":"#monitor-模式常用命令","children":[]},{"level":3,"title":"额外功能常用命令","slug":"额外功能常用命令","link":"#额外功能常用命令","children":[]}]}],"git":{"updatedTime":1698400260000,"contributors":[{"name":"YobeZhou","email":"smilezyb@163.com","commits":1}]},"filePathRelative":"zh/rtos/developer-guide/part1/chapter10.md"}');export{i as data};
