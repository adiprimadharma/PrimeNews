import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Button, Icon, Left } from 'native-base';
import InfiniteScroll from 'react-native-infinite-scroll';

import DataItem from '../components/list_item';
import { getArticles } from '../services/news';


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: null,
            isError: false,
            setModalVisible: false,
            modalArticleData: {}
        }

        this._loadMorePage = this._loadMorePage.bind(this)
    }

    componentDidMount() {
        getArticles(this.props.screenProps.topic).then(data => {
            this.setState({
                isLoading: false,
                data: data
            })
        }, error => {
            Alert.alert("Error", "Something happend, please try again")
        })
    }

    _loadMorePage(){
        getArticles(this.props.screenProps.topic).then(data => {
            this.setState({
                data: [...this.state.data, ...data]
            })
        }, error => {
            Alert.alert("Error", "Something happend, please try again")
        })
        
      }
    

    render() {
        let view = this.state.isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 400 }}>
                <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
                <Text style={{ marginTop: 8 }} children="Please wait..." />
            </View>
        ) : (
                <List
                    dataArray={this.state.data}
                    renderRow={(item) => {
                        return (
                            <ListItem>
                                <DataItem onPress={() => this.props.navigation.navigate('DetailNewsScreen', {
                                    articleData: item
                                })} data={item} />
                            </ListItem>
                        )
                    }} />

            )
        return (
            <Container>
                <Content
                    contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
                    padder={false}>
                     <InfiniteScroll
                        horizontal={false}  //true - if you want in horizontal
                        onLoadMoreAsync={this._loadMorePage}
                        distanceFromEnd={10} // distance in density-independent pixels from the right end
                        >   
                        {view}
                    </InfiniteScroll>
                </Content>
            </Container>
        )
    }
}

