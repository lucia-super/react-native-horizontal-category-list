import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default class HorizontalSectionList extends React.Component {
    constructor(props) {
        super(props);
        this.scroll = null;
        this.state = {
            selectedTabIndex: 0,
            tabsContainerWidth: null,
            tabsWidth: null
        };
    }

    /**
     * render tab bar
     */
    renderTabs() {
        const { data, tabStyle, selectedTabTextStyle, selectedBarStyle } = this.props;
        const { selectedTabIndex, tabsWidth } = this.state;

        const tabs = [];
        data.forEach((element, index) => {
            tabs.push(<TouchableOpacity
                key={"tabs" + index}
                style={[styles.tabs, tabStyle]}
                onLayout={({ nativeEvent }) => this.onTabLayout(nativeEvent, index)}
                onPress={this.locationTo.bind(this, index)}>
                <Text style={[styles.tabText,
                index === selectedTabIndex ? styles.selectedTabText : {},
                index === selectedTabIndex ? selectedTabTextStyle : {}]}>
                    {element.label}
                </Text>
                {index === selectedTabIndex && <View style={[styles.progressBlock, { width: tabsWidth ? tabsWidth[index] : 0 }, selectedBarStyle]} />}
            </TouchableOpacity>);
        });
        return tabs;
    }
    /**
     * render item
     * @param {Object} param0 item object
     */
    renderItemContent({ item }) {
        const { renderItem, renderDivider } = this.props;
        if (item.isDivider) {
            return renderDivider ? renderDivider(item) : <View key={"divider" + item.groupIndex} style={styles.itemDivider} />;
        } else {
            return renderItem(item);
        }
    }

    /**
     * render function
     */
    render() {
        const { data } = this.props;


        const allItems = this.prepareData(data);
        return <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent} onLayout={({ nativeEvent }) => this.onTabsViewLayout(nativeEvent)}>
                    {
                        this.renderTabs()
                    }
                </View>
            </View>
            <FlatList
                style={styles.scrollContent}
                ref={(e) => { this.scroll = e; }}
                data={allItems}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                initialNumToRender={4}
                renderItem={this.renderItemContent.bind(this)}
                keyExtractor={(item, index) => "item" + index}
                onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
            />
        </View >;
    }

    onTabLayout(nativeEvent, index) {
        const { tabsWidth } = this.state;
        if (!tabsWidth) {
            const newTabsWidth = [];
            newTabsWidth[index] = nativeEvent.layout.width;
            this.setState({
                tabsWidth: newTabsWidth
            });
        } else {
            tabsWidth[index] = nativeEvent.layout.width;
            this.setState({
                tabsWidth
            });
        }
    }

    onTabsViewLayout(nativeEvent) {
        const { tabsContainerWidth } = this.state;
        if (!tabsContainerWidth) {
            this.setState({
                tabsContainerWidth: nativeEvent.layout.width
            });
        }
    }

    locationTo(targetIndex) {
        const { data } = this.props;
        let locationIndex = 0;
        let isCheck = false;
        data.forEach((element, index) => {
            if (index !== targetIndex && !isCheck) {
                if (index !== 0) {
                    locationIndex += 1;
                }
                locationIndex += element.items.length;
            } else {
                isCheck = true;
            }
        });
        this.scroll && this.scroll.scrollToIndex({
            index: locationIndex === 0 ? locationIndex : locationIndex + 1,
            viewOffset: 0
        });
    }

    onScroll(nativeEvent) {
        const { contentOffset: { x }, contentSize: { width }, layoutMeasurement: { width: screenWidth } } = nativeEvent;
        const equallyDivide = width - screenWidth;
        const currentItem = x;
        const percent = equallyDivide === 0 ? 0 : currentItem / equallyDivide;

        const { tabsWidth, tabsContainerWidth, selectedTabIndex } = this.state;
        const blockLocation = tabsContainerWidth * percent;

        const targetTabIndex = this.findCurrentTab(tabsWidth, blockLocation);
        if (targetTabIndex !== selectedTabIndex) {
            this.setState({
                selectedTabIndex: targetTabIndex
            });
        }
    }

    /**
     * render data
     * @param {Array} data render array
     */
    prepareData(data) {
        const allItems = [];

        // insert divider
        data.forEach((element, index) => {
            if (index !== 0) {
                allItems.push({
                    isDivider: true,
                    groupIndex: index
                });
            }
            element.items.forEach((item) => {
                allItems.push(item);
            });
        });

        return allItems;
    }

    findCurrentTab(tabsWidth, location) {
        let targetIndex = 0;
        if (tabsWidth) {
            let stepWidth = 0;
            let isCheck = false;
            const length = tabsWidth.length;
            tabsWidth.forEach((itemWidth, index) => {
                stepWidth += itemWidth;
                if (location <= stepWidth && !isCheck) {
                    targetIndex = index;
                    isCheck = true;
                }
                if (index === length - 1 && location > stepWidth) {
                    targetIndex = index;
                    isCheck = true;
                }
            });
        }
        return targetIndex;
    }
}

// style
const styles = StyleSheet.create({
    container: {
        minHeight: 80,
        width: "100%"
    },
    header: {
        paddingTop: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "rgb(230, 230, 230)"
    },
    headerContent: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    progressBlock: {
        height: 4,
        backgroundColor: "red",
        position: "absolute",
        bottom: -2
    },
    tabs: {
        justifyContent: "center",
        alignItems: "center",
    },
    selectedTabText: {
        color: "red"
    },
    tabText: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12,
        color: "#9c9cA3"
    },
    scrollContent: {
        width: "100%",
        backgroundColor: "white",
        padding: 5,
    },
    itemDivider: {
        marginLeft: 5,
        marginRight: 5,
        width: 4,
        height: 4,
        marginTop: 10,
        borderRadius: 2,
        backgroundColor: "#9c9cA3"
    }
});
