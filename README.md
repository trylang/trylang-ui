<!--
 * @Author: Jane
 * @Date: 2020-08-06 10:07:26
 * @LastEditTime: 2020-08-08 11:33:47
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

## 1.4 sass 中的遍历
1. 数组遍历
   ``
    $sizes: 40px, 50px, 80px;
    @each $size in $sizes {
      .icon-#{size} {
        font-size: $size;
        height: $size;
      }
    }
   ``

2. 对象Map遍历
   ``
    $icons:("eye": "\f112", "start": "\f12e", "stop": "\f12f");
    @each $name, $glyph in $icons {
      .icon-#{name}:before {
        display: inline-block;
        font-family: "Icon Font";
        content: $glyph;
      }
    }
   ``

## 1.5 display: none; 与动画效果的关系
  当display 从none到block的变化，任何动画都不起作用。 
  因为display不是一个标准的支持animation的属性，所以transition不起作用。
  还有就是block和属性是同时变化，所以看不到效果。



# typeScript

## 1. type:类型别名；Partial；交叉类型
``
  // type: 类型别名，ts通过type关键字对比较长得类型重命名
  // AnchorHTMLAttributes: a链接属性
  // & ： 交叉类型，A & B具备 A和B的所有属性
  // Partial：所有属性都是可选项
  // ButtonProps 为的是用户可以自由给Button添加属性
  type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
  type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
  type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
``


# 字体图标
## 1. react-fontawesome


# react

## 1. 类型断言
``
  // cloneElement 方法用于去除写在menuItem组件上的index属性，cloneElement（第一个是要赋值的属性，第二个是新增属性）
  return React.cloneElement(childElement, {
    index: index.toString()
  });
``

``
  const context = useContext(MenuContext);
  // 因为context.defaultOpenSubMenus 是可选，默认类型为字符串数组+undefined。
  // 我们不需要undefined，所以用到类型断言，指定为字符串数组类型
  index = index as string;
  const defaultOpenSubMenus = context.defaultOpenSubMenus as Array<string>;
  let isOpened = (index && context.mode === 'vertical') ? defaultOpenSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpened);
``

## 2. 设置默认值
``
// 默认值一定要加，一为了代码健壮性；
// 二、defaultOpenSubMenus如果不设默认值且在代码中没有使用，直接报undefined，即便后面做了类型断言也无用，还是会报错
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
``

## 3. 静态属性
// 子组件设置静态属性，帮助父组件类型判断
MenuItem.displayName = 'MenuItem';

## 4. react 动画
`npm install react-transition-group @types/react-transition-group  --save`