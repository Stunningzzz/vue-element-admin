<template>
  <el-timeline :reverse="true">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
    >
      <el-card>
        <template #header>
          <strong>
            {{activity.header}}
          </strong>
        </template>
        {{activity.content}}
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  name: 'ProfileRightTabsTimeline',
  data() {
    return {
      activities: [
        {
          timestamp: '2019-04-20',
          header:'Update Github template',
          content:'LuZhiHao committed 2019/4/20 20:46',
        },
        {
          timestamp: '2019-04-21',
          header:'Update Github template',
          content:'LuZhiHao committed 2019/4/20 20:46',
        },
        {
          timestamp: '2019-04-22',
          header:'Build Template',
          content:'LuZhiHao committed 2019/4/20 20:46',
        },
         {
          timestamp: '2019-04-23',
          header:'Release New Versio',
          content:'LuZhiHao committed 2019/4/20 20:46',
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友