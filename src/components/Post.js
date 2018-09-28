import React, { Component } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const width = Dimensions.get('screen').width;

export default class Post extends Component {
 
    constructor(props) {
        super(props);
    }

    exibeLegenda(foto) {
        if (foto.comentario === '')
            return;

        return (
            <View style={styles.comentario}>
                        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                        <Text>{foto.comentario}</Text>
                    </View>
        );
    }

    render() {
        const {foto, likeCallback, comentarioCallback, verPerfilCallback} = this.props;

        return (
            <View>
                <TouchableOpacity style={styles.cabecalho} onPress={() => verPerfilCallback(foto.id)}>
                    <View style={styles.cabecalho}>
                        <Image source={{ uri: this.props.foto.urlPerfil }}
                            style={styles.fotoDePerfil} />
                        <Text>{this.props.foto.loginUsuario}</Text>
                    </View>
                </TouchableOpacity>
                <Image source={{ uri: this.props.foto.urlFoto }}
                    style={styles.foto} />
                <View style={styles.rodape}>
                    <Likes foto={foto} likeCallback={likeCallback}/>
                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario => 
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                </View>
                <InputComentario 
                    idFoto={foto.id} 
                    comentarioCallback={comentarioCallback} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cabecalho: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDePerfil: {
        marginRight: 10,
        borderRadius: 20,
        width: 40,
        height: 40
    },
    foto: {
        width: width,
        height: width
    },
    rodape: {
        margin: 10
    },
    comentario:{
        flexDirection: 'row'
    },
    tituloComentario:{
        fontWeight: 'bold',
        marginRight: 5
    }
});