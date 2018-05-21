import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage,
} from 'react-native';

export default class EditTask extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const id = this.props.navigation.getParam('taskId')
        let todo = this._getTodoById(id)
        console.log(todo)
    }

    async _getTodoById(id){
        try {
            const data = await AsyncStorage.getItem('@Storage:todos')
            todos = JSON.parse(data)
            return todos.slice().filter(x=> x.key === id)
        } catch (e) {
            console.log("err get todo by Id" + e)
        }
    }

    render(){
        return (
            <View style = {styles.Container}>
                <TextInput 
                    style = { styles.Input }
                    value = {}
                />
                <Button
                    title = {"Save"} 
                    onPress = {()=> console.log("pressed")}
                />
            </View>
        )
    }
}

const styles = {
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Input: {
        height: 40,
        width: 250,
        backgroundColor: 'white',
        fontSize: 20,
        marginBottom: 100
    }
}