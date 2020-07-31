# react-native-horizontal-category-list
horizontal scrollable list, Display category information by tabs.

steps:

* 引入库
**npm install react-native-horizontal-category-list**
* 引入组件
```
import { HorizontalSectionList } from "react-native-horizontal-category-list";
```
* 简单的例子，默认红色的标签栏
```
<HorizontalSectionList
                    data={data}
                    renderItem={(item) => <View key={"item" + item} style={itemStyle}><Text>{item.key}</Text></View>} />
```
