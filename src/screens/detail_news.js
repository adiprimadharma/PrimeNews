import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';

import {
    Dimensions,
    Modal,
    WebView,
    Share,
    Image
} from 'react-native';

import {
    Header,
    Content,
    Container,
    Body,
    Left,
    Right,
    Title,
    Button,
    Icon
} from 'native-base';

const webViewHeight = Dimensions.get('window').height - 56

export default class DetailNewsScreen extends PureComponent {

    constructor(props) {
        super(props)
        this._handleBack = this._handleBack.bind(this)
        this._handleShare = this._handleShare.bind(this)
    }

    _handleBack() {
        return this.props.navigation.goBack()
    }

    _handleShare() {
        const articleData = this.props.navigation.state.params.articleData;
        const title = articleData.title;
        const message =  `${articleData.title}\n\nRead more @\n${articleData.url}\n\nshared via PrimeNews`
        return Share.share(
            {title,message,url:message},
            {dialogTitle:`Share ${articleData.title}`}
        )
    }

    static navigationOptions = ({navigation, screenProps}) => {
        const params = navigation.state.params || {};
      
        return {
          title:       params.title,
          headerLeft:  params.headerLeft,
          headerRight: params.headerRight,
        }
      }
      
      _setNavigationParams() {
        let title       = this.props.navigation.state.params.articleData.title;
        let headerLeft  = <Button style={{height: '100%'}} transparent onPress={this._handleBack.bind(this)}><Icon style={{color: '#fff'}} name='arrow-back' /></Button>;
        let headerRight = <Button style={{height: '100%'}} transparent onPress={this._handleShare.bind(this)}><Icon style={{color: '#fff'}} name='share' /></Button>;
      
        this.props.navigation.setParams({ 
          title,
          headerLeft,
          headerRight, 
        });
      }
      
      componentWillMount() {
        this._setNavigationParams();
      }
      

    render() {
        const articleData = this.props.navigation.state.params.articleData;
            return (
            <Container>
             
                <Content contentContainerStyle={{height:'100%'}}>
                    <WebView onError={this._handleBack} scalesPageToFit source={{uri:articleData.url}}/>
                </Content>
            </Container>
            )
    }
}