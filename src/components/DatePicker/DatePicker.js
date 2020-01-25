import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Text from '@textView/TextView';
const { width } = Dimensions.get('window');
import localStyles from '@bookingDetail/BookingDetailStyles'


export default class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            editable: false,
            date: this.getDaysArray(),
            monthName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            MonthPosition: {},
            selectedDates: [],
            currMonthname: ''

        },
            this.MonthPosition = {}
    }

    componentDidMount() {
        const { monthName } = this.state
        let date = new Date();
        let year = date.getFullYear()
        let month = date.getMonth();
        var obj = {};
        for (var i = 0; i < 4; i++) {
            if (i > 0) {
                if (month == 11) {
                    month = 0;
                    year = year + 1;
                } else {
                    month = month + 1;
                    year = year;
                }
            } else {
            }

            var currMonth = this.getDaysArray( year,month);
            let currMonthName = monthName[month] + '-' + year;

            obj[currMonthName] = currMonth;
        }
        this.setState({ date: obj });
    }

    getDaysArray = function(year, month) {
         
        var monthIndex = month; 
        var names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
        var date = new Date(year, monthIndex);
        var today=new Date();
        if(month===today.getMonth()&&year===today.getFullYear()){
            var result = [];
        while (date.getMonth() == monthIndex) {
        if(today.getDate()<=date.getDate())
          result.push({
              date:date.getDate(),
            day:names[date.getDay()]
        });
          date.setDate(date.getDate() + 1); 
        }
        return result;
        }
        var result = [];
        while (date.getMonth() == monthIndex) {
          result.push({
              date:date.getDate(),
            day:names[date.getDay()]
        });
          date.setDate(date.getDate() + 1);
        }
        return result;
      }


    scroll(evt) {
        let offset = evt.nativeEvent.contentOffset.x;
        let size = evt.nativeEvent.contentSize.width;
        var flag = true;
        var valarr = Object.values(this.MonthPosition).reverse();
        valarr.map((x, index) => {
            if (x < (offset + width)  && flag) {
                flag = false
                this.setState({ currMonthname: Object.keys(this.MonthPosition).find(key => this.MonthPosition[key] === x) })
            }
        })



    }

    dateClick(data) {
        if(this.props.enable){
        if(this.props.type=='single'){
            this.setState({selectedDates:[data]})
            this.props.getSelectedDates(data)
        }else{
            this.setState({ selectedDates: [...this.state.selectedDates, data] })
            this.props.getSelectedDates([...this.state.selectedDates, data] )
        }
    }
    }

    calenderback() {
        var { currMonthname } = this.state;
        if( Object.keys(this.MonthPosition)[0]===currMonthname){

        }else{

        Object.keys(this.MonthPosition).map((data, index) => {
            if (currMonthname === data) {
                this.scrollview_ref.scrollTo({ x: this.MonthPosition[Object.keys(this.MonthPosition)[index - 1]], animated: true })
                this.setState({ currMonthname: Object.keys(this.MonthPosition)[index - 1] })
            }
            
        })
                    
        }
    }
    calendernext() {
        var keys=Object.keys(this.MonthPosition);
        if( keys[keys.length]===currMonthname){
            
        }else{
        var { currMonthname } = this.state;
        keys.map((data, index) => {
            if (currMonthname === data) {
                this.scrollview_ref.scrollTo({ x: this.MonthPosition[Object.keys(this.MonthPosition)[index + 1]], animated: true })
                this.setState({ currMonthname: Object.keys(this.MonthPosition)[index + 1] })
            }
        })
    }
    }

    calender() {
        var arr = [];
        const { selectedDates, date } = this.state
        Object.keys(date).map(data1 => {

            date[data1].map((data, index) => {
                if (index == 0) {
                    arr.push(<TouchableOpacity onPress={() => this.dateClick(data)} onLayout={event => {
                        let ibj = {};
                        this.MonthPosition[data1] = event.nativeEvent.layout.x;
                    }} style={{ height: 90, width: 50, marginHorizontal: 2, backgroundColor: selectedDates.includes(data) ? '#B5E6E6' : '#fff', borderColor: 'rgba(181, 230, 230, 0.6)', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#6F6F6F', fontSize: 16, lineHeight: 20 }}>{data.day}</Text>
                        <Text style={{ color: '#6F6F6F', fontSize: 16, lineHeight: 20, marginTop: 10 }}>{data.date}</Text>

                    </TouchableOpacity>)
                } else {
                    arr.push(<TouchableOpacity onPress={() => this.dateClick(data)} style={{ height: 90, width: 50, backgroundColor: selectedDates.includes(data) ? '#B5E6E6' : '#fff', marginHorizontal: 2, borderColor: 'rgba(181, 230, 230, 0.6)', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#6F6F6F', fontSize: 16, lineHeight: 20 }}>{data.day}</Text>
                        <Text style={{ color: '#6F6F6F', fontSize: 16, lineHeight: 20, marginTop: 10 }}>{data.date}</Text>

                    </TouchableOpacity>)
                }
            })
        })
        return arr;
    }

    render() {
        const {
            flex1,
            calenderheader
        } = localStyles
        let { lastMonth, lastYear } = this.state
        return (
            <View>
                <View style={calenderheader}>
                    <TouchableOpacity onPress={() => this.calenderback()}>
                        <Text>right</Text>
                    </TouchableOpacity>
                    <Text>{this.state.currMonthname}</Text>
                    <TouchableOpacity onPress={() => this.calendernext()}>
                        <Text>left</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={this.props.enable}
                    removeClippedSubviews={false}
                    scrollEventThrottle={200}
                    decelerationRate={0.7}
                    ref={ref => {
                        this.scrollview_ref = ref;
                    }}
                    onScroll={(event) => this.scroll(event)}
                    horizontal>
                    {this.calender()}
                </ScrollView>
            </View>
        )
    }
}