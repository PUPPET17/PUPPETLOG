---
title: 个人简历
index: false
icon: laptop-code
category:
  - 自我介绍
  - 专业技能
  - 项目经验
---

## 个人信息

- 姓名
- 电话
- 邮箱
- 毕业时间
- 工作时间
- Github：https://github.com/PUPPET17

## 毕业院校

- 时间、院校、专业、学位
- 荣誉、成绩

## 专业技能

- 熟练使用 IDEA、Eclipse、Visual Studio Code、Navicat、PostMan、Git、Maven、SVN 等开发工具。
- 熟练掌握 Java 知识，具备良好的面向对象编程思想；
- 熟练掌握设计模式，如模板方法、工厂、策略、状态、代理等设计模式，有通过设计原则构建可复用代码的经验；
- 熟练掌握 SSM 等主流框架的使用及相关知识，了解 Spring IoC、AOP 等基本思想；
- 熟悉关系型数据库 MySQL 的基本操作，了解 MySQL 中索引、事务等知识，具备一定的 SQL 调优能力；熟悉 Redis，了解 Redis 缓存、分布式锁等各种使用场景;
- 熟悉 Kafka 等常用的消息中间件进行消息的异步数据处理
- 熟悉 Linux 的基本使用及常见命令，有云服务器使用和Docker容器化应用程序开发部署的经验，具备常见场景的系统操作能力。

## 项目经验

### 1. 营销活动平台 - Lottery 微服务抽奖系统

- **描述：** Lottery是营销平台的重要微服务之一，该服务运用抽象和 DDD 领域驱动设计知识，围绕抽奖服务建设领域服务，实现了人群过滤器、多种抽奖策略、活动发布、奖品发放等功能。
- **系统架构：** 以 DDD 领域驱动设计开发的分布式系统
- **核心技术：** SpringBoot、MyBatis、Dubbo、MySQL、DB-Router、Kafka、XXL-JOB
- **核心职责：**
- 以 DDD 四层架构的方式搭建了整个抽奖系统架构，运用设计原则和工厂、模板、策略等设计模式，让代码结构更加清晰，保证了代码的拓展性和可维护性；
- 解耦抽奖流程，把抽奖和发奖用MQ消息解耦，避免一个流程太长，导致用户一直等待，使用XXL-JOB定时任务对发送失败的MQ消息进行补偿，保证消息被成功消费；
- 结合状态模式实现对活动上下线的审批状态流转，保证活动的安全上线；
- 在项目的测试过程中发现了原有的数据库行级锁的性能问题，将行级锁优化成为Redis滑块锁，大幅优化了抽奖服务的秒杀性能；

<script>
  export default {
  onload() {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?dde81d59b7c7aafd3069d07bdb17e1a1";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  }
}
</script>