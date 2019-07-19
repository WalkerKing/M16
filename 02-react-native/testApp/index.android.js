/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    Button
} from 'react-native';

// class Blink extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { isShowingText: true };

//         setInterval(() => {
//             this.setState(previouseState => {
//                 return {
//                     isShowingText: !previouseState.isShowingText
//                 }
//             })
//         }, 1000);
//     }

//     render() {
//         if (!this.state.isShowingText) {
//             return null;
//         }
//         return (
//             <Text>{this.props.text}</Text>
//         )
//     }
// }
// // 使用state控制文字闪烁

// export default class BlinkApp extends Component {
//     render() {
//         return (
//             <View style={{ alignItems: 'center' }}>
//                 <Blink text='I love ' />
//                 <Blink text='Yes blinking is so great' />
//                 <Blink text='Why did they ever take this out of HTML ' />
//             </View>
//         );
//     }
// }


// 给文本增加样式
// export default class lotsOfStyle extends Component {
//     render() {
//         return (
//             <View>
//                 <Text style={styles.red}>Just red</Text>
//                 <Text style={styles.bigblue}>Just bigblue</Text>
//                 <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
//                 <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     bigblue: {
//         color: 'blue',
//         fontWeight: 'bold',
//         fontSize: 30,
//     },
//     red: {
//         color: 'red'
//     }
// });

// 不同屏幕显示成一样大小
// export default class FixDimensionsBasics extends Component {
//     render () {
//         return (
//             <View>
//                 <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}></View>
//                 <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}></View>
//                 <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}></View>
//             </View>
//         )
//     }
// }

// 使用flex布局
//export default class FlexDimensionsBasics extends Component {
//    render() {
//      return (
//        // 试试去掉父View中的`flex: 1`。
//        // 则父View不再具有尺寸，因此子组件也无法再撑开。
//        // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
//        <View style={{flex: 1}}>
//          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
//          <View style={{flex: 2, backgroundColor: 'skyblue'}} />
//          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
//        </View>
//      );
//    }
//  }

// 处理文本输入
// export default class PizzaTranslator extends Component {
//     constructor (props) {
//         super(props);
//         this.state = {text: ''};
//     }

//     render () {
//         return (
//             <View style={{padding: 40}}>
//                 <TextInput
//                     style={{height: 40}}
//                     placeholder="Type here to translate"
//                     onChangeText={text => this.setState({text})}
//                 />
//                 <Text style={{padding: 10, frontSize: 42}}>
//                     {this.state.text.split(' ').map(word => word && '🍕').join(' ')}
//                 </Text>
//             </View>
//         );
//     }
// }

// 处理事件
export default class ButtonBasic extends Component {
    _onPressButton () {
        Alert.alert('You tapped the button!');
    }
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={this._onPressButton}
                        title="press Me1111"
                    ></Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Press me22222"
                        color="#841584"
                    ></Button>
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="This looks greet"
                    ></Button>
                    <Button
                        onPress={this._onPressButton}
                        title="OK"
                        color="#841584"
                    ></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
AppRegistry.registerComponent('testApp', () => ButtonBasic);
