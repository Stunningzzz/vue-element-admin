0. @extend 继承
  - 继承规则
    ```SCSS
      #app  {
        .font{
          color: red;
        }
      }
      .c {
        @extend .font;
      }

      要看的是最终生成的CSS代码 哪些选择器是包含.font的 每个包含的地方都额外并上一份将.font 删除 然后在末尾添加.c 的选择器规则 

      最终生成的是
      #app .font{
        color: red;
      }
      其中 #app .font 包含 .font 所以并上一份删除 .font 然后在末尾添加 .c 的选择器
      #app .font,#app .c{
        color: red;
      }

      记住不是在 .font 的位置添加 而是在最后面添加
      #app{
        .font{
          &.abc{
            color:blue;
          }
        }
      }
      .c {
        @extend .font;
      }

      最终编译成
      #app .font.abc{
        color:red;
      }

      如果是在 .font 位置添加的话应该是
      #app .font.abc,#app .c.abc{
        color:red;
      }

      但结果是
      #app .font.abc,#app .abc.c{
        color:red;
      }
    ```


   



  - 如果是@extend %placeholder 的话就找到编译后包含 %placeholder的选择器 然后删除%placeholder并在最后添加上xxx

1. 函数和 mixin 也有作用域的概念

2. 含%placeholder的选择器是不会被编译的 必须结合 @extend使用 而且规则完全相同
  **注意:%placeholder有重复定义的问题 也就是即使是相同选择器相同内容下的%placeholder 后面也不会覆盖前面**
  如 
    %test{color:#aaa} %test{font-size:20px} header{ @extend %test }
  最终编译成 
    header{ color:#aaa; } header{font-size:20px}

  **所以%placeholder一定不能定义在mixin里面!!**