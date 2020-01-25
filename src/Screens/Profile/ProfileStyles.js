
import {StyleSheet} from 'react-native';
const localStyles=StyleSheet.create({
    flex1:{
        flex:1,
    },
    imgStyle:{
        marginTop:10,
        height:'25%',
        width:'auto',
        aspectRatio:1
    },
    mainSubView:{
        alignItems:'center',justifyContent:'center',flex:1
    },
    textStyle:{
        lineHeight:20,
        fontSize:16,
        color:'#6F6F6F',
        marginVertical:5,
    },
    flexRow:{
        flexDirection:'row',
        justifyContent:'center',
        borderBottomColor:'#E4E4E4',
        borderBottomWidth:1,
        flex:1,
        maxHeight:60,
        alignItems:'center',
        width:'100%'

    },
    pageNameView:{
        width:'80%',
        paddingHorizontal:20
    },

})

export default localStyles