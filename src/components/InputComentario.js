import React, {Component} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default class InputComentario extends Component {
    constructor (props){
        super(props);
        this.state = {
            valorComentario: '',
        }
    }

    render(){

        const {comentarioCallback, idFoto} = this.props;

        return (
            <View style={styles.novoComentario}>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        ref={input => this.inputComentario =input }
                        placeholder="Adicione um comentario ... " 
                        onChangeText={texto => this.setState({valorComentario: texto})}/>
                    <TouchableOpacity onPress={()=>{
                        this.props.comentarioCallback(idFoto, this.state.valorComentario, this.inputComentario);
                        this.setState({valorComentario: ''});
                        }}>
                        <Image style={styles.icone} source={require('../../resources/img/send.png')} />
                    </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        flex: 1,
        height: 40
    },
    icone:{
        height: 30,
        width: 30
    },
    novoComentario:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});