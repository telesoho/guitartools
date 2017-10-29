<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="1" :sm="1" :md="1" :lg="1">
        <i-circle 
          :percent="80" 
          :size="30"
          :trail-width="15"
          :stroke-width="15"
          stroke-linecap="round"
          >
            <Icon type="play"></Icon>
        </i-circle>
      </Col>
      <Col :xs="22" :sm="22" :md="22" :lg="22">音乐标题</Col>
    </Row>
    <Row type="flex" justify="center" align="middle">
      <Col :xs="23" :sm="23" :md="23" :lg="23">
        <Scroll :height="400">
          <pre>
            {{ lyc }}
          </pre>
        </Scroll>
      </Col>
    </Row>    
  </div>
</template>
<script>
  export default {
    data () {
      return {
        lyc: `
-------------------------------------------------------------------------------
歌曲名：董小姐        
歌手/乐队：宋冬野 
编配者（转载来源）:dehebusad1
-------------------------------------------------------------------------------

G  C  Bm   Em
董小姐 你从没忘记你的微笑
C     D     G
就算你和我一样 渴望着衰老
G  C  Bm   Em
董小姐 你嘴角向下的时候很美
C     D     G
就像安和桥下 清澈的水
G  C  Bm   Em
董小姐 我也是个复杂的动物
C     D     G
嘴上一句带过 心里却一直重复
G  C  Bm   Em
董小姐 鼓楼的夜晚时间匆匆
C     D     G
陌生的人 请给我一支兰州
C     D    Bm   Em
所以那些可能都不是真的 董小姐
C     D    G
你才不是一个没有故事的女同学
C     D    Bm   Em
爱上一匹野马 可我的家里没有草原
C     D    G
这让我感到绝望 董小姐
G  C  Bm   Em
董小姐 你熄灭了烟 说起从前
C     D     G
你说前半生就这样吧 还有明天
G  C  Bm   Em
董小姐 你可知道我说够了再见
C     D     G
在五月的早晨 终于丢失了睡眠
C     D    Bm   Em
所以那些可能都不是真的 董小姐
C     D     G
你才不是一个没有故事的女同学
C     D    Bm   Em
爱上一匹野马 可我的家里没有草原
C     D     G
这让我感到绝望 董小姐
C     D    Bm   Em
所以那些可能都会是真的 董小姐
C     D     G
谁会不厌其烦的安慰那无知的少年
C     D    Bm   Em
我想和你一样 不顾那些所以
C     D     G
跟我走吧 董小姐
C     D     G
躁起来吧 董小姐
`
      }
    }
  }
</script>
