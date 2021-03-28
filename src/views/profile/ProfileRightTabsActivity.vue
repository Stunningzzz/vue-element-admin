<template>
  <div class="activity">

    <ProfileRightTabsActivityItem
      v-for="post in textPosts"
      :key="post.desc"
      :post="post"
    >
      <div v-if="post.bodyType === 'img'">
        <el-carousel
          :interval="4000"
          type="card"
          height="220px"
          indicator-position="outside"
        >
          <el-carousel-item
            v-for="item in post.body"
            :key="item"
          >
            <img
              :src="item"
              class="post-body-img"
            >
          </el-carousel-item>
        </el-carousel>
      </div>
    </ProfileRightTabsActivityItem>
  </div>
</template>

<script>
import ProfileRightTabsActivityItem from './ProfileRightTabsActivityItem';
export default {
  name: 'ProfileRightTabsActivity',
  components: {
    ProfileRightTabsActivityItem,
  },
  data() {
    return {
      textPosts: [
        {
          avatar:
            'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg?imageView2/1/w/80/h/80',
          username: 'Iron Man',
          desc: 'Shared publicly - 7:30 PM today',
          body:
            'Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.',
          bodyType: 'string',
        },
        {
          avatar:
            'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg?imageView2/1/w/80/h/80',
          username: 'Captain American',
          desc: 'Sent you a message - yesterday',
          body:
            'Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.',
          bodyType: 'string',
        },
        {
          avatar:
            'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg?imageView2/1/w/80/h/80',
          username: 'Spider Man',
          desc: 'Posted 4 photos - 2 days ago',
          body: [
            'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg?imageView2/2/h/440',
            'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg?imageView2/2/h/440',
            'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg?imageView2/2/h/440',
            'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg?imageView2/2/h/440',
          ],
          bodyType: 'img',
        },
        // 394 x
      ],
    };
  },
};
</script>

<style lang='scss' scoped>


.post-body-img {
  width: 100%;
  height: 100%;
}
</style>
//亲人 爱人 朋友