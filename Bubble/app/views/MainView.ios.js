import React, { Component } from 'react';
import { Platform, StyleSheet, TabBarIOS, Text, View } from 'react-native';
import ChatListView from './ChatListView';
import MyChatListView from './MyChatListView';
import ChatFormView from './ChatFormView';
import InformationView from './InformationView';
import SettingsView from './SettingsView';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iconSize: 25,
            refresh: false,
            selectedTab: 'all',
            toggleMyChats: false    // To invoke refreshing of my chats filter ... to be refactored
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTab) {
            this.setState({ selectedTab: nextProps.selectedTab });
        }
    }

    onCreateChatPressed = () => {
        this.setState({ selectedTab: 'create' });
    }

    _renderContent = () => {
        switch (this.state.selectedTab) {
            case 'all':
                return (
                    <ChatListView
                        key="all"
                        title="All Chats"
                        onCreateChatPressed={this.onCreateChatPressed}
                        />
                );
            case 'open':
                return (
                    <MyChatListView
                        key="open"
                        toggle={this.state.toggleMyChats}
                        title="Open Chats"
                        onCreateChatPressed={this.onCreateChatPressed}
                        />
                );
            case 'create':
                return (
                    <ChatFormView
                        key="open"
                        title="Create Chat"
                        isBackButtonVisible={false}
                        />
                );
            case 'info':
                return (
                    <InformationView
                        key="open"
                        title="Useful Info"
                        />
                );
            case 'settings':
                return (
                    <SettingsView />
                );
        }
    };

    render() {
        return (
            <TabBarIOS
                barTintColor='#dcdcdc'
                tintColor='#2E94B9'>

                <Icon.TabBarItemIOS
                    title="All"
                    iconName="comments"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'all'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'all',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="My Chats"
                    iconName="commenting"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'open'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'open',
                            toggleMyChats: !this.state.toggleMyChats
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Create"
                    iconName="plus"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'create'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'create',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Info"
                    iconName="info-circle"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'info'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'info',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title="Settings"
                    iconName="cog"
                    iconSize={this.state.iconSize}
                    selected={this.state.selectedTab === 'settings'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'settings',
                        });
                    } }>
                    {this._renderContent()}
                </Icon.TabBarItemIOS>
            </TabBarIOS>

        );
    }
}

// TODO: Collate all styles under Styles.js
var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});
