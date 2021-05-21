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
  props:{
    panelGroupItems:{
      type:Array,
      default(){
        return []
      }
    },
  },
  components:{
    PanellGroupItem,
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