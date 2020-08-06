<!--
 * @Author: Jane
 * @Date: 2020-08-06 10:07:26
 * @LastEditTime: 2020-08-06 14:03:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-weibo-appe:\self\AAAAA\trylang-ui\README.md
-->
# 一、样式;
## 1-1. 使用SASS部分文件;
当通过@import把sass样式分散到多个文件时，你通常只想生成少数几个css文件。那些专门为@import命令而编写的sass文件，并不需要生成对应的独立css文件，这样的sass文件称为局部文件。对此，sass有一个特殊的约定来命名这些文件。

此约定即，sass局部文件的文件名以下划线开头。这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。当你@import一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入themes/_night-sky.scss这个局部文件里的变量，你只需在样式表中写@import "themes/night-sky";。

局部文件可以被多个不同的文件引用。当一些样式需要在多个页面甚至多个项目中使用时，这非常有用。在这种情况下，有时需要在你的样式表中对导入的样式稍作修改，sass有一个功能刚好可以解决这个问题，即默认变量值。

## 1-2. 默认变量值;
一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。举例说明：

``
$link-color: blue;
$link-color: red;
a {
color: $link-color;
}
``
在上边的例子中，超链接的color会被设置为red。这可能并不是你想要的结果，假如你写了一个可被他人通过@import导入的sass库文件，你可能希望导入者可以定制修改sass库文件中的某些值。使用sass的!default标签可以实现这个目的。它很像css属性中!important标签的对立面，不同的是!default用于变量，含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
``
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
``

在上例中，如果用户在导入你的sass局部文件之前声明了一个``$fancybox-width变量，那么你的局部文件中对$fancybox-width赋值400px的操作就无效``。如果用户没有做这样的声明，则$fancybox-width将默认为400px。

接下来我们将学习嵌套导入，它允许只在某一个选择器的范围内导入sass局部文件。

## 1.3 `yarn add classnames` ， `yarn add @types/classnames` 帮助添加classname，记得安装下types;