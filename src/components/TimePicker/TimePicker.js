import React, { Component } from 'react';
import { View, FlatList, StyleSheet, } from 'react-native';
import Text from '@textView/TextView';
import Button from '@button/Button';
var min = [
    " ",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    " "
]
export default class TimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedHour: '',
            selectedmin:'',
            selectedtype:''
        }
    }

    _onViewableItemsChanged = ({ viewableItems, changed }) => {
       

        if (viewableItems.length === 2) {
            // if (viewableItems[0].index > viewableItems[1].index) {
            //     this.hour.scrollToItem({ animated: true, item: viewableItems[1].item })
            // } else {
                this.hour.scrollToItem({ animated: true, item: viewableItems[0].item })

            // }
        } else if (viewableItems.length === 3) {
            this.setState({ selectedHour: viewableItems[1].item })
        } else {
            this.setState({ selectedHour: viewableItems[0].item })

        }
    };

    _onViewableItemsChangedMin = ({ viewableItems, changed }) => {
       

        if (viewableItems.length === 2) {
            // if (viewableItems[0].index > viewableItems[1].index) {
            //     this.hour.scrollToItem({ animated: true, item: viewableItems[1].item })
            // } else {
                this.min.scrollToItem({ animated: true, item: viewableItems[0].item })

            // }
        } else if (viewableItems.length === 3) {
            this.setState({ selectedmin: viewableItems[1].item })
        } else {
            this.setState({ selectedmin: viewableItems[0].item })

        }
    };

    _onViewableItemsChangedType = ({ viewableItems, changed }) => {
       

        if (viewableItems.length === 2) {
            // if (viewableItems[0].index > viewableItems[1].index) {
            //     this.hour.scrollToItem({ animated: true, item: viewableItems[1].item })
            // } else {
                this.type.scrollToItem({ animated: true, item: viewableItems[0].item })

            // }
        } else if (viewableItems.length >=3) {
            this.setState({ selectedtype: viewableItems[1].item })
        } else {
            this.setState({ selectedtype: viewableItems[0].item })

        }
    };

    _viewabilityConfig = {
        // itemVisiblePercentThreshold: 100,
        viewAreaCoveragePercentThreshold: 100
    };

    show() {
        const {
            mainView,
            bottomView,
            btnStyle,
            btnColor,
            btnText,
            selectedText,
            normalText
        } = localStyles
        var { selectedHour,selectedtype,selectedmin } = this.state
        return (
            <>
                <View style={mainView}>

                </View>
                <View style={bottomView}>
                    <Text style={{alignSelf:'center',marginBottom:10}}>{this.props.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                        <View style={{ height: 190 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{paddingVertical:20}}

                                ref={ref => (this.hour = ref)}
                                data={[" ",'01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'," "]}
                                renderItem={({ item }) => {
                                    return (
                                        <Text style={selectedHour === item ? selectedText : normalText}>{item}</Text>
                                    )
                                }}
                                onViewableItemsChanged={this._onViewableItemsChanged}
                                viewabilityConfig={this._viewabilityConfig}

                            />
                        </View>
                        <View style={{ height: 190 }}>
                            <FlatList
                                style={{paddingVertical:20}}
                                showsVerticalScrollIndicator={false}

                                ref={ref => (this.min = ref)}
                                data={min}
                                renderItem={({ item }) => {
                                    return (
                                        <Text style={selectedmin === item ? selectedText : normalText}>{item}</Text>
                                    )
                                }}
                                onViewableItemsChanged={this._onViewableItemsChangedMin}
                                viewabilityConfig={this._viewabilityConfig}

                            />
                        </View>
                        <View style={{ height: 190 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{paddingVertical:20}}
                                ref={ref => (this.type = ref)}
                                data={[' ','am','pm',' ']}
                                renderItem={({ item }) => {
                                    
                                    return (
                                        <Text style={selectedtype === item ? selectedText : normalText}>{item}</Text>
                                    )
                                }}
                                onViewableItemsChanged={this._onViewableItemsChangedType}
                                viewabilityConfig={this._viewabilityConfig}

                            />
                        </View>

                    </View>
                    <Button titleStyle={btnText} backgroundColor={btnColor} buttonStyle={btnStyle} onPress={()=>this.props.btnPress(selectedHour+'-'+selectedmin+'-'+selectedtype)} title={'OK'}></Button>
                </View>
            </>
        )
    }

    render() {

        return (
            <>
                {this.props.isVisible ? this.show() :null}

            </>

        )
    }
}

const localStyles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        height:400,
        backgroundColor: 'rgba(198, 208, 246, 0.65)',
    },
    bottomView: {
        height: '40%',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
    },
    btnStyle: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 8,
        height: 50,
        marginTop:30
    },
    btnColor: {
        backgroundColor: '#B5E6E6',
    },
    btnText: {
        fontSize: 14,
        color: '#5C5C5C'
    },
    selectedText: {
        fontSize: 16,
        marginVertical: 20,
        marginHorizontal: 30,
        color: '#6F6F6F',
        fontWeight: 'bold'
    },
    normalText: {
        fontSize: 16,
        marginVertical: 20,
        marginHorizontal: 30,
        color: '#BCBCBC'
    }
})