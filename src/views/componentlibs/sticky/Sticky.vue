<template>
  <div class="no-padding">
    <div class="wrapper">
      <StickyComp
        :z-index="10"
        :sticky-top="fixedHeader ? 50 : 0"
        class="sticky-frame"
      >
        <div class="sticky-navbar">
          <el-dropdown trigger="click">
            <el-button plain>
              Platform<i class="el-icon-caret-bottom el-icon--right" />
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              class="no-border"
            >
              <el-checkbox-group
                v-model="platforms"
                style="padding: 5px 15px;"
              >
                <el-checkbox
                  v-for="item in platformsOptions"
                  :key="item.key"
                  :label="item.key"
                >
                  {{ item.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <el-button plain>
              Link<i class="el-icon-caret-bottom el-icon--right" />
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              class="no-padding no-border"
              style="width:300px"
            >
              <el-input
                v-model="url"
                placeholder="Please enter the content"
              >
                <template slot="prepend">
                  Url
                </template>
              </el-input>
            </el-dropdown-menu>
          </el-dropdown>

          <div class="time-container">
            <el-date-picker
              v-model="time"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="Release time"
            />
          </div>

          <el-button
            style="margin-left: 10px;"
            type="success"
          >
            publish
          </el-button>
        </div>
      </StickyComp>
      <div class="components-container">
      <aside>
        Sticky header, When the page is scrolled to the preset position will be sticky on the top.
      </aside>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <StickyComp :sticky-top="200">
        <el-button type="primary"> placeholder</el-button>
      </StickyComp>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div><div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
    </div>
    </div>
  </div>

</template>

<script>
import StickyComp from '@/components/StickyComp';
import {mapGetters} from 'vuex';

export default {
  name: 'Sticky',
  components: { StickyComp },
  data() {
    return {
      time: '',
      url: '',
      platforms: ['a-platform'],
      platformsOptions: [
        { key: 'a-platform', name: 'platformA' },
        { key: 'b-platform', name: 'platformB' },
        { key: 'c-platform', name: 'platformC' },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed:{
    ...mapGetters(['fixedHeader'])
  },
};
</script>

<style lang="scss" scoped>
.sticky-navbar {
  background-color: skyblue;
  display: flex;
  padding-right: 30px;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
}

</style>
