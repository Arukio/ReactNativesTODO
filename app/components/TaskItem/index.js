import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

export default class TaskItem extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const isCompleted = this.props.completed
        const textStyle = {
                fontSize: 25,
                marginTop: 10,
                padding: 15,
                width: 250,
                alignItems: 'center',
                backgroundColor: 'orange',
                textDecorationLine: isCompleted ? 'line-through':'none',
        }
        return (
            <TouchableHighlight
                onPress = { () => this.props.onPress(this.props.id)}
                onLongPress = { () => this.props.onLongPress(this.props.id) }
            >
                <View style={styles.TaskItemContainer}>
                    <Text style={textStyle}>{ this.props.text }</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = {
    TaskItemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    
}

TaskItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
}