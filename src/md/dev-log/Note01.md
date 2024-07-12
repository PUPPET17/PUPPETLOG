---
title: Note01
index: false
icon: laptop-code
category:
  - 开发笔记
  - 学习记录
---

## 任务

- [x] 环境配置
- [x] 搭建项目结构
- [x] 跑通广播模式 RPC 过程调用

## 学习过程

1. 项目整体了解

   通过对第一节文档的阅读，了解整个项目的生命周期、所需要的技术以及代码提交规范

2. 搭建项目结构，简单学习DDD架构，理解每个模块的依赖关系和作用

   ![依赖关系图](https://ossk.cc/file/a1becec060599d420b82d.png)

   | 模块                   | 作用                                                         |
   | ---------------------- | ------------------------------------------------------------ |
   | Lottery                | 总项目，用来管理整个项目的依赖                               |
   | lottery-application    | 应用层，为用户接口层提供各种应用数据展现支持服务             |
   | lottery-common         | 定义通用数据，比如统一响应数据、常量、异常、枚举等           |
   | lottery-domain         | 领域层，核心业务逻辑                                         |
   | lottery-infrastructure | 基础层，为其他各层提供通用技术能力，包括数据库、Redis、ES 等 |
   | lottery-interfaces     | 用户接口层，存放与前端交互、展现数据相关的代码               |
   | lottery-rpc            | RPC 接口文件                                                 |

3. 跑通 RPC

   1. 定义 response 状态码枚举供通用返回对象 Result 进行使用
   2. 定义通用返回对象 Result 类
   3. 定义 activity 表的持久化对象
   4. 定义 activity 表的 Mapper 接口
   5. 定义 mybatis 配置文件
   6. 定义 activity 表的 mapper.xml 文件
   7. 定义 rpc 的数据传输对象(DTO) ActivityDto
   8. 定义 rpc 的 请求对象 ActivityReq
   9. 定义 rpc 的响应对象 ActivityRes
   10. 定义 rpc 接口 IActivityBooth
   11. 实现 IActivityBooth 接口
   12. 编写启动类
   13. 编写配置文件 application.yml
   14. 编写测试模块

## 遇到的问题

1. 数据库乱码问题

   测试模块 RPC 远程调用返回的结果为:

   ```json
   测试结果：{"activity":{"activityDesc":"?????????","activityId":100002,"activityName":"????","beginDateTime":1705215282000,"endDateTime":1705215282000,"stockCount":100,"takeCount":10},"result":{"code":"0000","info":"成功"}}
   ```

   明显的乱码问题，查看数据库，发现插入的时候就以及乱码了，看了一下配置文件中的数据库连接 url，发现使用了 useUnicode=true，并没有指定字符集，所以添加一下 utf-8 字符集即可，完整 url: `jdbc:mysql://127.0.0.1:3306/lottery?useUnicode=true&characterEncoding=UTF-8`

   再进行一轮测试，测试结果：

   ```json
   测试结果：{"activity":{"activityDesc":"仅用于插入数据测试","activityId":100003,"activityName":"测试活动","beginDateTime":1705218054000,"endDateTime":1705218054000,"stockCount":100,"takeCount":10},"result":{"code":"0000","info":"成功"}}
   ```

   解决！

2. MySql 5.x 换 8.x  
   maven改为：
   ```xml
   <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.22</version>
    </dependency>
   ```
   application.yml改为：  
   ```yml
   spring:
      datasource:
         driver-class-name: com.mysql.cj.jdbc.Driver
   ```

## 总结
1. #### 贫血模型和充血模型  
   贫血模型是指实体类只包含数据，不包含业务逻辑，充血模型是实体类同时包含数据以及业务逻辑。  
   贫血模型的对象在设计之初就被定义为只能包含数据，不能加入领域逻辑；逻辑要全部写入Service中；而Service则构建在领域模型之上，需要使用这些贫血模型来传递数据。而这与面向对象设计“背道而驰”；“一个对象是拥有状态和行为的”。  
   充血模型也被称为领域模型，将业务逻辑和数据结构紧密耦合在一起，把业务逻辑集成到实体中。这种模型强调在问题领域构建模型（DDD中有**事件风暴**和**界限上下文**等概念），并把问题领域的知识嵌入到代码中。它将业务逻辑和数据操作封装到实体中，实体包含了数据和操作数据的业务逻辑，以及实体之间的关系。  

2. #### 关于 PO、VO、DO、DTO
   > PO：persistent object 持久对象  
   + 有时也被称为Data对象，对应数据库中的entity，可以简单认为一个PO对应数据库中的一条记录。  
   + 在Mybatis持久化框架中与insert/delet操作密切相关。  
   + PO中不应该包含任何对数据库的操作。
   > POJO ：plain ordinary java object 无规则简单java对象  
   > VO：value object 值对象 / view object 表现层对象
   + 主要对应页面显示（web页面/swt、swing界面）的数据对象。
   + 可以和表对应，也可以不，这根据业务的需要。
   + 可以细分包括 req、res
   > DO（Domain Object）：领域对象，
   + 就是从现实世界中抽象出来的有形或无形的业务实体。通常可以代替部分 PO 的职责。
   > DTO（TO）：Data Transfer Object 数据传输对象
   + 用在需要跨进程或远程传输时，它不应该包含业务逻辑。
   + 比如一张表有100个字段，那么对应的PO就有100个属性（大多数情况下，DTO内的数据来自多个表）。但view层只需显示10个字段，没有必要把整个PO对象传递到client，这时我们就可以用只有这10个属性的DTO来传输数据到client，这样也不会暴露server端表结构。到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为VO。            


3. #### 为什么DDD
   我发现在之前的开发中，经常出现新增功能就需要修改旧的对象或者是直接新增，非常麻烦且能够预见到以后项目继续发展的话这种情况会更严重，而DDD通过提前的领域建模和对模型界限上下文的划定可以在一定程度上减少这种问题。话是这么说不错但是实际上自己尝试用DDD重构以前mvc的项目时还是觉得很难落实，根据业务划分领域和上下文界限时无从下手。多看多学！🤕