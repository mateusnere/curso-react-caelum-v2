import React, {Component} from 'react';
import { FlatList, View, Button, AsyncStorage} from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';

export default class Feed extends Component {
    constructor(){
        super();
        this.state = {
            fotos: []
        }
    }

    like = (idFoto) => {
        const foto = this.buscaPorId(idFoto);

        AsyncStorage.getItem('usuario')
            .then(usuarioLogado => {
                let novaLista = [];
                if (!foto.likeada) {
                    novaLista = [
                        ...foto.likers,
                        {login : usuarioLogado}
                    ];
                }else{
                    novaLista = foto.likers.filter(liker => {
                        return liker.login !== usuarioLogado
                    });
                }
        
                const fotoAtualizada = {
                    ...foto,
                    likeada: !foto.likeada,
                    likers: novaLista
                }
                
                this.atualizaFotos(fotoAtualizada);
            })
        
        const uri = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;
        AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'POST',
                    headers: new Headers({
                        'X-AUTH-TOKEN': token
                    })
                }
            })
            .then(requestInfo => fetch(uri, requestInfo));
    }

    adicionaComentario = (idFoto, valorComentario, inputComentario) =>{
        if (valorComentario === '') 
            return;

        const foto = this.buscaPorId(idFoto);

        const uri = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`;

        AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'POST',
                    body: JSON.stringify({
                        texto: valorComentario
                    }), 
                    headers: new Headers({
                        'Content-type': 'application/json',
                        'X-AUTH-TOKEN': token
                    })
                }
            })
            .then(requestInfo => fetch(uri, requestInfo))
            .then(resposta => resposta.json())
            .then(comentario => [...foto.comentarios, comentario])
            .then(novaLista => {
                const fotoAtualizada = {
                    ...foto,
                    comentarios: novaLista
                }
                this.atualizaFotos(fotoAtualizada)
                inputComentario.clear();
            });

    }

    buscaPorId(idFoto) {
        return this.state.fotos.find(foto => foto.id === idFoto);
    }

    atualizaFotos(fotoAtualizada) {
        const fotos = this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);

        this.setState({fotos});
    }

    componentDidMount(){
        InstaluraFetchService.get('/fotos')
            .then(json => this.setState({fotos: json}));
    }

    render(){
        return(
            <View>
                <Button title='AluraLingua' onPress={() => {
                    this.props.navigator.showModal({
                        screen: 'AluraLingua',
                        title: 'AluraLingua'
                    });
                }} />
            
                <FlatList
                    keyExtractor={item => String(item.id)}
                    data={this.state.fotos}
                    renderItem={({item}) => 
                    <Post foto={item} 
                        likeCallback={this.like} 
                        comentarioCallback={this.adicionaComentario} />
                }/>
            </View>
        );
    }
}