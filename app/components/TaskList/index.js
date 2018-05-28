import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    AsyncStorage,
    Modal,
    Button,
    StyleSheet,
} from 'react-native';
import TaskItem from '../TaskItem';

export default class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            text: '',
            modalShow: false,
        }
    }

    componentDidMount(){
        console.log('Updateing todos')
        this._updateTodos()
    }

    _updateText(text){
        this.setState({
            text: text
        })
    }

    _addTodo(){
        this.setState(prevState => {
            let { todos, text } = prevState
            if(todos){
                this._saveTodos([...todos, {key: String(todos.length), text:text, completed: false}])
                return {
                    todos: [...todos, {key: String(todos.length), text:text, completed: false}],
                    text: ''
                }
            }else{
                this._saveTodos([{key: String(0), text:text, completed: false}])
                return {
                    todos: [{key: String(0), text:text, completed: false}],
                    text: ''
                }
            }
        })
    }

    _completeTodo(id){
        let todos = this.state.todos.slice()
        index = todos.findIndex(x => x.key === id)
        todos[index].completed = !todos[index].completed
        this.setState({
            todos
        })
    }

    _renderItem(item){
        return (
            <TaskItem 
                id = {item.key}
                text = {item.text}
                completed = { item.completed }
                onPress = { (id) => this._completeTodo(id) }
                onLongPress = { (id) => this._showModal(id) }
            />
        )
    }

    _showModal(id){
        this.setState({modalShow:true,deletItemId: id})
    }

    async _saveTodos(todo){
        todos = JSON.stringify(todo)
        //console.log(todos)
        try {
            const data = await AsyncStorage.setItem('@Storage:todos', todos)
        } catch (e) {
            console.log('err while saving data' + e)
        }
    }

    async _updateTodos(){
        try {
            const data = await AsyncStorage.getItem('@Storage:todos')
            todos = JSON.parse(data)
            this.setState({
                todos
            })
        } catch (e) {
            console.log('err while update data' + e)
        }
    }

    async _deleteTodo(id){
        this.setState({
            modalShow: false
        })
        todos = JSON.stringify(this.state.todos.slice().filter(x => x.key !== id))
        console.log(todos)
        try {
            set = await AsyncStorage.setItem('@Storage:todos', todos)
            this._updateTodos()
        } catch (e) {
            console.log('err while deleting item'+item)
        }
    }

    render(){
        return (
            <View style= {styles.TaskListContainer}>
                <Text style={styles.TaskListHeader}>Simple Todo App</Text>
                <TextInput 
                    style = { styles.Input }
                    value = { this.state.text }
                    onChangeText = { text => this._updateText(text) }
                    onSubmitEditing = { () => this._addTodo() }
                />
                <FlatList 
                    data = { this.state.todos }
                    renderItem = { item => this._renderItem(item.item) }
                />
                <Modal 
                    visible={this.state.modalShow} 
                    style={styles.bottomModal}
                    animationType={"slide"}
                >
                    <View style={styles.ModalContent}>
                        <Button
                            onPress = {()=> this._deleteTodo(this.state.deletItemId) } 
                            title="Hapus?"
                        />
                        <Button
                            onPress = {()=> {
                                this.props.navigation.navigate('Edit',{
                                    taskId: this.state.deletItemId
                                })
                                this.setState({
                                    modalShow: false
                                })
                            }} 
                            title="ubah"
                        />
                        <Button
                            onPress = {()=>this.setState({modalShow:false}) } 
                            title="cancel"
                        />    
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TaskListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    TaskListHeader: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    Input: {
        margin: 10,
        height: 40,
        width: 250,
        fontSize: 20,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    ModalContent: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal:{
        justifyContent: 'flex-end',
        margin: 0
    }
})