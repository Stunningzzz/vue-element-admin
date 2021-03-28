<template>
  <div class="panel-group">
    <PanellGroupItem
      v-for="item in panelGroupItems"
      :key="item.itemClass"
      :item="item"
    >
    </PanellGroupItem>
  </div>
</template>

<script>
import PanellGroupItem from './PanellGroupItem';
export default {
  name: 'PanelGroup',
  components:{
    PanellGroupItem,
  },
 
  data() {
    return {
      panelGroupItems: [
        {
          itemClass: 'peoples',
          itemDesc: 'New Visits',
          itemNum: '102,400',
        },
        {
          itemClass: 'message',
          itemDesc: 'New Visits',
          itemNum: '102,400',
        },
        {
          itemClass: 'money',
          itemDesc: 'New Visits',
          itemNum: '102,400',
        },
        {
          itemClass: 'shopping',
          itemDesc: 'New Visits',
          itemNum: '102,400',
        },
      ],
    };
  },
};
</script>

<style lang='scss' scoped>
.panel-group {
  display: flex;
  justify-content: space-between;
  
}
</style>
//亲人 爱人 朋友