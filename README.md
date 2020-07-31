# react-native-horizontal-category-list
horizontal scrollable list, Display category information by tabs.
横向滚动条，并且带定位功能

##可用属性

```
data：required， 数据源
tabStyle：optional tab的基本样式
selectedTabTextStyle：optional 选中之后文本的样式
selectedBarStyle：optional 选中之后移动的条状bar的样式
renderItem： required 渲染Item内容
renderDivider: optional 渲染分界面的divider

```

steps:

* 引入库
**npm install react-native-horizontal-category-list**
* 引入组件
```
import { HorizontalSectionList } from "react-native-horizontal-category-list";
```
** 简单的例子，默认红色的标签栏
```
<HorizontalSectionList
                    data={data}
                    renderItem={(item) => <View key={"item" + item} style={itemStyle}><Text>{item.key}</Text></View>} />
```
![structure](https://github.com/lucia-super/react-native-horizontal-category-list/blob/master/base.gif "基本效果")

** tabs 自定义样式的例子
```
                <HorizontalSectionList
                    data={data}
                    tabStyle={{ marginLeft: 2, borderWidth: 1, color: "gray", borderBottomWidth: 0, borderColor: "#9c9cA3", borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                    selectedTabTextStyle={{ color: "blue" }}
                    selectedBarStyle={{ width: 10, backgroundColor: "blue" }}
                    renderItem={(item) => <View key={"item" + item} style={itemStyle}><Text>{item.key}</Text></View>} />
```
![structure](https://github.com/lucia-super/react-native-horizontal-category-list/blob/master/customize.gif "样式效果")
